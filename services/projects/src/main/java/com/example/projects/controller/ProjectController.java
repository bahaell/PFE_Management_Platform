package com.example.projects.controller;

import com.example.projects.dto.ProjectRequest;
import com.example.projects.dto.ProjectMemberRequest;
import com.example.projects.dto.ProjectMemberResponse;
import com.example.projects.dto.ProjectMatchingRequest;
import com.example.projects.dto.ProjectMatchingResponse;
import com.example.projects.dto.ProjectResponse;
import com.example.projects.dto.ProjectSupervisorRequest;
import com.example.projects.dto.ProjectSupervisorResponse;
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
    public ResponseEntity<ProjectResponse> getProjectById(
            @PathVariable UUID id,
            @RequestHeader(value = "X-User-Id", required = false) String userId,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(projectService.getProjectById(id, userId, userRole));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects(
            @RequestParam(required = false) ProjectStatus status) {
        if (status != null) {
            return ResponseEntity.ok(projectService.getProjectsByStatus(status));
        }
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

    @GetMapping("/supervisor/{teacherId}")
    public ResponseEntity<List<ProjectResponse>> getProjectsBySupervisor(@PathVariable String teacherId) {
        return ResponseEntity.ok(projectService.getProjectsBySupervisor(teacherId));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ProjectResponse>> getProjectsByStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(projectService.getProjectsByStudentId(studentId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProjectResponse>> getProjectsByStatus(@PathVariable ProjectStatus status) {
        return ResponseEntity.ok(projectService.getProjectsByStatus(status));
    }

    @GetMapping("/scheduling-candidates")
    public ResponseEntity<List<SchedulingProjectResponse>> getSchedulingCandidates(
            @RequestParam(defaultValue = "IN_PROGRESS") ProjectStatus status) {
        return ResponseEntity.ok(projectService.getSchedulingCandidates(status));
    }

    @PostMapping("/matching")
    public ResponseEntity<List<ProjectMatchingResponse>> getProjectMatching(
            @Valid @RequestBody ProjectMatchingRequest request) {
        return ResponseEntity.ok(projectService.calculateProjectMatching(request));
    }

    @PutMapping("/{id}/progress/internal")
    public ResponseEntity<ProjectResponse> updateProgressInternal(
            @PathVariable UUID id,
            @RequestParam Integer progress,
            @RequestHeader(value = "X-Internal-Request", required = false) String internalRequest) {
        if (!"true".equalsIgnoreCase(internalRequest)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(projectService.updateProgressInternal(id, progress));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ProjectResponse> updateStatus(
            @PathVariable UUID id,
            @RequestParam ProjectStatus status,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        return ResponseEntity.ok(projectService.updateProjectStatus(id, status, userRole));
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<ProjectMemberResponse>> getMembers(@PathVariable UUID id) {
        return ResponseEntity.ok(projectService.getMembers(id));
    }

    @PostMapping("/{id}/members")
    public ResponseEntity<ProjectMemberResponse> addMember(
            @PathVariable UUID id,
            @Valid @RequestBody ProjectMemberRequest request) {
        return new ResponseEntity<>(projectService.addMember(id, request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}/supervisors")
    public ResponseEntity<List<ProjectSupervisorResponse>> getSupervisors(@PathVariable UUID id) {
        return ResponseEntity.ok(projectService.getSupervisors(id));
    }

    @PostMapping("/{id}/supervisors")
    public ResponseEntity<ProjectSupervisorResponse> addSupervisor(
            @PathVariable UUID id,
            @Valid @RequestBody ProjectSupervisorRequest request) {
        return new ResponseEntity<>(projectService.addSupervisor(id, request), HttpStatus.CREATED);
    }
}
