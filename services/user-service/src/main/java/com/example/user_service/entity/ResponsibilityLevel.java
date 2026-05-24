package com.example.user_service.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ResponsibilityLevel {
    LICENSE,
    MASTER,
    ENGINEERING,
    GLOBAL;

    @JsonCreator
    public static ResponsibilityLevel from(String level) {
        if (level == null || level.trim().isEmpty()) {
            return null;
        }
        return switch (level.trim().toUpperCase().replace('-', '_').replace(' ', '_')) {
            case "LICENSE" -> LICENSE;
            case "MASTER" -> MASTER;
            case "ENGINEERING" -> ENGINEERING;
            case "GLOBAL" -> GLOBAL;
            default -> throw new IllegalArgumentException("Unknown responsibility level: " + level);
        };
    }
}
