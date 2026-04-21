package com.pfe.resource.service;

import com.pfe.resource.dto.RoomAvailabilityDataResponse;
import com.pfe.resource.dto.RoomAvailabilityDto;
import com.pfe.resource.entity.Room;
import com.pfe.resource.entity.RoomAvailabilitySlot;
import com.pfe.resource.exception.ResourceNotFoundException;
import com.pfe.resource.repository.RoomAvailabilitySlotRepository;
import com.pfe.resource.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomAvailabilityService {
    private final RoomRepository roomRepository;
    private final RoomAvailabilitySlotRepository slotRepository;

    public RoomAvailabilityDataResponse getRoomAvailability(Long roomId) {
        ensureRoom(roomId);
        return RoomAvailabilityDataResponse.builder()
                .roomId(roomId.toString())
                .availability(slotRepository.findByRoomId(roomId).stream().map(this::toDto).toList())
                .build();
    }

    public RoomAvailabilityDto addRoomSlot(Long roomId, RoomAvailabilityDto req) {
        Room room = ensureRoom(roomId);
        RoomAvailabilitySlot slot = RoomAvailabilitySlot.builder()
                .room(room)
                .start(req.getStart())
                .end(req.getEnd())
                .isMaintenance(req.isMaintenance())
                .reason(req.getReason())
                .build();
        return toDto(slotRepository.save(slot));
    }

    public RoomAvailabilityDto updateRoomSlot(Long roomId, Long slotId, RoomAvailabilityDto req) {
        ensureRoom(roomId);
        RoomAvailabilitySlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found: " + slotId));
        if (!slot.getRoom().getId().equals(roomId)) {
            throw new ResourceNotFoundException("Slot not found in room: " + roomId);
        }
        if (req.getStart() != null) slot.setStart(req.getStart());
        if (req.getEnd() != null) slot.setEnd(req.getEnd());
        slot.setMaintenance(req.isMaintenance());
        if (req.getReason() != null) slot.setReason(req.getReason());
        return toDto(slotRepository.save(slot));
    }

    public void deleteRoomSlot(Long roomId, Long slotId) {
        ensureRoom(roomId);
        RoomAvailabilitySlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found: " + slotId));
        if (!slot.getRoom().getId().equals(roomId)) {
            throw new ResourceNotFoundException("Slot not found in room: " + roomId);
        }
        slotRepository.delete(slot);
    }

    public boolean validateNoOverlap(Long roomId, String start, String end, Long excludeId) {
        ensureRoom(roomId);
        int newStart = timeToMinutes(start);
        int newEnd = timeToMinutes(end);
        List<RoomAvailabilitySlot> slots = slotRepository.findByRoomId(roomId);
        for (RoomAvailabilitySlot slot : slots) {
            if (excludeId != null && slot.getId().equals(excludeId)) continue;
            int slotStart = timeToMinutes(slot.getStart());
            int slotEnd = timeToMinutes(slot.getEnd());
            if (newStart < slotEnd && newEnd > slotStart) return false;
        }
        return true;
    }

    private int timeToMinutes(String time) {
        String[] parts = time.split(":");
        return Integer.parseInt(parts[0]) * 60 + Integer.parseInt(parts[1]);
    }

    private Room ensureRoom(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found: " + roomId));
    }

    private RoomAvailabilityDto toDto(RoomAvailabilitySlot slot) {
        return RoomAvailabilityDto.builder()
                .id(slot.getId())
                .start(slot.getStart())
                .end(slot.getEnd())
                .isMaintenance(slot.isMaintenance())
                .reason(slot.getReason())
                .build();
    }
}
