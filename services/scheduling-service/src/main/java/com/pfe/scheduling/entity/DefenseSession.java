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

    @PlanningId
    private Long projectId;

    private String projectName;
    private String supervisorName;

    private List<Long>   juryMemberIds;
    private List<String> juryMemberNames;       // ← noms récupérés via UserClient

    // disponibilités de chaque juré : "MONDAY_08:00_12:00"
    // format simple pour que Timefold puisse comparer
    private List<String> juryAvailabilities;    // ← nouveau

    private int  durationMinutes;
    private Long preferredRoomId;

    @PlanningVariable(valueRangeProviderRefs = "timeSlotRange")
    private TimeSlot timeSlot;

    @PlanningVariable(valueRangeProviderRefs = "roomIdRange")
    private Long roomId;
}