package com.example.projects.repository;

import com.example.projects.entity.Subject;
import com.example.projects.entity.SubjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, UUID> {
    List<Subject> findByAcademicYear(String academicYear);
    List<Subject> findByStatus(SubjectStatus status);
}
