package com.pfe.notification.messaging;

import com.pfe.notification.event.CommitCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * 🟢 PRODUCER EXAMPLE (belongs in commit-service, shown here as reference)
 *
 * This class demonstrates how the commit-service would publish events.
 * Copy this class into your commit-service microservice.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class CommitEventProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routing-key.commit-created}")
    private String commitCreatedRoutingKey;

    public void publishCommitCreatedEvent(String projectId, String studentId, String teacherName, String message) {
        CommitCreatedEvent event = CommitCreatedEvent.builder()
                .projectId(projectId)
                .studentId(studentId)
                .teacherName(teacherName)
                .message(message)
                .timestamp(LocalDate.now().toString())
                .build();

        rabbitTemplate.convertAndSend(exchange, commitCreatedRoutingKey, event);
        log.info("📤 Published CommitCreatedEvent for projectId={} studentId={}", projectId, studentId);
    }
}
