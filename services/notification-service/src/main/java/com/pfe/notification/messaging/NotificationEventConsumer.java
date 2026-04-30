package com.pfe.notification.messaging;

import com.pfe.notification.dto.CreateNotificationRequest;
import com.pfe.notification.event.*;
import com.pfe.notification.model.NotificationType;
import com.pfe.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationEventConsumer {

    private final NotificationService notificationService;

    // ─────────────────────────────────────────────────────────────────────────
    // SUBJECT
    // ─────────────────────────────────────────────────────────────────────────

    @RabbitListener(queues = "${rabbitmq.queue.subject}")
    public void handleSubjectApplicationCreated(SubjectApplicationCreatedEvent event) {
        log.info("📨 [subject.application.created] studentId={}", event.getStudentId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getSupervisorId()))
                .type(NotificationType.SUBJECT_APPLICATION_CREATED)
                .title("New Subject Application")
                .message(event.getStudentName() + " applied for: " + event.getSubjectTitle())
                .data(toData("applicationId", event.getApplicationId()))
                .build());
    }

    @RabbitListener(queues = "${rabbitmq.queue.subject-updated}")
    public void handleSubjectApplicationUpdated(SubjectApplicationUpdatedEvent event) {
        log.info("📨 [subject.application.updated] status={}", event.getStatus());
        String msg = "APPROVED".equalsIgnoreCase(event.getStatus())
                ? "Your subject application has been approved: " + event.getSubjectTitle()
                : "Your subject application was updated to: " + event.getStatus();
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getStudentId()))
                .type(NotificationType.SUBJECT_APPLICATION_UPDATED)
                .title("Application Status Updated")
                .message(msg)
                .data(toData("status", event.getStatus()))
                .build());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PROJECT
    // ─────────────────────────────────────────────────────────────────────────

    @RabbitListener(queues = "${rabbitmq.queue.project}")
    public void handleProjectCreated(ProjectCreatedEvent event) {
        log.info("📨 [project.created] projectId={}", event.getProjectId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getStudentId()))
                .type(NotificationType.PROJECT_CREATED)
                .title("Project Created")
                .message("Your project '" + event.getProjectTitle() + "' has been created with supervisor " + event.getSupervisorName())
                .data(toData("projectId", event.getProjectId()))
                .build());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // COMMIT
    // ─────────────────────────────────────────────────────────────────────────

    @RabbitListener(queues = "${rabbitmq.queue.notification}")
    public void handleCommitCreated(CommitCreatedEvent event) {
        log.info("📨 [commit.created] projectId={}", event.getProjectId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getStudentId()))
                .type(NotificationType.NEW_COMMIT)
                .title("New Feedback Added")
                .message("Your supervisor " + event.getTeacherName() + " added feedback: " + event.getMessage())
                .data(toData("projectId", event.getProjectId()))
                .build());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // MESSAGE
    // ─────────────────────────────────────────────────────────────────────────

    @RabbitListener(queues = "${rabbitmq.queue.message}")
    public void handleMessageSent(MessageSentEvent event) {
        log.info("📨 [message.sent] from={}", event.getSenderId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getReceiverId()))
                .type(NotificationType.NEW_MESSAGE)
                .title("New Message from " + event.getSenderName())
                .message(event.getMessagePreview())
                .data(toData("conversationId", event.getConversationId()))
                .build());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TASK
    // ─────────────────────────────────────────────────────────────────────────

    @RabbitListener(queues = "${rabbitmq.queue.task-assigned}")
    public void handleTaskAssigned(TaskAssignedEvent event) {
        log.info("📨 [task.assigned] taskId={}", event.getTaskId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getAssignedToUserId()))
                .type(NotificationType.TASK_ASSIGNED)
                .title("New Task Assigned")
                .message(event.getAssignedByName() + " assigned you a task: " + event.getTaskTitle())
                .data(toData("taskId", event.getTaskId()))
                .build());
    }

    @RabbitListener(queues = "${rabbitmq.queue.task-updated}")
    public void handleTaskUpdated(TaskUpdatedEvent event) {
        log.info("📨 [task.updated] taskId={}", event.getTaskId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getAssignedToUserId()))
                .type(NotificationType.TASK_UPDATED)
                .title("Task Updated")
                .message("Task '" + event.getTaskTitle() + "' status changed to " + event.getNewStatus())
                .data(toData("taskId", event.getTaskId()))
                .build());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DOCUMENT
    // ─────────────────────────────────────────────────────────────────────────

    @RabbitListener(queues = "${rabbitmq.queue.document-uploaded}")
    public void handleDocumentUploaded(DocumentUploadedEvent event) {
        log.info("📨 [document.uploaded] documentId={}", event.getDocumentId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getSupervisorId()))
                .type(NotificationType.DOCUMENT_UPLOADED)
                .title("New Document Uploaded")
                .message(event.getUploadedByName() + " uploaded: " + event.getDocumentName())
                .data(toData("documentId", event.getDocumentId()))
                .build());
    }

    @RabbitListener(queues = "${rabbitmq.queue.doc-generated}")
    public void handleAcademicDocumentGenerated(AcademicDocumentGeneratedEvent event) {
        log.info("📨 [academic.document.generated] studentId={}", event.getStudentId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getStudentId()))
                .type(NotificationType.ACADEMIC_DOCUMENT_GENERATED)
                .title("Your Document is Ready")
                .message("Your " + event.getDocumentType() + " has been generated and is ready to download.")
                .data(toData("downloadUrl", event.getDownloadUrl()))
                .build());
    }

    @RabbitListener(queues = "${rabbitmq.queue.doc-requested}")
    public void handleAcademicDocumentRequested(AcademicDocumentRequestedEvent event) {
        log.info("📨 [academic.document.requested] studentId={}", event.getRequestedByStudentId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getAdminId()))
                .type(NotificationType.ACADEMIC_DOCUMENT_REQUESTED)
                .title("Document Request")
                .message(event.getStudentName() + " requested a " + event.getDocumentType())
                .data(toData("studentId", event.getRequestedByStudentId()))
                .build());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // DEFENSE
    // ─────────────────────────────────────────────────────────────────────────

    @RabbitListener(queues = "${rabbitmq.queue.defense-request}")
    public void handleDefenseRequestCreated(DefenseRequestCreatedEvent event) {
        log.info("📨 [defense.request.created] studentId={}", event.getStudentId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getAdminId()))
                .type(NotificationType.DEFENSE_REQUEST_CREATED)
                .title("Defense Request Received")
                .message(event.getStudentName() + " requested a defense for: " + event.getProjectTitle())
                .data(toData("requestId", event.getRequestId()))
                .build());
    }

    @RabbitListener(queues = "${rabbitmq.queue.defense-scheduled}")
    public void handleDefenseScheduled(DefenseScheduledEvent event) {
        log.info("📨 [defense.scheduled] studentId={}", event.getStudentId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getStudentId()))
                .type(NotificationType.DEFENSE_SCHEDULED)
                .title("Your Defense Has Been Scheduled")
                .message("Your defense for '" + event.getProjectTitle() + "' is scheduled on " + event.getScheduledDate() + " in room " + event.getRoom())
                .data(toData("defenseId", event.getDefenseId()))
                .build());
    }

    @RabbitListener(queues = "${rabbitmq.queue.jury}")
    public void handleJuryAssigned(JuryAssignedEvent event) {
        log.info("📨 [jury.assigned] juryMemberId={}", event.getJuryMemberId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getJuryMemberId()))
                .type(NotificationType.JURY_ASSIGNED)
                .title("Jury Assignment")
                .message("You have been assigned as jury for " + event.getStudentName() + "'s defense on " + event.getScheduledDate())
                .data(toData("defenseId", event.getDefenseId()))
                .build());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SYSTEM
    // ─────────────────────────────────────────────────────────────────────────

    @RabbitListener(queues = "${rabbitmq.queue.user}")
    public void handleUserCreated(UserCreatedEvent event) {
        log.info("📨 [user.created] userId={}", event.getUserId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getUserId()))
                .type(NotificationType.USER_CREATED)
                .title("Welcome to PFE Platform!")
                .message("Hello " + event.getFullName() + ", your account has been created successfully.")
                .data(toData("role", event.getRole()))
                .build());
    }

    @RabbitListener(queues = "${rabbitmq.queue.deadline}")
    public void handleDeadlineReminder(DeadlineReminderEvent event) {
        log.info("📨 [deadline.reminder] userId={}", event.getTargetUserId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(Long.parseLong(event.getTargetUserId()))
                .type(NotificationType.DEADLINE_REMINDER)
                .title("⏰ Deadline Reminder")
                .message("You have " + event.getDaysRemaining() + " day(s) left for: " + event.getDeadlineType())
                .data(toData("projectId", event.getProjectId()))
                .build());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────────────────────────────────
    private String toData(String key, String value) {
        return "{\"" + key + "\":\"" + (value != null ? value : "") + "\"}";
    }
}
