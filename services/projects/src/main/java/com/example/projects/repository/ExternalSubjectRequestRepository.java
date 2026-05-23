package com.example.projects.repository;

import com.example.projects.entity.ExternalSubjectRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExternalSubjectRequestRepository extends JpaRepository<ExternalSubjectRequest, UUID> {
    List<ExternalSubjectRequest> findByStudentId(String studentId);
    List<ExternalSubjectRequest> findByTeacherId(String teacherId);
}
