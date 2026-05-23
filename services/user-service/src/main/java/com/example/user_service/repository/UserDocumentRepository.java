package com.example.user_service.repository;

import com.example.user_service.entity.UserDocument;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDocumentRepository extends JpaRepository<UserDocument, Long> {
    List<UserDocument> findByStudentIdOrderByCreatedAtDesc(String studentId);

    List<UserDocument> findByStudentIdAndCoordinatorIdOrderByCreatedAtDesc(String studentId, String coordinatorId);

    List<UserDocument> findByCoordinatorIdOrderByCreatedAtDesc(String coordinatorId);

    Optional<UserDocument> findByIdAndCoordinatorId(Long id, String coordinatorId);
}
