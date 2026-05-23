package com.pfe.resource.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MaintenanceScheduleItemDto {
    private String date;
    private String reason;
}
