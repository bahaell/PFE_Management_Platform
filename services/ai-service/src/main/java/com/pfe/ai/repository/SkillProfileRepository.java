package com.pfe.ai.repository;

import com.pfe.ai.model.entity.SkillProfile;
import com.pfe.ai.model.enums.OwnerType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface SkillProfileRepository extends JpaRepository<SkillProfile, Long> {
    Optional<SkillProfile> findByOwnerIdAndOwnerType(String ownerId, OwnerType ownerType);
    List<SkillProfile> findByOwnerType(OwnerType ownerType);
}
