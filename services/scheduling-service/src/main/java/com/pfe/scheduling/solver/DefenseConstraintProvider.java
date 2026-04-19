package com.pfe.scheduling.solver;

import com.pfe.scheduling.entity.DefenseSession;
import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import ai.timefold.solver.core.api.score.stream.Joiners;
import org.springframework.stereotype.Component;
import java.time.LocalTime;

@Component // ← Spring bean, pas @ConstraintProvider (qui n'est pas une annotation)
public class DefenseConstraintProvider implements ConstraintProvider { // ← implements, pas @

    @Override
    public Constraint[] defineConstraints(ConstraintFactory factory) {
        return new Constraint[] {
                roomConflict(factory),
                supervisorConflict(factory),
                preferMorningSlots(factory)
        };
    }

    // HARD: deux sessions ne peuvent pas utiliser la même salle au même créneau
    private Constraint roomConflict(ConstraintFactory factory) {
        return factory.forEachUniquePair(DefenseSession.class,
                Joiners.equal(DefenseSession::getRoomId),
                Joiners.equal(DefenseSession::getTimeSlot))
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Room conflict");
    }

    // HARD: même superviseur ne peut pas être dans 2 salles en même temps
    private Constraint supervisorConflict(ConstraintFactory factory) {
        return factory.forEachUniquePair(DefenseSession.class,
                Joiners.equal(DefenseSession::getSupervisorName),
                Joiners.equal(DefenseSession::getTimeSlot))
                .filter((a, b) -> a.getSupervisorName() != null &&
                        b.getSupervisorName() != null)
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Supervisor conflict");
    }

    // SOFT: préférer les créneaux du matin (avant 12h00)
    private Constraint preferMorningSlots(ConstraintFactory factory) {
        return factory.forEach(DefenseSession.class)
                .filter(s -> s.getTimeSlot() != null &&
                        s.getTimeSlot().getStartTime().isAfter(LocalTime.NOON))
                .penalize(HardSoftScore.ONE_SOFT)
                .asConstraint("Prefer morning slots");
    }
}