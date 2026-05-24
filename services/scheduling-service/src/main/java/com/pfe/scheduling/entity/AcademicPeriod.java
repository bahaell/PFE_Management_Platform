package com.pfe.scheduling.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "academic_periods")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcademicPeriod {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String academicYear;

    @Column(nullable = false)
    private String semester;

    @Column(nullable = false)
    private LocalDate defenseStartDate;

    @Column(nullable = false)
    private LocalDate defenseEndDate;

    private LocalDate submissionDeadline;

    @Column(nullable = false)
    private boolean isActive = false;
}
