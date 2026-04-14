package com.example.projects.dto;

import com.example.projects.entity.ProjectStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class ProjectRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Status is required")
    private ProjectStatus status;

    @Min(0)
    @Max(100)
    private Integer progress;

    private UUID supervisorId;
    private Set<UUID> studentIds;
    private UUID companyId;
    
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
