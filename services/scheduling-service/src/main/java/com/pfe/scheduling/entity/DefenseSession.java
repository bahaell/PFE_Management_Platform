package com.pfe.scheduling.entity;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;
import com.pfe.scheduling.solver.TimeSlot;
import lombok.*;
import java.util.List;

@PlanningEntity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DefenseSession {

    @PlanningId                          // ← AJOUT — identifiant unique obligatoire
    private Long         projectId;

    private String       projectName;
    private String       supervisorName;
    private List<Long>   juryMemberIds;
    private int          durationMinutes;
    private Long         preferredRoomId;

    @PlanningVariable(valueRangeProviderRefs = "timeSlotRange")
    private TimeSlot timeSlot;

    @PlanningVariable(valueRangeProviderRefs = "roomIdRange")
    private Long roomId;
}