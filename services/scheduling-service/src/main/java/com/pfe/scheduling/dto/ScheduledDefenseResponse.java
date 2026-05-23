package com.pfe.scheduling.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduledDefenseResponse {
    private Long id;
    private String projectName;
    private String student;
    private String date;
    private String time;
    private String room;
    private List<String> juryMemberNames;
    private String status;
}