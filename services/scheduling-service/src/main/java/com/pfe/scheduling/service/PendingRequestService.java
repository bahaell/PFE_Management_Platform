package com.pfe.scheduling.service;

import com.pfe.scheduling.dto.PendingRequestDto;
import com.pfe.scheduling.entity.PendingDefenseRequest;
import com.pfe.scheduling.exception.SchedulingNotFoundException;
import com.pfe.scheduling.repository.PendingDefenseRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PendingRequestService {

    private final PendingDefenseRequestRepository repository;

    public List<PendingRequestDto> getAll() {
        return repository.findAll().stream().map(this::toDto).toList();
    }

    public PendingRequestDto getById(Long id) {
        return toDto(findOrThrow(id));
    }

    public PendingRequestDto create(PendingRequestDto dto) {
        PendingDefenseRequest entity = toEntity(dto);
        return toDto(repository.save(entity));
    }

    public PendingRequestDto update(Long id, PendingRequestDto dto) {
        findOrThrow(id);
        PendingDefenseRequest entity = toEntity(dto);
        entity.setId(id);
        return toDto(repository.save(entity));
    }

    public void delete(Long id) {
        findOrThrow(id);
        repository.deleteById(id);
    }

    // ── helpers ──────────────────────────────────────────────────
    private PendingDefenseRequest findOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new SchedulingNotFoundException(
                        "Pending request not found: " + id));
    }

    private PendingDefenseRequest toEntity(PendingRequestDto dto) {
        return PendingDefenseRequest.builder()
                .projectId(dto.getProjectId())
                .projectName(dto.getProjectName())
                .studentName(dto.getStudentName())
                .assignedTeacherName(dto.getAssignedTeacherName())
                .dateRangeFrom(dto.getDateRangeFrom())
                .dateRangeTo(dto.getDateRangeTo())
                .priority(dto.getPriority() != null
                        ? PendingDefenseRequest.Priority.valueOf(dto.getPriority())
                        : PendingDefenseRequest.Priority.medium)
                .build();
    }

    private PendingRequestDto toDto(PendingDefenseRequest e) {
        return PendingRequestDto.builder()
                .id(e.getId())
                .projectId(e.getProjectId())
                .projectName(e.getProjectName())
                .studentName(e.getStudentName())
                .assignedTeacherName(e.getAssignedTeacherName())
                .dateRangeFrom(e.getDateRangeFrom())
                .dateRangeTo(e.getDateRangeTo())
                .priority(e.getPriority() != null ? e.getPriority().name() : null)
                .build();
    }
}