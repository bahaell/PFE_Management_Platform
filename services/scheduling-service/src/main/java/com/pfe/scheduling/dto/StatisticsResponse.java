package com.pfe.scheduling.dto;

import lombok.*;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatisticsResponse {
    private int totalScheduledDefenses;
    private int pendingRequests;
    private Map<String, Integer> roomUtilization;
    private Map<String, Integer> teacherLoad;
}