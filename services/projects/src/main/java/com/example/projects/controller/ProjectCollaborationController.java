package com.example.projects.controller;

import com.example.projects.dto.ActivityResponse;
import com.example.projects.dto.ProjectMessageRequest;
import com.example.projects.dto.ProjectMessageResponse;
import com.example.projects.entity.Project;
import com.example.projects.entity.ProjectActivity;
import com.example.projects.entity.ProjectMessage;
import com.example.projects.exception.NotFoundException;
import com.example.projects.repository.ProjectActivityRepository;
import com.example.projects.repository.ProjectMessageRepository;
import com.example.projects.repository.ProjectRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects/{projectId}")
@RequiredArgsConstructor
public class ProjectCollaborationController {

    private final ProjectRepository projectRepository;
    private final ProjectMessageRepository messageRepository;
    private final ProjectActivityRepository activityRepository;

    @PostMapping("/messages")
    public ResponseEntity<ProjectMessageResponse> createMessage(
            @PathVariable UUID projectId,
            @Valid @RequestBody ProjectMessageRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + projectId));

        ProjectMessage message = ProjectMessage.builder()
                .project(project)
                .authorId(request.getAuthorId())
                .authorName(request.getAuthorName())
                .authorRole(request.getAuthorRole())
                .content(request.getContent())
                .build();
        ProjectMessage saved = messageRepository.save(message);

        ProjectActivity activity = ProjectActivity.builder()
                .project(project)
                .type("message")
                .action("New message posted")
                .authorId(request.getAuthorId())
                .build();
        activityRepository.save(activity);

        return new ResponseEntity<>(mapMessage(saved), HttpStatus.CREATED);
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ProjectMessageResponse>> getMessages(
            @PathVariable UUID projectId,
            @RequestParam(defaultValue = "50") int limit) {
        return ResponseEntity.ok(
                messageRepository.findByProjectIdOrderByCreatedAtDesc(projectId, PageRequest.of(0, limit))
                        .stream()
                        .map(this::mapMessage)
                        .toList()
        );
    }

    @GetMapping("/activities")
    public ResponseEntity<List<ActivityResponse>> getActivities(
            @PathVariable UUID projectId,
            @RequestParam(defaultValue = "50") int limit) {
        return ResponseEntity.ok(
                activityRepository.findByProjectIdOrderByTimestampDesc(projectId, PageRequest.of(0, limit))
                        .stream()
                        .map(this::mapActivity)
                        .toList()
        );
    }

    private ProjectMessageResponse mapMessage(ProjectMessage message) {
        return ProjectMessageResponse.builder()
                .id(message.getId())
                .projectId(message.getProject().getId())
                .authorId(message.getAuthorId())
                .authorName(message.getAuthorName())
                .authorRole(message.getAuthorRole())
                .content(message.getContent())
                .createdAt(message.getCreatedAt())
                .updatedAt(message.getUpdatedAt())
                .build();
    }

    private ActivityResponse mapActivity(ProjectActivity activity) {
        return ActivityResponse.builder()
                .id(activity.getId())
                .projectId(activity.getProject().getId())
                .authorId(activity.getAuthorId())
                .type(activity.getType())
                .action(activity.getAction())
                .timestamp(activity.getTimestamp())
                .build();
    }
}
