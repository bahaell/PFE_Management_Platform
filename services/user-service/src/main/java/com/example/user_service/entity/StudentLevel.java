package com.example.user_service.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum StudentLevel {
    LICENSE,
    MASTER,
    ENGINEERING;

    @JsonCreator
    public static StudentLevel from(String level) {
        if (level == null || level.trim().isEmpty()) {
            return null;
        }
        return switch (level.trim().toUpperCase().replace('-', '_').replace(' ', '_')) {
            case "LICENSE" -> LICENSE;
            case "MASTER" -> MASTER;
            case "ENGINEERING" -> ENGINEERING;
            default -> throw new IllegalArgumentException("Unknown student level: " + level);
        };
    }
}
