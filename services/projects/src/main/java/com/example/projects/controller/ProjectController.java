package com.example.projects.controller;

import com.example.projects.dto.ProjectRequest;
import com.example.projects.dto.ProjectMatchingRequest;
import com.example.projects.dto.ProjectMatchingResponse;
import com.example.projects.dto.ProjectResponse;
import com.example.projects.dto.SchedulingProjectResponse;
import com.example.projects.entity.ProjectStatus;
import com.example.projects.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @Valid @RequestBody ProjectRequest request,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return new ResponseEntity<>(projectService.createProject(request, userId, userRole), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable UUID id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> updateProject(
            @PathVariable UUID id,
            @Valid @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(projectService.updateProject(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/supervisor/{supervisorId}")
    public ResponseEntity<List<ProjectResponse>> getProjectsBySupervisor(@PathVariable String supervisorId) {
        return ResponseEntity.ok(projectService.getProjectsBySupervisor(supervisorId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProjectResponse>> getProjectsByStatus(@PathVariable ProjectStatus status) {
        return ResponseEntity.ok(projectService.getProjectsByStatus(status));
    }

    @GetMapping("/scheduling-candidates")
    public ResponseEntity<List<SchedulingProjectResponse>> getSchedulingCandidates(
            @RequestParam(defaultValue = "SUBMITTED") ProjectStatus status) {
        return ResponseEntity.ok(projectService.getSchedulingCandidates(status));
    }

    @PostMapping("/matching")
    public ResponseEntity<List<ProjectMatchingResponse>> getProjectMatching(
            @Valid @RequestBody ProjectMatchingRequest request) {
        return ResponseEntity.ok(projectService.calculateProjectMatching(request));
    }

    @PatchMapping("/{id}/progress")
    public ResponseEntity<ProjectResponse> updateProgress(
            @PathVariable UUID id,
            @RequestParam Integer progress) {
        return ResponseEntity.ok(projectService.updateProgress(id, progress));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ProjectResponse> updateStatus(
            @PathVariable UUID id,
            @RequestParam ProjectStatus status,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(projectService.updateProjectStatus(id, status, userRole));
    }
}
