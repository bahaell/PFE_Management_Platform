package com.pfe.resource.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomRequest {

    @NotBlank(message = "Room name is required")
    private String name;

    @Min(value = 1, message = "Capacity must be at least 1")
    private int capacity;

    private boolean hasProjector;
    private boolean hasWhiteboard;

    @NotBlank(message = "Building is required")
    private String building;

    private boolean available;
}
