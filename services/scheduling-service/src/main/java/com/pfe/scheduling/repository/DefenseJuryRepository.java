package com.pfe.scheduling.repository;

import com.pfe.scheduling.entity.DefenseJury;
import com.pfe.scheduling.entity.JuryRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface DefenseJuryRepository extends JpaRepository<DefenseJury, Long> {

    List<DefenseJury> findByDefenseSessionId(Long defenseSessionId);

    boolean existsByDefenseSessionIdAndTeacherId(Long defenseSessionId, String teacherId);

    long countByDefenseSessionIdAndRole(Long defenseSessionId, JuryRole role);

    void deleteByDefenseSessionId(Long defenseSessionId);

    @Query("SELECT j FROM DefenseJury j JOIN j.defenseSession d " +
           "WHERE j.teacherId = :teacherId AND d.date = :date " +
           "AND d.startTime < :endTime AND d.endTime > :startTime " +
           "AND d.status NOT IN ('CANCELLED', 'POSTPONED') " +
           "AND (:excludeSessionId IS NULL OR d.id != :excludeSessionId)")
    List<DefenseJury> findOverlappingTeacherJuries(
            @Param("teacherId") String teacherId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("excludeSessionId") Long excludeSessionId);

    int countByTeacherId(String teacherId);
}
