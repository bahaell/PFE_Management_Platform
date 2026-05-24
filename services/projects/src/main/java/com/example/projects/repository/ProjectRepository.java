package com.example.projects.repository;

import com.example.projects.entity.Project;
import com.example.projects.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {
    List<Project> findByStatus(ProjectStatus status);
    List<Project> findByCompanyId(UUID companyId);
    Optional<Project> findBySubjectId(UUID subjectId);
}
