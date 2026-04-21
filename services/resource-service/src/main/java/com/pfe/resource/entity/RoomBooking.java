package com.pfe.resource.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room_bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;
    private String start;
    private String end;
    private String type; // defense | maintenance | reserved
    private String project;
    private String studentName;
    private String status; // confirmed | pending | cancelled

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
}
