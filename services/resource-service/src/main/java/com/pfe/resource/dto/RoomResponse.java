package com.pfe.resource.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {

    private Long id;
    private String name;
    private int capacity;
    private String location;
    private String building;
    private String floor;
    private String status;
    private String description;
    private EquipmentMapDto equipment;
    private java.util.List<RoomBookingResponse> bookings;
    private java.util.List<MaintenanceScheduleItemDto> maintenanceSchedule;
}
