package com.example.projects.dto;

import com.example.projects.entity.ProjectMemberRole;
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
public class ProjectMemberResponse {
    private UUID id;
    private UUID projectId;
    private String studentId;
    private ProjectMemberRole role;
    private LocalDateTime joinedAt;
}
