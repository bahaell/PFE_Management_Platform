package com.example.projects.dto;

import com.example.projects.entity.ProjectSupervisorRole;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectSupervisorRequest {
    @NotBlank
    private String teacherId;
    private ProjectSupervisorRole role;
}
