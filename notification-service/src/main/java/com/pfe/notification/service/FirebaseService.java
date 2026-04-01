package com.pfe.notification.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.pfe.notification.model.DeviceToken;
import com.pfe.notification.repository.DeviceTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirebaseService {

    private final DeviceTokenRepository deviceTokenRepository;

    public void sendNotificationToUser(Long userId, String title, String messageContent) {
        List<DeviceToken> tokens = deviceTokenRepository.findByUserId(userId);
        
        if (tokens.isEmpty()) {
            log.debug("No device tokens found for user: {}", userId);
            return;
        }

        for (DeviceToken tokenObj : tokens) {
            sendToToken(tokenObj.getToken(), title, messageContent);
        }
    }

    public void sendToToken(String token, String title, String messageContent) {
        try {
            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(
                        com.google.firebase.messaging.Notification.builder()
                            .setTitle(title)
                            .setBody(messageContent)
                            .build()
                    )
                    .build();

            String response = FirebaseMessaging.getInstance().send(message);
            log.info("Successfully sent message to token {}: {}", token, response);
        } catch (Exception e) {
            log.error("Failed to send message to token {}", token, e);
        }
    }
}
