package com.pfe.scheduling.repository;

import com.pfe.scheduling.entity.PendingDefenseRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PendingDefenseRequestRepository
        extends JpaRepository<PendingDefenseRequest, Long> {

    List<PendingDefenseRequest> findByPriority(
            PendingDefenseRequest.Priority priority);
}