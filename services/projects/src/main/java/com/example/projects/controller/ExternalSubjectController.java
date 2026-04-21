package com.example.projects.controller;

import com.example.projects.dto.ExternalSubjectRequestDto;
import com.example.projects.dto.ExternalSubjectResponseDto;
import com.example.projects.entity.ExternalSubjectRequest;
import com.example.projects.entity.ExternalSubjectStatus;
import com.example.projects.repository.ExternalSubjectRequestRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects/external-subjects")
@RequiredArgsConstructor
public class ExternalSubjectController {

    private final ExternalSubjectRequestRepository repository;

    @PostMapping
    public ResponseEntity<ExternalSubjectResponseDto> create(
            @Valid @RequestBody ExternalSubjectRequestDto request,
            @RequestHeader(value = "X-User-Id", required = false) String userId) {
        ExternalSubjectRequest entity = ExternalSubjectRequest.builder()
                .studentId(userId != null && !userId.isBlank() ? userId : "anonymous-student")
                .studentName(request.getStudentName())
                .teacherId(request.getTeacherId())
                .teacherName(request.getTeacherName())
                .status(request.getStatus() != null ? request.getStatus() : ExternalSubjectStatus.PENDING)
                .subjectTitle(request.getSubjectTitle())
                .subjectDescription(request.getSubjectDescription())
                .motivation(request.getMotivation())
                .companyId(request.getCompanyId())
                .companyName(request.getCompanyName())
                .companyDescription(request.getCompanyDescription())
                .companyPhone(request.getCompanyPhone())
                .companyEmail(request.getCompanyEmail())
                .companySupervisorName(request.getCompanySupervisorName())
                .companySupervisorEmail(request.getCompanySupervisorEmail())
                .build();

        return new ResponseEntity<>(toDto(repository.save(entity)), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ExternalSubjectResponseDto>> getAll() {
        return ResponseEntity.ok(repository.findAll().stream().map(this::toDto).toList());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ExternalSubjectResponseDto>> getByStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(repository.findByStudentId(studentId).stream().map(this::toDto).toList());
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<ExternalSubjectResponseDto>> getByTeacher(@PathVariable String teacherId) {
        return ResponseEntity.ok(repository.findByTeacherId(teacherId).stream().map(this::toDto).toList());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ExternalSubjectResponseDto> updateStatus(
            @PathVariable UUID id,
            @RequestParam ExternalSubjectStatus status,
            @RequestHeader(value = "X-User-Id", required = false) String teacherId,
            @RequestHeader(value = "X-User-Name", required = false) String teacherName) {
        ExternalSubjectRequest entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("External subject request not found: " + id));
        entity.setStatus(status);
        if (teacherId != null && !teacherId.isBlank()) {
            entity.setTeacherId(teacherId);
        }
        if (teacherName != null && !teacherName.isBlank()) {
            entity.setTeacherName(teacherName);
        }
        return ResponseEntity.ok(toDto(repository.save(entity)));
    }

    private ExternalSubjectResponseDto toDto(ExternalSubjectRequest entity) {
        return ExternalSubjectResponseDto.builder()
                .id(entity.getId().toString())
                .studentId(entity.getStudentId())
                .studentName(entity.getStudentName())
                .teacherId(entity.getTeacherId())
                .teacherName(entity.getTeacherName())
                .status(entity.getStatus())
                .subjectTitle(entity.getSubjectTitle())
                .subjectDescription(entity.getSubjectDescription())
                .motivation(entity.getMotivation())
                .companyId(entity.getCompanyId())
                .companyName(entity.getCompanyName())
                .companyDescription(entity.getCompanyDescription())
                .companyPhone(entity.getCompanyPhone())
                .companyEmail(entity.getCompanyEmail())
                .companySupervisorName(entity.getCompanySupervisorName())
                .companySupervisorEmail(entity.getCompanySupervisorEmail())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
