package com.example.user_service.repository;

import com.example.user_service.entity.TeacherAvailability;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherAvailabilityRepository extends JpaRepository<TeacherAvailability, Long> {
    List<TeacherAvailability> findByTeacherIdOrderByStartTimeAsc(String teacherId);

    Optional<TeacherAvailability> findByIdAndTeacherId(Long id, String teacherId);
}
