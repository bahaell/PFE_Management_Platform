package com.pfe.notification.messaging;

import com.pfe.notification.dto.CreateNotificationRequest;
import com.pfe.notification.dto.ParticipantDto;
import com.pfe.notification.event.*;
import com.pfe.notification.config.RabbitMQConfig;
import com.pfe.notification.model.NotificationType;
import com.pfe.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationEventConsumer {

    private final NotificationService notificationService;
    private final RestTemplate restTemplate;

    // URL du chat-service (idéalement à extraire dans application.yml via @Value)
    private final String chatServiceUrl = "http://localhost:8086/api/chat";

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
    // DEFENSE (legacy — pfe.events.exchange)
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
    // DEFENSE (nouveau — defense.exchange depuis scheduling-service)
    //
    // Le scheduling-service publie sur defense.exchange avec des routing keys :
    //   defense.created | defense.updated | defense.cancelled | defense.rescheduled
    //
    // Payload :
    //   { "defenseId": Long, "projectId": String, "academicYear": String, "status": String }
    // ─────────────────────────────────────────────────────────────────────────

    @RabbitListener(queues = RabbitMQConfig.DEFENSE_CREATED_QUEUE)
    public void handleDefenseCreated(com.pfe.notification.event.DefenseEventDto event) {
        log.info("📨 [defense.created] defenseId={} projectId={}", event.getDefenseId(), event.getProjectId());
        // Notification générique — dans une vraie architecture on interrogerait project-service pour le nom de l'étudiant
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(1L) // TODO: résoudre l'userId depuis projectId via project-service
                .type(NotificationType.DEFENSE_CREATED)
                .title("Soutenance créée")
                .message("Une soutenance pour le projet #" + event.getProjectId() + " vient d'être créée (année " + event.getAcademicYear() + ")")
                .data("{\"defenseId\":\"" + event.getDefenseId() + "\",\"projectId\":\"" + event.getProjectId() + "\"}")
                .build());
    }

    @RabbitListener(queues = RabbitMQConfig.DEFENSE_UPDATED_QUEUE)
    public void handleDefenseUpdated(com.pfe.notification.event.DefenseEventDto event) {
        log.info("📨 [defense.updated] defenseId={} status={}", event.getDefenseId(), event.getStatus());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(1L)
                .type(NotificationType.DEFENSE_UPDATED)
                .title("Soutenance mise à jour")
                .message("La soutenance #" + event.getDefenseId() + " (projet #" + event.getProjectId() + ") a été modifiée. Statut : " + event.getStatus())
                .data("{\"defenseId\":\"" + event.getDefenseId() + "\",\"status\":\"" + event.getStatus() + "\"}")
                .build());
    }

    @RabbitListener(queues = RabbitMQConfig.DEFENSE_CANCELLED_QUEUE)
    public void handleDefenceCancelled(com.pfe.notification.event.DefenseEventDto event) {
        log.info("📨 [defense.cancelled] defenseId={}", event.getDefenseId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(1L)
                .type(NotificationType.DEFENSE_CANCELLED)
                .title("⚠️ Soutenance annulée")
                .message("La soutenance #" + event.getDefenseId() + " pour le projet #" + event.getProjectId() + " a été annulée.")
                .data("{\"defenseId\":\"" + event.getDefenseId() + "\"}")
                .build());
    }

    @RabbitListener(queues = RabbitMQConfig.DEFENSE_RESCHEDULED_QUEUE)
    public void handleDefenseRescheduled(com.pfe.notification.event.DefenseEventDto event) {
        log.info("📨 [defense.rescheduled] defenseId={}", event.getDefenseId());
        notificationService.createNotification(CreateNotificationRequest.builder()
                .userId(1L)
                .type(NotificationType.DEFENSE_RESCHEDULED)
                .title("📅 Soutenance reportée")
                .message("La soutenance #" + event.getDefenseId() + " pour le projet #" + event.getProjectId() + " a été reportée. Nouveau statut : " + event.getStatus())
                .data("{\"defenseId\":\"" + event.getDefenseId() + "\",\"status\":\"" + event.getStatus() + "\"}")
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
    // CHAT MESSAGE (consommé depuis chat.exchange → chat.notification.queue)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Consomme les NewChatMessageEvent publiés par le chat-service.
     *
     * Pourquoi une queue séparée (chat.notification.queue) ?
     * → Chaque microservice consommateur doit avoir SA PROPRE queue sur l'exchange.
     * → Si 2 services partagent la même queue, un seul reçoit le message (load balancing).
     * → Avec des queues séparées, TOUS les abonnés reçoivent l'événement (pub/sub pattern).
     *
     * Protection contre les doublons (Idempotence) :
     * → Le messageId de Firestore est inclus dans le payload.
     * → Si un futur cache Redis est ajouté, on pourra vérifier ce messageId
     *    avant de créer la notification pour éviter les doublons en cas de retry.
     */
    @RabbitListener(queues = RabbitMQConfig.CHAT_NOTIFICATION_QUEUE)
    public void handleNewChatMessage(NewChatMessageEvent event) {
        log.info("💬 [chat.event.new_message] roomId={} from senderId={} messageId={}",
                event.getRoomId(), event.getSenderId(), event.getMessageId());

        // Tronquer le contenu pour le preview de notification (80 chars max)
        String preview = event.getContent() != null && event.getContent().length() > 80
                ? event.getContent().substring(0, 77) + "..."
                : event.getContent();

        // Déterminer le label du rôle de l'expéditeur
        String senderLabel = buildSenderLabel(event.getSenderRole(), event.getSenderName());

        // Construire le data payload pour que le frontend puisse naviguer vers la bonne room
        String data = "{\"messageId\":\"" + event.getMessageId() + "\","
                    + "\"roomId\":\"" + event.getRoomId() + "\","
                    + "\"projectId\":\"" + event.getProjectId() + "\"}";

        // 1. Récupérer les participants depuis chat-service via HTTP (RestTemplate)
        String url = chatServiceUrl + "/rooms/" + event.getRoomId() + "/participants";
        
        try {
            ResponseEntity<List<ParticipantDto>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<ParticipantDto>>() {}
            );

            List<ParticipantDto> participants = response.getBody();
            if (participants != null && !participants.isEmpty()) {
                log.info("📢 Récupération de {} participants pour la room {}", participants.size(), event.getRoomId());
                
                // 2. Notifier tous les membres SAUF l'expéditeur
                for (ParticipantDto participant : participants) {
                    if (!participant.getUserId().equals(event.getSenderId())) {
                        // Convert mock string IDs (std001) to numeric IDs (1, 2, 3) to match PostgreSQL schema
                        String userIdStr = participant.getUserId();
                        long numericId = 1L; // default
                        if ("std001".equals(userIdStr)) numericId = 1L;
                        else if ("tch001".equals(userIdStr)) numericId = 2L;
                        else if ("coo001".equals(userIdStr)) numericId = 3L;
                        else {
                            try { numericId = Long.parseLong(userIdStr); } catch (Exception e) {}
                        }

                        notificationService.createNotification(CreateNotificationRequest.builder()
                                .userId(numericId)
                                .type(NotificationType.NEW_MESSAGE)
                                .title("💬 " + senderLabel)
                                .message(preview)
                                .data(data)
                                .build());
                    }
                }
            }
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des participants de la room {} : {}", event.getRoomId(), e.getMessage());
        }
    }

    private String buildSenderLabel(String role, String name) {
        if (name != null && !name.isBlank()) return name;
        if ("student".equalsIgnoreCase(role)) return "Un étudiant";
        if ("teacher".equalsIgnoreCase(role)) return "Un encadreur";
        if ("coordinator".equalsIgnoreCase(role)) return "Le coordinateur";
        return "Quelqu'un";
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HELPERS
    // ─────────────────────────────────────────────────────────────────────────
    private String toData(String key, String value) {
        return "{\"" + key + "\":\"" + (value != null ? value : "") + "\"}";
    }
}
