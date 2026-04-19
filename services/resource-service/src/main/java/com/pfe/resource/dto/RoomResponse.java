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
    private boolean hasProjector;
    private boolean hasWhiteboard;
    private String building;
    private boolean available;
}
