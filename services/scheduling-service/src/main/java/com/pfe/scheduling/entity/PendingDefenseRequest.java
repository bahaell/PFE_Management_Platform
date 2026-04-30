package com.pfe.scheduling.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pending_defense_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PendingDefenseRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // project info (dénormalisé — évite appel Feign sur chaque GET)
    private String projectId;
    private String projectName;
    private String studentName;
    private String assignedTeacherName;

    private String dateRangeFrom; // "2026-04-01"
    private String dateRangeTo; // "2026-04-30"

    @Enumerated(EnumType.STRING)
    private Priority priority;

    public enum Priority {
        low, medium, high
    }
}