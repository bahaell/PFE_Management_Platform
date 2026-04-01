package com.pfe.notification.messaging;

import com.pfe.notification.dto.CreateNotificationRequest;
import com.pfe.notification.event.CommitCreatedEvent;
import com.pfe.notification.model.NotificationType;
import com.pfe.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationEventConsumer {

    private final NotificationService notificationService;

    @RabbitListener(queues = "${rabbitmq.queue.notification}")
    public void handleCommitCreatedEvent(CommitCreatedEvent event) {
        log.info("📨 Received CommitCreatedEvent: projectId={}, studentId={}, teacher={}",
                event.getProjectId(), event.getStudentId(), event.getTeacherName());

        try {
            CreateNotificationRequest request = mapEventToNotification(event);
            notificationService.createNotification(request);
            log.info("✅ Notification created successfully for studentId={}", event.getStudentId());
        } catch (Exception e) {
            log.error("❌ Failed to process CommitCreatedEvent for studentId={}: {}",
                    event.getStudentId(), e.getMessage(), e);
            throw e; // re-throw so RabbitMQ retry mechanism kicks in
        }
    }

    private CreateNotificationRequest mapEventToNotification(CommitCreatedEvent event) {
        CreateNotificationRequest request = new CreateNotificationRequest();
        request.setUserId(Long.parseLong(event.getStudentId()));
        request.setType(NotificationType.NEW_COMMIT);
        request.setTitle("New Commit Added");
        request.setMessage(event.getMessage());
        request.setData("{\"projectId\":\"" + event.getProjectId()
                + "\",\"teacherName\":\"" + event.getTeacherName()
                + "\",\"timestamp\":\"" + event.getTimestamp() + "\"}");
        return request;
    }
}
