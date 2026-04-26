package com.pfe.scheduling.repository;

import com.pfe.scheduling.entity.ScheduledDefense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScheduledDefenseRepository
        extends JpaRepository<ScheduledDefense, Long> {

    List<ScheduledDefense> findByStatus(ScheduledDefense.DefenseStatus status);

    List<ScheduledDefense> findByRoom(String room);
}