package com.pfe.resource.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room_availability_slots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomAvailabilitySlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String start;
    private String end_date;
    private boolean isMaintenance;
    private String reason;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;
}
