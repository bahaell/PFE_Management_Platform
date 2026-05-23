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
    ProjectDTO getById(@PathVariable("id") Long id);

    /**
     * Liste tous les projets qui doivent être planifiés (status = PENDING_DEFENSE).
     * Utilisé par le solver Timefold pour construire le planning initial.
     *
     * GET /api/projects?status=PENDING_DEFENSE
     */
    @GetMapping("/api/projects")
    List<ProjectDTO> findByStatus(@RequestParam("status") String status);

    // ── DTO inline (inner record) ────────────────────────────────
    record ProjectDTO(
            Long id,
            String name,
            String status, // ACTIVE | PENDING_DEFENSE | COMPLETED
            String supervisorName) {
    }
}
