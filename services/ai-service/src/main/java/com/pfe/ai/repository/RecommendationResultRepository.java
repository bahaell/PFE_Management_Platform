package com.pfe.ai.repository;

import com.pfe.ai.model.entity.RecommendationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationResultRepository extends JpaRepository<RecommendationResult, Long> {
    List<RecommendationResult> findByRequestIdOrderByScoreDesc(Long requestId);
}
