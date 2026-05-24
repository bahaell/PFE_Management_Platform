package com.example.projects.dto;

import com.example.projects.entity.SubjectApplicationStatus;
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
public class SubjectApplicationResponse {
    private UUID id;
    private UUID subjectId;
    private String subjectTitle;
    private String studentId;
    private SubjectApplicationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
