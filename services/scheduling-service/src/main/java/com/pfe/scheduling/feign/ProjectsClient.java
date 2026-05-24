package com.pfe.scheduling.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Feign client → projects-service
 * URL configurée dans application.yml : services.projects.url
 */
@FeignClient(name = "projects-service", url = "${services.projects.url}")
public interface ProjectsClient {

    /**
     * Récupère un projet par son ID.
     * Utilisé par SchedulingService pour obtenir projectName avant de créer
     * un DefenseSession et pour valider que le projet existe.
     *
     * GET /api/projects/{id}
     */
    @GetMapping("/api/projects/{id}")
    ProjectDTO getById(@PathVariable("id") String id);

    /**
     * Liste les projets par statut. Le projects-service expose désormais les statuts:
     * PENDING, APPROVED, IN_PROGRESS, DEFENDED, REJECTED, ARCHIVED.
     */
    @GetMapping("/api/projects")
    List<ProjectDTO> findByStatus(@RequestParam("status") String status);

    @GetMapping("/api/projects/scheduling-candidates")
    List<SchedulingProjectDTO> findSchedulingCandidates(@RequestParam("status") String status);

    // ── DTO inline (inner record) ────────────────────────────────
    record ProjectDTO(
            String id,
            String title,
            String name,
            String status,
            String supervisorName,
            List<ProjectSupervisorDTO> supervisors) {
    }

    record ProjectSupervisorDTO(
            String teacherId,
            String role) {
    }

    record SchedulingProjectDTO(
            String projectId,
            String title,
            String status,
            String mainSupervisorId,
            List<String> memberStudentIds) {
    }
}
