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

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Building is required")
    private String building;

    private String floor;
    @NotBlank(message = "Status is required")
    private String status;
    @NotBlank(message = "Description is required")
    private String description;
}
