package com.example.projects.dto;

import com.example.projects.entity.ProjectDocumentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDocumentResponse {
    private UUID id;
    private UUID projectId;
    private String title;
    private String description;
    private String fileUrl;
    private String fileType;
    private Integer version;
    private String uploadedBy;
    private ProjectDocumentStatus status;
    private LocalDateTime createdAt;
}
