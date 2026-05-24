package com.pfe.ai.engine;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduleOptimizer {

    public List<OptimizedSlot> optimizeSchedule(String projectId, List<String> availableRoomIds, List<String> availableTimeslots) {
        log.info("Running AI Schedule Optimizer for project {}", projectId);
        
        List<OptimizedSlot> recommendations = new ArrayList<>();
        
        // This is where we would check:
        // - No overlap (CRITICAL)
        // - Room available
        // - Teacher available
        // - Jury available
        // - Capacity respected
        // - Balanced sessions (avoiding all defenses in the same morning)

        // Mock optimization logic
        for (String roomId : availableRoomIds) {
            for (String timeslot : availableTimeslots) {
                // Evaluate constraints
                double score = 90.0 - (Math.random() * 20); // Simulated score
                String reason = "No conflict + balanced load";
                
                if (score > 80.0) {
                    recommendations.add(new OptimizedSlot(roomId, timeslot, score, reason));
                }
            }
        }
        
        return recommendations.stream()
                .sorted((a, b) -> Double.compare(b.score(), a.score()))
                .limit(3)
                .toList();
    }

    public record OptimizedSlot(String roomId, String timeslotId, double score, String reason) {}
}
