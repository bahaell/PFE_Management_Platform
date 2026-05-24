package com.pfe.scheduling.service;

import com.pfe.scheduling.entity.AcademicPeriod;
import com.pfe.scheduling.repository.AcademicPeriodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicPeriodService {

    private final AcademicPeriodRepository periodRepository;

    public List<AcademicPeriod> getAllPeriods() {
        return periodRepository.findAll();
    }

    public AcademicPeriod getActivePeriod() {
        return periodRepository.findByIsActiveTrue()
                .orElseThrow(() -> new RuntimeException("No active academic period found"));
    }

    @Transactional
    public AcademicPeriod createPeriod(AcademicPeriod period) {
        if (period.isActive()) {
            deactivateAllPeriods();
        }
        return periodRepository.save(period);
    }

    @Transactional
    public AcademicPeriod activatePeriod(Long id) {
        AcademicPeriod period = periodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Period not found"));
        
        deactivateAllPeriods();
        
        period.setActive(true);
        return periodRepository.save(period);
    }

    private void deactivateAllPeriods() {
        List<AcademicPeriod> activePeriods = periodRepository.findAll().stream()
                .filter(AcademicPeriod::isActive).toList();
        activePeriods.forEach(p -> p.setActive(false));
        periodRepository.saveAll(activePeriods);
    }
}
