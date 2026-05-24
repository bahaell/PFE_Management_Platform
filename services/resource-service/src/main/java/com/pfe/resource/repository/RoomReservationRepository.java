package com.pfe.resource.repository;

import com.pfe.resource.entity.RoomReservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface RoomReservationRepository extends JpaRepository<RoomReservation, Long> {

    List<RoomReservation> findByRoomIdAndAcademicYear(Long roomId, String academicYear);

    @Query("SELECT r FROM RoomReservation r WHERE r.room.id = :roomId AND r.date = :date " +
           "AND r.startTime < :endTime AND r.endTime > :startTime " +
           "AND r.status != 'CANCELLED'")
    List<RoomReservation> findOverlappingReservations(
            @Param("roomId") Long roomId, 
            @Param("date") LocalDate date, 
            @Param("startTime") LocalTime startTime, 
            @Param("endTime") LocalTime endTime);
            
    List<RoomReservation> findByDateAndAcademicYearAndStatusNot(LocalDate date, String academicYear, String status);
}
