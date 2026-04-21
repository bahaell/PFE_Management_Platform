package com.pfe.resource.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentRequest {

    @NotBlank(message = "Type is required")
    private String type; // projector/smartBoard/speakers/...

    private boolean present;
    @NotBlank(message = "Status is required")
    private String status; // ok/maintenance/missing
    private String code;

    private Long roomId; // nullable — can be unassigned
}
