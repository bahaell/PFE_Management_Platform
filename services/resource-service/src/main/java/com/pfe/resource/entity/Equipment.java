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
    private String type; // projector/smartBoard/... (frontend keys)
    private boolean present;
    private String status; // ok | maintenance | missing
    private String code; // optional (wifi)
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
