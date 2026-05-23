package com.pfe.notification.controller;

import com.pfe.notification.dto.CreateNotificationRequest;
import com.pfe.notification.dto.NotificationResponse;
import com.pfe.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Notification Service is running");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationResponse>> getUserNotifications(@PathVariable String userId) {
        Long id = parseUserId(userId);
        if (id == null) return ResponseEntity.ok(Collections.emptyList());
        return ResponseEntity.ok(notificationService.getUserNotifications(id));
    }

    @GetMapping("/{userId}/unread")
    public ResponseEntity<List<NotificationResponse>> getUnreadNotifications(@PathVariable String userId) {
        Long id = parseUserId(userId);
        if (id == null) return ResponseEntity.ok(Collections.emptyList());
        return ResponseEntity.ok(notificationService.getUnreadNotifications(id));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<NotificationResponse> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }

    @PostMapping
    public ResponseEntity<NotificationResponse> createNotification(@RequestBody CreateNotificationRequest request) {
        return ResponseEntity.ok(notificationService.createNotification(request));
    }

    private Long parseUserId(String userId) {
        if (userId == null || userId.isBlank()) return null;
        try {
            return Long.parseLong(userId);
        } catch (NumberFormatException e) {
            return null; // e.g. "std001", "tch001" - return empty list
        }
    }
}
