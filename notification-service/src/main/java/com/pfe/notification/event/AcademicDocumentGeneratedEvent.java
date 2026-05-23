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
public class AcademicDocumentGeneratedEvent extends BaseEvent {
    private String documentId;
    private String documentType; // ATTESTATION, RAPPORT, CONVENTION
    private String studentId;
    private String studentName;
    private String downloadUrl;
}
