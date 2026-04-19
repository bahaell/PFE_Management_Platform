package com.pfe.resource.service;

import com.pfe.resource.dto.RoomRequest;
import com.pfe.resource.dto.RoomResponse;
import com.pfe.resource.entity.Room;
import com.pfe.resource.exception.ResourceNotFoundException;
import com.pfe.resource.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<RoomResponse> getAll() {
        return roomRepository.findAll().stream()
                .map(this::toResponse).toList();
    }

    public List<RoomResponse> getAvailable() {
        return roomRepository.findByAvailableTrue().stream()
                .map(this::toResponse).toList();
    }

    public RoomResponse getById(Long id) {
        return toResponse(roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found: " + id)));
    }

    public RoomResponse create(RoomRequest req) {
        Room r = Room.builder()
                .name(req.getName())
                .capacity(req.getCapacity())
                .hasProjector(req.isHasProjector())
                .hasWhiteboard(req.isHasWhiteboard())
                .building(req.getBuilding())
                .available(true)
                .build();

        return toResponse(roomRepository.save(r));
    }

    public RoomResponse update(Long id, RoomRequest req) {
        Room r = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found: " + id));

        r.setName(req.getName());
        r.setCapacity(req.getCapacity());
        r.setHasProjector(req.isHasProjector());
        r.setHasWhiteboard(req.isHasWhiteboard());
        r.setBuilding(req.getBuilding());
        r.setAvailable(req.isAvailable());

        return toResponse(roomRepository.save(r));
    }

    public void delete(Long id) {
        roomRepository.deleteById(id);
    }

    private RoomResponse toResponse(Room r) {
        return RoomResponse.builder()
                .id(r.getId())
                .name(r.getName())
                .capacity(r.getCapacity())
                .hasProjector(r.isHasProjector())
                .hasWhiteboard(r.isHasWhiteboard())
                .building(r.getBuilding())
                .available(r.isAvailable())
                .build();
    }
}