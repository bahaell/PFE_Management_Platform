package com.example.projects.dto;

import com.example.projects.entity.ProjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    private UUID id;
    private String title;
    private String subject;
    private String description;
    private ProjectStatus status;
    private Integer progress;
    private String supervisorId;
    private Set<String> studentIds;
    private String companyId;
    private Set<String> requiredSkills;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
