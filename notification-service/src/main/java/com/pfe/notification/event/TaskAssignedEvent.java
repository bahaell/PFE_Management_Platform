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
public class TaskAssignedEvent extends BaseEvent {
    private String taskId;
    private String taskTitle;
    private String assignedToUserId;
    private String assignedByName;
    private String projectId;
    private String deadline;
}
