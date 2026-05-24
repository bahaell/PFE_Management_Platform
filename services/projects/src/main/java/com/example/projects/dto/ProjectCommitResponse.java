package com.example.projects.dto;

import com.example.projects.entity.ProjectPhase;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectCommitResponse {
    private UUID id;
    private UUID projectId;
    private UUID documentId;
    private String teacherId;
    private String comment;
    private Integer previousProgress;
    private Integer newProgress;
    private ProjectPhase previousPhase;
    private ProjectPhase newPhase;
    private List<CommitAttachmentResponse> attachments;
    private LocalDateTime createdAt;
}
