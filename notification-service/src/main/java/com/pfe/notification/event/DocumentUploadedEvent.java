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
public class DocumentUploadedEvent extends BaseEvent {
    private String documentId;
    private String documentName;
    private String uploadedByUserId;
    private String uploadedByName;
    private String projectId;
    private String supervisorId;
}
