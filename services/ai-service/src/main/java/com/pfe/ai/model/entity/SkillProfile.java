package com.pfe.ai.model.entity;

import com.pfe.ai.model.enums.OwnerType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "skill_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String ownerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OwnerType ownerType;

    @ElementCollection
    @CollectionTable(name = "skill_profile_skills", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "skill")
    private List<String> skills;

    @ElementCollection
    @CollectionTable(name = "skill_profile_keywords", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "keyword")
    private List<String> keywords;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
