package com.pfe.scheduling.controller;

import com.pfe.scheduling.dto.*;
import com.pfe.scheduling.service.*;
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
    private final ScheduledDefenseService defenseService;
    private final PendingRequestService pendingService;
    private final StatisticsService statisticsService;

    // ── TIMEFOLD SOLVER ──────────────────────────────────────────

    @PostMapping("/solve")
    public ResponseEntity<Map<String, Long>> solve(
            @RequestBody List<DefenseSessionRequest> requests) {
        Long jobId = schedulingService.solve(requests);
        return ResponseEntity.accepted().body(Map.of("jobId", jobId));
    }

    @GetMapping("/result/{jobId}")
    public ResponseEntity<?> getResult(@PathVariable Long jobId) {
        try {
            DefenseTimetable result = schedulingService.getResult(jobId);
            return ResponseEntity.ok(result);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Solver error: " + e.getMessage()));
        }
    }

    // ── SCHEDULED DEFENSES ───────────────────────────────────────

    @GetMapping("/defenses")
    public List<ScheduledDefenseResponse> getAllDefenses() {
        return defenseService.getAll();
    }

    @GetMapping("/defenses/{id}")
    public ScheduledDefenseResponse getDefenseById(@PathVariable Long id) {
        return defenseService.getById(id);
    }

    @PostMapping("/defenses")
    @ResponseStatus(HttpStatus.CREATED)
    public ScheduledDefenseResponse createDefense(
            @RequestBody ScheduledDefenseRequest req) {
        return defenseService.create(req);
    }

    @PutMapping("/defenses/{id}")
    public ScheduledDefenseResponse updateDefense(
            @PathVariable Long id,
            @RequestBody ScheduledDefenseRequest req) {
        return defenseService.update(id, req);
    }

    @DeleteMapping("/defenses/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDefense(@PathVariable Long id) {
        defenseService.delete(id);
    }

    // ── PENDING REQUESTS ─────────────────────────────────────────

    @GetMapping("/pending")
    public List<PendingRequestDto> getAllPending() {
        return pendingService.getAll();
    }

    @GetMapping("/pending/{id}")
    public PendingRequestDto getPendingById(@PathVariable Long id) {
        return pendingService.getById(id);
    }

    @PostMapping("/pending")
    @ResponseStatus(HttpStatus.CREATED)
    public PendingRequestDto createPending(
            @RequestBody PendingRequestDto dto) {
        return pendingService.create(dto);
    }

    @PutMapping("/pending/{id}")
    public PendingRequestDto updatePending(
            @PathVariable Long id,
            @RequestBody PendingRequestDto dto) {
        return pendingService.update(id, dto);
    }

    @DeleteMapping("/pending/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePending(@PathVariable Long id) {
        pendingService.delete(id);
    }

    // ── STATISTICS ───────────────────────────────────────────────

    @GetMapping("/statistics")
    public StatisticsResponse getStatistics() {
        return statisticsService.getStatistics();
    }
}