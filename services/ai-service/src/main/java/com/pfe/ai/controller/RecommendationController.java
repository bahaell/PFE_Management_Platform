package com.pfe.ai.controller;

import com.pfe.ai.engine.JuryRecommendationEngine;
import com.pfe.ai.engine.ScheduleOptimizer;
import com.pfe.ai.engine.SubjectRecommendationEngine;
import com.pfe.ai.engine.SupervisorRecommendationEngine;
import com.pfe.ai.model.entity.RecommendationRequest;
import com.pfe.ai.model.enums.RequestType;
import com.pfe.ai.model.enums.RecommendationStatus;
import com.pfe.ai.repository.RecommendationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final SupervisorRecommendationEngine supervisorEngine;
    private final SubjectRecommendationEngine subjectEngine;
    private final JuryRecommendationEngine juryEngine;
    private final ScheduleOptimizer scheduleOptimizer;
    private final RecommendationRequestRepository requestRepository;

    @PostMapping("/supervisors")
    public ResponseEntity<?> recommendSupervisors(@RequestBody SupervisorReqDto req) {
        RecommendationRequest savedReq = requestRepository.save(RecommendationRequest.builder()
                .requestType(RequestType.SUPERVISOR)
                .studentId(req.studentId())
                .subjectId(req.subjectId())
                .academicYear(req.academicYear())
                .status(RecommendationStatus.COMPLETED)
                .build());

        var recommendations = supervisorEngine.recommendSupervisors(req.studentSkills(), req.subjectKeywords());
        
        // In a real flow, you would also save to RecommendationResultRepository here
        return ResponseEntity.ok(recommendations);
    }

    @PostMapping("/subjects")
    public ResponseEntity<?> recommendSubjects(@RequestBody SubjectReqDto req) {
        RecommendationRequest savedReq = requestRepository.save(RecommendationRequest.builder()
                .requestType(RequestType.SUBJECT)
                .studentId(req.studentId())
                .academicYear(req.academicYear())
                .status(RecommendationStatus.COMPLETED)
                .build());

        var recommendations = subjectEngine.recommendSubjects(req.studentId(), req.studentSkills());
        return ResponseEntity.ok(recommendations);
    }

    @PostMapping("/juries")
    public ResponseEntity<?> recommendJuries(@RequestBody JuryReqDto req) {
        RecommendationRequest savedReq = requestRepository.save(RecommendationRequest.builder()
                .requestType(RequestType.JURY)
                .projectId(req.projectId())
                .academicYear(req.academicYear())
                .status(RecommendationStatus.COMPLETED)
                .build());

        var recommendations = juryEngine.recommendJury(req.projectId(), req.requiredDomains());
        return ResponseEntity.ok(recommendations);
    }

    @PostMapping("/schedules")
    public ResponseEntity<?> optimizeSchedules(@RequestBody ScheduleReqDto req) {
        RecommendationRequest savedReq = requestRepository.save(RecommendationRequest.builder()
                .requestType(RequestType.SCHEDULE)
                .projectId(req.projectId())
                .academicYear(req.academicYear())
                .status(RecommendationStatus.COMPLETED)
                .build());

        var recommendations = scheduleOptimizer.optimizeSchedule(req.projectId(), req.availableRooms(), req.availableTimeslots());
        return ResponseEntity.ok(recommendations);
    }

    // DTOs for inputs
    public record SupervisorReqDto(String studentId, String subjectId, String academicYear, List<String> studentSkills, List<String> subjectKeywords) {}
    public record SubjectReqDto(String studentId, String academicYear, List<String> studentSkills) {}
    public record JuryReqDto(String projectId, String academicYear, List<String> requiredDomains) {}
    public record ScheduleReqDto(String projectId, String academicYear, List<String> availableRooms, List<String> availableTimeslots) {}
}
