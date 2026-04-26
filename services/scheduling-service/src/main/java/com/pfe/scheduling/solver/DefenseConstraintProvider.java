package com.pfe.scheduling.solver;

import com.pfe.scheduling.entity.DefenseSession;

import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import ai.timefold.solver.core.api.score.stream.Joiners;

import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;

@Component
public class DefenseConstraintProvider implements ConstraintProvider {

    @Override
    public Constraint[] defineConstraints(ConstraintFactory factory) {
        return new Constraint[]{
            // ── HARD constraints ─────────────────────────────────
            roomConflict(factory),
            supervisorConflict(factory),
            juryAvailabilityViolation(factory),
            // ── SOFT constraints ─────────────────────────────────
            preferMorningSlots(factory),
            preferPreferredRoom(factory)
        };
    }

    // ─────────────────────────────────────────────────────────────
    //  HARD 1 — deux sessions ne peuvent pas utiliser
    //           la même salle au même créneau
    // ─────────────────────────────────────────────────────────────
    private Constraint roomConflict(ConstraintFactory factory) {
        return factory.forEachUniquePair(DefenseSession.class,
                Joiners.equal(DefenseSession::getRoomId),
                Joiners.equal(DefenseSession::getTimeSlot))
                .filter((a, b) ->
                        a.getRoomId() != null &&
                        b.getRoomId() != null)
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Room conflict");
    }

    // ─────────────────────────────────────────────────────────────
    //  HARD 2 — même superviseur ne peut pas être
    //           dans 2 salles en même temps
    // ─────────────────────────────────────────────────────────────
    private Constraint supervisorConflict(ConstraintFactory factory) {
        return factory.forEachUniquePair(DefenseSession.class,
                Joiners.equal(DefenseSession::getSupervisorName),
                Joiners.equal(DefenseSession::getTimeSlot))
                .filter((a, b) ->
                        a.getSupervisorName() != null &&
                        b.getSupervisorName() != null &&
                        !a.getSupervisorName().isBlank() &&
                        !b.getSupervisorName().isBlank())
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Supervisor conflict");
    }

    // ─────────────────────────────────────────────────────────────
    //  HARD 3 — le créneau doit être couvert par au moins
    //           une disponibilité du jury
    //           (si aucune dispo → pas de contrainte appliquée)
    // ─────────────────────────────────────────────────────────────
    private Constraint juryAvailabilityViolation(ConstraintFactory factory) {
        return factory.forEach(DefenseSession.class)
                .filter(session ->
                        session.getTimeSlot() != null &&
                        session.getJuryAvailabilities() != null &&
                        !session.getJuryAvailabilities().isEmpty() &&
                        !isSlotCoveredByJury(session))
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Jury not available at this slot");
    }

    // ─────────────────────────────────────────────────────────────
    //  SOFT 1 — préférer les créneaux du matin (avant 12h00)
    // ─────────────────────────────────────────────────────────────
    private Constraint preferMorningSlots(ConstraintFactory factory) {
        return factory.forEach(DefenseSession.class)
                .filter(s ->
                        s.getTimeSlot() != null &&
                        s.getTimeSlot().getStartTime().isAfter(LocalTime.NOON))
                .penalize(HardSoftScore.ONE_SOFT)
                .asConstraint("Prefer morning slots");
    }

    // ─────────────────────────────────────────────────────────────
    //  SOFT 2 — préférer la salle demandée (preferredRoomId)
    // ─────────────────────────────────────────────────────────────
    private Constraint preferPreferredRoom(ConstraintFactory factory) {
        return factory.forEach(DefenseSession.class)
                .filter(s ->
                        s.getPreferredRoomId() != null &&
                        s.getRoomId() != null &&
                        !s.getPreferredRoomId().equals(s.getRoomId()))
                .penalize(HardSoftScore.ONE_SOFT)
                .asConstraint("Preferred room not assigned");
    }

    // ─────────────────────────────────────────────────────────────
    //  HELPER — vérifie si le TimeSlot est couvert par
    //           au moins une disponibilité du jury
    //
    //  Format stocké dans juryAvailabilities : "HH:mm_HH:mm"
    //  ex: ["08:00_12:00", "14:00_18:00"]
    //
    //  Un créneau est couvert si :
    //    slotStart >= availStart  ET  slotEnd <= availEnd
    // ─────────────────────────────────────────────────────────────
    private boolean isSlotCoveredByJury(DefenseSession session) {
        TimeSlot slot = session.getTimeSlot();
        if (slot == null) return true;  // pas de créneau → pas de violation

        LocalTime slotStart = slot.getStartTime();
        LocalTime slotEnd   = slot.getEndTime();

        List<String> avails = session.getJuryAvailabilities();
        if (avails == null || avails.isEmpty()) return true; // pas de dispo → pas de contrainte

        return avails.stream().anyMatch(a -> {
            String[] parts = a.split("_");
            if (parts.length < 2) return false;
            try {
                LocalTime availStart = LocalTime.parse(parts[0]);
                LocalTime availEnd   = LocalTime.parse(parts[1]);

                // le créneau est entièrement dans la dispo
                return !slotStart.isBefore(availStart) &&
                       !slotEnd.isAfter(availEnd);
            } catch (Exception e) {
                return false; // format invalide → ignore
            }
        });
    }
}