package com.example.user_service.entity;

public enum UserRole {
    STUDENT,
    TEACHER,
    COORDINATOR,
    ADMIN;

    public static UserRole from(String role) {
        if (role == null) {
            return null;
        }
        return switch (role.trim().toLowerCase()) {
            case "student" -> STUDENT;
            case "teacher" -> TEACHER;
            case "coordinator" -> COORDINATOR;
            case "admin" -> ADMIN;
            default -> throw new IllegalArgumentException("Unknown role: " + role);
        };
    }
}