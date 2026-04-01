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
public class DefenseScheduledEvent extends BaseEvent {
    private String defenseId;
    private String studentId;
    private String studentName;
    private String supervisorId;
    private String projectTitle;
    private String scheduledDate;
    private String room;
}
