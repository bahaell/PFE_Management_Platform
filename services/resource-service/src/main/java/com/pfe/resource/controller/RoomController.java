package com.pfe.resource.controller;

import com.pfe.resource.dto.RoomDto;
import com.pfe.resource.dto.RoomAvailabilityDto;
import com.pfe.resource.dto.RoomReservationDto;
import com.pfe.resource.service.RoomService;

import lombok.RequiredArgsConstructor;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    // --- ROOM CRUD ---

    @GetMapping
    public List<RoomDto> getAll() {
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public RoomDto getById(@PathVariable Long id) {
        return roomService.getRoomById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RoomDto create(@RequestBody RoomDto req) {
        return roomService.createRoom(req);
    }

    @PutMapping("/{id}")
    public RoomDto update(@PathVariable Long id, @RequestBody RoomDto req) {
        return roomService.updateRoom(id, req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        roomService.deleteRoom(id);
    }

    // --- SCHEDULER APIs ---

    @GetMapping("/available")
    public List<RoomDto> getAvailableRooms(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTime,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTime,
            @RequestParam(defaultValue = "0") int capacity,
            @RequestParam(required = false) String academicYear) {
        if (date == null || startTime == null || endTime == null) {
            return roomService.getAvailableRooms(capacity);
        }
        return roomService.findAvailableRooms(date, startTime, endTime, capacity, academicYear);
    }

    @PostMapping("/book")
    @ResponseStatus(HttpStatus.CREATED)
    public RoomReservationDto bookRoom(@RequestBody RoomReservationDto req) {
        return roomService.bookRoom(req);
    }

    // --- AVAILABILITY CONFIGURATION ---

    @PostMapping("/{roomId}/availabilities")
    @ResponseStatus(HttpStatus.CREATED)
    public RoomAvailabilityDto addRoomAvailability(
            @PathVariable Long roomId,
            @RequestBody RoomAvailabilityDto slot) {
        slot.setRoomId(roomId);
        return roomService.addAvailability(slot);
    }

    @GetMapping("/{roomId}/availabilities")
    public List<RoomAvailabilityDto> getRoomAvailabilities(
            @PathVariable Long roomId,
            @RequestParam(required = false) String academicYear) {
        return roomService.getAvailabilities(roomId, academicYear);
    }

    @PutMapping("/{roomId}/availabilities/{availabilityId}")
    public RoomAvailabilityDto updateRoomAvailability(
            @PathVariable Long roomId,
            @PathVariable Long availabilityId,
            @RequestBody RoomAvailabilityDto slot) {
        slot.setRoomId(roomId);
        return roomService.updateAvailability(roomId, availabilityId, slot);
    }

    @DeleteMapping("/{roomId}/availabilities/{availabilityId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoomAvailability(
            @PathVariable Long roomId,
            @PathVariable Long availabilityId) {
        roomService.deleteAvailability(roomId, availabilityId);
    }

    @GetMapping("/{roomId}/availabilities/validate-overlap")
    public boolean validateAvailabilityOverlap(
            @PathVariable Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime endTime,
            @RequestParam(required = false) Long excludeId,
            @RequestParam(required = false) String academicYear) {
        return roomService.hasNoAvailabilityOverlap(roomId, startTime, endTime, excludeId, academicYear);
    }
}
