package com.pfe.scheduling.controller;

import com.pfe.scheduling.dto.*;
import com.pfe.scheduling.entity.AcademicPeriod;
import com.pfe.scheduling.entity.DefenseJury;
import com.pfe.scheduling.entity.DefenseSession;
import com.pfe.scheduling.entity.JuryRole;
import com.pfe.scheduling.service.*;
import com.pfe.scheduling.solver.DefenseTimetable;
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
    private final DefenseManagementService defenseService;
    private final AcademicPeriodService academicPeriodService;

    // ── TIMEFOLD SOLVER ──────────────────────────────────────────

    @PostMapping("/solve")
    public ResponseEntity<Map<String, Long>> solve(@RequestBody List<DefenseSessionRequest> requests) {
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

    // ── DEFENSE SESSIONS ───────────────────────────────────────

    @GetMapping("/defenses")
    public List<DefenseSession> getAllDefenses() {
        return defenseService.getAllDefenses();
    }

    @GetMapping("/defenses/{id}")
    public DefenseSession getDefenseById(@PathVariable Long id) {
        return defenseService.getDefenseById(id);
    }

    @PostMapping("/defenses")
    @ResponseStatus(HttpStatus.CREATED)
    public DefenseSession createDefense(@RequestBody DefenseSession req) {
        return defenseService.createDefense(req);
    }

    @PutMapping("/defenses/{id}")
    public DefenseSession updateDefense(
            @PathVariable Long id,
            @RequestBody DefenseSession req,
            @RequestParam(defaultValue = "false") boolean forceOverride) {
        return defenseService.updateDefense(id, req, forceOverride);
    }

    @DeleteMapping("/defenses/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDefense(@PathVariable Long id) {
        defenseService.deleteDefense(id);
    }

    @PostMapping("/defenses/{id}/jury")
    @ResponseStatus(HttpStatus.CREATED)
    public DefenseJury addJuryMember(
            @PathVariable Long id,
            @RequestParam String teacherId,
            @RequestParam JuryRole role,
            @RequestParam(defaultValue = "false") boolean forceOverride) {
        return defenseService.addJuryMember(id, teacherId, role, forceOverride);
    }

    @GetMapping("/defenses/{id}/jury")
    public List<DefenseJury> getJuryMembers(@PathVariable Long id) {
        return defenseService.getJuryMembers(id);
    }

    @PutMapping("/defenses/{id}/jury/{juryId}")
    public DefenseJury updateJuryMember(
            @PathVariable Long id,
            @PathVariable Long juryId,
            @RequestParam String teacherId,
            @RequestParam JuryRole role,
            @RequestParam(defaultValue = "false") boolean forceOverride) {
        return defenseService.updateJuryMember(id, juryId, teacherId, role, forceOverride);
    }

    @DeleteMapping("/defenses/{id}/jury/{juryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteJuryMember(@PathVariable Long id, @PathVariable Long juryId) {
        defenseService.deleteJuryMember(id, juryId);
    }

    // ── ACADEMIC PERIODS ───────────────────────────────────────

    @GetMapping("/periods")
    public List<AcademicPeriod> getAllPeriods() {
        return academicPeriodService.getAllPeriods();
    }

    @GetMapping("/periods/active")
    public AcademicPeriod getActivePeriod() {
        return academicPeriodService.getActivePeriod();
    }

    @PostMapping("/periods")
    @ResponseStatus(HttpStatus.CREATED)
    public AcademicPeriod createPeriod(@RequestBody AcademicPeriod period) {
        return academicPeriodService.createPeriod(period);
    }

    @PutMapping("/periods/{id}/activate")
    public AcademicPeriod activatePeriod(@PathVariable Long id) {
        return academicPeriodService.activatePeriod(id);
    }
}
