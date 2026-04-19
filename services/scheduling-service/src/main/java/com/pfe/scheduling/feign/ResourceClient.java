package com.pfe.scheduling.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Feign client → resource-service
 * URL configurée dans application.yml : services.resource.url
 */
@FeignClient(name = "resource-service", url = "${services.resource.url}")
public interface ResourceClient {

    /**
     * Récupère toutes les salles disponibles.
     * Timefold les utilise comme liste de ressources possibles (@PlanningVariable).
     *
     * GET /api/rooms/available
     */
    @GetMapping("/api/rooms/available")
    List<RoomDTO> getAvailableRooms();

    /**
     * Récupère une salle par ID — pour valider preferredRoomId dans la request.
     *
     * GET /api/rooms/{id}
     */
    @GetMapping("/api/rooms/{id}")
    RoomDTO getRoomById(@PathVariable("id") Long id);

    /**
     * Récupère les équipements disponibles d'un type donné.
     * Optionnel — utile si la soutenance nécessite un projecteur, etc.
     *
     * GET /api/equipment/type/{type}
     */
    @GetMapping("/api/equipment/type/{type}")
    List<EquipmentDTO> getAvailableEquipmentByType(@PathVariable("type") String type);

    // ── DTOs inline ─────────────────────────────────────────────
    record RoomDTO(
            Long id,
            String name,
            int capacity,
            boolean hasProjector,
            boolean hasWhiteboard,
            String building,
            boolean available) {
    }

    record EquipmentDTO(
            Long id,
            String name,
            String type,
            boolean available,
            Long roomId,
            String roomName) {
    }
}
