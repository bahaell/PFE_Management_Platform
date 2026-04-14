package com.example.projects.controller;

import com.example.projects.dto.ProjectDocumentRequest;
import com.example.projects.dto.ProjectDocumentResponse;
import com.example.projects.service.ProjectDocumentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class ProjectDocumentController {

    private final ProjectDocumentService documentService;

    @PostMapping
    public ResponseEntity<ProjectDocumentResponse> uploadDocument(@Valid @RequestBody ProjectDocumentRequest request) {
        return new ResponseEntity<>(documentService.uploadDocument(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDocumentResponse> getDocumentById(@PathVariable UUID id) {
        return ResponseEntity.ok(documentService.getDocumentById(id));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ProjectDocumentResponse>> getDocumentsByProject(@PathVariable UUID projectId) {
        return ResponseEntity.ok(documentService.getDocumentsByProject(projectId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable UUID id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}
