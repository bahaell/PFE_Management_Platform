package com.example.defense.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import java.util.UUID;

@Entity
@Table(name = "defenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Defense {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(length = 36)
    private String id;

    private LocalDate date;
    private LocalTime time;
    private String room;

    @Enumerated(EnumType.STRING)
    private DefenseStatus status;

    private String studentId;
    private UUID projectId;

    @OneToMany(mappedBy = "defense", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JuryMember> juryMembers = new ArrayList<>();

    @OneToMany(mappedBy = "defense", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DefenseAttachment> attachments = new ArrayList<>();

    @Embedded
    private DefenseTimeline timeline;

    @Embedded
    private DefenseProgress progress;

    private Double grade;
    
    @Column(columnDefinition = "TEXT")
    private String observations;
}
