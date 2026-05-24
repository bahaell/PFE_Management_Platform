package com.pfe.scheduling.service;

import com.pfe.scheduling.entity.*;
import com.pfe.scheduling.feign.ProjectsClient;
import com.pfe.scheduling.repository.DefenseJuryRepository;
import com.pfe.scheduling.repository.DefenseSessionRepository;
import com.pfe.scheduling.feign.ResourceClient;
import com.pfe.scheduling.feign.UserClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DefenseManagementService {

    private final DefenseSessionRepository defenseSessionRepository;
    private final DefenseJuryRepository defenseJuryRepository;
    private final AcademicPeriodService academicPeriodService;
    private final DefenseEventPublisher eventPublisher;
    private final ResourceClient resourceClient;
    private final ProjectsClient projectsClient;
    private final UserClient userClient;

    public List<DefenseSession> getAllDefenses() {
        return defenseSessionRepository.findAll();
    }

    public DefenseSession getDefenseById(Long id) {
        return defenseSessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Defense session not found"));
    }

    public List<DefenseJury> getJuryMembers(Long defenseId) {
        getDefenseById(defenseId);
        return defenseJuryRepository.findByDefenseSessionId(defenseId);
    }

    @Transactional
    public DefenseSession createDefense(DefenseSession session) {
        AcademicPeriod activePeriod = academicPeriodService.getActivePeriod();
        session.setAcademicYear(activePeriod.getAcademicYear());

        if (session.getRoomId() != null) {
            validateRoomAvailability(session);
        }

        DefenseSession saved = defenseSessionRepository.save(session);
        eventPublisher.publishDefenseCreated(saved);
        return saved;
    }

    @Transactional
    public DefenseSession updateDefense(Long id, DefenseSession updateReq, boolean forceOverride) {
        DefenseSession session = getDefenseById(id);
        ensureActiveAcademicYear(session);

        boolean wasRescheduled = false;
        if (updateReq.getDate() != null && updateReq.getStartTime() != null) {
            if (!updateReq.getDate().equals(session.getDate()) || !updateReq.getStartTime().equals(session.getStartTime())) {
                wasRescheduled = true;
            }
        }

        if (updateReq.getDate() != null) {
            session.setDate(updateReq.getDate());
        }
        if (updateReq.getStartTime() != null) {
            session.setStartTime(updateReq.getStartTime());
        }
        if (updateReq.getEndTime() != null) {
            session.setEndTime(updateReq.getEndTime());
        }
        if (updateReq.getRoomId() != null) {
            session.setRoomId(updateReq.getRoomId());
        }
        if (updateReq.getRoomNameSnapshot() != null) {
            session.setRoomNameSnapshot(updateReq.getRoomNameSnapshot());
        }
        if (updateReq.getStatus() != null) {
            session.setStatus(updateReq.getStatus());
        }
        session.setManuallyScheduled(forceOverride);

        if (!forceOverride && session.getRoomId() != null && session.getDate() != null) {
            validateRoomAvailability(session);
            validateJuryScheduleConflicts(session);
        }

        if (session.getStatus() == DefenseStatus.SCHEDULED
                || session.getStatus() == DefenseStatus.ONGOING
                || session.getStatus() == DefenseStatus.COMPLETED) {
            validateJuryComposition(session.getId());
        }

        DefenseSession updated = defenseSessionRepository.save(session);

        if (wasRescheduled) {
            eventPublisher.publishDefenseRescheduled(updated);
        } else {
            eventPublisher.publishDefenseUpdated(updated);
        }
        
        return updated;
    }

    @Transactional
    public void cancelDefense(Long id) {
        DefenseSession session = getDefenseById(id);
        ensureActiveAcademicYear(session);
        session.setStatus(DefenseStatus.CANCELLED);
        defenseSessionRepository.save(session);
        eventPublisher.publishDefenseCancelled(session);
    }

    @Transactional
    public void deleteDefense(Long id) {
        DefenseSession session = getDefenseById(id);
        ensureActiveAcademicYear(session);
        defenseJuryRepository.deleteByDefenseSessionId(id);
        defenseSessionRepository.delete(session);
        eventPublisher.publishDefenseCancelled(session);
    }

    @Transactional
    public DefenseJury addJuryMember(Long defenseId, String teacherId, JuryRole role, boolean forceOverride) {
        DefenseSession session = getDefenseById(defenseId);
        ensureActiveAcademicYear(session);
        validateTeacherUser(teacherId);

        if (defenseJuryRepository.existsByDefenseSessionIdAndTeacherId(defenseId, teacherId)) {
            throw new RuntimeException("Teacher " + teacherId + " is already assigned to this defense jury.");
        }

        if (role == JuryRole.PRESIDENT
                && defenseJuryRepository.countByDefenseSessionIdAndRole(defenseId, JuryRole.PRESIDENT) > 0) {
            throw new RuntimeException("A defense jury can have only one president.");
        }

        boolean projectSupervisor = isProjectSupervisor(session.getProjectId(), teacherId);
        if (role == JuryRole.SUPERVISOR && !projectSupervisor) {
            throw new RuntimeException("Supervisor jury role must be assigned to a teacher linked to the project.");
        }
        if (role == JuryRole.RAPPORTEUR && projectSupervisor) {
            throw new RuntimeException("Rapporteur must be different from the project supervisor.");
        }

        if (!forceOverride && session.getDate() != null
                && session.getStartTime() != null && session.getEndTime() != null) {
            List<DefenseJury> overlapping = defenseJuryRepository.findOverlappingTeacherJuries(
                    teacherId, session.getDate(), session.getStartTime(), session.getEndTime(), defenseId);
            if (!overlapping.isEmpty()) {
                throw new RuntimeException("Teacher " + teacherId + " is already in another jury at this time.");
            }
            validateTeacherAvailability(teacherId, session);
        }

        DefenseJury jury = DefenseJury.builder()
                .defenseSession(session)
                .teacherId(teacherId)
                .role(role)
                .build();

        return defenseJuryRepository.save(jury);
    }

    @Transactional
    public DefenseJury updateJuryMember(Long defenseId, Long juryId, String teacherId, JuryRole role, boolean forceOverride) {
        DefenseJury jury = defenseJuryRepository.findById(juryId)
                .orElseThrow(() -> new RuntimeException("Jury member not found"));
        if (!jury.getDefenseSession().getId().equals(defenseId)) {
            throw new RuntimeException("Jury member does not belong to this defense.");
        }

        DefenseSession session = getDefenseById(defenseId);
        ensureActiveAcademicYear(session);
        validateTeacherUser(teacherId);

        boolean teacherChanged = !jury.getTeacherId().equals(teacherId);
        if (teacherChanged && defenseJuryRepository.existsByDefenseSessionIdAndTeacherId(defenseId, teacherId)) {
            throw new RuntimeException("Teacher " + teacherId + " is already assigned to this defense jury.");
        }

        if (role == JuryRole.PRESIDENT
                && jury.getRole() != JuryRole.PRESIDENT
                && defenseJuryRepository.countByDefenseSessionIdAndRole(defenseId, JuryRole.PRESIDENT) > 0) {
            throw new RuntimeException("A defense jury can have only one president.");
        }

        boolean projectSupervisor = isProjectSupervisor(session.getProjectId(), teacherId);
        if (role == JuryRole.SUPERVISOR && !projectSupervisor) {
            throw new RuntimeException("Supervisor jury role must be assigned to a teacher linked to the project.");
        }
        if (role == JuryRole.RAPPORTEUR && projectSupervisor) {
            throw new RuntimeException("Rapporteur must be different from the project supervisor.");
        }

        if (!forceOverride && session.getDate() != null
                && session.getStartTime() != null && session.getEndTime() != null) {
            List<DefenseJury> overlapping = defenseJuryRepository.findOverlappingTeacherJuries(
                    teacherId, session.getDate(), session.getStartTime(), session.getEndTime(), defenseId);
            if (!overlapping.isEmpty()) {
                throw new RuntimeException("Teacher " + teacherId + " is already in another jury at this time.");
            }
            validateTeacherAvailability(teacherId, session);
        }

        jury.setTeacherId(teacherId);
        jury.setRole(role);
        return defenseJuryRepository.save(jury);
    }

    @Transactional
    public void deleteJuryMember(Long defenseId, Long juryId) {
        DefenseJury jury = defenseJuryRepository.findById(juryId)
                .orElseThrow(() -> new RuntimeException("Jury member not found"));
        if (!jury.getDefenseSession().getId().equals(defenseId)) {
            throw new RuntimeException("Jury member does not belong to this defense.");
        }
        ensureActiveAcademicYear(jury.getDefenseSession());
        defenseJuryRepository.delete(jury);
    }

    private void validateRoomAvailability(DefenseSession session) {
        if (session.getRoomId() == null || session.getDate() == null
                || session.getStartTime() == null || session.getEndTime() == null) {
            return;
        }
        List<DefenseSession> overlaps = defenseSessionRepository.findOverlappingRoomSessions(
                session.getRoomId(), session.getDate(), session.getStartTime(), session.getEndTime(), session.getId());

        if (!overlaps.isEmpty()) {
            throw new RuntimeException("Room conflict: The room is already booked for another defense.");
        }
    }

    private void validateJuryComposition(Long defenseId) {
        if (defenseJuryRepository.countByDefenseSessionIdAndRole(defenseId, JuryRole.PRESIDENT) != 1) {
            throw new RuntimeException("A scheduled defense must have exactly one president.");
        }
        if (defenseJuryRepository.countByDefenseSessionIdAndRole(defenseId, JuryRole.RAPPORTEUR) < 1) {
            throw new RuntimeException("A scheduled defense must have at least one rapporteur.");
        }
        if (defenseJuryRepository.countByDefenseSessionIdAndRole(defenseId, JuryRole.EXAMINER) < 1) {
            throw new RuntimeException("A scheduled defense must have at least one examiner.");
        }
    }

    private void validateJuryScheduleConflicts(DefenseSession session) {
        if (session.getDate() == null || session.getStartTime() == null || session.getEndTime() == null) {
            return;
        }

        List<DefenseJury> juryMembers = defenseJuryRepository.findByDefenseSessionId(session.getId());
        for (DefenseJury jury : juryMembers) {
            List<DefenseJury> overlapping = defenseJuryRepository.findOverlappingTeacherJuries(
                    jury.getTeacherId(), session.getDate(), session.getStartTime(), session.getEndTime(), session.getId());
            if (!overlapping.isEmpty()) {
                throw new RuntimeException("Teacher " + jury.getTeacherId() + " is already in another jury at this time.");
            }
            validateTeacherAvailability(jury.getTeacherId(), session);
        }
    }

    private void validateTeacherUser(String teacherId) {
        UserClient.UserDto user = userClient.getUserById(teacherId);
        if (user.role() == null || !"TEACHER".equalsIgnoreCase(user.role())) {
            throw new RuntimeException("Jury member " + teacherId + " must be a teacher user.");
        }
    }

    private void validateTeacherAvailability(String teacherId, DefenseSession session) {
        if (session.getStartTime() == null || session.getEndTime() == null) {
            return;
        }

        boolean available = userClient.getTeacherAvailability(teacherId).stream()
                .anyMatch(slot -> coversDefenseSlot(slot, session.getStartTime(), session.getEndTime()));

        if (!available) {
            throw new RuntimeException("Teacher " + teacherId + " is not available for this defense time slot.");
        }
    }

    private boolean coversDefenseSlot(UserClient.TeacherAvailabilityDto slot, LocalTime startTime, LocalTime endTime) {
        try {
            LocalTime slotStart = LocalTime.parse(slot.start());
            LocalTime slotEnd = LocalTime.parse(slot.end());
            return !slotStart.isAfter(startTime) && !slotEnd.isBefore(endTime);
        } catch (RuntimeException ex) {
            log.warn("Ignoring invalid teacher availability slot {}-{}", slot.start(), slot.end());
            return false;
        }
    }

    private boolean isProjectSupervisor(String projectId, String teacherId) {
        ProjectsClient.ProjectDTO project = projectsClient.getById(projectId);
        if (project.supervisors() == null) {
            return false;
        }
        return project.supervisors().stream()
                .anyMatch(supervisor -> teacherId.equals(supervisor.teacherId()));
    }

    private void ensureActiveAcademicYear(DefenseSession session) {
        AcademicPeriod activePeriod = academicPeriodService.getActivePeriod();
        if (session.getAcademicYear() != null
                && !session.getAcademicYear().equals(activePeriod.getAcademicYear())) {
            throw new RuntimeException("Archived or inactive academic years are read-only.");
        }
    }
}
