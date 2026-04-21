package com.example.projects.service;

import com.example.projects.dto.ProjectRequest;
import com.example.projects.dto.ProjectResponse;
import com.example.projects.dto.ProjectMatchingRequest;
import com.example.projects.dto.ProjectMatchingResponse;
import com.example.projects.dto.SchedulingProjectResponse;
import com.example.projects.entity.ProjectStatus;

import java.util.List;
import java.util.UUID;

public interface ProjectService {
    ProjectResponse createProject(ProjectRequest request, String userId, String userRole);
    ProjectResponse updateProject(UUID id, ProjectRequest request);
    ProjectResponse getProjectById(UUID id);
    List<ProjectResponse> getAllProjects();
    List<ProjectResponse> getProjectsBySupervisor(String supervisorId);
    List<ProjectResponse> getProjectsByStatus(ProjectStatus status);
    List<SchedulingProjectResponse> getSchedulingCandidates(ProjectStatus status);
    List<ProjectMatchingResponse> calculateProjectMatching(ProjectMatchingRequest request);
    void deleteProject(UUID id);
    ProjectResponse updateProgress(UUID id, Integer progress);
    ProjectResponse updateProjectStatus(UUID id, ProjectStatus status, String userRole);
}
