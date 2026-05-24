package com.pfe.scheduling.service;

import com.pfe.scheduling.entity.DefenseSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class DefenseEventPublisher {

    private final RabbitTemplate rabbitTemplate;
    private static final String EXCHANGE = "defense.exchange";

    public void publishDefenseCreated(DefenseSession session) {
        publishEvent("defense.created", session);
    }

    public void publishDefenseUpdated(DefenseSession session) {
        publishEvent("defense.updated", session);
    }

    public void publishDefenseCancelled(DefenseSession session) {
        publishEvent("defense.cancelled", session);
    }

    public void publishDefenseRescheduled(DefenseSession session) {
        publishEvent("defense.rescheduled", session);
    }

    private void publishEvent(String routingKey, DefenseSession session) {
        try {
            Map<String, Object> payload = Map.of(
                    "defenseId", session.getId(),
                    "projectId", session.getProjectId(),
                    "academicYear", session.getAcademicYear(),
                    "status", session.getStatus().name()
            );
            rabbitTemplate.convertAndSend(EXCHANGE, routingKey, payload);
            log.info("Published event {} for defense {}", routingKey, session.getId());
        } catch (Exception e) {
            log.error("Failed to publish event {} for defense {}", routingKey, session.getId(), e);
        }
    }
}
