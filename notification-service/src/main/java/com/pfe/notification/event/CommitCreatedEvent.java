package com.pfe.notification.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommitCreatedEvent {

    private String projectId;
    private String studentId;
    private String teacherName;
    private String message;
    private String timestamp;
}
