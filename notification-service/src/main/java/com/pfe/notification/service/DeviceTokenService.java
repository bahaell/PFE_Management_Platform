package com.pfe.notification.service;

import com.pfe.notification.dto.DeviceTokenRequest;
import com.pfe.notification.model.DeviceToken;
import com.pfe.notification.repository.DeviceTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeviceTokenService {

    private final DeviceTokenRepository deviceTokenRepository;

    public void registerToken(DeviceTokenRequest request) {
        List<DeviceToken> existing = deviceTokenRepository.findByUserId(request.getUserId());

        boolean tokenAlreadyExists = existing.stream()
                .anyMatch(t -> t.getToken().equals(request.getToken()));

        if (tokenAlreadyExists) {
            log.info("Token already registered for userId={}", request.getUserId());
            return;
        }

        DeviceToken deviceToken = DeviceToken.builder()
                .userId(request.getUserId())
                .token(request.getToken())
                .createdAt(LocalDateTime.now())
                .build();

        deviceTokenRepository.save(deviceToken);
        log.info("Token registered for userId={}", request.getUserId());
    }
}
