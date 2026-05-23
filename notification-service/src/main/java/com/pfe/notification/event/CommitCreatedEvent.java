package com.pfe.notification.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CommitCreatedEvent extends BaseEvent {
    private String projectId;
    private String studentId;
    private String supervisorId;
    private String teacherName;
    private String commitTitle;
    private String message;
}
