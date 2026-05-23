package com.pfe.notification.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    private String title;

    private String message;

    @Column(columnDefinition = "TEXT")
    private String data;

    @Builder.Default
    private boolean isRead = false;

    private LocalDateTime createdAt;
}
