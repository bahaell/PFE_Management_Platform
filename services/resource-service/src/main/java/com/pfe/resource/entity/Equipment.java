package com.pfe.resource.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "equipment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; // e.g. "Projecteur Epson"
    private String type; // PROJECTOR / LAPTOP / SCREEN
    private boolean available;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
