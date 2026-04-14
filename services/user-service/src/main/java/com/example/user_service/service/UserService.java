package com.example.user_service.service;

import com.example.user_service.dto.AuthRequest;
import com.example.user_service.dto.AuthResponse;
import com.example.user_service.dto.ProfileDataDto;
import com.example.user_service.dto.ProfileSkillMetaDto;
import com.example.user_service.dto.ProfileUpdateRequest;
import com.example.user_service.dto.RegistrationRequest;
import com.example.user_service.dto.SkillDto;
import com.example.user_service.dto.StudentProfileDto;
import com.example.user_service.dto.TeacherProfileDto;
import com.example.user_service.dto.UserDto;
import com.example.user_service.dto.UserUpdateRequest;
import java.util.List;

public interface UserService {

    AuthResponse authenticate(AuthRequest authRequest);

    AuthResponse register(RegistrationRequest request);

    UserDto createUser(RegistrationRequest request);

    List<UserDto> getAllUsers();

    UserDto getUserById(String id);

    UserDto getCurrentUser();

    ProfileDataDto getCurrentProfile();

    UserDto updateUser(String id, UserUpdateRequest request);

    UserDto updateCurrentUser(UserUpdateRequest request);

    ProfileDataDto updateCurrentProfile(ProfileUpdateRequest request);

    List<StudentProfileDto> getStudents(String query, String level, String department, String academicYear);

    List<TeacherProfileDto> getTeachers(String query, String grade, String speciality, String department, Integer minYears);

    ProfileSkillMetaDto getProfileSkillMeta();

    List<SkillDto> getCurrentUserSkills();

    SkillDto getCurrentUserSkill(String skillId);

    SkillDto addCurrentUserSkill(SkillDto skill);

    SkillDto updateCurrentUserSkill(String skillId, SkillDto updates);

    void removeCurrentUserSkill(String skillId);

    List<SkillDto> getUserSkillsById(String userId);

    SkillDto getUserSkillById(String userId, String skillId);

    SkillDto addUserSkillById(String userId, SkillDto skill);

    SkillDto updateUserSkillById(String userId, String skillId, SkillDto updates);

    void removeUserSkillById(String userId, String skillId);

    void deleteUser(String id);
}