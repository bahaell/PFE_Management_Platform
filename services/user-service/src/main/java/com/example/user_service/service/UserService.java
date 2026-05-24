package com.example.user_service.service;

import com.example.user_service.dto.AuthRequest;
import com.example.user_service.dto.AuthResponse;
import com.example.user_service.dto.ProfileDataDto;
import com.example.user_service.dto.ProfileSkillMetaDto;
import com.example.user_service.dto.ProfileUpdateRequest;
import com.example.user_service.dto.RegistrationRequest;
import com.example.user_service.dto.SkillDto;
import com.example.user_service.dto.StudentProfileDto;
import com.example.user_service.dto.TeacherAvailabilityDto;
import com.example.user_service.dto.TeacherCapacityDto;
import com.example.user_service.dto.TeacherProfileDto;
import com.example.user_service.dto.TeacherRecommendationDto;
import com.example.user_service.dto.UserDto;
import com.example.user_service.dto.UserDocumentDto;
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

    List<StudentProfileDto> getStudents(String query, String classLevel, String department, String academicYear);

    List<StudentProfileDto> getCurrentYearStudents();

    StudentProfileDto getStudentProfile(String id);

    List<TeacherProfileDto> getTeachers(String query, String grade, String speciality, String department, Integer minYears);

    List<TeacherProfileDto> getAvailableTeachers();

    TeacherCapacityDto getTeacherCapacity(String id);

    List<TeacherRecommendationDto> getTeacherRecommendations(String studentId, String speciality);

    List<TeacherAvailabilityDto> getCurrentTeacherAvailabilities();

    TeacherAvailabilityDto addCurrentTeacherAvailability(TeacherAvailabilityDto request);

    TeacherAvailabilityDto updateCurrentTeacherAvailability(Long id, TeacherAvailabilityDto request);

    void deleteCurrentTeacherAvailability(Long id);

    List<UserDocumentDto> getCurrentStudentDocuments();

    List<UserDocumentDto> getCurrentTeacherDocuments();

    List<UserDocumentDto> getCoordinatorManagedDocuments(String studentId);

    UserDocumentDto createCoordinatorDocument(UserDocumentDto request);

    UserDocumentDto updateCoordinatorDocument(Long id, UserDocumentDto request);

    void deleteCoordinatorDocument(Long id);

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
    List<TeacherAvailabilityDto> getTeacherAvailabilitiesById(String teacherId);

}
