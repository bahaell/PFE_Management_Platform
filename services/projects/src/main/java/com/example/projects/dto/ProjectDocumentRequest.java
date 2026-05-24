package com.example.projects.dto;

import com.example.projects.entity.ProjectDocumentStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDocumentRequest {
    @NotBlank
    private String title;
    private String description;
    @NotBlank
    private String fileUrl;
    private String fileType;
    private Integer version;
    @NotBlank
    private String uploadedBy;
    private ProjectDocumentStatus status;
}
