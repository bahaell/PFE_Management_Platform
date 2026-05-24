package com.example.projects.dto;

import com.example.projects.entity.ProjectPhase;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectCommitRequest {
    @NotBlank
    private String teacherId;
    @NotBlank
    private String comment;
    @NotNull
    @Min(0)
    @Max(100)
    private Integer newProgress;
    private ProjectPhase newPhase;
    private List<CommitAttachmentRequest> attachments;
}
