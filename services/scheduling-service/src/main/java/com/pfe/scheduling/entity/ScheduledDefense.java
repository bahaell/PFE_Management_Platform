package com.pfe.scheduling.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "scheduled_defenses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScheduledDefense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    private String student;
    private String date; // "2026-04-25"
    private String time; // "09:00"
    private String room; // room name

    @ElementCollection
    @CollectionTable(name = "defense_jury", joinColumns = @JoinColumn(name = "defense_id"))
    @Column(name = "jury_member_name")
    private List<String> juryMemberNames;

    @Enumerated(EnumType.STRING)
    private DefenseStatus status;

    public enum DefenseStatus {
        scheduled, completed
    }
}