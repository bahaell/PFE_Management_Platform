package com.example.projects.service.impl;

import com.example.projects.dto.ProjectRequest;
import com.example.projects.dto.ProjectMatchingRequest;
import com.example.projects.dto.ProjectMatchingResponse;
import com.example.projects.dto.ProjectResponse;
import com.example.projects.dto.SchedulingProjectResponse;
import com.example.projects.entity.Project;
import com.example.projects.entity.ProjectStatus;
import com.example.projects.exception.BadRequestException;
import com.example.projects.exception.ForbiddenException;
import com.example.projects.exception.NotFoundException;
import com.example.projects.repository.ProjectRepository;
import com.example.projects.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    @Transactional
    public ProjectResponse createProject(ProjectRequest request, String userId, String userRole) {
        String normalizedRole = userRole != null ? userRole.trim().toUpperCase(Locale.ROOT) : "";
        validateIdentityHeaders(userId, normalizedRole);

        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .progress(request.getProgress() != null ? request.getProgress() : 0)
                .supervisorId(request.getSupervisorId())
                .studentIds(request.getStudentIds() != null ? request.getStudentIds() : new HashSet<>())
                .companyId(request.getCompanyId())
                .requiredSkills(normalizeSkills(request.getRequiredSkills()))
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        // Enforce ownership from authenticated token header, not request body.
        if (userId != null && !userId.isBlank()) {
            if ("TEACHER".equals(normalizedRole)) {
                project.setSupervisorId(userId);
            } else if ("STUDENT".equals(normalizedRole)) {
                Set<String> studentIds = project.getStudentIds();
                studentIds.add(userId);
                project.setStudentIds(studentIds);
            }
        }

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    @Transactional
    public ProjectResponse updateProject(UUID id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + id));

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setStatus(request.getStatus());
        project.setProgress(request.getProgress());
        project.setSupervisorId(request.getSupervisorId());
        project.setStudentIds(request.getStudentIds());
        project.setCompanyId(request.getCompanyId());
        project.setRequiredSkills(normalizeSkills(request.getRequiredSkills()));
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public ProjectResponse getProjectById(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + id));
        return mapToResponse(project);
    }

    @Override
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsBySupervisor(String supervisorId) {
        return projectRepository.findBySupervisorId(supervisorId).stream()
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
                        .supervisorId(project.getSupervisorId())
                        .studentIds(project.getStudentIds())
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
                            .subject(project.getTitle())
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
        projectRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ProjectResponse updateProgress(UUID id, Integer progress) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + id));
        if (progress < 0 || progress > 100) {
            throw new BadRequestException("Progress must be between 0 and 100");
        }
        project.setProgress(progress);
        return mapToResponse(projectRepository.save(project));
    }

    @Override
    @Transactional
    public ProjectResponse updateProjectStatus(UUID id, ProjectStatus newStatus, String userRole) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + id));

        // Enforce Coordinator-only validation
        if (newStatus == ProjectStatus.APPROVED && !"COORDINATOR".equalsIgnoreCase(userRole)) {
            throw new ForbiddenException("Only a Coordinator can approve/validate a project proposal.");
        }

        // State Machine validation
        validateStatusTransition(project.getStatus(), newStatus);

        project.setStatus(newStatus);
        
        // Auto-set progress if completed
        if (newStatus == ProjectStatus.COMPLETED) {
            project.setProgress(100);
        }

        return mapToResponse(projectRepository.save(project));
    }

    private void validateStatusTransition(ProjectStatus current, ProjectStatus next) {
        if (current == next) return;
        
        boolean valid = switch (current) {
            case PROPOSED -> next == ProjectStatus.APPROVED || next == ProjectStatus.CANCELLED;
            case APPROVED -> next == ProjectStatus.ASSIGNED || next == ProjectStatus.CANCELLED;
            case ASSIGNED -> next == ProjectStatus.IN_PROGRESS || next == ProjectStatus.CANCELLED;
            case IN_PROGRESS -> next == ProjectStatus.SUBMITTED || next == ProjectStatus.CANCELLED;
            case SUBMITTED -> next == ProjectStatus.COMPLETED || next == ProjectStatus.CANCELLED;
            case COMPLETED -> false; // Final state
            case CANCELLED -> false; // Final state
        };

        if (!valid) {
            throw new BadRequestException("Invalid project status transition from " + current + " to " + next);
        }
    }

    private ProjectResponse mapToResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .subject(project.getTitle())
                .description(project.getDescription())
                .status(project.getStatus())
                .progress(project.getProgress())
                .supervisorId(project.getSupervisorId())
                .studentIds(project.getStudentIds())
                .companyId(project.getCompanyId())
                .requiredSkills(project.getRequiredSkills())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }

    private Set<String> extractSkillsFromProject(Project project) {
        if (project.getRequiredSkills() != null && !project.getRequiredSkills().isEmpty()) {
            return normalizeSkills(project.getRequiredSkills());
        }
        Set<String> skills = new java.util.HashSet<>();
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
        if (skills == null) return new HashSet<>();
        return skills.stream()
                .filter(skill -> skill != null && !skill.isBlank())
                .map(String::trim)
                .collect(Collectors.toCollection(HashSet::new));
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
