package com.example.projects.repository;

import com.example.projects.entity.ProjectStatus;
import com.example.projects.entity.ProjectSupervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectSupervisorRepository extends JpaRepository<ProjectSupervisor, UUID> {
    List<ProjectSupervisor> findByProjectId(UUID projectId);
    List<ProjectSupervisor> findByTeacherId(String teacherId);
    Optional<ProjectSupervisor> findByProjectIdAndTeacherId(UUID projectId, String teacherId);
    long countByTeacherIdAndProject_StatusIn(String teacherId, Collection<ProjectStatus> statuses);
    void deleteByProjectId(UUID projectId);
}
