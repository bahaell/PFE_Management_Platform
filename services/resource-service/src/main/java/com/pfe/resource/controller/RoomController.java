package com.pfe.resource.controller;

import com.pfe.resource.dto.RoomRequest;
import com.pfe.resource.dto.RoomResponse;
import com.pfe.resource.dto.RoomAvailabilityDto;
import com.pfe.resource.dto.RoomAvailabilityDataResponse;
import com.pfe.resource.service.RoomAvailabilityService;
import com.pfe.resource.service.RoomService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;
    private final RoomAvailabilityService roomAvailabilityService;

    @GetMapping
    public List<RoomResponse> getAll() {
        return roomService.getAll();
    }

    @GetMapping("/available")
    public List<RoomResponse> getAvailable() {
        return roomService.getAvailable();
    }

    @GetMapping("/{id}")
    public RoomResponse getById(@PathVariable Long id) {
        return roomService.getById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoomResponse create(@Valid @RequestBody RoomRequest req) {
        return roomService.create(req);
    }

    @PutMapping("/{id}")
    public RoomResponse update(@PathVariable Long id, @Valid @RequestBody RoomRequest req) {
        return roomService.update(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        roomService.delete(id);
    }

    @GetMapping("/{roomId}/availability")
    public RoomAvailabilityDataResponse getRoomAvailability(@PathVariable Long roomId) {
        return roomAvailabilityService.getRoomAvailability(roomId);
    }

    @PostMapping("/{roomId}/availability")
    @ResponseStatus(HttpStatus.CREATED)
    public RoomAvailabilityDto addRoomSlot(@PathVariable Long roomId, @RequestBody RoomAvailabilityDto slot) {
        return roomAvailabilityService.addRoomSlot(roomId, slot);
    }

    @PatchMapping("/{roomId}/availability/{slotId}")
    public RoomAvailabilityDto updateRoomSlot(
            @PathVariable Long roomId,
            @PathVariable Long slotId,
            @RequestBody RoomAvailabilityDto slot) {
        return roomAvailabilityService.updateRoomSlot(roomId, slotId, slot);
    }

    @DeleteMapping("/{roomId}/availability/{slotId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoomSlot(@PathVariable Long roomId, @PathVariable Long slotId) {
        roomAvailabilityService.deleteRoomSlot(roomId, slotId);
    }

    @GetMapping("/{roomId}/availability/validate-overlap")
    public java.util.Map<String, Boolean> validateNoOverlap(
            @PathVariable Long roomId,
            @RequestParam String start,
            @RequestParam String end,
            @RequestParam(required = false) Long excludeId) {
        return java.util.Map.of("valid", roomAvailabilityService.validateNoOverlap(roomId, start, end, excludeId));
    }
}