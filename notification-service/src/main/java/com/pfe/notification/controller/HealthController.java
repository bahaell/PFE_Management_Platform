package com.pfe.notification.controller;

import com.pfe.notification.service.FirebaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class HealthController {

    private final FirebaseService firebaseService;

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "Notification Service is running");
    }

    @PostMapping("/test-push")
    public Map<String, String> testPush(@RequestParam String token, @RequestParam String title, @RequestParam String body) {
        firebaseService.sendToToken(token, title, body);
        return Map.of("status", "Push notification request sent to Firebase");
    }
}
