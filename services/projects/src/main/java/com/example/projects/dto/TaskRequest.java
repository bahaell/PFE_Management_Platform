package com.example.projects.dto;

import com.example.projects.entity.TaskPriority;
import com.example.projects.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class TaskRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Status is required")
    private TaskStatus status;
    
    @NotNull(message = "Priority is required")
    private TaskPriority priority;
    
    private UUID assigneeId;
    
    private LocalDateTime dueDate;
    
    @NotNull(message = "Project ID is required")
    private UUID projectId;
}
