package com.example.projects.repository;

import com.example.projects.entity.FreeSubjectProposal;
import com.example.projects.entity.FreeSubjectProposalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Collection;
import java.util.UUID;

@Repository
public interface FreeSubjectProposalRepository extends JpaRepository<FreeSubjectProposal, UUID> {
    List<FreeSubjectProposal> findByStudentId(String studentId);
    List<FreeSubjectProposal> findByStatus(FreeSubjectProposalStatus status);
    List<FreeSubjectProposal> findByPreferredSupervisorId(String preferredSupervisorId);
    boolean existsByStudentIdAndStatusIn(String studentId, Collection<FreeSubjectProposalStatus> statuses);
}
