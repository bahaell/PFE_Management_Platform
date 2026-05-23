package com.pfe.scheduling.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DefenseSessionResponse {

    private Long id;

    // ── Projet ────────────────────────────────────────────────────
    private Long projectId;
    private String projectName; // dénormalisé depuis ProjectsClient

    // ── Salle (depuis ResourceClient) ─────────────────────────────
    private Long roomId;
    private String roomName;
    private String roomBuilding;

    // ── Créneau planifié par Timefold ─────────────────────────────
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer durationMinutes;

    // ── Jury ──────────────────────────────────────────────────────
    private java.util.List<String> juryMemberNames;

    // ── Statut du solver ──────────────────────────────────────────
    private String solverStatus; // NOT_SOLVING | SOLVING_ACTIVE | SOLVING_SCHEDULED
    private Long score; // score Timefold (négatif = contraintes violées)
}
