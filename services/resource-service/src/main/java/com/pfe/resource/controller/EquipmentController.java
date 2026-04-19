package com.pfe.resource.controller;

import com.pfe.resource.dto.*;
import com.pfe.resource.service.EquipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@RequiredArgsConstructor
public class EquipmentController {

    private final EquipmentService equipmentService;

    // GET /api/equipment
    @GetMapping
    public List<EquipmentResponse> getAll() {
        return equipmentService.getAll();
    }

    // GET /api/equipment/available
    @GetMapping("/available")
    public List<EquipmentResponse> getAvailable() {
        return equipmentService.getAvailable();
    }

    // GET /api/equipment/room/{roomId}
    @GetMapping("/room/{roomId}")
    public List<EquipmentResponse> getByRoom(@PathVariable Long roomId) {
        return equipmentService.getByRoom(roomId);
    }

    // GET /api/equipment/type/{type} e.g. /type/PROJECTOR
    @GetMapping("/type/{type}")
    public List<EquipmentResponse> getByType(@PathVariable String type) {
        return equipmentService.getByType(type);
    }

    // GET /api/equipment/{id}
    @GetMapping("/{id}")
    public EquipmentResponse getById(@PathVariable Long id) {
        return equipmentService.getById(id);
    }

    // POST /api/equipment
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EquipmentResponse create(@Valid @RequestBody EquipmentRequest req) {
        return equipmentService.create(req);
    }

    // PUT /api/equipment/{id}
    @PutMapping("/{id}")
    public EquipmentResponse update(
            @PathVariable Long id,
            @Valid @RequestBody EquipmentRequest req) {
        return equipmentService.update(id, req);
    }

    // DELETE /api/equipment/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        equipmentService.delete(id);
    }
}
