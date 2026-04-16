package com.example.defense.controller;

import com.example.defense.model.Defense;
import com.example.defense.service.DefenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/defenses")
@RequiredArgsConstructor
public class DefenseController {

    private final DefenseService defenseService;

    @GetMapping
    public List<Defense> getAllDefenses() {
        return defenseService.getAllDefenses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Defense> getDefenseById(@PathVariable String id) {
        return defenseService.getDefenseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/student/{studentId}")
    public List<Defense> getDefensesByStudentId(@PathVariable String studentId) {
        return defenseService.getDefensesByStudentId(studentId);
    }

    @PostMapping
    public Defense createDefense(@RequestBody Defense defense) {
        return defenseService.createDefense(defense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Defense> updateDefense(@PathVariable String id, @RequestBody Defense defense) {
        try {
            return ResponseEntity.ok(defenseService.updateDefense(id, defense));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/results")
    public ResponseEntity<Defense> submitResults(
            @PathVariable String id,
            @RequestParam Double grade,
            @RequestParam(required = false) String observations) {
        try {
            return ResponseEntity.ok(defenseService.submitResults(id, grade, observations));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDefense(@PathVariable String id) {
        defenseService.deleteDefense(id);
        return ResponseEntity.noContent().build();
    }
}
