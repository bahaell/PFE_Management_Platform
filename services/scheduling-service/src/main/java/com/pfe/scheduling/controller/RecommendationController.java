package com.pfe.scheduling.controller;

import com.pfe.scheduling.dto.JuryRecommendationResponse;
import com.pfe.scheduling.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule/recommend")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/jury")
    public List<JuryRecommendationResponse> getJuryRecommendations(
            @RequestParam String projectId,
            @RequestParam String date) {
        return recommendationService.recommendJury(projectId, date);
    }
}
