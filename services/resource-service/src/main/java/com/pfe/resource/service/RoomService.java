package com.pfe.resource.service;

import com.pfe.resource.dto.RoomRequest;
import com.pfe.resource.dto.RoomResponse;
import com.pfe.resource.dto.*;
import com.pfe.resource.entity.Room;
import com.pfe.resource.entity.Equipment;
import com.pfe.resource.entity.RoomBooking;
import com.pfe.resource.exception.ResourceNotFoundException;
import com.pfe.resource.repository.EquipmentRepository;
import com.pfe.resource.repository.RoomBookingRepository;
import com.pfe.resource.repository.RoomRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final EquipmentRepository equipmentRepository;
    private final RoomBookingRepository roomBookingRepository;

    public List<RoomResponse> getAll() {
        return roomRepository.findAll().stream()
                .map(this::toResponse).toList();
    }

    public List<RoomResponse> getAvailable() {
        return roomRepository.findByStatus("available").stream()
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
                .location(req.getLocation())
                .building(req.getBuilding())
                .floor(req.getFloor())
                .status(req.getStatus())
                .description(req.getDescription())
                .build();

        return toResponse(roomRepository.save(r));
    }

    public RoomResponse update(Long id, RoomRequest req) {
        Room r = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found: " + id));

        r.setName(req.getName());
        r.setCapacity(req.getCapacity());
        r.setLocation(req.getLocation());
        r.setBuilding(req.getBuilding());
        r.setFloor(req.getFloor());
        r.setStatus(req.getStatus());
        r.setDescription(req.getDescription());

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
                .location(r.getLocation())
                .building(r.getBuilding())
                .floor(r.getFloor())
                .status(r.getStatus())
                .description(r.getDescription())
                .equipment(buildEquipment(r.getId()))
                .bookings(buildBookings(r.getId()))
                .maintenanceSchedule(buildMaintenance(r.getId()))
                .build();
    }

    private EquipmentMapDto buildEquipment(Long roomId) {
        java.util.Map<String, EquipmentItemDto> map = new java.util.HashMap<>();
        java.util.List<String> keys = java.util.List.of("projector", "smartBoard", "speakers", "microphone",
                "hdmiSystem",
                "recordingCamera", "airConditioning", "ethernet", "wifi", "screen");
        for (String key : keys) {
            map.put(key, EquipmentItemDto.builder().present(false).status("missing").build());
        }
        for (Equipment e : equipmentRepository.findByRoomId(roomId)) {
            if (keys.contains(e.getType())) {
                map.put(e.getType(), EquipmentItemDto.builder()
                        .present(e.isPresent())
                        .status(e.getStatus())
                        .code(e.getCode())
                        .build());
            }
        }
        return EquipmentMapDto.builder()
                .projector(map.get("projector"))
                .smartBoard(map.get("smartBoard"))
                .speakers(map.get("speakers"))
                .microphone(map.get("microphone"))
                .hdmiSystem(map.get("hdmiSystem"))
                .recordingCamera(map.get("recordingCamera"))
                .airConditioning(map.get("airConditioning"))
                .ethernet(map.get("ethernet"))
                .wifi(map.get("wifi"))
                .screen(map.get("screen"))
                .build();
    }

    private java.util.List<RoomBookingResponse> buildBookings(Long roomId) {
        return roomBookingRepository.findByRoomId(roomId).stream().map(this::toBookingResponse).toList();
    }

    private java.util.List<MaintenanceScheduleItemDto> buildMaintenance(Long roomId) {
        return roomBookingRepository.findByRoomId(roomId).stream()
                .filter(b -> "maintenance".equalsIgnoreCase(b.getType()))
                .map(b -> MaintenanceScheduleItemDto.builder().date(b.getDate()).reason("Scheduled maintenance")
                        .build())
                .toList();
    }

    private RoomBookingResponse toBookingResponse(RoomBooking b) {
        return RoomBookingResponse.builder()
                .id(b.getId())
                .date(b.getDate())
                .start(b.getStart())
                .end(b.getEnd_date())
                .type(b.getType())
                .project(b.getProject())
                .studentName(b.getStudentName())
                .status(b.getStatus())
                .build();
    }
}