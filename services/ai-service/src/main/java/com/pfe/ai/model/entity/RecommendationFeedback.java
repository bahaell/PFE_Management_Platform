package com.pfe.ai.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "recommendation_feedbacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long recommendationId; // Maps to RecommendationResult.id

    @Column(nullable = false)
    private Boolean accepted;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
