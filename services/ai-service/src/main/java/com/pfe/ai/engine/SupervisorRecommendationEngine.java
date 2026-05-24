package com.pfe.ai.engine;

import com.pfe.ai.model.entity.SkillProfile;
import com.pfe.ai.model.enums.OwnerType;
import com.pfe.ai.repository.SkillProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SupervisorRecommendationEngine {

    private final SkillProfileRepository skillProfileRepository;

    public List<ScoredTeacher> recommendSupervisors(List<String> studentSkills, List<String> subjectKeywords) {
        log.info("Generating supervisor recommendations based on student skills and subject keywords.");

        List<SkillProfile> allTeachers = skillProfileRepository.findByOwnerType(OwnerType.TEACHER);
        List<ScoredTeacher> recommendations = new ArrayList<>();

        for (SkillProfile teacher : allTeachers) {
            // Note: In a real system, you'd fetch currentLoad and maxCapacity from a cache/DB
            // populated by events or a synchronous Feign call. 
            // For now, we simulate capacity as part of the scoring engine logic.
            int currentStudents = getSimulatedCurrentLoad(teacher.getOwnerId());
            int maxCapacity = getSimulatedMaxCapacity(teacher.getOwnerId());

            if (currentStudents >= maxCapacity) {
                // EXCLUDED IF FULL
                continue;
            }

            double skillMatchScore = calculateSkillMatch(teacher.getSkills(), studentSkills, subjectKeywords);
            double capacityScore = calculateCapacityScore(currentStudents, maxCapacity);
            double expertiseScore = calculateHistoricalExpertise(teacher);
            double preferenceScore = 5.0; // Simulated preference

            // SCORE FINAL = (skillMatch * 0.5) + (capacityScore * 0.25) + (expertiseScore * 0.2) + (preferenceScore * 0.05)
            double finalScore = (skillMatchScore * 0.5) + (capacityScore * 0.25) + (expertiseScore * 0.2) + (preferenceScore * 0.05);

            String reasoning = String.format("SkillMatch: %.1f, Capacity: %.1f, Expertise: %.1f", skillMatchScore, capacityScore, expertiseScore);

            recommendations.add(new ScoredTeacher(teacher.getOwnerId(), finalScore, reasoning));
        }

        return recommendations.stream()
                .sorted((a, b) -> Double.compare(b.score(), a.score()))
                .limit(5)
                .collect(Collectors.toList());
    }

    private double calculateSkillMatch(List<String> teacherSkills, List<String> studentSkills, List<String> subjectKeywords) {
        if (teacherSkills == null || teacherSkills.isEmpty()) return 0.0;
        
        long matchCount = teacherSkills.stream()
                .filter(s -> studentSkills.contains(s) || subjectKeywords.contains(s))
                .count();
                
        // Normalized score out of 100
        return Math.min(100.0, (matchCount * 25.0)); 
    }

    private double calculateCapacityScore(int currentStudents, int maxCapacity) {
        // Score is higher if there's more available capacity
        double ratio = (double) currentStudents / maxCapacity;
        return (1.0 - ratio) * 100.0;
    }

    private double calculateHistoricalExpertise(SkillProfile teacher) {
        // In a real system, count past supervised projects matching the keywords
        return 50.0; // Mocked historical score
    }

    // Mocked external data fetching
    private int getSimulatedCurrentLoad(String teacherId) {
        return 2;
    }

    private int getSimulatedMaxCapacity(String teacherId) {
        return 5;
    }

    public record ScoredTeacher(String teacherId, double score, String reasoning) {}
}
