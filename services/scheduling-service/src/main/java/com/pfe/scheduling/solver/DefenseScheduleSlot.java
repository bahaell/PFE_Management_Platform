package com.pfe.scheduling.solver;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;
import lombok.*;
import java.util.List;

@PlanningEntity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DefenseScheduleSlot {

    @PlanningId
    private String projectId;           // UUID → String, not Long

    private String projectName;
    private String supervisorName;

    private List<String> juryMemberIds;
    private List<String> juryMemberNames;
    private List<String> juryAvailabilities;

    private int  durationMinutes;
    private Long preferredRoomId;

    @PlanningVariable(valueRangeProviderRefs = "timeSlotRange")
    private TimeSlot timeSlot;

    @PlanningVariable(valueRangeProviderRefs = "roomIdRange")
    private Long roomId;
}