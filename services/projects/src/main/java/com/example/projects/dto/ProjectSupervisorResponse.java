package com.example.projects.dto;

import com.example.projects.entity.ProjectSupervisorRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectSupervisorResponse {
    private UUID id;
    private UUID projectId;
    private String teacherId;
    private ProjectSupervisorRole role;
}
