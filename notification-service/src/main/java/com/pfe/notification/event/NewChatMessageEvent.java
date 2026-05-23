package com.pfe.notification.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO reçu depuis le chat-service via RabbitMQ (chat.exchange → chat.event.new_message).
 * Ce DTO est un miroir du NewMessageEvent du chat-service.
 * Le messageId permet la déduplication (idempotence) côté consommateur.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewChatMessageEvent {
    /** ID unique du message Firestore — utilisé pour la déduplication */
    private String messageId;
    private String roomId;
    private String projectId;
    private String senderId;
    private String senderName;
    private String senderRole;
    private String content;
    private String academicYear;
    private LocalDateTime createdAt;
}
