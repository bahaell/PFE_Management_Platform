package com.pfe.scheduling.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DefenseSessionRequest {

    @NotNull(message = "Project ID is required")
    private String projectId;           // UUID → String, not Long

    @NotEmpty(message = "At least one jury member is required")
    private List<String> juryMemberIds;

    private Long    preferredRoomId;    // room IDs are still numeric Long
    private Integer durationMinutes;

    private String notBefore;           // ISO-8601 : "2026-04-26T08:00:00"
    private String notAfter;
}