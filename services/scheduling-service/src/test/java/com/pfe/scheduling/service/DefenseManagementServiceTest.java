package com.pfe.scheduling.service;

import com.pfe.scheduling.entity.AcademicPeriod;
import com.pfe.scheduling.entity.DefenseJury;
import com.pfe.scheduling.entity.DefenseSession;
import com.pfe.scheduling.entity.DefenseStatus;
import com.pfe.scheduling.entity.JuryRole;
import com.pfe.scheduling.feign.ProjectsClient;
import com.pfe.scheduling.feign.ResourceClient;
import com.pfe.scheduling.feign.UserClient;
import com.pfe.scheduling.repository.DefenseJuryRepository;
import com.pfe.scheduling.repository.DefenseSessionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DefenseManagementServiceTest {

    @Mock
    private DefenseSessionRepository defenseSessionRepository;
    @Mock
    private DefenseJuryRepository defenseJuryRepository;
    @Mock
    private AcademicPeriodService academicPeriodService;
    @Mock
    private DefenseEventPublisher eventPublisher;
    @Mock
    private ResourceClient resourceClient;
    @Mock
    private ProjectsClient projectsClient;
    @Mock
    private UserClient userClient;

    @InjectMocks
    private DefenseManagementService service;

    @Test
    void rejectsNonTeacherAsJuryMember() {
        DefenseSession session = activeDefense();
        when(defenseSessionRepository.findById(10L)).thenReturn(Optional.of(session));
        when(academicPeriodService.getActivePeriod()).thenReturn(activePeriod());
        when(userClient.getUserById("student-1")).thenReturn(user("student-1", "STUDENT"));

        assertThatThrownBy(() -> service.addJuryMember(10L, "student-1", JuryRole.EXAMINER, false))
                .hasMessageContaining("must be a teacher user");
    }

    @Test
    void rejectsSecondPresidentForSameDefense() {
        DefenseSession session = activeDefense();
        when(defenseSessionRepository.findById(10L)).thenReturn(Optional.of(session));
        when(academicPeriodService.getActivePeriod()).thenReturn(activePeriod());
        when(userClient.getUserById("teacher-2")).thenReturn(user("teacher-2", "TEACHER"));
        when(defenseJuryRepository.countByDefenseSessionIdAndRole(10L, JuryRole.PRESIDENT)).thenReturn(1L);

        assertThatThrownBy(() -> service.addJuryMember(10L, "teacher-2", JuryRole.PRESIDENT, false))
                .hasMessageContaining("only one president");
    }

    @Test
    void rejectsSupervisorRoleWhenTeacherIsNotProjectSupervisor() {
        DefenseSession session = activeDefense();
        when(defenseSessionRepository.findById(10L)).thenReturn(Optional.of(session));
        when(academicPeriodService.getActivePeriod()).thenReturn(activePeriod());
        when(userClient.getUserById("teacher-1")).thenReturn(user("teacher-1", "TEACHER"));
        when(projectsClient.getById("project-1")).thenReturn(projectWithSupervisors());

        assertThatThrownBy(() -> service.addJuryMember(10L, "teacher-1", JuryRole.SUPERVISOR, false))
                .hasMessageContaining("linked to the project");
    }

    @Test
    void rejectsRapporteurWhenTeacherIsProjectSupervisor() {
        DefenseSession session = activeDefense();
        when(defenseSessionRepository.findById(10L)).thenReturn(Optional.of(session));
        when(academicPeriodService.getActivePeriod()).thenReturn(activePeriod());
        when(userClient.getUserById("teacher-supervisor")).thenReturn(user("teacher-supervisor", "TEACHER"));
        when(projectsClient.getById("project-1")).thenReturn(projectWithSupervisors(
                new ProjectsClient.ProjectSupervisorDTO("teacher-supervisor", "MAIN_SUPERVISOR")));

        assertThatThrownBy(() -> service.addJuryMember(10L, "teacher-supervisor", JuryRole.RAPPORTEUR, false))
                .hasMessageContaining("different from the project supervisor");
    }

    @Test
    void rejectsTeacherAlreadyBusyInSameTimeSlot() {
        DefenseSession session = activeDefense();
        DefenseJury overlappingJury = DefenseJury.builder().id(77L).teacherId("teacher-1").build();
        when(defenseSessionRepository.findById(10L)).thenReturn(Optional.of(session));
        when(academicPeriodService.getActivePeriod()).thenReturn(activePeriod());
        when(userClient.getUserById("teacher-1")).thenReturn(user("teacher-1", "TEACHER"));
        when(projectsClient.getById("project-1")).thenReturn(projectWithSupervisors());
        when(defenseJuryRepository.findOverlappingTeacherJuries(
                eq("teacher-1"),
                eq(session.getDate()),
                eq(session.getStartTime()),
                eq(session.getEndTime()),
                eq(10L))).thenReturn(List.of(overlappingJury));

        assertThatThrownBy(() -> service.addJuryMember(10L, "teacher-1", JuryRole.EXAMINER, false))
                .hasMessageContaining("already in another jury");
    }

    @Test
    void savesValidSupervisorJuryMember() {
        DefenseSession session = activeDefense();
        when(defenseSessionRepository.findById(10L)).thenReturn(Optional.of(session));
        when(academicPeriodService.getActivePeriod()).thenReturn(activePeriod());
        when(userClient.getUserById("teacher-supervisor")).thenReturn(user("teacher-supervisor", "TEACHER"));
        when(projectsClient.getById("project-1")).thenReturn(projectWithSupervisors(
                new ProjectsClient.ProjectSupervisorDTO("teacher-supervisor", "MAIN_SUPERVISOR")));
        when(userClient.getTeacherAvailability("teacher-supervisor")).thenReturn(List.of(
                new UserClient.TeacherAvailabilityDto(1L, "08:00", "12:00", true, true)));
        when(defenseJuryRepository.save(any(DefenseJury.class))).thenAnswer(invocation -> invocation.getArgument(0));

        DefenseJury saved = service.addJuryMember(10L, "teacher-supervisor", JuryRole.SUPERVISOR, false);

        assertThat(saved.getDefenseSession()).isSameAs(session);
        assertThat(saved.getTeacherId()).isEqualTo("teacher-supervisor");
        assertThat(saved.getRole()).isEqualTo(JuryRole.SUPERVISOR);
    }

    @Test
    void rejectsScheduledDefenseWithoutMinimumJuryComposition() {
        DefenseSession session = activeDefense();
        when(defenseSessionRepository.findById(10L)).thenReturn(Optional.of(session));
        when(academicPeriodService.getActivePeriod()).thenReturn(activePeriod());
        when(defenseJuryRepository.countByDefenseSessionIdAndRole(10L, JuryRole.PRESIDENT)).thenReturn(1L);
        when(defenseJuryRepository.countByDefenseSessionIdAndRole(10L, JuryRole.RAPPORTEUR)).thenReturn(1L);
        when(defenseJuryRepository.countByDefenseSessionIdAndRole(10L, JuryRole.EXAMINER)).thenReturn(0L);

        DefenseSession request = DefenseSession.builder().status(DefenseStatus.SCHEDULED).build();

        assertThatThrownBy(() -> service.updateDefense(10L, request, false))
                .hasMessageContaining("at least one examiner");
    }

    @Test
    void rejectsUpdatesForArchivedAcademicYear() {
        DefenseSession archivedSession = activeDefense();
        archivedSession.setAcademicYear("2024-2025");
        when(defenseSessionRepository.findById(10L)).thenReturn(Optional.of(archivedSession));
        when(academicPeriodService.getActivePeriod()).thenReturn(activePeriod());

        DefenseSession request = DefenseSession.builder().status(DefenseStatus.CANCELLED).build();

        assertThatThrownBy(() -> service.updateDefense(10L, request, false))
                .hasMessageContaining("read-only");
    }

    @Test
    void publishesCreatedEventWithActiveAcademicYear() {
        DefenseSession request = DefenseSession.builder()
                .projectId("project-1")
                .status(DefenseStatus.PENDING)
                .build();
        when(academicPeriodService.getActivePeriod()).thenReturn(activePeriod());
        when(defenseSessionRepository.save(any(DefenseSession.class))).thenAnswer(invocation -> invocation.getArgument(0));

        service.createDefense(request);

        ArgumentCaptor<DefenseSession> sessionCaptor = ArgumentCaptor.forClass(DefenseSession.class);
        verify(defenseSessionRepository).save(sessionCaptor.capture());
        verify(eventPublisher).publishDefenseCreated(any(DefenseSession.class));
        assertThat(sessionCaptor.getValue().getAcademicYear()).isEqualTo("2025-2026");
    }

    private DefenseSession activeDefense() {
        return DefenseSession.builder()
                .id(10L)
                .projectId("project-1")
                .roomId(3L)
                .academicYear("2025-2026")
                .date(LocalDate.of(2026, 6, 10))
                .startTime(LocalTime.of(9, 0))
                .endTime(LocalTime.of(10, 0))
                .status(DefenseStatus.PENDING)
                .build();
    }

    private AcademicPeriod activePeriod() {
        return AcademicPeriod.builder()
                .id(1L)
                .academicYear("2025-2026")
                .semester("S2")
                .defenseStartDate(LocalDate.of(2026, 6, 1))
                .defenseEndDate(LocalDate.of(2026, 6, 30))
                .isActive(true)
                .build();
    }

    private UserClient.UserDto user(String id, String role) {
        return new UserClient.UserDto(id, "Teacher", "teacher@example.com", role, "IT", "Dr", "AI");
    }

    private ProjectsClient.ProjectDTO projectWithSupervisors(ProjectsClient.ProjectSupervisorDTO... supervisors) {
        return new ProjectsClient.ProjectDTO(
                "project-1",
                "PFE Project",
                "PFE Project",
                "APPROVED",
                "Supervisor",
                List.of(supervisors));
    }
}
