package com.example.defense.repository;

import com.example.defense.model.Defense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DefenseRepository extends JpaRepository<Defense, String> {
    List<Defense> findByStudentId(String studentId);

    List<Defense> findByProjectId(String projectId);
}
