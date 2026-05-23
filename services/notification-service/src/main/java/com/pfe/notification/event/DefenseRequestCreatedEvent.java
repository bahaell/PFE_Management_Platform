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
public class DefenseRequestCreatedEvent extends BaseEvent {
    private String requestId;
    private String studentId;
    private String studentName;
    private String projectTitle;
    private String adminId;
    private String preferredDate;
}
