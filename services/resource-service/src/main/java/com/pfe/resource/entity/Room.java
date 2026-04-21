package com.pfe.resource.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // e.g. "Salle A101"

    private int capacity;
    private String location;
    private String building;
    private String floor;
    private String status; // available | occupied | maintenance | unavailable
    @Column(columnDefinition = "TEXT")
    private String description;
}
