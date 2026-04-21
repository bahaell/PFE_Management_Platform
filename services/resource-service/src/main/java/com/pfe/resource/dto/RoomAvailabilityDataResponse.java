package com.pfe.resource.dto;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomAvailabilityDataResponse {
    private String roomId;
    private List<RoomAvailabilityDto> availability;
}
