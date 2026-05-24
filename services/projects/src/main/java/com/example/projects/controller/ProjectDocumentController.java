package com.example.projects.controller;

import com.example.projects.dto.CommitAttachmentResponse;
import com.example.projects.dto.ProjectCommitRequest;
import com.example.projects.dto.ProjectCommitResponse;
import com.example.projects.dto.ProjectDocumentRequest;
import com.example.projects.dto.ProjectDocumentResponse;
import com.example.projects.entity.CommitAttachment;
import com.example.projects.entity.Project;
import com.example.projects.entity.ProjectCommit;
import com.example.projects.entity.ProjectDocument;
import com.example.projects.entity.ProjectDocumentStatus;
import com.example.projects.entity.ProjectPhase;
import com.example.projects.exception.BadRequestException;
import com.example.projects.exception.ForbiddenException;
import com.example.projects.exception.NotFoundException;
import com.example.projects.repository.ProjectCommitRepository;
import com.example.projects.repository.ProjectDocumentRepository;
import com.example.projects.repository.ProjectRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectDocumentController {

    private final ProjectRepository projectRepository;
    private final ProjectDocumentRepository documentRepository;
    private final ProjectCommitRepository commitRepository;

    @GetMapping("/{projectId}/documents")
    public ResponseEntity<List<ProjectDocumentResponse>> getProjectDocuments(@PathVariable UUID projectId) {
        ensureProjectExists(projectId);
        return ResponseEntity.ok(documentRepository.findByProjectIdOrderByCreatedAtDesc(projectId).stream()
                .map(this::toDocumentDto)
                .toList());
    }

    @PostMapping("/{projectId}/documents")
    public ResponseEntity<ProjectDocumentResponse> createProjectDocument(
            @PathVariable UUID projectId,
            @Valid @RequestBody ProjectDocumentRequest request) {
        Project project = getProjectOrThrow(projectId);
        ProjectDocument document = ProjectDocument.builder()
                .project(project)
                .title(request.getTitle())
                .description(request.getDescription())
                .fileUrl(request.getFileUrl())
                .fileType(request.getFileType())
                .version(request.getVersion() != null ? request.getVersion() : Math.toIntExact(documentRepository.countByProjectId(projectId) + 1))
                .uploadedBy(request.getUploadedBy())
                .status(request.getStatus() != null ? request.getStatus() : ProjectDocumentStatus.SUBMITTED)
                .build();
        return new ResponseEntity<>(toDocumentDto(documentRepository.save(document)), HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}/commits")
    public ResponseEntity<List<ProjectCommitResponse>> getProjectCommits(@PathVariable UUID projectId) {
        ensureProjectExists(projectId);
        return ResponseEntity.ok(commitRepository.findByDocumentProjectIdOrderByCreatedAtDesc(projectId).stream()
                .map(this::toCommitDto)
                .toList());
    }

    @GetMapping("/documents/{documentId}/commits")
    public ResponseEntity<List<ProjectCommitResponse>> getDocumentCommits(@PathVariable UUID documentId) {
        ensureDocumentExists(documentId);
        return ResponseEntity.ok(commitRepository.findByDocumentIdOrderByCreatedAtDesc(documentId).stream()
                .map(this::toCommitDto)
                .toList());
    }

    @PostMapping("/documents/{documentId}/commits")
    @Transactional
    public ResponseEntity<ProjectCommitResponse> createCommit(
            @PathVariable UUID documentId,
            @Valid @RequestBody ProjectCommitRequest request,
            @RequestHeader(value = "X-User-Role", required = false) String userRole) {
        if (!"TEACHER".equalsIgnoreCase(userRole)) {
            throw new ForbiddenException("Only teachers can create official project commits.");
        }

        ProjectDocument document = getDocumentOrThrow(documentId);
        Project project = document.getProject();
        int previousProgress = project.getProgress() != null ? project.getProgress() : 0;
        ProjectPhase previousPhase = project.getPhase();
        ProjectPhase newPhase = request.getNewPhase() != null ? request.getNewPhase() : previousPhase;

        if (request.getNewProgress() < previousProgress) {
            throw new BadRequestException("Commit progress cannot decrease project progress.");
        }

        ProjectCommit commit = ProjectCommit.builder()
                .document(document)
                .teacherId(request.getTeacherId())
                .comment(request.getComment())
                .previousProgress(previousProgress)
                .newProgress(request.getNewProgress())
                .previousPhase(previousPhase)
                .newPhase(newPhase)
                .attachments(new ArrayList<>())
                .build();

        if (request.getAttachments() != null) {
            request.getAttachments().stream()
                    .filter(attachment -> attachment.getName() != null && !attachment.getName().isBlank())
                    .filter(attachment -> attachment.getUrl() != null && !attachment.getUrl().isBlank())
                    .forEach(attachment -> {
                        CommitAttachment entity = CommitAttachment.builder()
                                .commit(commit)
                                .name(attachment.getName())
                                .url(attachment.getUrl())
                                .type(attachment.getType())
                                .build();
                        commit.getAttachments().add(entity);
                    });
        }

        ProjectCommit saved = commitRepository.save(commit);
        project.setProgress(request.getNewProgress());
        project.setPhase(newPhase);
        projectRepository.save(project);

        document.setStatus(ProjectDocumentStatus.REVIEWED);
        documentRepository.save(document);

        return new ResponseEntity<>(toCommitDto(saved), HttpStatus.CREATED);
    }

    private void ensureProjectExists(UUID projectId) {
        getProjectOrThrow(projectId);
    }

    private void ensureDocumentExists(UUID documentId) {
        getDocumentOrThrow(documentId);
    }

    private Project getProjectOrThrow(UUID projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found with id: " + projectId));
    }

    private ProjectDocument getDocumentOrThrow(UUID documentId) {
        return documentRepository.findById(documentId)
                .orElseThrow(() -> new NotFoundException("Project document not found with id: " + documentId));
    }

    private ProjectDocumentResponse toDocumentDto(ProjectDocument document) {
        return ProjectDocumentResponse.builder()
                .id(document.getId())
                .projectId(document.getProject().getId())
                .title(document.getTitle())
                .description(document.getDescription())
                .fileUrl(document.getFileUrl())
                .fileType(document.getFileType())
                .version(document.getVersion())
                .uploadedBy(document.getUploadedBy())
                .status(document.getStatus())
                .createdAt(document.getCreatedAt())
                .build();
    }

    private ProjectCommitResponse toCommitDto(ProjectCommit commit) {
        return ProjectCommitResponse.builder()
                .id(commit.getId())
                .projectId(commit.getDocument().getProject().getId())
                .documentId(commit.getDocument().getId())
                .teacherId(commit.getTeacherId())
                .comment(commit.getComment())
                .previousProgress(commit.getPreviousProgress())
                .newProgress(commit.getNewProgress())
                .previousPhase(commit.getPreviousPhase())
                .newPhase(commit.getNewPhase())
                .attachments(commit.getAttachments().stream().map(this::toAttachmentDto).toList())
                .createdAt(commit.getCreatedAt())
                .build();
    }

    private CommitAttachmentResponse toAttachmentDto(CommitAttachment attachment) {
        return CommitAttachmentResponse.builder()
                .id(attachment.getId())
                .name(attachment.getName())
                .url(attachment.getUrl())
                .type(attachment.getType())
                .build();
    }
}
