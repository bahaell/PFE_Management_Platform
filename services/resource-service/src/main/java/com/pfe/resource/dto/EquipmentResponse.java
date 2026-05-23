package com.pfe.resource.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentResponse {

    private Long id;
    private String type;
    private boolean present;
    private String status;
    private String code;

    // Flat room info — no nested object
    private Long roomId;
    private String roomName;
}
