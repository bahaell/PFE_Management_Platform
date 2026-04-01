package com.pfe.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DeviceTokenRequest {

    @NotNull(message = "userId is required")
    private Long userId;

    @NotBlank(message = "token is required")
    private String token;
}
