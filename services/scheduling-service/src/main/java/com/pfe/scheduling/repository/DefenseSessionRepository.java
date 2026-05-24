package com.pfe.scheduling.repository;

import com.pfe.scheduling.entity.DefenseSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DefenseSessionRepository extends JpaRepository<DefenseSession, Long> {

    List<DefenseSession> findByAcademicYear(String academicYear);

    Optional<DefenseSession> findByProjectId(String projectId);

    @Query("SELECT d FROM DefenseSession d WHERE d.roomId = :roomId AND d.date = :date " +
           "AND d.startTime < :endTime AND d.endTime > :startTime " +
           "AND d.status NOT IN ('CANCELLED', 'POSTPONED') " +
           "AND (:excludeId IS NULL OR d.id != :excludeId)")
    List<DefenseSession> findOverlappingRoomSessions(
            @Param("roomId") Long roomId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("excludeId") Long excludeId);
}
