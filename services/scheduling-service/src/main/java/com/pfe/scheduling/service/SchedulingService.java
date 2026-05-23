package com.pfe.scheduling.service;

import com.pfe.scheduling.dto.DefenseSessionRequest;
import com.pfe.scheduling.entity.DefenseSession;
import com.pfe.scheduling.feign.ProjectsClient;
import com.pfe.scheduling.feign.ResourceClient;
import com.pfe.scheduling.feign.UserClient;
import com.pfe.scheduling.solver.DefenseTimetable;
import com.pfe.scheduling.solver.TimeSlot;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import ai.timefold.solver.core.api.solver.SolverManager;
import ai.timefold.solver.core.api.solver.SolverJob;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SchedulingService {

    private final SolverManager<DefenseTimetable, Long> solverManager;
    private final ResourceClient resourceClient;
    private final ProjectsClient projectsClient;
    private final UserClient     userClient;

    private final Map<Long, SolverJob<DefenseTimetable, Long>> jobs =
            new ConcurrentHashMap<>();

    // ─────────────────────────────────────────────────────────────
    //  SOLVE
    // ─────────────────────────────────────────────────────────────

    public Long solve(List<DefenseSessionRequest> requests) {

        // 1. Salles disponibles depuis resource-service
        List<Long> roomIds = resourceClient.getAvailableRooms()
                .stream()
                .map(ResourceClient.RoomDTO::id)
                .toList();

        if (roomIds.isEmpty()) {
            log.warn("No available rooms found — solver may not find a solution");
        }

        // 2. Créneaux horaires (5 jours × 4 créneaux)
        List<TimeSlot> slots = buildTimeSlots(LocalDate.now(), 5);

        // 3. Construire les planning entities
        List<DefenseSession> sessions = requests.stream()
                .map(this::buildSession)
                .toList();

        // 4. Assembler le problème et soumettre à Timefold
        DefenseTimetable problem = new DefenseTimetable();
        problem.setTimeSlots(slots);
        problem.setRoomIds(roomIds);
        problem.setSessions(sessions);

        long jobId = System.currentTimeMillis();
        jobs.put(jobId, solverManager.solve(jobId, problem));

        log.info("Solver started — jobId={} sessions={} rooms={} slots={}",
                jobId, sessions.size(), roomIds.size(), slots.size());

        return jobId;
    }

    // ─────────────────────────────────────────────────────────────
    //  GET RESULT
    // ─────────────────────────────────────────────────────────────

    public DefenseTimetable getResult(Long jobId) throws Exception {
        SolverJob<DefenseTimetable, Long> job = jobs.get(jobId);
        if (job == null) {
            throw new NoSuchElementException("No solver job found for id: " + jobId);
        }
        return job.getFinalBestSolution();
    }

    // ─────────────────────────────────────────────────────────────
    //  BUILD SESSION
    // ─────────────────────────────────────────────────────────────

    private DefenseSession buildSession(DefenseSessionRequest r) {

        // ── Projet ──────────────────────────────────────────────
        String projectName    = "Unknown";
        String supervisorName = null;

        try {
<<<<<<< Updated upstream
            ProjectsClient.ProjectDTO project =
                    projectsClient.getById(r.getProjectId());
            projectName    = project.name();
=======
            ProjectsClient.ProjectDTO project = projectsClient.getById(r.getProjectId());
            projectName = project.title() != null ? project.title() : project.name();
            if (projectName == null) {
                projectName = "Unknown";
            }
>>>>>>> Stashed changes
            supervisorName = project.supervisorName();
        } catch (Exception e) {
            log.warn("Could not fetch project {} — using defaults: {}",
                    r.getProjectId(), e.getMessage());
        }

        // ── Jury — noms + disponibilités ────────────────────────
        List<String> juryNames  = new ArrayList<>();
        List<String> juryAvails = new ArrayList<>();

       if (r.getJuryMemberIds() != null) {
    for (String juryId : r.getJuryMemberIds()) {
        log.info(">>> Fetching jury member id='{}'", juryId);
        try {
            UserClient.UserDto user = userClient.getUserById(juryId);
            log.info(">>> Got user: name='{}' email='{}'", user.name(), user.email());

            if (user.name() != null) {
                juryNames.add(user.name());
            }

            List<UserClient.TeacherAvailabilityDto> avails =
                    userClient.getTeacherAvailability(juryId);

            log.info(">>> Availabilities for '{}': count={}", juryId, avails.size());

            avails.stream()
                    .map(a -> a.start() + "_" + a.end())
                    .forEach(juryAvails::add);

        } catch (Exception e) {
            log.error(">>> FAILED for jury id='{}' — [{}] {}",
                    juryId,
                    e.getClass().getSimpleName(),
                    e.getMessage());
        }
    }
}

        return DefenseSession.builder()
                .projectId(r.getProjectId())
                .projectName(projectName)
                .supervisorName(supervisorName)
                .juryMemberIds(r.getJuryMemberIds())
                .juryMemberNames(juryNames)
                .juryAvailabilities(juryAvails)
                .durationMinutes(r.getDurationMinutes() != null
                        ? r.getDurationMinutes() : 30)
                .preferredRoomId(r.getPreferredRoomId())
                .build();
    }

    // ─────────────────────────────────────────────────────────────
    //  TIME SLOT BUILDER
    // ─────────────────────────────────────────────────────────────

    private List<TimeSlot> buildTimeSlots(LocalDate start, int days) {
        List<TimeSlot> slots = new ArrayList<>();

        String[][] times = {
            {"08:00", "10:00"},
            {"10:00", "12:00"},
            {"14:00", "16:00"},
            {"16:00", "18:00"}
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