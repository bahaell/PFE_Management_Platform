package com.example.projects.dto;

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
    private String name;
    private Integer version;
    private UUID uploadedBy;
    private LocalDateTime uploadedAt;
    private Long size;
    private String contentType;
    private String fileUrl;
    private UUID projectId;
}
