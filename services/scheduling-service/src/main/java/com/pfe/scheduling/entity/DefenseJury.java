package com.pfe.scheduling.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "defense_juries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DefenseJury {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "defense_session_id", nullable = false)
    @JsonIgnore
    private DefenseSession defenseSession;

    @Column(nullable = false)
    private String teacherId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JuryRole role;
}
