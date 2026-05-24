package com.example.projects.dto;

import com.example.projects.entity.ProjectType;
import com.example.projects.entity.SubjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubjectRequest {
    @NotBlank
    private String title;
    private String description;
    private Set<String> technologies;
    @NotNull
    private ProjectType type;
    private SubjectStatus status;
    private String academicYear;
    private String teacherId;
    private String companyName;
}
