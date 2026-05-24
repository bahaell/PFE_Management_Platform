package com.example.projects.dto;

import com.example.projects.entity.ProjectType;
import com.example.projects.entity.SubjectStatus;
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
public class SubjectResponse {
    private UUID id;
    private String title;
    private String description;
    private Set<String> technologies;
    private ProjectType type;
    private SubjectStatus status;
    private String academicYear;
    private String teacherId;
    private String companyName;
    private LocalDateTime createdAt;
}
