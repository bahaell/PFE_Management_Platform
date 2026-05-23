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
public class AcademicDocumentRequestedEvent extends BaseEvent {
    private String documentType;
    private String requestedByStudentId;
    private String studentName;
    private String adminId;
}
