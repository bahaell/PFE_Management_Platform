package com.example.projects.dto;

import com.example.projects.entity.ProjectMemberRole;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMemberRequest {
    @NotBlank
    private String studentId;
    private ProjectMemberRole role;
}
