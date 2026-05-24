package com.pfe.scheduling.repository;

import com.pfe.scheduling.entity.AcademicPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AcademicPeriodRepository extends JpaRepository<AcademicPeriod, Long> {

    Optional<AcademicPeriod> findByIsActiveTrue();

    Optional<AcademicPeriod> findByAcademicYearAndSemester(String academicYear, String semester);
}
