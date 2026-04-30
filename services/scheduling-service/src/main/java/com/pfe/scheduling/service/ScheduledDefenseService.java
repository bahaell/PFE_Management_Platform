package com.pfe.scheduling.service;

import com.pfe.scheduling.dto.*;
import com.pfe.scheduling.entity.ScheduledDefense;
import com.pfe.scheduling.exception.SchedulingNotFoundException;
import com.pfe.scheduling.repository.ScheduledDefenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduledDefenseService {

    private final ScheduledDefenseRepository repository;

    public List<ScheduledDefenseResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).toList();
    }

    public ScheduledDefenseResponse getById(Long id) {
        return toResponse(findOrThrow(id));
    }

    public ScheduledDefenseResponse create(ScheduledDefenseRequest req) {
        ScheduledDefense entity = ScheduledDefense.builder()
                .projectName(req.getProjectName())
                .student(req.getStudent())
                .date(req.getDate())
                .time(req.getTime())
                .room(req.getRoom())
                .juryMemberNames(req.getJuryMemberNames())
                .status(parseStatus(req.getStatus()))
                .build();
        return toResponse(repository.save(entity));
    }

    public ScheduledDefenseResponse update(Long id, ScheduledDefenseRequest req) {
        ScheduledDefense entity = findOrThrow(id);
        entity.setProjectName(req.getProjectName());
        entity.setStudent(req.getStudent());
        entity.setDate(req.getDate());
        entity.setTime(req.getTime());
        entity.setRoom(req.getRoom());
        entity.setJuryMemberNames(req.getJuryMemberNames());
        entity.setStatus(parseStatus(req.getStatus()));
        return toResponse(repository.save(entity));
    }

    public void delete(Long id) {
        findOrThrow(id);
        repository.deleteById(id);
    }

    // ── helpers ──────────────────────────────────────────────────
    private ScheduledDefense findOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new SchedulingNotFoundException(
                        "Defense not found: " + id));
    }

    private ScheduledDefense.DefenseStatus parseStatus(String s) {
        if (s == null)
            return ScheduledDefense.DefenseStatus.scheduled;
        return ScheduledDefense.DefenseStatus.valueOf(s);
    }

    private ScheduledDefenseResponse toResponse(ScheduledDefense e) {
        return ScheduledDefenseResponse.builder()
                .id(e.getId())
                .projectName(e.getProjectName())
                .student(e.getStudent())
                .date(e.getDate())
                .time(e.getTime())
                .room(e.getRoom())
                .juryMemberNames(e.getJuryMemberNames())
                .status(e.getStatus() != null ? e.getStatus().name() : null)
                .build();
    }
}