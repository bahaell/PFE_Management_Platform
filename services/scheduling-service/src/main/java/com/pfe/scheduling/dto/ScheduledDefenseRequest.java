package com.pfe.scheduling.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduledDefenseRequest {
    private String projectName;
    private String student;
    private String date;
    private String time;
    private String room;
    private List<String> juryMemberNames;
    private String status; // "scheduled" | "completed"
}