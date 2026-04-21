package com.example.projects.dto;

import com.example.projects.entity.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingProjectResponse {
    private UUID projectId;
    private String title;
    private ProjectStatus status;
    private String supervisorId;
    private Set<String> studentIds;
}
