package com.pfe.scheduling.controller;

import com.pfe.scheduling.dto.DefenseSessionRequest;
import com.pfe.scheduling.service.SchedulingService;
import com.pfe.scheduling.solver.DefenseTimetable;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final SchedulingService schedulingService;

    // POST /api/schedule/solve
    @PostMapping("/solve")
    public ResponseEntity<Map<String, Long>> solve(
            @Valid @RequestBody List<DefenseSessionRequest> requests) {

        Long jobId = schedulingService.solve(requests);
        return ResponseEntity.accepted().body(Map.of("jobId", jobId));
    }

    // GET /api/schedule/result/{jobId}
    @GetMapping("/result/{jobId}")
    public ResponseEntity<?> getResult(@PathVariable Long jobId) {
        try {
            DefenseTimetable result = schedulingService.getResult(jobId);
            return ResponseEntity.ok(result);

        } catch (NoSuchElementException e) {
            // jobId inconnu
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));

        } catch (Exception e) {
            // solver error (interruption, timeout, etc.)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Solver error: " + e.getMessage()));
        }
    }
}