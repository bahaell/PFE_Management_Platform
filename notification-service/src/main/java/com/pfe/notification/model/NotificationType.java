package com.pfe.notification.model;

public enum NotificationType {
    // Subject
    SUBJECT_APPROVED,
    SUBJECT_APPLICATION_CREATED,
    SUBJECT_APPLICATION_UPDATED,

    // Project
    PROJECT_CREATED,

    // Collaboration
    NEW_COMMIT,
    NEW_MESSAGE,
    TASK_ASSIGNED,
    TASK_UPDATED,

    // Document
    DOCUMENT_READY,
    DOCUMENT_UPLOADED,
    ACADEMIC_DOCUMENT_GENERATED,
    ACADEMIC_DOCUMENT_REQUESTED,

    // Defense
    DEFENSE_SCHEDULED,
    DEFENSE_REQUEST_CREATED,
    JURY_ASSIGNED,

    // System
    USER_CREATED,
    DEADLINE_REMINDER
}
