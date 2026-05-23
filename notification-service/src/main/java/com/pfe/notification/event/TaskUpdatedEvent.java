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
public class TaskUpdatedEvent extends BaseEvent {
    private String taskId;
    private String taskTitle;
    private String updatedByName;
    private String assignedToUserId;
    private String projectId;
    private String newStatus; // IN_PROGRESS, DONE, BLOCKED
}
