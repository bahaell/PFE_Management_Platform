package com.pfe.resource.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EquipmentRequest {

    @NotBlank(message = "Name is required")
    private String name; // e.g. "Projecteur Epson EB-X51"

    @NotBlank(message = "Type is required")
    private String type; // PROJECTOR | LAPTOP | SCREEN | OTHER

    private boolean available;

    private Long roomId; // nullable — can be unassigned
}
