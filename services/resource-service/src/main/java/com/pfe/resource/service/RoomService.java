package com.pfe.resource.service;

import com.pfe.resource.dto.*;
import com.pfe.resource.entity.*;
import com.pfe.resource.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Year;
import java.text.Normalizer;
import java.util.Locale;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomAvailabilityRepository availabilityRepository;
    private final RoomReservationRepository reservationRepository;

    // --- ROOM CRUD ---

    public List<RoomDto> getAllRooms() {
        return roomRepository.findAll().stream().map(this::toRoomDto).collect(Collectors.toList());
    }

    public RoomDto getRoomById(Long id) {
        return roomRepository.findById(id).map(this::toRoomDto)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    @Transactional
    public RoomDto createRoom(RoomDto req) {
        Room room = Room.builder()
                .name(req.getName())
                .code(resolveRoomCode(req.getCode(), req.getName()))
                .capacity(req.getCapacity())
                .location(req.getLocation())
                .building(req.getBuilding())
                .floor(req.getFloor())
                .type(req.getType())
                .status(req.getStatus() != null ? req.getStatus() : RoomStatus.AVAILABLE)
                .hasProjector(req.isHasProjector())
                .hasComputers(req.isHasComputers())
                .hasInternet(req.isHasInternet())
                .description(req.getDescription())
                .build();
        return toRoomDto(roomRepository.save(room));
    }

    @Transactional
    public RoomDto updateRoom(Long id, RoomDto req) {
        Room room = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
        room.setName(req.getName());
        if (req.getCode() != null && !req.getCode().isBlank()) {
            room.setCode(req.getCode());
        }
        room.setCapacity(req.getCapacity());
        room.setLocation(req.getLocation());
        room.setBuilding(req.getBuilding());
        room.setFloor(req.getFloor());
        room.setType(req.getType());
        room.setStatus(req.getStatus());
        room.setHasProjector(req.isHasProjector());
        room.setHasComputers(req.isHasComputers());
        room.setHasInternet(req.isHasInternet());
        room.setDescription(req.getDescription());
        return toRoomDto(roomRepository.save(room));
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }

    // --- VALIDATION ENGINE & RESERVATIONS ---

    @Transactional
    public RoomReservationDto bookRoom(RoomReservationDto req) {
        Room room = roomRepository.findById(req.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // RULE 1: Capacity (Assume user checks capacity separately before booking, but we can enforce if we have student count)
        // RULE 2: Status Check
        if (room.getStatus() != RoomStatus.AVAILABLE) {
            throw new RuntimeException("Cannot book this room. Status is " + room.getStatus());
        }

        // RULE 3: Availability Window
        boolean isWithinAvailability = checkAvailabilityWindow(room.getId(), req.getDate(), req.getStartTime(), req.getEndTime(), req.getAcademicYear());
        if (!isWithinAvailability) {
            throw new RuntimeException("Room is not available during the requested time slot on this day.");
        }

        // RULE 4: No Overlap
        List<RoomReservation> overlaps = reservationRepository.findOverlappingReservations(
                room.getId(), req.getDate(), req.getStartTime(), req.getEndTime());

        if (!overlaps.isEmpty()) {
            throw new RuntimeException("Double booking detected. The room is already reserved for the requested time.");
        }

        RoomReservation reservation = RoomReservation.builder()
                .room(room)
                .defenseId(req.getDefenseId())
                .date(req.getDate())
                .startTime(req.getStartTime())
                .endTime(req.getEndTime())
                .status("CONFIRMED")
                .academicYear(req.getAcademicYear())
                .build();

        return toReservationDto(reservationRepository.save(reservation));
    }

    private boolean checkAvailabilityWindow(Long roomId, LocalDate date, LocalTime startTime, LocalTime endTime, String academicYear) {
        DayOfWeek day = date.getDayOfWeek();
        List<RoomAvailability> availabilities = availabilityRepository.findByDayOfWeekAndAcademicYearAndAvailableTrue(day, academicYear)
                .stream().filter(a -> a.getRoom().getId().equals(roomId)).toList();

        for (RoomAvailability a : availabilities) {
            if (!startTime.isBefore(a.getStartTime()) && !endTime.isAfter(a.getEndTime())) {
                return true; // Fits completely within an availability block
            }
        }
        return false;
    }

    public List<RoomDto> findAvailableRooms(LocalDate date, LocalTime startTime, LocalTime endTime, int requiredCapacity, String academicYear) {
        // 1. Get all AVAILABLE rooms with sufficient capacity
        List<Room> capableRooms = roomRepository.findByStatusAndCapacityGreaterThanEqual(RoomStatus.AVAILABLE, requiredCapacity);

        // 2. Filter by availability window and lack of overlaps
        return capableRooms.stream()
                .filter(room -> checkAvailabilityWindow(room.getId(), date, startTime, endTime, academicYear))
                .filter(room -> reservationRepository.findOverlappingReservations(room.getId(), date, startTime, endTime).isEmpty())
                .map(this::toRoomDto)
                .collect(Collectors.toList());
    }

    public List<RoomDto> getAvailableRooms(int requiredCapacity) {
        return roomRepository.findByStatusAndCapacityGreaterThanEqual(RoomStatus.AVAILABLE, requiredCapacity)
                .stream()
                .map(this::toRoomDto)
                .collect(Collectors.toList());
    }

    // --- AVAILABILITY CONFIGURATION ---

    @Transactional
    public RoomAvailabilityDto addAvailability(RoomAvailabilityDto req) {
        Room room = roomRepository.findById(req.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        RoomAvailability availability = RoomAvailability.builder()
                .room(room)
                .dayOfWeek(req.getDayOfWeek())
                .startTime(req.getStartTime())
                .endTime(req.getEndTime())
                .available(req.isAvailable())
                .academicYear(normalizeAcademicYear(req.getAcademicYear()))
                .build();

        return toAvailabilityDto(availabilityRepository.save(availability));
    }

    public List<RoomAvailabilityDto> getAvailabilities(Long roomId, String academicYear) {
        String year = normalizeAcademicYear(academicYear);
        return availabilityRepository.findByRoomIdAndAcademicYear(roomId, year).stream()
                .map(this::toAvailabilityDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public RoomAvailabilityDto updateAvailability(Long roomId, Long availabilityId, RoomAvailabilityDto req) {
        RoomAvailability availability = getRoomAvailability(roomId, availabilityId);

        if (req.getDayOfWeek() != null) {
            availability.setDayOfWeek(req.getDayOfWeek());
        }
        if (req.getStartTime() != null) {
            availability.setStartTime(req.getStartTime());
        }
        if (req.getEndTime() != null) {
            availability.setEndTime(req.getEndTime());
        }
        availability.setAvailable(req.isAvailable());
        availability.setAcademicYear(normalizeAcademicYear(req.getAcademicYear()));

        return toAvailabilityDto(availabilityRepository.save(availability));
    }

    @Transactional
    public void deleteAvailability(Long roomId, Long availabilityId) {
        RoomAvailability availability = getRoomAvailability(roomId, availabilityId);
        availabilityRepository.delete(availability);
    }

    public boolean hasNoAvailabilityOverlap(Long roomId, LocalTime startTime, LocalTime endTime, Long excludeId, String academicYear) {
        String year = normalizeAcademicYear(academicYear);
        return availabilityRepository.findByRoomIdAndAcademicYear(roomId, year).stream()
                .filter(slot -> excludeId == null || !slot.getId().equals(excludeId))
                .noneMatch(slot -> startTime.isBefore(slot.getEndTime()) && endTime.isAfter(slot.getStartTime()));
    }

    private RoomAvailability getRoomAvailability(Long roomId, Long availabilityId) {
        RoomAvailability availability = availabilityRepository.findById(availabilityId)
                .orElseThrow(() -> new RuntimeException("Room availability not found"));
        if (!availability.getRoom().getId().equals(roomId)) {
            throw new RuntimeException("Room availability does not belong to this room");
        }
        return availability;
    }

    private String normalizeAcademicYear(String academicYear) {
        if (academicYear != null && !academicYear.isBlank()) {
            return academicYear;
        }
        int year = Year.now().getValue();
        return year + "-" + (year + 1);
    }

    private String resolveRoomCode(String requestedCode, String roomName) {
        if (requestedCode != null && !requestedCode.isBlank()) {
            return requestedCode.trim().toUpperCase(Locale.ROOT);
        }

        String base = roomName == null ? "ROOM" : Normalizer.normalize(roomName, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .replaceAll("[^A-Za-z0-9]+", "-")
                .replaceAll("(^-|-$)", "")
                .toUpperCase(Locale.ROOT);
        if (base.isBlank()) {
            base = "ROOM";
        }

        String candidate = base;
        int suffix = 1;
        while (roomRepository.findByCode(candidate).isPresent()) {
            candidate = base + "-" + suffix++;
        }
        return candidate;
    }

    // --- MAPPERS ---

    private RoomDto toRoomDto(Room room) {
        return RoomDto.builder()
                .id(room.getId())
                .name(room.getName())
                .code(room.getCode())
                .capacity(room.getCapacity())
                .location(room.getLocation())
                .building(room.getBuilding())
                .floor(room.getFloor())
                .type(room.getType())
                .status(room.getStatus())
                .hasProjector(room.isHasProjector())
                .hasComputers(room.isHasComputers())
                .hasInternet(room.isHasInternet())
                .description(room.getDescription())
                .build();
    }

    private RoomReservationDto toReservationDto(RoomReservation res) {
        return RoomReservationDto.builder()
                .id(res.getId())
                .roomId(res.getRoom().getId())
                .defenseId(res.getDefenseId())
                .date(res.getDate())
                .startTime(res.getStartTime())
                .endTime(res.getEndTime())
                .status(res.getStatus())
                .academicYear(res.getAcademicYear())
                .build();
    }

    private RoomAvailabilityDto toAvailabilityDto(RoomAvailability avail) {
        return RoomAvailabilityDto.builder()
                .id(avail.getId())
                .roomId(avail.getRoom().getId())
                .dayOfWeek(avail.getDayOfWeek())
                .startTime(avail.getStartTime())
                .endTime(avail.getEndTime())
                .available(avail.isAvailable())
                .academicYear(avail.getAcademicYear())
                .build();
    }
}
