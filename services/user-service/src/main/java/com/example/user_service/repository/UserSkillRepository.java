package com.example.user_service.repository;

import com.example.user_service.entity.UserSkill;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
    List<UserSkill> findByUserId(String userId);
    Optional<UserSkill> findByUserIdAndSkillId(String userId, Long skillId);
    void deleteByUserIdAndSkillId(String userId, Long skillId);
}
