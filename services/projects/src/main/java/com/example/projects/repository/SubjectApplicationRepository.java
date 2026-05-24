package com.example.projects.repository;

import com.example.projects.entity.SubjectApplication;
import com.example.projects.entity.SubjectApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SubjectApplicationRepository extends JpaRepository<SubjectApplication, UUID> {
    List<SubjectApplication> findBySubjectId(UUID subjectId);
    List<SubjectApplication> findByStudentId(String studentId);
    List<SubjectApplication> findBySubjectIdAndStatus(UUID subjectId, SubjectApplicationStatus status);
    Optional<SubjectApplication> findBySubjectIdAndStudentId(UUID subjectId, String studentId);
    boolean existsByStudentIdAndStatusIn(String studentId, Collection<SubjectApplicationStatus> statuses);
}
