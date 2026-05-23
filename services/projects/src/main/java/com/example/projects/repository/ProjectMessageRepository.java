package com.example.projects.repository;

import com.example.projects.entity.ProjectMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectMessageRepository extends JpaRepository<ProjectMessage, UUID> {
    List<ProjectMessage> findByProjectIdOrderByCreatedAtDesc(UUID projectId, Pageable pageable);
}
