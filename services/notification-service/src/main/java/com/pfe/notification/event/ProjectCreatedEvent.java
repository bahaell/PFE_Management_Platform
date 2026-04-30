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
public class ProjectCreatedEvent extends BaseEvent {
    private String projectId;
    private String projectTitle;
    private String studentId;
    private String supervisorId;
    private String supervisorName;
}
