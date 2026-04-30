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
public class SubjectApplicationCreatedEvent extends BaseEvent {
    private String studentId;
    private String studentName;
    private String supervisorId;
    private String subjectTitle;
    private String applicationId;
}
