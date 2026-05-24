package com.example.projects.controller;

import com.example.projects.dto.SubjectRequest;
import com.example.projects.dto.SubjectResponse;
import com.example.projects.dto.SubjectApplicationRequest;
import com.example.projects.dto.SubjectApplicationResponse;
import com.example.projects.entity.Project;
import com.example.projects.entity.ProjectMember;
import com.example.projects.entity.ProjectMemberRole;
import com.example.projects.entity.ProjectPhase;
import com.example.projects.entity.ProjectStatus;
import com.example.projects.entity.ProjectSupervisor;
import com.example.projects.entity.ProjectSupervisorRole;
import com.example.projects.entity.Subject;
import com.example.projects.entity.SubjectApplication;
import com.example.projects.entity.SubjectApplicationStatus;
import com.example.projects.entity.SubjectStatus;
import com.example.projects.exception.BadRequestException;
import com.example.projects.exception.ForbiddenException;
import com.example.projects.repository.ProjectMemberRepository;
import com.example.projects.repository.ProjectRepository;
import com.example.projects.repository.ProjectSupervisorRepository;
import com.example.projects.repository.SubjectApplicationRepository;
import com.example.projects.repository.SubjectRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.HashSet;
import java.util.Locale;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping({"/api/subjects", "/api/projects/subjects"})
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectRepository subjectRepository;
    private final SubjectApplicationRepository subjectApplicationRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectSupervisorRepository projectSupervisorRepository;

    @GetMapping
    public ResponseEntity<List<SubjectResponse>> getAll(
            @RequestParam(required = false) String academicYear,
            @RequestParam(required = false) SubjectStatus status,
            @RequestParam(required = false) String teacherId,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        List<Subject> subjects;
        if (academicYear != null && !academicYear.isBlank()) {
            subjects = subjectRepository.findByAcademicYear(academicYear);
        } else if (status != null) {
            subjects = isAccepted(status)
                    ? subjectRepository.findAll().stream().filter(subject -> isAccepted(subject.getStatus())).toList()
                    : subjectRepository.findByStatus(status);
        } else {
            subjects = subjectRepository.findAll();
        }

        String normalizedRole = normalizeRole(userRole);
        List<SubjectResponse> response = subjects.stream()
                .filter(subject -> teacherId == null || teacherId.isBlank() || teacherId.equals(subject.getTeacherId()))
                .filter(subject -> isVisibleToRole(subject, userId, normalizedRole))
                .map(this::toDto)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectResponse> getById(@PathVariable UUID id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found: " + id));
        return ResponseEntity.ok(toDto(subject));
    }

    @PostMapping
    public ResponseEntity<SubjectResponse> create(
            @Valid @RequestBody SubjectRequest request,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        String normalizedRole = normalizeRole(userRole);
        if (normalizedRole != null && !"TEACHER".equals(normalizedRole)) {
            throw new ForbiddenException("Only a teacher can create an internal subject.");
        }

        Subject subject = Subject.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .technologies(request.getTechnologies() != null ? request.getTechnologies() : new HashSet<>())
                .type(request.getType())
                .status(SubjectStatus.PENDING)
                .academicYear(normalizeAcademicYear(request.getAcademicYear()))
                .teacherId(resolveTeacherId(userId, request.getTeacherId()))
                .companyName(request.getCompanyName())
                .build();
        return new ResponseEntity<>(toDto(subjectRepository.save(subject)), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<SubjectResponse> updateStatus(
            @PathVariable UUID id,
            @RequestParam SubjectStatus status,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        String normalizedRole = normalizeRole(userRole);
        if (normalizedRole != null && !"COORDINATOR".equals(normalizedRole)) {
            throw new ForbiddenException("Only a coordinator can review subjects.");
        }

        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found: " + id));
        subject.setStatus(normalizeAcceptedStatus(status));
        return ResponseEntity.ok(toDto(subjectRepository.save(subject)));
    }

    @GetMapping("/{id}/applications")
    public ResponseEntity<List<SubjectApplicationResponse>> getApplications(@PathVariable UUID id) {
        return ResponseEntity.ok(subjectApplicationRepository.findBySubjectId(id).stream()
                .map(this::toApplicationDto)
                .toList());
    }

    @PostMapping("/{id}/applications")
    public ResponseEntity<SubjectApplicationResponse> apply(
            @PathVariable UUID id,
            @RequestBody(required = false) SubjectApplicationRequest request,
            @RequestHeader(value = "X-User-Id", required = false) String userId) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found: " + id));
        if (!isAccepted(subject.getStatus())) {
            throw new BadRequestException("Students can apply only after the coordinator accepts the subject.");
        }

        String studentId = resolveStudentId(userId, request);
        SubjectApplication application = subjectApplicationRepository.findBySubjectIdAndStudentId(id, studentId)
                .orElseGet(() -> SubjectApplication.builder()
                        .subject(subject)
                        .studentId(studentId)
                        .status(SubjectApplicationStatus.PENDING)
                        .build());
        if (application.getStatus() == SubjectApplicationStatus.REJECTED) {
            application.setStatus(SubjectApplicationStatus.PENDING);
        }
        return new ResponseEntity<>(toApplicationDto(subjectApplicationRepository.save(application)), HttpStatus.CREATED);
    }

    @GetMapping("/applications/student/{studentId}")
    public ResponseEntity<List<SubjectApplicationResponse>> getApplicationsByStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(subjectApplicationRepository.findByStudentId(studentId).stream()
                .map(this::toApplicationDto)
                .toList());
    }

    @PatchMapping("/applications/{applicationId}/status")
    @Transactional
    public ResponseEntity<SubjectApplicationResponse> updateApplicationStatus(
            @PathVariable UUID applicationId,
            @RequestParam SubjectApplicationStatus status,
            @RequestHeader(value = "X-User-Id", required = false) String teacherId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        String normalizedRole = normalizeRole(userRole);
        if (normalizedRole != null && !"TEACHER".equals(normalizedRole)) {
            throw new ForbiddenException("Only a teacher can review subject applications.");
        }

        SubjectApplication application = subjectApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Subject application not found: " + applicationId));
        Subject subject = application.getSubject();
        if (!isAccepted(subject.getStatus())) {
            throw new BadRequestException("Applications can be accepted only after coordinator subject approval.");
        }
        if (teacherId != null && !teacherId.isBlank() && subject.getTeacherId() != null
                && !teacherId.equals(subject.getTeacherId())) {
            throw new ForbiddenException("Only the teacher who created the subject can review its applications.");
        }

        application.setStatus(status);
        SubjectApplication saved = subjectApplicationRepository.save(application);
        if (status == SubjectApplicationStatus.ACCEPTED) {
            assignAcceptedStudent(subject, saved.getStudentId(), resolveTeacherId(teacherId, subject.getTeacherId()));
        }
        return ResponseEntity.ok(toApplicationDto(saved));
    }

    private SubjectResponse toDto(Subject subject) {
        return SubjectResponse.builder()
                .id(subject.getId())
                .title(subject.getTitle())
                .description(subject.getDescription())
                .technologies(subject.getTechnologies())
                .type(subject.getType())
                .status(subject.getStatus())
                .academicYear(subject.getAcademicYear())
                .teacherId(subject.getTeacherId())
                .companyName(subject.getCompanyName())
                .createdAt(subject.getCreatedAt())
                .build();
    }

    private SubjectApplicationResponse toApplicationDto(SubjectApplication application) {
        return SubjectApplicationResponse.builder()
                .id(application.getId())
                .subjectId(application.getSubject().getId())
                .subjectTitle(application.getSubject().getTitle())
                .studentId(application.getStudentId())
                .status(application.getStatus())
                .createdAt(application.getCreatedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }

    private String normalizeAcademicYear(String academicYear) {
        if (academicYear != null && !academicYear.isBlank()) {
            return academicYear;
        }
        int year = Year.now().getValue();
        return year + "-" + (year + 1);
    }

    private String normalizeRole(String userRole) {
        return userRole == null || userRole.isBlank() ? null : userRole.toUpperCase(Locale.ROOT);
    }

    private boolean isVisibleToRole(Subject subject, String userId, String userRole) {
        if ("STUDENT".equals(userRole)) {
            return isAccepted(subject.getStatus());
        }
        if ("TEACHER".equals(userRole)) {
            return isAccepted(subject.getStatus()) || (userId != null && userId.equals(subject.getTeacherId()));
        }
        return true;
    }

    private boolean isAccepted(SubjectStatus status) {
        return status == SubjectStatus.ACCEPTED || status == SubjectStatus.APPROVED;
    }

    private SubjectStatus normalizeAcceptedStatus(SubjectStatus status) {
        return status == SubjectStatus.APPROVED ? SubjectStatus.ACCEPTED : status;
    }

    private String resolveTeacherId(String headerTeacherId, String requestTeacherId) {
        if (headerTeacherId != null && !headerTeacherId.isBlank()) {
            return headerTeacherId;
        }
        return requestTeacherId;
    }

    private String resolveStudentId(String userId, SubjectApplicationRequest request) {
        if (userId != null && !userId.isBlank()) {
            return userId;
        }
        if (request != null && request.getStudentId() != null && !request.getStudentId().isBlank()) {
            return request.getStudentId();
        }
        throw new BadRequestException("studentId is required");
    }

    private void assignAcceptedStudent(Subject subject, String studentId, String teacherId) {
        Project project = projectRepository.findBySubjectId(subject.getId())
                .orElseGet(() -> projectRepository.save(Project.builder()
                        .title(subject.getTitle())
                        .description(subject.getDescription())
                        .type(subject.getType())
                        .status(ProjectStatus.IN_PROGRESS)
                        .phase(ProjectPhase.PROPOSAL)
                        .progress(0)
                        .academicYear(subject.getAcademicYear())
                        .subject(subject)
                        .requiredSkills(subject.getTechnologies() != null ? subject.getTechnologies() : new HashSet<>())
                        .build()));

        if (teacherId != null && !teacherId.isBlank()
                && projectSupervisorRepository.findByProjectIdAndTeacherId(project.getId(), teacherId).isEmpty()) {
            projectSupervisorRepository.save(ProjectSupervisor.builder()
                    .project(project)
                    .teacherId(teacherId)
                    .role(ProjectSupervisorRole.MAIN_SUPERVISOR)
                    .build());
        }

        if (projectMemberRepository.findByProjectIdAndStudentId(project.getId(), studentId).isPresent()) {
            return;
        }
        if (projectMemberRepository.existsByStudentIdAndProject_StatusIn(studentId, activeProjectStatuses())) {
            throw new BadRequestException("Student " + studentId + " already has an active project.");
        }

        projectMemberRepository.save(ProjectMember.builder()
                .project(project)
                .studentId(studentId)
                .role(ProjectMemberRole.MEMBER)
                .build());
    }

    private Set<ProjectStatus> activeProjectStatuses() {
        return Set.of(ProjectStatus.PENDING, ProjectStatus.APPROVED, ProjectStatus.IN_PROGRESS);
    }
}
