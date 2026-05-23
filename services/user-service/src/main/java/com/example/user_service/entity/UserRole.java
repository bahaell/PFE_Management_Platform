package com.example.user_service.entity;

public enum UserRole {
    STUDENT,
    TEACHER,
    COORDINATOR;

    public static UserRole from(String role) {
        if (role == null) {
            return null;
        }
        return switch (role.trim().toLowerCase()) {
            case "student" -> STUDENT;
            case "teacher" -> TEACHER;
            case "coordinator" -> COORDINATOR;
            default -> throw new IllegalArgumentException("Unknown role: " + role);
        };
    }
}