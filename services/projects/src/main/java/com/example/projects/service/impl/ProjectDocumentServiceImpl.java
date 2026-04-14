package com.example.projects.service.impl;

import com.example.projects.dto.ProjectDocumentRequest;
import com.example.projects.dto.ProjectDocumentResponse;
import com.example.projects.entity.Project;
import com.example.projects.entity.ProjectDocument;
import com.example.projects.repository.ProjectDocumentRepository;
import com.example.projects.repository.ProjectRepository;
import com.example.projects.service.ProjectDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectDocumentServiceImpl implements ProjectDocumentService {

    private final ProjectDocumentRepository documentRepository;
    private final ProjectRepository projectRepository;

    @Override
    @Transactional
    public ProjectDocumentResponse uploadDocument(ProjectDocumentRequest request) {
        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + request.getProjectId()));

        ProjectDocument document = ProjectDocument.builder()
                .name(request.getName())
                .uploadedBy(request.getUploadedBy())
                .size(request.getSize())
                .contentType(request.getContentType())
                .fileUrl(request.getFileUrl())
                .project(project)
                .version(1)
                .build();

        return mapToResponse(documentRepository.save(document));
    }

    @Override
    public ProjectDocumentResponse getDocumentById(UUID id) {
        return documentRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new RuntimeException("Document not found"));
    }

    @Override
    public List<ProjectDocumentResponse> getDocumentsByProject(UUID projectId) {
        return documentRepository.findByProjectId(projectId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteDocument(UUID id) {
        documentRepository.deleteById(id);
    }

    private ProjectDocumentResponse mapToResponse(ProjectDocument document) {
        return ProjectDocumentResponse.builder()
                .id(document.getId())
                .name(document.getName())
                .version(document.getVersion())
                .uploadedBy(document.getUploadedBy())
                .uploadedAt(document.getUploadedAt())
                .size(document.getSize())
                .contentType(document.getContentType())
                .fileUrl(document.getFileUrl())
                .projectId(document.getProject().getId())
                .build();
    }
}
