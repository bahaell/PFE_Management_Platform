package com.example.defense.model;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DefenseProgress {
    private boolean thesisSubmitted;
    private boolean slidesUploaded;
    private boolean documentsComplete;
}
