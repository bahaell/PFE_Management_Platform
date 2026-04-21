package com.pfe.resource.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomAvailabilityDto {
    private Long id;
    private String start;
    private String end;
    private boolean isMaintenance;
    private String reason;
}
