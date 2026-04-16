package com.example.projects.service.impl;

import com.example.projects.dto.ProjectRequest;
import com.example.projects.dto.ProjectResponse;
import com.example.projects.entity.Project;
import com.example.projects.entity.ProjectStatus;
import com.example.projects.repository.ProjectRepository;
import com.example.projects.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    @Transactional
    public ProjectResponse createProject(ProjectRequest request) {
        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .progress(request.getProgress() != null ? request.getProgress() : 0)
                .supervisorId(request.getSupervisorId())
                .studentIds(request.getStudentIds())
                .companyId(request.getCompanyId())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    @Transactional
    public ProjectResponse updateProject(UUID id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setStatus(request.getStatus());
        project.setProgress(request.getProgress());
        project.setSupervisorId(request.getSupervisorId());
        project.setStudentIds(request.getStudentIds());
        project.setCompanyId(request.getCompanyId());
        project.setStartDate(request.getStartDate());
        project.setEndDate(request.getEndDate());

        return mapToResponse(projectRepository.save(project));
    }

    @Override
    public ProjectResponse getProjectById(UUID id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        return mapToResponse(project);
    }

    @Override
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProjectResponse> getProjectsBySupervisor(UUID supervisorId) {
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
    @Transactional
    public void deleteProject(UUID id) {
        projectRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ProjectResponse updateProgress(UUID id, Integer progress) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        project.setProgress(progress);
        return mapToResponse(projectRepository.save(project));
    }

    @Override
    @Transactional
    public ProjectResponse updateProjectStatus(UUID id, ProjectStatus newStatus, String userRole) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        // Enforce Coordinator-only validation
        if (newStatus == ProjectStatus.APPROVED && !"COORDINATOR".equalsIgnoreCase(userRole)) {
            throw new RuntimeException("Only a Coordinator can approve/validate a project proposal.");
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
            throw new RuntimeException("Invalid project status transition from " + current + " to " + next);
        }
    }

    private ProjectResponse mapToResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .status(project.getStatus())
                .progress(project.getProgress())
                .supervisorId(project.getSupervisorId())
                .studentIds(project.getStudentIds())
                .companyId(project.getCompanyId())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
