package com.pfe.scheduling.solver;

import ai.timefold.solver.core.api.domain.solution.*;
import ai.timefold.solver.core.api.domain.valuerange.ValueRangeProvider;
import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@PlanningSolution
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DefenseTimetable {

    @ProblemFactCollectionProperty
    @ValueRangeProvider(id = "timeSlotRange")
    private List<TimeSlot> timeSlots;

    @ProblemFactCollectionProperty
    @ValueRangeProvider(id = "roomIdRange")
    private List<Long> roomIds;

    @PlanningEntityCollectionProperty
    private List<DefenseScheduleSlot> sessions;

    @PlanningScore
    private HardSoftScore score;
}