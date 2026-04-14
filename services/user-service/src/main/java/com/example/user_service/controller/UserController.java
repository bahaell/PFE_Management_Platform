package com.example.user_service.controller;

import com.example.user_service.dto.ProfileDataDto;
import com.example.user_service.dto.ProfileSkillMetaDto;
import com.example.user_service.dto.ProfileUpdateRequest;
import com.example.user_service.dto.RegistrationRequest;
import com.example.user_service.dto.SkillDto;
import com.example.user_service.dto.StudentProfileDto;
import com.example.user_service.dto.TeacherProfileDto;
import com.example.user_service.dto.UserDto;
import com.example.user_service.dto.UserUpdateRequest;
import com.example.user_service.service.UserService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody RegistrationRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentProfileDto>> getStudents(
        @RequestParam(required = false) String q,
        @RequestParam(required = false) String level,
        @RequestParam(required = false) String department,
        @RequestParam(required = false) String academicYear
    ) {
        return ResponseEntity.ok(userService.getStudents(q, level, department, academicYear));
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<TeacherProfileDto>> getTeachers(
        @RequestParam(required = false) String q,
        @RequestParam(required = false) String grade,
        @RequestParam(required = false) String speciality,
        @RequestParam(required = false) String department,
        @RequestParam(required = false) Integer minYears
    ) {
        return ResponseEntity.ok(userService.getTeachers(q, grade, speciality, department, minYears));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @PutMapping("/me")
    public ResponseEntity<UserDto> updateCurrentUser(@RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateCurrentUser(request));
    }

    @GetMapping("/me/profile")
    public ResponseEntity<ProfileDataDto> getCurrentProfile() {
        return ResponseEntity.ok(userService.getCurrentProfile());
    }

    @PutMapping("/me/profile")
    public ResponseEntity<ProfileDataDto> updateCurrentProfile(@RequestBody ProfileUpdateRequest request) {
        return ResponseEntity.ok(userService.updateCurrentProfile(request));
    }

    @GetMapping("/me/skills/meta")
    public ResponseEntity<ProfileSkillMetaDto> getCurrentProfileSkillMeta() {
        return ResponseEntity.ok(userService.getProfileSkillMeta());
    }

    @GetMapping("/me/skills")
    public ResponseEntity<List<SkillDto>> getCurrentUserSkills() {
        return ResponseEntity.ok(userService.getCurrentUserSkills());
    }

    @GetMapping("/me/skills/{skillId}")
    public ResponseEntity<SkillDto> getCurrentUserSkill(@PathVariable String skillId) {
        return ResponseEntity.ok(userService.getCurrentUserSkill(skillId));
    }

    @PostMapping("/me/skills")
    public ResponseEntity<SkillDto> addCurrentUserSkill(@RequestBody SkillDto skill) {
        return ResponseEntity.ok(userService.addCurrentUserSkill(skill));
    }

    @PutMapping("/me/skills/{skillId}")
    public ResponseEntity<SkillDto> updateCurrentUserSkill(@PathVariable String skillId, @RequestBody SkillDto updates) {
        return ResponseEntity.ok(userService.updateCurrentUserSkill(skillId, updates));
    }

    @DeleteMapping("/me/skills/{skillId}")
    public ResponseEntity<Void> removeCurrentUserSkill(@PathVariable String skillId) {
        userService.removeCurrentUserSkill(skillId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/skills")
    public ResponseEntity<List<SkillDto>> getUserSkillsById(@PathVariable("id") String userId) {
        return ResponseEntity.ok(userService.getUserSkillsById(userId));
    }

    @GetMapping("/{id}/skills/{skillId}")
    public ResponseEntity<SkillDto> getUserSkillById(@PathVariable("id") String userId, @PathVariable String skillId) {
        return ResponseEntity.ok(userService.getUserSkillById(userId, skillId));
    }

    @PostMapping("/{id}/skills")
    public ResponseEntity<SkillDto> addUserSkillById(@PathVariable("id") String userId, @RequestBody SkillDto skill) {
        return ResponseEntity.ok(userService.addUserSkillById(userId, skill));
    }

    @PutMapping("/{id}/skills/{skillId}")
    public ResponseEntity<SkillDto> updateUserSkillById(
        @PathVariable("id") String userId,
        @PathVariable String skillId,
        @RequestBody SkillDto updates
    ) {
        return ResponseEntity.ok(userService.updateUserSkillById(userId, skillId, updates));
    }

    @DeleteMapping("/{id}/skills/{skillId}")
    public ResponseEntity<Void> removeUserSkillById(@PathVariable("id") String userId, @PathVariable String skillId) {
        userService.removeUserSkillById(userId, skillId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}