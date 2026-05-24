package com.example.projects.dto;

import com.example.projects.entity.FreeSubjectProposalStatus;
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
public class FreeSubjectProposalResponse {
    private UUID id;
    private String studentId;
    private String title;
    private String description;
    private String companyName;
    private Set<String> technologies;
    private String preferredSupervisorId;
    private FreeSubjectProposalStatus status;
    private String academicYear;
    private UUID projectId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
