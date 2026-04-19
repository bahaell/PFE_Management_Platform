package com.pfe.scheduling.service;

import com.pfe.scheduling.dto.DefenseSessionRequest;
import com.pfe.scheduling.entity.DefenseSession;
import com.pfe.scheduling.feign.ProjectsClient;
import com.pfe.scheduling.feign.ResourceClient;
import com.pfe.scheduling.solver.DefenseTimetable;
import com.pfe.scheduling.solver.TimeSlot;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import ai.timefold.solver.core.api.solver.SolverManager;
import ai.timefold.solver.core.api.solver.SolverJob;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class SchedulingService {

    private final SolverManager<DefenseTimetable, Long> solverManager;
    private final ResourceClient resourceClient;
    private final ProjectsClient projectsClient;

    private final Map<Long, SolverJob<DefenseTimetable, Long>> jobs = new ConcurrentHashMap<>();

    // ─────────────────────────────────────────────────────────────────────────
    // SOLVE
    // ─────────────────────────────────────────────────────────────────────────

    public Long solve(List<DefenseSessionRequest> requests) {

        // 1. Available rooms → IDs (RoomDTO vient du record inline ResourceClient)
        List<Long> roomIds = resourceClient.getAvailableRooms()
                .stream()
                .map(ResourceClient.RoomDTO::id) // ← record accessor, pas getId()
                .toList();

        // 2. Time slots (5 jours × 4 créneaux)
        List<TimeSlot> slots = buildTimeSlots(LocalDate.now(), 5);

        // 3. Requests → DefenseSession (planning entities)
        // DefenseSessionRequest contient : projectId, juryMemberIds,
        // preferredRoomId, durationMinutes, notBefore, notAfter
        List<DefenseSession> sessions = requests.stream()
                .map(r -> {
                    // Récupère le nom du projet via Feign
                    ProjectsClient.ProjectDTO project = projectsClient.getById(r.getProjectId());

                    return DefenseSession.builder()
                            .projectId(r.getProjectId())
                            .projectName(project.name()) // record accessor
                            .supervisorName(project.supervisorName())
                            .juryMemberIds(r.getJuryMemberIds())
                            .durationMinutes(
                                    r.getDurationMinutes() != null
                                            ? r.getDurationMinutes()
                                            : 30)
                            .preferredRoomId(r.getPreferredRoomId())
                            .build();
                })
                .toList();

        // 4. Build + submit problem
        DefenseTimetable problem = new DefenseTimetable();
        problem.setTimeSlots(slots);
        problem.setRoomIds(roomIds);
        problem.setSessions(sessions);

        long jobId = System.currentTimeMillis();
        jobs.put(jobId, solverManager.solve(jobId, problem));
        return jobId;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET RESULT
    // ─────────────────────────────────────────────────────────────────────────

    public DefenseTimetable getResult(Long jobId) throws Exception {
        SolverJob<DefenseTimetable, Long> job = jobs.get(jobId);
        if (job == null) {
            throw new NoSuchElementException("No solver job found for id: " + jobId);
        }
        return job.getFinalBestSolution();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // TIME SLOT BUILDER
    // ─────────────────────────────────────────────────────────────────────────

    private List<TimeSlot> buildTimeSlots(LocalDate start, int days) {
        List<TimeSlot> slots = new ArrayList<>();
        String[][] times = {
                { "08:00", "10:00" },
                { "10:00", "12:00" },
                { "14:00", "16:00" },
                { "16:00", "18:00" }
        };
        for (int d = 0; d < days; d++) {
            LocalDate date = start.plusDays(d);
            for (String[] t : times) {
                slots.add(new TimeSlot(
                        UUID.randomUUID().toString(),
                        date,
                        LocalTime.parse(t[0]),
                        LocalTime.parse(t[1])));
            }
        }
        return slots;
    }
}