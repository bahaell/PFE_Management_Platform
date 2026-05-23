package com.pfe.resource.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomBookingResponse {
    private Long id;
    private String date;
    private String start;
    private String end;
    private String type;
    private String project;
    private String studentName;
    private String status;
}
