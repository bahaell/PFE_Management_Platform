package com.pfe.resource.repository;

import com.pfe.resource.entity.RoomAvailabilitySlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomAvailabilitySlotRepository extends JpaRepository<RoomAvailabilitySlot, Long> {
    List<RoomAvailabilitySlot> findByRoomId(Long roomId);
}
