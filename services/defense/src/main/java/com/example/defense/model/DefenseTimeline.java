package com.example.defense.model;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DefenseTimeline {
    private String arrival;
    private String setup;
    private String presentation;
    private String qa;
    private String deliberation;
    private String result;
}
