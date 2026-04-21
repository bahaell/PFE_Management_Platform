package com.pfe.resource.repository;

import com.pfe.resource.entity.RoomBooking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomBookingRepository extends JpaRepository<RoomBooking, Long> {
    List<RoomBooking> findByRoomId(Long roomId);
}
