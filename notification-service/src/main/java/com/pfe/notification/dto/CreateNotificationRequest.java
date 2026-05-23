package com.pfe.notification.dto;

import com.pfe.notification.model.NotificationType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateNotificationRequest {
    private Long userId;
    private NotificationType type;
    private String title;
    private String message;
    private String data;
}
