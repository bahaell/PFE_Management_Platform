package com.example.projects.dto;

import com.example.projects.entity.TaskPriority;
import com.example.projects.entity.TaskStatus;
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
public class TaskResponse {
    private UUID id;
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private UUID assigneeId;
    private LocalDateTime dueDate;
    private UUID projectId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
