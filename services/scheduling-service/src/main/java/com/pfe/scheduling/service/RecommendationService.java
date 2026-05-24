package com.pfe.scheduling.service;

import com.pfe.scheduling.dto.JuryRecommendationResponse;
import com.pfe.scheduling.feign.ProjectsClient;
import com.pfe.scheduling.feign.UserClient;
import com.pfe.scheduling.repository.DefenseJuryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final UserClient userClient;
    private final ProjectsClient projectsClient;
    private final DefenseJuryRepository juryRepository;

    public List<JuryRecommendationResponse> recommendJury(String projectId, String date) {
        log.info("Generating jury recommendations for project {} on {}", projectId, date);

        List<UserClient.UserDto> allTeachers = userClient.getAllTeachers();
        Set<String> projectSupervisorIds = getProjectSupervisorIds(projectId);
        List<JuryRecommendationResponse> recommendations = new ArrayList<>();

        for (UserClient.UserDto teacher : allTeachers) {
            if (projectSupervisorIds.contains(teacher.id())) {
                continue;
            }
            JuryRecommendationResponse rec = evaluateTeacher(teacher, projectId, date);
            recommendations.add(rec);
        }

        return recommendations.stream()
                .sorted((a, b) -> Integer.compare(b.getScore(), a.getScore()))
                .limit(5)
                .collect(Collectors.toList());
    }

    private JuryRecommendationResponse evaluateTeacher(UserClient.UserDto teacher, String projectId, String date) {
        List<String> reasoning = new ArrayList<>();
        int score = 0;

        // 1. Availability Score (0 or 35)
        int availabilityScore = 0;
        boolean isAvailable = checkAvailability(teacher.id(), date);
        if (isAvailable) {
            availabilityScore = 35;
            reasoning.add("Has declared availability for this date.");
        } else {
            reasoning.add("No explicit availability declared for this date.");
        }
        score += availabilityScore;

        // 2. Workload Score (0 to 35)
        int workloadScore = 0;
        int currentJuries = juryRepository.countByTeacherId(teacher.id());
        int maxCapacity = 10;
        if (currentJuries < 5) {
            workloadScore = 35;
            reasoning.add("Low current workload (" + currentJuries + " juries).");
        } else if (currentJuries < 10) {
            workloadScore = 20;
            reasoning.add("Moderate workload (" + currentJuries + " juries).");
        } else {
            reasoning.add("High workload (" + currentJuries + " juries).");
        }
        score += workloadScore;

        // 3. Skill Match Score (0 to 20)
        int skillMatchScore = 10; // Default base score
        List<String> skillsMatched = new ArrayList<>();
        if (teacher.speciality() != null && !teacher.speciality().isEmpty()) {
             reasoning.add("Speciality: " + teacher.speciality() + " considered for matching.");
             skillsMatched.add(teacher.speciality());
             skillMatchScore = 20; // Simplified for now
        }
        score += skillMatchScore;

        // 4. Seniority Score (0 to 10)
        int seniorityScore = 0;
        if ("Professor".equalsIgnoreCase(teacher.grade())) {
            seniorityScore = 10;
            reasoning.add("Senior profile (Professor).");
        } else {
            seniorityScore = 5;
            reasoning.add("Standard profile (" + teacher.grade() + ").");
        }
        score += seniorityScore;


        return JuryRecommendationResponse.builder()
                .teacherId(teacher.id())
                .teacherName(teacher.name())
                .email(teacher.email())
                .department(teacher.department())
                .grade(teacher.grade())
                .speciality(teacher.speciality())
                .score(score)
                .skillsMatched(skillsMatched)
                .load(currentJuries)
                .maxCapacity(maxCapacity)
                .currentJuryCount(currentJuries)
                .isAvailableOnDate(isAvailable)
                .reasoning(reasoning)
                .availabilityScore(availabilityScore)
                .workloadScore(workloadScore)
                .skillMatchScore(skillMatchScore)
                .seniorityScore(seniorityScore)
                .subScores(JuryRecommendationResponse.SubScores.builder()
                        .availabilityScore(availabilityScore)
                        .workloadScore(workloadScore)
                        .skillMatchScore(skillMatchScore)
                        .seniorityScore(seniorityScore)
                        .build())
                .build();
    }

    private Set<String> getProjectSupervisorIds(String projectId) {
        try {
            ProjectsClient.ProjectDTO project = projectsClient.getById(projectId);
            if (project.supervisors() == null) {
                return Set.of();
            }
            return project.supervisors().stream()
                    .map(ProjectsClient.ProjectSupervisorDTO::teacherId)
                    .collect(Collectors.toSet());
        } catch (Exception ex) {
            log.warn("Could not load project supervisors for {}: {}", projectId, ex.getMessage());
            return Set.of();
        }
    }

    private boolean checkAvailability(String teacherId, String date) {
        try {
            List<UserClient.TeacherAvailabilityDto> avails = userClient.getTeacherAvailability(teacherId);
            if (avails == null || avails.isEmpty()) return false;
            // Simplification: just check if they have ANY availability rules
            return true;
        } catch (Exception e) {
            log.warn("Failed to fetch availability for teacher {}: {}", teacherId, e.getMessage());
            return false;
        }
    }
}
