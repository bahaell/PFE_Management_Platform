package com.pfe.notification.controller;

import com.pfe.notification.dto.DeviceTokenRequest;
import com.pfe.notification.service.DeviceTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/devices")
@RequiredArgsConstructor
public class DeviceController {

    private final DeviceTokenService deviceTokenService;

    @PostMapping
    public ResponseEntity<Map<String, String>> registerToken(@Valid @RequestBody DeviceTokenRequest request) {
        deviceTokenService.registerToken(request);
        return ResponseEntity.ok(Map.of("status", "Device token registered successfully"));
    }
}
