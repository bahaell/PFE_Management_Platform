package com.example.projects.dto;

import com.example.projects.entity.ProjectStatus;
import com.example.projects.entity.ProjectPhase;
import com.example.projects.entity.ProjectType;
import jakarta.validation.constraints.NotBlank;
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

    private ProjectStatus status;
    private ProjectType type;
    private ProjectPhase phase;
    private String academicYear;
    private UUID subjectId;

    private String companyId;
    private String companyName;
    private String companyDescription;
    private String companyEmail;
    private String companyPhone;
    private String companyCountry;
    private String companyCity;

    private Set<String> requiredSkills;
    
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
