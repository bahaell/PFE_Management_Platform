package com.pfe.scheduling.dto;

import lombok.*;
import java.util.List;

/**
 * DTO returned by GET /api/schedule/recommend/jury
 * Contains a scored list of teachers recommended for a jury position.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JuryRecommendationResponse {

    private String teacherId;
    private String teacherName;
    private String email;
    private String department;
    private String grade;
    private String speciality;

    /** 0–100 composite AI score */
    private int score;

    /** Skills/domains considered as matched for the recommendation UI */
    private List<String> skillsMatched;

    /** Frontend-friendly workload aliases */
    private int load;
    private int maxCapacity;

    /** How many active jury assignments this teacher currently has */
    private int currentJuryCount;

    /** Whether teacher has declared availability on the requested date */
    private boolean isAvailableOnDate;

    /** Ordered list of human-readable reasons behind the score */
    private List<String> reasoning;

    /** Sub-scores for transparency */
    private int availabilityScore;
    private int workloadScore;
    private int skillMatchScore;
    private int seniorityScore;

    private SubScores subScores;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SubScores {
        private int availabilityScore;
        private int workloadScore;
        private int skillMatchScore;
        private int seniorityScore;
    }
}
