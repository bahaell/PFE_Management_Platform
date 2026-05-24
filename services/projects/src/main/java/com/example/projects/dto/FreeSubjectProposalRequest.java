package com.example.projects.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FreeSubjectProposalRequest {
    private String studentId;
    @NotBlank
    private String title;
    private String description;
    @NotBlank
    private String companyName;
    private Set<String> technologies;
    private String preferredSupervisorId;
    private String academicYear;
}
