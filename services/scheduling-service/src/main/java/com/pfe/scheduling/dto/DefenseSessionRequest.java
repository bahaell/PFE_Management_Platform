package com.pfe.scheduling.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DefenseSessionRequest {

    // ── Projet à planifier ──────────────────────────────────────────
    @NotNull(message = "Project ID is required")
    private Long projectId;
    // Timefold récupère le nom via ProjectsClient (pas besoin de le passer)

    // ── Jury / participants ─────────────────────────────────────────
    @NotEmpty(message = "At least one jury member is required")
    private List<Long> juryMemberIds; // IDs des membres du jury

    // ── Préférences (hints pour le solver) ─────────────────────────
    private Long preferredRoomId; // nullable — suggestion, pas une contrainte dure
    private Integer durationMinutes; // durée de la soutenance (défaut : 30 min)

    // ── Contraintes de disponibilité ───────────────────────────────
    private String notBefore; // ISO-8601 : "2025-10-01T08:00:00"
    private String notAfter; // ISO-8601 : "2025-10-31T18:00:00"
}
