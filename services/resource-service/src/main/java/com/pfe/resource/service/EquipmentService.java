package com.pfe.resource.service;

import com.pfe.resource.dto.*;
import com.pfe.resource.entity.*;
import com.pfe.resource.exception.ResourceNotFoundException;
import com.pfe.resource.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final EquipmentRepository equipmentRepository;
    private final RoomRepository roomRepository;

    // ── READ ─────────────────────────────────────────────────────────

    public List<EquipmentResponse> getAll() {
        return equipmentRepository.findAll()
                .stream().map(this::toResponse).toList();
    }

    public List<EquipmentResponse> getAvailable() {
        return equipmentRepository.findByAvailableTrue()
                .stream().map(this::toResponse).toList();
    }

    public List<EquipmentResponse> getByRoom(Long roomId) {
        return equipmentRepository.findByRoomId(roomId)
                .stream().map(this::toResponse).toList();
    }

    public List<EquipmentResponse> getByType(String type) {
        return equipmentRepository.findByTypeAndAvailableTrue(type)
                .stream().map(this::toResponse).toList();
    }

    public EquipmentResponse getById(Long id) {
        return toResponse(findOrThrow(id));
    }

    // ── CREATE ───────────────────────────────────────────────────────

    public EquipmentResponse create(EquipmentRequest req) {
        Room room = resolveRoom(req.getRoomId());

        Equipment e = Equipment.builder()
                .name(req.getName())
                .type(req.getType())
                .available(req.isAvailable())
                .room(room)
                .build();

        return toResponse(equipmentRepository.save(e));
    }

    // ── UPDATE ───────────────────────────────────────────────────────

    public EquipmentResponse update(Long id, EquipmentRequest req) {
        Equipment e = findOrThrow(id);
        Room room = resolveRoom(req.getRoomId());

        e.setName(req.getName());
        e.setType(req.getType());
        e.setAvailable(req.isAvailable());
        e.setRoom(room);

        return toResponse(equipmentRepository.save(e));
    }

    // ── DELETE ───────────────────────────────────────────────────────

    public void delete(Long id) {
        findOrThrow(id); // 404 if missing
        equipmentRepository.deleteById(id);
    }

    // ── HELPERS ──────────────────────────────────────────────────────

    private Equipment findOrThrow(Long id) {
        return equipmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipment not found: " + id));
    }

    /** Returns null if roomId is null — equipment can be unassigned. */
    private Room resolveRoom(Long roomId) {
        if (roomId == null)
            return null;
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found: " + roomId));
    }

    private EquipmentResponse toResponse(Equipment e) {
        return EquipmentResponse.builder()
                .id(e.getId())
                .name(e.getName())
                .type(e.getType())
                .available(e.isAvailable())
                .roomId(e.getRoom() != null ? e.getRoom().getId() : null)
                .roomName(e.getRoom() != null ? e.getRoom().getName() : null)
                .build();
    }
}
