package com.example.projects.dto;

import com.example.projects.entity.ExternalSubjectStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExternalSubjectRequestDto {
    @NotBlank(message = "studentName is required")
    private String studentName;

    private String teacherId;
    private String teacherName;
    private ExternalSubjectStatus status;

    @NotBlank(message = "subjectTitle is required")
    private String subjectTitle;
    private String subjectDescription;
    private String motivation;

    @NotBlank(message = "companyId is required")
    private String companyId;
    @NotBlank(message = "companyName is required")
    private String companyName;
    private String companyDescription;

    @NotBlank(message = "companyPhone is required")
    private String companyPhone;
    @NotBlank(message = "companyEmail is required")
    private String companyEmail;
    @NotBlank(message = "companySupervisorName is required")
    private String companySupervisorName;
    @NotBlank(message = "companySupervisorEmail is required")
    private String companySupervisorEmail;
}
