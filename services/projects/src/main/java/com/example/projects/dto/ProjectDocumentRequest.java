package com.example.projects.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDocumentRequest {
    
    @NotBlank(message = "Document name is required")
    private String name;
    
    @NotNull(message = "Uploader ID is required")
    private UUID uploadedBy;
    
    private Long size;
    private String contentType;
    private String fileUrl;
    
    @NotNull(message = "Project ID is required")
    private UUID projectId;
}
