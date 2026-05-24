package com.pfe.resource.dto;

import com.pfe.resource.entity.RoomStatus;
import com.pfe.resource.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomDto {
    private Long id;
    private String name;
    private String code;
    private int capacity;
    private String location;
    private String building;
    private String floor;
    private RoomType type;
    private RoomStatus status;
    private boolean hasProjector;
    private boolean hasComputers;
    private boolean hasInternet;
    private String description;
}
