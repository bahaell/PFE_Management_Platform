package com.example.projects.repository;

import com.example.projects.entity.ProjectActivity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectActivityRepository extends JpaRepository<ProjectActivity, UUID> {
    List<ProjectActivity> findByProjectIdOrderByTimestampDesc(UUID projectId, Pageable pageable);
}
