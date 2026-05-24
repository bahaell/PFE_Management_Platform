package com.example.user_service.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum TeacherGrade {
    ASSISTANT,
    MAITRE_ASSISTANT,
    PROFESSOR,
    DOCTOR;

    @JsonCreator
    public static TeacherGrade from(String grade) {
        if (grade == null || grade.trim().isEmpty()) {
            return null;
        }
        return switch (grade.trim().toUpperCase().replace('-', '_').replace(' ', '_')) {
            case "ASSISTANT" -> ASSISTANT;
            case "MAITRE_ASSISTANT", "MAITRE_ASSISTANT_A", "ASSOCIATE", "ASSOCIATE_PROFESSOR" -> MAITRE_ASSISTANT;
            case "PROFESSOR" -> PROFESSOR;
            case "DOCTOR" -> DOCTOR;
            default -> throw new IllegalArgumentException("Unknown teacher grade: " + grade);
        };
    }
}
