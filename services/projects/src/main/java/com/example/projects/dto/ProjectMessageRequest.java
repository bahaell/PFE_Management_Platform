package com.example.projects.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMessageRequest {
    @NotBlank(message = "authorId is required")
    private String authorId;
    private String authorName;
    private String authorRole;
    @NotBlank(message = "content is required")
    private String content;
}
