package com.example.projects.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectMatchingResponse {
    private UUID projectId;
    private String title;
    private String description;
    private String subject;
    private Set<String> requiredSkills;
    private Set<String> matchedSkills;
    private Integer matchScore;
}
