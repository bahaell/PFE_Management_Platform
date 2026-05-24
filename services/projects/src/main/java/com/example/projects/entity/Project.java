package com.example.projects.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private ProjectType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProjectStatus status;

    @Enumerated(EnumType.STRING)
    private ProjectPhase phase;

    @Column(nullable = false)
    @Builder.Default
    private Integer progress = 0;

    private String academicYear;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", unique = true)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @ElementCollection
    @CollectionTable(name = "project_required_skills", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "skill")
    @Builder.Default
    private Set<String> requiredSkills = new HashSet<>();

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    void applyBusinessDefaults() {
        if (type == null) {
            type = ProjectType.INTERNAL;
        }
        if (status == null) {
            status = ProjectStatus.PENDING;
        }
        if (phase == null) {
            phase = ProjectPhase.PROPOSAL;
        }
        if (progress == null) {
            progress = 0;
        }
        if (academicYear == null || academicYear.isBlank()) {
            int year = Year.now().getValue();
            academicYear = year + "-" + (year + 1);
        }
    }
}
