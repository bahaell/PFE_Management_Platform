package com.pfe.scheduling.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PendingRequestDto {
    private Long id; // null on create
    private String projectId;
    private String projectName;
    private String studentName;
    private String assignedTeacherName;
    private String dateRangeFrom;
    private String dateRangeTo;
    private String priority; // "low" | "medium" | "high"
}