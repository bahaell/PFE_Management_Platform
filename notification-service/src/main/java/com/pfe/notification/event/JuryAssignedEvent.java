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
public class JuryAssignedEvent extends BaseEvent {
    private String defenseId;
    private String juryMemberId;
    private String juryMemberName;
    private String studentName;
    private String projectTitle;
    private String scheduledDate;
}
