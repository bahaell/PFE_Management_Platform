package com.example.projects.service;

import com.example.projects.dto.ProjectDocumentRequest;
import com.example.projects.dto.ProjectDocumentResponse;

import java.util.List;
import java.util.UUID;

public interface ProjectDocumentService {
    ProjectDocumentResponse uploadDocument(ProjectDocumentRequest request);
    ProjectDocumentResponse getDocumentById(UUID id);
    List<ProjectDocumentResponse> getDocumentsByProject(UUID projectId);
    void deleteDocument(UUID id);
}
