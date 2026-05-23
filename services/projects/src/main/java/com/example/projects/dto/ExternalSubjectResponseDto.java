package com.example.projects.dto;

import com.example.projects.entity.ExternalSubjectStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExternalSubjectResponseDto {
    private String id;
    private String studentId;
    private String studentName;
    private String teacherId;
    private String teacherName;
    private ExternalSubjectStatus status;
    private String subjectTitle;
    private String subjectDescription;
    private String motivation;
    private String companyId;
    private String companyName;
    private String companyDescription;
    private String companyPhone;
    private String companyEmail;
    private String companySupervisorName;
    private String companySupervisorEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
