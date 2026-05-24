package com.pfe.resource.repository;

import com.pfe.resource.entity.RoomAvailability;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface RoomAvailabilityRepository extends JpaRepository<RoomAvailability, Long> {

    List<RoomAvailability> findByRoomIdAndAcademicYear(Long roomId, String academicYear);

    List<RoomAvailability> findByDayOfWeekAndAcademicYearAndAvailableTrue(DayOfWeek dayOfWeek, String academicYear);
}
