package com.example.projects.repository;

import com.example.projects.entity.CommitAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommitAttachmentRepository extends JpaRepository<CommitAttachment, UUID> {
}
