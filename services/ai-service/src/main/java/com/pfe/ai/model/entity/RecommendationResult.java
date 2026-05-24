package com.pfe.ai.model.entity;

import com.pfe.ai.model.enums.TargetType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "recommendation_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long requestId; // Maps to RecommendationRequest.id

    @Column(nullable = false)
    private String targetId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TargetType targetType;

    @Column(nullable = false)
    private Double score;

    @Column(name = "result_rank") // rank is a reserved keyword in some SQL dialects
    private Integer rank;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
