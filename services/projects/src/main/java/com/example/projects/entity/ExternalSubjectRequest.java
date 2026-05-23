package com.example.projects.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "external_subject_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExternalSubjectRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String studentName;

    private String teacherId;

    private String teacherName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExternalSubjectStatus status;

    @Column(nullable = false)
    private String subjectTitle;

    @Column(columnDefinition = "TEXT")
    private String subjectDescription;

    @Column(columnDefinition = "TEXT")
    private String motivation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(nullable = false)
    private String companySupervisorName;

    @Column(nullable = false)
    private String companySupervisorEmail;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
