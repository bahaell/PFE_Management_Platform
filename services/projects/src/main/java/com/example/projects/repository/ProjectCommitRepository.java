package com.example.projects.repository;

import com.example.projects.entity.ProjectCommit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProjectCommitRepository extends JpaRepository<ProjectCommit, UUID> {
    List<ProjectCommit> findByDocumentIdOrderByCreatedAtDesc(UUID documentId);
    List<ProjectCommit> findByDocumentProjectIdOrderByCreatedAtDesc(UUID projectId);
}
