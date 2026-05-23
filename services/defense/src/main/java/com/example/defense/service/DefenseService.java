package com.example.defense.service;

import com.example.defense.model.Defense;
import com.example.defense.repository.DefenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DefenseService {

    private final DefenseRepository defenseRepository;
    private final com.example.defense.client.ProjectClient projectClient;

    public List<Defense> getAllDefenses() {
        return defenseRepository.findAll();
    }

    public Optional<Defense> getDefenseById(String id) {
        return defenseRepository.findById(id);
    }

    public List<Defense> getDefensesByStudentId(String studentId) {
        return defenseRepository.findByStudentId(studentId);
    }

    @Transactional
    public Defense createDefense(Defense defense) {
        // Ensure bidirectional links are set for JPA if needed
        if (defense.getJuryMembers() != null) {
            defense.getJuryMembers().forEach(jm -> jm.setDefense(defense));
        }
        if (defense.getAttachments() != null) {
            defense.getAttachments().forEach(a -> a.setDefense(defense));
        }
        return defenseRepository.save(defense);
    }

    @Transactional
    public Defense updateDefense(String id, Defense defenseDetails) {
        Defense defense = defenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Defense not found with id: " + id));

        updateDefenseFields(defense, defenseDetails);

        // If status changed to COMPLETED, trigger project completion
        if (defenseDetails.getStatus() == com.example.defense.model.DefenseStatus.COMPLETED &&
                defense.getStatus() != com.example.defense.model.DefenseStatus.COMPLETED) {

            if (defense.getProjectId() != null) {
                // Trigger project status update to COMPLETED
                projectClient.updateProjectStatus(defense.getProjectId(), "COMPLETED");
            }
        }

        defense.setStatus(defenseDetails.getStatus());
        return defenseRepository.save(defense);
    }

    @Transactional
    public Defense submitResults(String id, Double grade, String observations) {
        Defense defense = defenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Defense not found with id: " + id));

        defense.setGrade(grade);
        defense.setObservations(observations);
        defense.setStatus(com.example.defense.model.DefenseStatus.COMPLETED);

        // Trigger project completion
        if (defense.getProjectId() != null) {
            projectClient.updateProjectStatus(defense.getProjectId(), "COMPLETED");
        }

        return defenseRepository.save(defense);
    }

    private void updateDefenseFields(Defense defense, Defense defenseDetails) {
        defense.setDate(defenseDetails.getDate());
        defense.setTime(defenseDetails.getTime());
        defense.setRoom(defenseDetails.getRoom());
        defense.setStudentId(defenseDetails.getStudentId());
        defense.setProjectId(defenseDetails.getProjectId());
        defense.setTimeline(defenseDetails.getTimeline());
        defense.setProgress(defenseDetails.getProgress());
        defense.setGrade(defenseDetails.getGrade());
        defense.setObservations(defenseDetails.getObservations());
    }

    @Transactional
    public void deleteDefense(String id) {
        defenseRepository.deleteById(id);
    }
}
