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
public class DeadlineReminderEvent extends BaseEvent {
    private String targetUserId;
    private String deadlineType; // DOCUMENT_SUBMISSION, PROJECT_MILESTONE, etc.
    private String projectId;
    private String deadlineDate;
    private int daysRemaining;
}
