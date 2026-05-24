package com.pfe.notification.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Payload publié par le scheduling-service sur defense.exchange.
 *
 * Routing keys :
 *   defense.created     → session vient d'être créée
 *   defense.updated     → mise à jour de la session
 *   defense.cancelled   → soutenance annulée
 *   defense.rescheduled → report de la soutenance
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DefenseEventDto {

    private Long   defenseId;
    private String projectId;
    private String academicYear;
    private String status;
}
