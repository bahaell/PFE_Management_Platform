package com.example.projects.service.impl;

import com.example.projects.dto.ProjectMatchingRequest;
import com.example.projects.dto.ProjectMatchingResponse;
import com.example.projects.dto.ProjectMemberRequest;
import com.example.projects.dto.ProjectMemberResponse;
import com.example.projects.dto.ProjectRequest;
import com.example.projects.dto.ProjectResponse;
import com.example.projects.dto.ProjectSupervisorRequest;
import com.example.projects.dto.ProjectSupervisorResponse;
import com.example.projects.dto.SchedulingProjectResponse;
import com.example.projects.entity.Company;
import com.example.projects.entity.CompanyStatus;
import com.example.projects.entity.Project;
import com.example.projects.entity.ProjectMember;
import com.example.projects.entity.ProjectMemberRole;
import com.example.projects.entity.ProjectPhase;
import com.example.projects.entity.ProjectStatus;
import com.example.projects.entity.ProjectSupervisor;
import com.example.projects.entity.ProjectSupervisorRole;
import com.example.projects.entity.ProjectType;
import com.example.projects.entity.Subject;
import com.example.projects.exception.BadRequestException;
import com.example.projects.exception.ForbiddenException;
import com.example.projects.exception.NotFoundException;
import com.example.projects.repository.CompanyRepository;
import com.example.projects.repository.ProjectMemberRepository;
import com.example.projects.repository.ProjectRepository;
import com.example.projects.repository.ProjectSupervisorRepository;
import com.example.projects.repository.SubjectRepository;
import com.example.projects.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectService {

    private static final int DEFAULT_MAX_ACTIVE_SUPERVISIONS = 5;

    private final ProjectRepository projectRepository;
    private final CompanyRepository companyRepository;
    private final SubjectRepository subjectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectSupervisorRepository projectSupervisorRepository;

    @Override
    @Transactional
    public ProjectResponse createProject(ProjectRequest request, String userId, String userRole) {
        String normalizedRole = userRole != null ? userRole.toUpperCase(Locale.ROOT) : null;
        validateIdentityHeaders(userId, normalizedRole);

        Company company = resolveCompany(request);
        Subject subject = resolveSubject(request);
        ProjectStatus initialStatus = request.getStatus() != null ? request.getStatus() : ProjectStatus.PENDING;
        if (company != null && company.getStatus() == CompanyStatus.BLACKLISTED) {
            initialStatus = ProjectStatus.REJECTED;
        }

        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .type(resolveProjectType(request, company, subject))
                .status(initialStatus)
                .phase(request.getPhase() != null ? request.getPhase() : ProjectPhase.PROPOSAL)
                .progress(0)
                .academicYear(normalizeAcademicYear(request.getAcademicYear()))
                .subject(subject)
                .company(company)
                .requiredSkills(normalizeSkills(request.getRequiredSkills()))
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        Project saved = projectRepository.save(project);

        if ("TEACHER".equals(normalizedRole)) {
            addSupervisorInternal(saved, userId, ProjectSupervisorRole.MAIN_SUPERVISOR);
        } else if ("STUDENT".equals(normalizedRole)) {
            addMemberInternal(saved, userId, ProjectMemberRole.MEMBER);
        }

        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public ProjectResponse updateProject(UUID id, ProjectRequest request) {
        Project project = getProjectOrThrow(id);

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        if (request.getType() != null) {
            project.setType(request.getType());
        }
        if (request.getStatus() != null) {
            validateStatusTransition(project.getStatus(), request.getStatus());
            project.setStatus(request.getStatus());
        }
        if (request.getPhase() != null) {
            project.setPhase(request.getPhase());
        }
        if (request.getAcademicYear() != null && !request.getAcademicYear().isBlank()) {
            project.setAcademicYear(normalizeAcademicYear(request.getAcademicYear()));
        }
        if (request.getSubjectId() != null) {
            project.setSubject(subjectRepository.findById(request.getSubjectId())
                    .orElseThrow(() -> new NotFoundException("Subject not found with id: " + request.getSubjectId())));
        }
        project.setRequiredSkills(normalizeSkills(request.getRequiredSkills()));
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public ProjectResponse getProjectById(UUID id, String userId, String userRole) {
        Project project = getProjectOrThrow(id);
        
        if ("STUDENT".equalsIgnoreCase(userRole)) {
            if (userId == null || userId.isBlank()) {
                throw new ForbiddenException("User ID is required for students");
            }
            boolean isMember = projectMemberRepository.findByProjectId(id).stream()
                    .anyMatch(member -> userId.equals(member.getStudentId()));
            if (!isMember) {
                throw new ForbiddenException("Student is not a member of this project");
            }
        }
        
        return mapToResponse(project);
    }

    @Override
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsBySupervisor(String teacherId) {
        return projectSupervisorRepository.findByTeacherId(teacherId).stream()
                .map(supervisor -> supervisor.getProject().getId())
                .collect(Collectors.toCollection(LinkedHashSet::new))
                .stream()
                .map(this::getProjectOrThrow)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByStudentId(String studentId) {
        return projectMemberRepository.findByStudentId(studentId).stream()
                .map(member -> member.getProject().getId())
                .collect(Collectors.toCollection(LinkedHashSet::new))
                .stream()
                .map(this::getProjectOrThrow)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsByStatus(ProjectStatus status) {
        return projectRepository.findByStatus(status).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<SchedulingProjectResponse> getSchedulingCandidates(ProjectStatus status) {
        return projectRepository.findByStatus(status).stream()
                .map(project -> SchedulingProjectResponse.builder()
                        .projectId(project.getId())
                        .title(project.getTitle())
                        .status(project.getStatus())
                        .mainSupervisorId(resolvePrimarySupervisorId(project))
                        .memberStudentIds(resolveStudentIds(project))
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectMatchingResponse> calculateProjectMatching(ProjectMatchingRequest request) {
        Set<String> normalizedStudentSkills = request.getStudentSkills()
                .stream()
                .filter(skill -> skill != null && !skill.isBlank())
                .map(skill -> skill.trim().toLowerCase(Locale.ROOT))
                .collect(Collectors.toSet());

        return projectRepository.findAll().stream()
                .map(project -> {
                    Set<String> requiredSkills = extractSkillsFromProject(project);
                    Set<String> normalizedRequiredSkills = requiredSkills.stream()
                            .map(skill -> skill.trim().toLowerCase(Locale.ROOT))
                            .collect(Collectors.toSet());

                    Set<String> matchedSkills = requiredSkills.stream()
                            .filter(skill -> normalizedStudentSkills.contains(skill.trim().toLowerCase(Locale.ROOT)))
                            .collect(Collectors.toSet());

                    int score = normalizedRequiredSkills.isEmpty()
                            ? 0
                            : (int) Math.round((matchedSkills.size() * 100.0) / normalizedRequiredSkills.size());

                    return ProjectMatchingResponse.builder()
                            .projectId(project.getId())
                            .title(project.getTitle())
                            .description(project.getDescription())
                            .subject(project.getSubject() != null ? project.getSubject().getTitle() : project.getTitle())
                            .requiredSkills(requiredSkills)
                            .matchedSkills(matchedSkills)
                            .matchScore(score)
                            .build();
                })
                .sorted((a, b) -> Integer.compare(b.getMatchScore(), a.getMatchScore()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteProject(UUID id) {
        getProjectOrThrow(id);
        projectMemberRepository.deleteByProjectId(id);
        projectSupervisorRepository.deleteByProjectId(id);
        projectRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ProjectResponse updateProgressInternal(UUID id, Integer progress) {
        Project project = getProjectOrThrow(id);
        if (progress == null || progress < 0 || progress > 100) {
            throw new BadRequestException("Progress must be between 0 and 100");
        }
        project.setProgress(progress);
        return mapToResponse(projectRepository.save(project));
    }

    @Override
    @Transactional
    public ProjectResponse updateProjectStatus(UUID id, ProjectStatus newStatus, String userRole) {
        Project project = getProjectOrThrow(id);

        if ((newStatus == ProjectStatus.APPROVED || newStatus == ProjectStatus.IN_PROGRESS)
                && !"COORDINATOR".equalsIgnoreCase(userRole)) {
            throw new ForbiddenException("Only a Coordinator can approve or activate a project.");
        }

        validateStatusTransition(project.getStatus(), newStatus);
        project.setStatus(newStatus);
        if (newStatus == ProjectStatus.DEFENDED) {
            project.setPhase(ProjectPhase.DEFENSE);
        }

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    @Transactional
    public ProjectMemberResponse addMember(UUID projectId, ProjectMemberRequest request) {
        Project project = getProjectOrThrow(projectId);
        ProjectMember member = addMemberInternal(project, request.getStudentId(),
                request.getRole() != null ? request.getRole() : ProjectMemberRole.MEMBER);
        return toMemberResponse(member);
    }

    @Override
    public List<ProjectMemberResponse> getMembers(UUID projectId) {
        getProjectOrThrow(projectId);
        return projectMemberRepository.findByProjectId(projectId).stream()
                .map(this::toMemberResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProjectSupervisorResponse addSupervisor(UUID projectId, ProjectSupervisorRequest request) {
        Project project = getProjectOrThrow(projectId);
        ProjectSupervisor supervisor = addSupervisorInternal(project, request.getTeacherId(),
                request.getRole() != null ? request.getRole() : ProjectSupervisorRole.CO_SUPERVISOR);
        return toSupervisorResponse(supervisor);
    }

    @Override
    public List<ProjectSupervisorResponse> getSupervisors(UUID projectId) {
        getProjectOrThrow(projectId);
        return projectSupervisorRepository.findByProjectId(projectId).stream()
                .map(this::toSupervisorResponse)
                .collect(Collectors.toList());
    }

    private Project getProjectOrThrow(UUID id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + id));
    }

    private ProjectMember addMemberInternal(Project project, String studentId, ProjectMemberRole role) {
        if (studentId == null || studentId.isBlank()) {
            throw new BadRequestException("studentId is required");
        }
        Optional<ProjectMember> existing = projectMemberRepository.findByProjectIdAndStudentId(project.getId(), studentId);
        if (existing.isPresent()) {
            return existing.get();
        }
        if (projectMemberRepository.existsByStudentIdAndProject_StatusIn(studentId, activeStatuses())) {
            throw new BadRequestException("Student " + studentId + " already has an active project.");
        }
        ProjectMember member = ProjectMember.builder()
                .project(project)
                .studentId(studentId)
                .role(role)
                .build();
        return projectMemberRepository.save(member);
    }

    private ProjectSupervisor addSupervisorInternal(Project project, String teacherId, ProjectSupervisorRole role) {
        if (teacherId == null || teacherId.isBlank()) {
            throw new BadRequestException("teacherId is required");
        }
        Optional<ProjectSupervisor> existing = projectSupervisorRepository.findByProjectIdAndTeacherId(project.getId(), teacherId);
        if (existing.isPresent()) {
            return existing.get();
        }
        long activeLoad = projectSupervisorRepository.countByTeacherIdAndProject_StatusIn(teacherId, activeStatuses());
        if (activeLoad >= DEFAULT_MAX_ACTIVE_SUPERVISIONS) {
            throw new BadRequestException("Teacher " + teacherId + " reached the supervision limit.");
        }
        ProjectSupervisor supervisor = ProjectSupervisor.builder()
                .project(project)
                .teacherId(teacherId)
                .role(role)
                .build();
        return projectSupervisorRepository.save(supervisor);
    }

    private void validateStatusTransition(ProjectStatus current, ProjectStatus next) {
        if (current == next) {
            return;
        }

        boolean valid = switch (current) {
            case PENDING -> next == ProjectStatus.APPROVED || next == ProjectStatus.REJECTED;
            case APPROVED -> next == ProjectStatus.IN_PROGRESS || next == ProjectStatus.REJECTED;
            case IN_PROGRESS -> next == ProjectStatus.DEFENDED || next == ProjectStatus.ARCHIVED;
            case DEFENDED -> next == ProjectStatus.ARCHIVED;
            case REJECTED, ARCHIVED -> false;
        };

        if (!valid) {
            throw new BadRequestException("Invalid project status transition from " + current + " to " + next);
        }
    }

    private Set<ProjectStatus> activeStatuses() {
        return Set.of(ProjectStatus.PENDING, ProjectStatus.APPROVED, ProjectStatus.IN_PROGRESS);
    }

    private ProjectResponse mapToResponse(Project project) {
        Set<ProjectMemberResponse> members = projectMemberRepository.findByProjectId(project.getId()).stream()
                .map(this::toMemberResponse)
                .collect(Collectors.toCollection(LinkedHashSet::new));
        Set<ProjectSupervisorResponse> supervisors = projectSupervisorRepository.findByProjectId(project.getId()).stream()
                .map(this::toSupervisorResponse)
                .collect(Collectors.toCollection(LinkedHashSet::new));

        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .subject(project.getSubject() != null ? project.getSubject().getTitle() : project.getTitle())
                .description(project.getDescription())
                .type(project.getType() != null ? project.getType() : ProjectType.INTERNAL)
                .status(project.getStatus())
                .phase(project.getPhase() != null ? project.getPhase() : ProjectPhase.PROPOSAL)
                .progress(project.getProgress())
                .academicYear(project.getAcademicYear() != null ? project.getAcademicYear() : normalizeAcademicYear(null))
                .subjectId(project.getSubject() != null ? project.getSubject().getId() : null)
                .members(members)
                .supervisors(supervisors)
                .companyId(project.getCompany() != null ? project.getCompany().getId().toString() : null)
                .requiredSkills(project.getRequiredSkills())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }

    private ProjectMemberResponse toMemberResponse(ProjectMember member) {
        return ProjectMemberResponse.builder()
                .id(member.getId())
                .projectId(member.getProject().getId())
                .studentId(member.getStudentId())
                .role(member.getRole())
                .joinedAt(member.getJoinedAt())
                .build();
    }

    private ProjectSupervisorResponse toSupervisorResponse(ProjectSupervisor supervisor) {
        return ProjectSupervisorResponse.builder()
                .id(supervisor.getId())
                .projectId(supervisor.getProject().getId())
                .teacherId(supervisor.getTeacherId())
                .role(supervisor.getRole())
                .build();
    }

    private Set<String> resolveStudentIds(Project project) {
        return projectMemberRepository.findByProjectId(project.getId()).stream()
                .map(ProjectMember::getStudentId)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    private String resolvePrimarySupervisorId(Project project) {
        return projectSupervisorRepository.findByProjectId(project.getId()).stream()
                .filter(supervisor -> supervisor.getRole() == ProjectSupervisorRole.MAIN_SUPERVISOR)
                .map(ProjectSupervisor::getTeacherId)
                .findFirst()
                .orElse(null);
    }

    private Set<String> extractSkillsFromProject(Project project) {
        if (project.getRequiredSkills() != null && !project.getRequiredSkills().isEmpty()) {
            return normalizeSkills(project.getRequiredSkills());
        }
        if (project.getSubject() != null && project.getSubject().getTechnologies() != null
                && !project.getSubject().getTechnologies().isEmpty()) {
            return normalizeSkills(project.getSubject().getTechnologies());
        }
        Set<String> skills = new HashSet<>();
        if (project.getTitle() != null && !project.getTitle().isBlank()) {
            for (String token : project.getTitle().split("[,\\s]+")) {
                if (!token.isBlank() && token.length() > 2) {
                    skills.add(token);
                }
            }
        }
        if (project.getDescription() != null && !project.getDescription().isBlank()) {
            for (String token : project.getDescription().split("[,\\s]+")) {
                if (!token.isBlank() && token.length() > 2) {
                    skills.add(token);
                }
            }
        }
        return skills;
    }

    private Set<String> normalizeSkills(Set<String> skills) {
        if (skills == null) {
            return new HashSet<>();
        }
        return skills.stream()
                .filter(skill -> skill != null && !skill.isBlank())
                .map(String::trim)
                .collect(Collectors.toCollection(HashSet::new));
    }

    private Subject resolveSubject(ProjectRequest request) {
        if (request.getSubjectId() == null) {
            return null;
        }
        return subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new NotFoundException("Subject not found with id: " + request.getSubjectId()));
    }

    private ProjectType resolveProjectType(ProjectRequest request, Company company, Subject subject) {
        if (request.getType() != null) {
            return request.getType();
        }
        if (subject != null) {
            return subject.getType();
        }
        return company != null ? ProjectType.EXTERNAL : ProjectType.INTERNAL;
    }

    private Company resolveCompany(ProjectRequest request) {
        if (request.getCompanyId() != null && !request.getCompanyId().isBlank()) {
            try {
                return companyRepository.findById(UUID.fromString(request.getCompanyId())).orElse(null);
            } catch (IllegalArgumentException e) {
                // Not a valid UUID.
            }
        }

        if (request.getCompanyName() != null && !request.getCompanyName().isBlank()
                && request.getCompanyEmail() != null && !request.getCompanyEmail().isBlank()) {
            Optional<Company> existing = companyRepository.findByNameAndEmail(
                    request.getCompanyName(), request.getCompanyEmail());
            if (existing.isPresent()) {
                return existing.get();
            }
        }

        if (request.getCompanyName() != null && !request.getCompanyName().isBlank()) {
            Company company = Company.builder()
                    .name(request.getCompanyName())
                    .description(request.getCompanyDescription())
                    .email(request.getCompanyEmail() != null ? request.getCompanyEmail() : "unknown@example.local")
                    .phone(request.getCompanyPhone() != null ? request.getCompanyPhone() : "N/A")
                    .country(request.getCompanyCountry())
                    .city(request.getCompanyCity())
                    .status(CompanyStatus.PENDING)
                    .build();
            return companyRepository.save(company);
        }

        return null;
    }

    private String normalizeAcademicYear(String academicYear) {
        if (academicYear != null && !academicYear.isBlank()) {
            return academicYear;
        }
        int year = Year.now().getValue();
        return year + "-" + (year + 1);
    }

    private void validateIdentityHeaders(String userId, String normalizedRole) {
        if ((userId == null || userId.isBlank()) && (normalizedRole != null && !normalizedRole.isBlank())) {
            throw new BadRequestException("X-User-Id header is required when X-User-Role is provided");
        }
        if (userId != null && !userId.isBlank() && (normalizedRole == null || normalizedRole.isBlank())) {
            throw new BadRequestException("X-User-Role header is required when X-User-Id is provided");
        }
        if (normalizedRole != null && !normalizedRole.isBlank()
                && !Set.of("TEACHER", "STUDENT", "COORDINATOR").contains(normalizedRole)) {
            throw new BadRequestException("Unsupported X-User-Role value: " + normalizedRole);
        }
    }
}
