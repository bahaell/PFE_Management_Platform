package com.pfe.ai.model.entity;

import com.pfe.ai.model.enums.RequestType;
import com.pfe.ai.model.enums.RecommendationStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "recommendation_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestType requestType;

    private String studentId;
    private String projectId;
    private String subjectId;
    private String academicYear;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RecommendationStatus status;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
