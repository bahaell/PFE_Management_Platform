package com.pfe.resource.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rooms", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"code"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // e.g. "Salle A101"

    @Column(nullable = false, unique = true)
    private String code;

    private int capacity;

    private String location;
    private String building;
    private String floor;

    @Enumerated(EnumType.STRING)
    private RoomType type;

    @Enumerated(EnumType.STRING)
    private RoomStatus status; // AVAILABLE, MAINTENANCE, DISABLED

    private boolean hasProjector;
    private boolean hasComputers;
    private boolean hasInternet;

    @Column(columnDefinition = "TEXT")
    private String description;
}
