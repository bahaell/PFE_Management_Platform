package com.pfe.resource.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentResponse {

    private Long id;
    private String name;
    private String type;
    private boolean available;

    // Flat room info — no nested object
    private Long roomId;
    private String roomName;
}
