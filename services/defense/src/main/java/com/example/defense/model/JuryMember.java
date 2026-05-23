package com.example.defense.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "jury_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JuryMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long teacherId;

    @Enumerated(EnumType.STRING)
    private JuryRole role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "defense_id")
    @JsonIgnore
    private Defense defense;
}
