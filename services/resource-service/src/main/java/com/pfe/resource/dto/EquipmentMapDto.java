package com.pfe.resource.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentMapDto {
    private EquipmentItemDto projector;
    private EquipmentItemDto smartBoard;
    private EquipmentItemDto speakers;
    private EquipmentItemDto microphone;
    private EquipmentItemDto hdmiSystem;
    private EquipmentItemDto recordingCamera;
    private EquipmentItemDto airConditioning;
    private EquipmentItemDto ethernet;
    private EquipmentItemDto wifi;
    private EquipmentItemDto screen;
}
