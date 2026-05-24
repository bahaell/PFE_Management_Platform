package com.example.projects.repository;

import com.example.projects.entity.ProjectMember;
import com.example.projects.entity.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, UUID> {
    List<ProjectMember> findByProjectId(UUID projectId);
    List<ProjectMember> findByStudentId(String studentId);
    Optional<ProjectMember> findByProjectIdAndStudentId(UUID projectId, String studentId);
    boolean existsByStudentIdAndProject_StatusIn(String studentId, Collection<ProjectStatus> statuses);
    void deleteByProjectId(UUID projectId);
}
