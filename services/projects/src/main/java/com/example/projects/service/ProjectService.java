package com.example.projects.service;

import com.example.projects.dto.ProjectRequest;
import com.example.projects.dto.ProjectResponse;
import com.example.projects.entity.ProjectStatus;

import java.util.List;
import java.util.UUID;

public interface ProjectService {
    ProjectResponse createProject(ProjectRequest request);
    ProjectResponse updateProject(UUID id, ProjectRequest request);
    ProjectResponse getProjectById(UUID id);
    List<ProjectResponse> getAllProjects();
    List<ProjectResponse> getProjectsBySupervisor(UUID supervisorId);
    List<ProjectResponse> getProjectsByStatus(ProjectStatus status);
    void deleteProject(UUID id);
    ProjectResponse updateProgress(UUID id, Integer progress);
}
