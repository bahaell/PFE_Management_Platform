package com.pfe.scheduling.solver;

import ai.timefold.solver.core.api.domain.solution.*;
import ai.timefold.solver.core.api.domain.valuerange.ValueRangeProvider;
import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import com.pfe.scheduling.entity.DefenseSession;
import lombok.*;
import java.util.List;

@PlanningSolution
@Data @NoArgsConstructor @AllArgsConstructor
public class DefenseTimetable {

    @ValueRangeProvider(id = "timeSlotRange")   // ← id doit matcher valueRangeProviderRefs
    @ProblemFactCollectionProperty
    private List<TimeSlot> timeSlots;

    @ValueRangeProvider(id = "roomIdRange")     // ← id doit matcher valueRangeProviderRefs
    @ProblemFactCollectionProperty
    private List<Long> roomIds;

    @PlanningEntityCollectionProperty
    private List<DefenseSession> sessions;

    @PlanningScore
    private HardSoftScore score;
}