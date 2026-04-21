package com.pfe.resource.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentItemDto {
    private boolean present;
    private String status;
    private String code;
}
