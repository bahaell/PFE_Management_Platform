package com.example.user_service.service.impl;

import com.example.user_service.dto.AuthRequest;
import com.example.user_service.dto.AuthResponse;
import com.example.user_service.dto.CoordinatorProfileDto;
import com.example.user_service.dto.ProfileDataDto;
import com.example.user_service.dto.ProfileSkillMetaDto;
import com.example.user_service.dto.ProfileUpdateRequest;
import com.example.user_service.dto.RegistrationRequest;
import com.example.user_service.dto.SkillCategoryDto;
import com.example.user_service.dto.SkillDto;
import com.example.user_service.dto.StudentProfileDto;
import com.example.user_service.dto.SuggestedSkillsDto;
import com.example.user_service.dto.TeacherAvailabilityDto;
import com.example.user_service.dto.TeacherProfileDto;
import com.example.user_service.dto.UserDto;
import com.example.user_service.dto.UserDocumentDto;
import com.example.user_service.dto.UserUpdateRequest;
import com.example.user_service.entity.Skill;
import com.example.user_service.entity.TeacherAvailability;
import com.example.user_service.entity.User;
import com.example.user_service.entity.UserDocument;
import com.example.user_service.entity.UserRole;
import com.example.user_service.entity.UserSkill;
import com.example.user_service.exception.ResourceNotFoundException;
import com.example.user_service.repository.SkillRepository;
import com.example.user_service.repository.TeacherAvailabilityRepository;
import com.example.user_service.repository.UserDocumentRepository;
import com.example.user_service.repository.UserRepository;
import com.example.user_service.repository.UserSkillRepository;
import com.example.user_service.security.JwtTokenProvider;
import com.example.user_service.service.UserService;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final UserSkillRepository userSkillRepository;
    private final TeacherAvailabilityRepository teacherAvailabilityRepository;
    private final UserDocumentRepository userDocumentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public UserServiceImpl(UserRepository userRepository,
                           SkillRepository skillRepository,
                           UserSkillRepository userSkillRepository,
                           TeacherAvailabilityRepository teacherAvailabilityRepository,
                           UserDocumentRepository userDocumentRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
        this.userSkillRepository = userSkillRepository;
        this.teacherAvailabilityRepository = teacherAvailabilityRepository;
        this.userDocumentRepository = userDocumentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public AuthResponse authenticate(AuthRequest authRequest) {
        var user = userRepository.findByEmail(authRequest.getEmail())
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + authRequest.getEmail()));

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtTokenProvider.createToken(user.getEmail(), user.getRole().name());
        return new AuthResponse(token, toDto(user));
    }

    @Override
    public AuthResponse register(RegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if (user.getId() == null || user.getId().isBlank()) {
            user.setId(UUID.randomUUID().toString());
        }

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.createToken(savedUser.getEmail(), savedUser.getRole().name());
        return new AuthResponse(token, toDto(savedUser));
    }

    @Override
    public UserDto createUser(RegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if (user.getId() == null || user.getId().isBlank()) {
            user.setId(UUID.randomUUID().toString());
        }
        User savedUser = userRepository.save(user);
        return toDto(savedUser);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(String id) {
        return userRepository.findById(id).map(this::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Override
    public UserDto getCurrentUser() {
        User user = getAuthenticatedUser();
        return toDto(user);
    }

    @Override
    public ProfileDataDto getCurrentProfile() {
        User user = getAuthenticatedUser();
        return toProfileData(user);
    }

    @Override
    public UserDto updateUser(String id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return toDto(userRepository.save(applyUpdates(user, request, true)));
    }

    @Override
    public UserDto updateCurrentUser(UserUpdateRequest request) {
        User user = getAuthenticatedUser();
        return toDto(userRepository.save(applyUpdates(user, request, false)));
    }

    @Override
    public ProfileDataDto updateCurrentProfile(ProfileUpdateRequest request) {
        User user = getAuthenticatedUser();
        applyProfileUpdates(user, request);
        return toProfileData(userRepository.save(user));
    }

    @Override
    public List<StudentProfileDto> getStudents(String query, String level, String department, String academicYear) {
        return userRepository.findAll().stream()
            .filter(user -> user.getRole() == UserRole.STUDENT)
            .filter(user -> matchesStudentFilters(user, query, level, department, academicYear))
            .map(this::toStudentProfile)
            .collect(Collectors.toList());
    }

    @Override
    public List<TeacherProfileDto> getTeachers(String query, String grade, String speciality, String department, Integer minYears) {
        return userRepository.findAll().stream()
            .filter(user -> user.getRole() == UserRole.TEACHER)
            .filter(user -> matchesTeacherFilters(user, query, grade, speciality, department, minYears))
            .map(this::toTeacherProfile)
            .collect(Collectors.toList());
    }

    @Override
    public List<TeacherAvailabilityDto> getCurrentTeacherAvailabilities() {
        User teacher = getAuthenticatedTeacher();
        return teacherAvailabilityRepository.findByTeacherIdOrderByStartTimeAsc(teacher.getId()).stream()
            .map(this::toTeacherAvailabilityDto)
            .collect(Collectors.toList());
    }

    @Override
    public TeacherAvailabilityDto addCurrentTeacherAvailability(TeacherAvailabilityDto request) {
        User teacher = getAuthenticatedTeacher();
        validateAvailabilityInput(request);
        validateNoOverlap(teacher.getId(), request.getStart(), request.getEnd(), null);

        TeacherAvailability availability = new TeacherAvailability();
        availability.setTeacher(teacher);
        availability.setStartTime(request.getStart());
        availability.setEndTime(request.getEnd());
        availability.setRecurrent(Boolean.TRUE.equals(request.getIsRecurrent()));
        availability.setOnlyDuringPfe(Boolean.TRUE.equals(request.getOnlyDuringPFE()));
        return toTeacherAvailabilityDto(teacherAvailabilityRepository.save(availability));
    }

    @Override
    public TeacherAvailabilityDto updateCurrentTeacherAvailability(Long id, TeacherAvailabilityDto request) {
        User teacher = getAuthenticatedTeacher();
        validateAvailabilityInput(request);
        TeacherAvailability availability = teacherAvailabilityRepository.findByIdAndTeacherId(id, teacher.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Availability not found with id: " + id));

        validateNoOverlap(teacher.getId(), request.getStart(), request.getEnd(), id);

        availability.setStartTime(request.getStart());
        availability.setEndTime(request.getEnd());
        availability.setRecurrent(Boolean.TRUE.equals(request.getIsRecurrent()));
        availability.setOnlyDuringPfe(Boolean.TRUE.equals(request.getOnlyDuringPFE()));
        return toTeacherAvailabilityDto(teacherAvailabilityRepository.save(availability));
    }

    @Override
    public void deleteCurrentTeacherAvailability(Long id) {
        User teacher = getAuthenticatedTeacher();
        TeacherAvailability availability = teacherAvailabilityRepository.findByIdAndTeacherId(id, teacher.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Availability not found with id: " + id));
        teacherAvailabilityRepository.delete(availability);
    }

    @Override
    public List<UserDocumentDto> getCurrentStudentDocuments() {
        User student = getAuthenticatedUser();
        if (student.getRole() != UserRole.STUDENT) {
            throw new IllegalArgumentException("Only students can access their documents");
        }
        return userDocumentRepository.findByStudentIdOrderByCreatedAtDesc(student.getId()).stream()
            .map(this::toUserDocumentDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<UserDocumentDto> getCoordinatorManagedDocuments(String studentId) {
        User coordinator = getAuthenticatedCoordinator();
        List<UserDocument> docs = (studentId == null || studentId.isBlank())
            ? userDocumentRepository.findByCoordinatorIdOrderByCreatedAtDesc(coordinator.getId())
            : userDocumentRepository.findByStudentIdAndCoordinatorIdOrderByCreatedAtDesc(studentId, coordinator.getId());
        return docs.stream().map(this::toUserDocumentDto).collect(Collectors.toList());
    }

    @Override
    public UserDocumentDto createCoordinatorDocument(UserDocumentDto request) {
        User coordinator = getAuthenticatedCoordinator();
        validateDocumentRequest(request);
        User student = getStudentByIdOrThrow(request.getStudentId());

        UserDocument document = new UserDocument();
        document.setTitle(request.getTitle());
        document.setDescription(request.getDescription());
        document.setFileUrl(request.getFileUrl());
        document.setFileName(request.getFileName());
        document.setMimeType(request.getMimeType() == null || request.getMimeType().isBlank() ? "application/pdf" : request.getMimeType());
        document.setCreatedAt(LocalDateTime.now().toString());
        document.setStudent(student);
        document.setCoordinator(coordinator);
        return toUserDocumentDto(userDocumentRepository.save(document));
    }

    @Override
    public UserDocumentDto updateCoordinatorDocument(Long id, UserDocumentDto request) {
        User coordinator = getAuthenticatedCoordinator();
        UserDocument document = userDocumentRepository.findByIdAndCoordinatorId(id, coordinator.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            document.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            document.setDescription(request.getDescription());
        }
        if (request.getFileUrl() != null && !request.getFileUrl().isBlank()) {
            document.setFileUrl(request.getFileUrl());
        }
        if (request.getFileName() != null && !request.getFileName().isBlank()) {
            document.setFileName(request.getFileName());
        }
        if (request.getMimeType() != null && !request.getMimeType().isBlank()) {
            document.setMimeType(request.getMimeType());
        }
        if (request.getStudentId() != null && !request.getStudentId().isBlank() && !request.getStudentId().equals(document.getStudent().getId())) {
            document.setStudent(getStudentByIdOrThrow(request.getStudentId()));
        }

        return toUserDocumentDto(userDocumentRepository.save(document));
    }

    @Override
    public void deleteCoordinatorDocument(Long id) {
        User coordinator = getAuthenticatedCoordinator();
        UserDocument document = userDocumentRepository.findByIdAndCoordinatorId(id, coordinator.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Document not found with id: " + id));
        userDocumentRepository.delete(document);
    }

    @Override
    public ProfileSkillMetaDto getProfileSkillMeta() {
        SuggestedSkillsDto suggestedSkills = new SuggestedSkillsDto(
            List.of("React", "Vue.js", "Angular", "Svelte", "Next.js", "Tailwind CSS"),
            List.of("Node.js", "Python", "Java", "C#", "Go", "Rust"),
            List.of("Docker", "Kubernetes", "AWS", "Azure", "CI/CD", "Jenkins"),
            List.of("TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLTK"),
            List.of("Git", "REST API", "GraphQL", "MongoDB", "PostgreSQL", "Redis")
        );
        List<SkillCategoryDto> categories = List.of(
            new SkillCategoryDto("frontend", "Frontend", "#3B82F6"),
            new SkillCategoryDto("backend", "Backend", "#10B981"),
            new SkillCategoryDto("database", "Database", "#F59E0B"),
            new SkillCategoryDto("devops", "DevOps", "#8B5CF6"),
            new SkillCategoryDto("ml", "Machine Learning", "#EC4899"),
            new SkillCategoryDto("language", "Programming Language", "#06B6D4"),
            new SkillCategoryDto("soft-skills", "Soft Skills", "#6366F1"),
            new SkillCategoryDto("management", "Management", "#14B8A6")
        );
        return new ProfileSkillMetaDto(suggestedSkills, categories);
    }

    @Override
    public List<SkillDto> getCurrentUserSkills() {
        return getSkillsForUser(getAuthenticatedUser());
    }

    @Override
    public SkillDto getCurrentUserSkill(String skillId) {
        return getSkillForUser(getAuthenticatedUser(), skillId);
    }

    @Override
    public SkillDto addCurrentUserSkill(SkillDto skillRequest) {
        return addSkillForUser(getAuthenticatedUser(), skillRequest);
    }

    @Override
    public SkillDto updateCurrentUserSkill(String skillId, SkillDto updates) {
        return updateSkillForUser(getAuthenticatedUser(), skillId, updates);
    }

    @Override
    public void removeCurrentUserSkill(String skillId) {
        removeSkillForUser(getAuthenticatedUser(), skillId);
    }

    @Override
    public List<SkillDto> getUserSkillsById(String userId) {
        return getSkillsForUser(getUserByIdOrThrow(userId));
    }

    @Override
    public SkillDto getUserSkillById(String userId, String skillId) {
        return getSkillForUser(getUserByIdOrThrow(userId), skillId);
    }

    @Override
    public SkillDto addUserSkillById(String userId, SkillDto skill) {
        return addSkillForUser(getUserByIdOrThrow(userId), skill);
    }

    @Override
    public SkillDto updateUserSkillById(String userId, String skillId, SkillDto updates) {
        return updateSkillForUser(getUserByIdOrThrow(userId), skillId, updates);
    }

    @Override
    public void removeUserSkillById(String userId, String skillId) {
        removeSkillForUser(getUserByIdOrThrow(userId), skillId);
    }

    @Override
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userSkillRepository.findByUserId(id).forEach(userSkillRepository::delete);
        teacherAvailabilityRepository.findByTeacherIdOrderByStartTimeAsc(id).forEach(teacherAvailabilityRepository::delete);
        userDocumentRepository.findByStudentIdOrderByCreatedAtDesc(id).forEach(userDocumentRepository::delete);
        userDocumentRepository.findByCoordinatorIdOrderByCreatedAtDesc(id).forEach(userDocumentRepository::delete);
        userRepository.deleteById(id);
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            throw new IllegalArgumentException("No authenticated user found");
        }

        return userRepository.findByEmail(authentication.getName())
            .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }

    private User getAuthenticatedTeacher() {
        User user = getAuthenticatedUser();
        if (user.getRole() != UserRole.TEACHER) {
            throw new IllegalArgumentException("Only teachers can manage availability");
        }
        return user;
    }

    private User getAuthenticatedCoordinator() {
        User user = getAuthenticatedUser();
        if (user.getRole() != UserRole.COORDINATOR) {
            throw new IllegalArgumentException("Only coordinators can manage documents");
        }
        return user;
    }

    private User getStudentByIdOrThrow(String studentId) {
        User student = getUserByIdOrThrow(studentId);
        if (student.getRole() != UserRole.STUDENT) {
            throw new IllegalArgumentException("Target user must be a student");
        }
        return student;
    }

    private User getUserByIdOrThrow(String userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    private List<SkillDto> getSkillsForUser(User user) {
        return userSkillRepository.findByUserId(user.getId()).stream()
            .map(this::toSkillDto)
            .sorted(Comparator.comparing(SkillDto::getName, String.CASE_INSENSITIVE_ORDER))
            .collect(Collectors.toList());
    }

    private SkillDto getSkillForUser(User user, String skillId) {
        UserSkill userSkill = userSkillRepository.findByUserIdAndSkillId(user.getId(), parseSkillId(skillId))
            .orElseThrow(() -> new ResourceNotFoundException("Skill not found for user " + user.getId() + ": " + skillId));
        return toSkillDto(userSkill);
    }

    private SkillDto addSkillForUser(User user, SkillDto skillRequest) {
        if (skillRequest.getName() == null || skillRequest.getName().isBlank()) {
            throw new IllegalArgumentException("Skill name is required");
        }
        if (skillRequest.getCategory() == null || skillRequest.getCategory().isBlank()) {
            throw new IllegalArgumentException("Skill category is required");
        }
        if (skillRequest.getRelevance() == null) {
            throw new IllegalArgumentException("Skill relevance is required");
        }

        Skill skill = null;
        if (skillRequest.getId() != null && !skillRequest.getId().isBlank()) {
            Long requestedId = parseSkillId(skillRequest.getId());
            skill = skillRepository.findById(requestedId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found: " + skillRequest.getId()));
        }
        if (skill == null) {
            skill = new Skill(null, skillRequest.getName(), skillRequest.getCategory());
        }
        skill.setName(skillRequest.getName());
        skill.setCategory(skillRequest.getCategory());
        Skill savedSkill = skillRepository.save(skill);

        UserSkill userSkill = userSkillRepository.findByUserIdAndSkillId(user.getId(), savedSkill.getId())
            .orElse(new UserSkill(user, savedSkill, skillRequest.getRelevance()));
        userSkill.setRelevance(skillRequest.getRelevance());
        return toSkillDto(userSkillRepository.save(userSkill));
    }

    private SkillDto updateSkillForUser(User user, String skillId, SkillDto updates) {
        UserSkill userSkill = userSkillRepository.findByUserIdAndSkillId(user.getId(), parseSkillId(skillId))
            .orElseThrow(() -> new ResourceNotFoundException("Skill not found for user " + user.getId() + ": " + skillId));

        Skill skill = userSkill.getSkill();
        if (updates.getName() != null && !updates.getName().isBlank()) {
            skill.setName(updates.getName());
        }
        if (updates.getCategory() != null && !updates.getCategory().isBlank()) {
            skill.setCategory(updates.getCategory());
        }
        if (updates.getRelevance() != null) {
            userSkill.setRelevance(updates.getRelevance());
        }

        skillRepository.save(skill);
        return toSkillDto(userSkillRepository.save(userSkill));
    }

    private void removeSkillForUser(User user, String skillId) {
        UserSkill userSkill = userSkillRepository.findByUserIdAndSkillId(user.getId(), parseSkillId(skillId))
            .orElseThrow(() -> new ResourceNotFoundException("Skill not found for user " + user.getId() + ": " + skillId));
        userSkillRepository.delete(userSkill);
    }

    private User applyUpdates(User user, UserUpdateRequest request, boolean allowRoleUpdate) {
        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getGender() != null) {
            user.setGender(request.getGender());
        }
        if (request.getBirthdate() != null) {
            user.setBirthdate(request.getBirthdate());
        }
        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }
        if (allowRoleUpdate && request.getRole() != null) {
            user.setRole(UserRole.from(request.getRole()));
        }
        return user;
    }

    private UserDto toDto(User user) {
        return new UserDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPhone(),
            user.getGender(),
            user.getBirthdate(),
            user.getAvatar(),
            user.getRole()
        );
    }

    private ProfileDataDto toProfileData(User user) {
        ProfileDataDto profileData = new ProfileDataDto();
        switch (user.getRole()) {
            case STUDENT -> profileData.setStudent(toStudentProfile(user));
            case TEACHER -> profileData.setTeacher(toTeacherProfile(user));
            case COORDINATOR -> profileData.setCoordinator(toCoordinatorProfile(user));
            default -> throw new IllegalArgumentException("Unsupported role: " + user.getRole());
        }
        return profileData;
    }

    private StudentProfileDto toStudentProfile(User user) {
        StudentProfileDto dto = new StudentProfileDto();
        applyBaseProfile(dto, user);
        dto.setLevel(user.getLevel());
        dto.setDepartment(user.getDepartment());
        dto.setStudentId(user.getStudentId());
        dto.setAcademicYear(user.getAcademicYear());
        dto.setInterests(user.getInterests());
        dto.setSkills(getSkillsByUserId(user.getId()));
        return dto;
    }

    private TeacherProfileDto toTeacherProfile(User user) {
        TeacherProfileDto dto = new TeacherProfileDto();
        applyBaseProfile(dto, user);
        dto.setGrade(user.getGrade());
        dto.setSpeciality(user.getSpeciality());
        dto.setDepartment(user.getDepartment());
        dto.setBio(user.getBio());
        dto.setResearchInterests(user.getResearchInterests());
        dto.setYearsOfExperience(user.getYearsOfExperience());
        dto.setYearsOfService(user.getYearsOfService());
        dto.setSkills(getSkillsByUserId(user.getId()));
        return dto;
    }

    private CoordinatorProfileDto toCoordinatorProfile(User user) {
        CoordinatorProfileDto dto = new CoordinatorProfileDto();
        applyBaseProfile(dto, user);
        dto.setDepartment(user.getDepartment());
        dto.setOffice(user.getOffice());
        dto.setResponsibilities(user.getResponsibilities());
        dto.setYearsOfService(user.getYearsOfService());
        dto.setSkills(getSkillsByUserId(user.getId()));
        return dto;
    }

    private void applyBaseProfile(UserDto dto, User user) {
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setGender(user.getGender());
        dto.setBirthdate(user.getBirthdate());
        dto.setAvatar(user.getAvatar());
        dto.setRole(user.getRole());
    }

    private void applyProfileUpdates(User user, ProfileUpdateRequest request) {
        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getPhone() != null) {
            user.setPhone(request.getPhone());
        }
        if (request.getGender() != null) {
            user.setGender(request.getGender());
        }
        if (request.getBirthdate() != null) {
            user.setBirthdate(request.getBirthdate());
        }
        if (request.getAvatar() != null) {
            user.setAvatar(request.getAvatar());
        }
        if (request.getLevel() != null) {
            user.setLevel(request.getLevel());
        }
        if (request.getDepartment() != null) {
            user.setDepartment(request.getDepartment());
        }
        if (request.getStudentId() != null) {
            user.setStudentId(request.getStudentId());
        }
        if (request.getAcademicYear() != null) {
            user.setAcademicYear(request.getAcademicYear());
        }
        if (request.getInterests() != null) {
            user.setInterests(request.getInterests());
        }
        if (request.getGrade() != null) {
            user.setGrade(request.getGrade());
        }
        if (request.getSpeciality() != null) {
            user.setSpeciality(request.getSpeciality());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }
        if (request.getResearchInterests() != null) {
            user.setResearchInterests(request.getResearchInterests());
        }
        if (request.getYearsOfExperience() != null) {
            user.setYearsOfExperience(request.getYearsOfExperience());
        }
        if (request.getYearsOfService() != null) {
            user.setYearsOfService(request.getYearsOfService());
        }
        if (request.getOffice() != null) {
            user.setOffice(request.getOffice());
        }
        if (request.getResponsibilities() != null) {
            user.setResponsibilities(request.getResponsibilities());
        }
        if (request.getSkills() != null) {
            replaceUserSkills(user, request.getSkills());
        }
    }

    private boolean matchesStudentFilters(User user, String query, String level, String department, String academicYear) {
        return containsIgnoreCase(user.getName(), query)
            || containsIgnoreCase(user.getEmail(), query)
            || containsIgnoreCase(user.getStudentId(), query)
            ? equalsOrEmpty(user.getLevel(), level) && equalsOrEmpty(user.getDepartment(), department) && equalsOrEmpty(user.getAcademicYear(), academicYear)
            : query == null || query.isBlank()
                ? equalsOrEmpty(user.getLevel(), level) && equalsOrEmpty(user.getDepartment(), department) && equalsOrEmpty(user.getAcademicYear(), academicYear)
                : false;
    }

    private boolean matchesTeacherFilters(User user, String query, String grade, String speciality, String department, Integer minYears) {
        boolean queryMatches = query == null || query.isBlank()
            || containsIgnoreCase(user.getName(), query)
            || containsIgnoreCase(user.getEmail(), query)
            || containsIgnoreCase(user.getSpeciality(), query);
        boolean yearsMatch = minYears == null || (user.getYearsOfExperience() != null && user.getYearsOfExperience() >= minYears);
        return queryMatches
            && equalsOrEmpty(user.getGrade(), grade)
            && equalsOrEmpty(user.getSpeciality(), speciality)
            && equalsOrEmpty(user.getDepartment(), department)
            && yearsMatch;
    }

    private boolean equalsOrEmpty(String value, String filter) {
        return filter == null || filter.isBlank() || (value != null && value.equalsIgnoreCase(filter));
    }

    private boolean containsIgnoreCase(String value, String search) {
        if (search == null || search.isBlank()) {
            return true;
        }
        return value != null && value.toLowerCase(Locale.ROOT).contains(search.toLowerCase(Locale.ROOT));
    }

    private List<SkillDto> getSkillsByUserId(String userId) {
        return userSkillRepository.findByUserId(userId).stream().map(this::toSkillDto).collect(Collectors.toList());
    }

    private SkillDto toSkillDto(UserSkill userSkill) {
        Skill skill = userSkill.getSkill();
        return new SkillDto(String.valueOf(skill.getId()), skill.getName(), skill.getCategory(), userSkill.getRelevance());
    }

    private void replaceUserSkills(User user, List<SkillDto> skills) {
        userSkillRepository.findByUserId(user.getId()).forEach(userSkillRepository::delete);
        for (SkillDto dto : skills) {
            addSkillToUser(user, dto);
        }
    }

    private void addSkillToUser(User user, SkillDto dto) {
        Skill skill;
        if (dto.getId() != null && !dto.getId().isBlank()) {
            Long skillId = parseSkillId(dto.getId());
            skill = skillRepository.findById(skillId)
                .orElseGet(() -> new Skill(null, dto.getName(), dto.getCategory()));
        } else {
            skill = skillRepository.findByNameIgnoreCase(dto.getName())
                .orElseGet(() -> new Skill(null, dto.getName(), dto.getCategory()));
        }
        if (dto.getName() != null && !dto.getName().isBlank()) {
            skill.setName(dto.getName());
        }
        if (dto.getCategory() != null && !dto.getCategory().isBlank()) {
            skill.setCategory(dto.getCategory());
        }
        Skill savedSkill = skillRepository.save(skill);
        Integer relevance = dto.getRelevance() == null ? 0 : dto.getRelevance();
        userSkillRepository.save(new UserSkill(user, savedSkill, relevance));
    }

    private TeacherAvailabilityDto toTeacherAvailabilityDto(TeacherAvailability availability) {
        return new TeacherAvailabilityDto(
            availability.getId(),
            availability.getStartTime(),
            availability.getEndTime(),
            availability.getRecurrent(),
            availability.getOnlyDuringPfe()
        );
    }

    private UserDocumentDto toUserDocumentDto(UserDocument document) {
        UserDocumentDto dto = new UserDocumentDto();
        dto.setId(document.getId());
        dto.setTitle(document.getTitle());
        dto.setDescription(document.getDescription());
        dto.setFileUrl(document.getFileUrl());
        dto.setFileName(document.getFileName());
        dto.setMimeType(document.getMimeType());
        dto.setCreatedAt(document.getCreatedAt());
        dto.setStudentId(document.getStudent().getId());
        dto.setStudentName(document.getStudent().getName());
        dto.setCoordinatorId(document.getCoordinator().getId());
        dto.setCoordinatorName(document.getCoordinator().getName());
        return dto;
    }

    private void validateDocumentRequest(UserDocumentDto request) {
        if (request.getTitle() == null || request.getTitle().isBlank()) {
            throw new IllegalArgumentException("Document title is required");
        }
        if (request.getStudentId() == null || request.getStudentId().isBlank()) {
            throw new IllegalArgumentException("Student id is required");
        }
        if (request.getFileUrl() == null || request.getFileUrl().isBlank()) {
            throw new IllegalArgumentException("Document file url is required");
        }
        if (request.getFileName() == null || request.getFileName().isBlank()) {
            throw new IllegalArgumentException("Document file name is required");
        }
    }

    private void validateAvailabilityInput(TeacherAvailabilityDto request) {
        if (request.getStart() == null || request.getStart().isBlank()) {
            throw new IllegalArgumentException("Availability start is required");
        }
        if (request.getEnd() == null || request.getEnd().isBlank()) {
            throw new IllegalArgumentException("Availability end is required");
        }

        int startMinutes = toMinutes(request.getStart());
        int endMinutes = toMinutes(request.getEnd());
        if (startMinutes >= endMinutes) {
            throw new IllegalArgumentException("Availability end must be after start");
        }
    }

    private void validateNoOverlap(String teacherId, String start, String end, Long excludeId) {
        int startMinutes = toMinutes(start);
        int endMinutes = toMinutes(end);
        boolean hasOverlap = teacherAvailabilityRepository.findByTeacherIdOrderByStartTimeAsc(teacherId).stream()
            .filter(slot -> excludeId == null || !slot.getId().equals(excludeId))
            .anyMatch(slot -> startMinutes < toMinutes(slot.getEndTime()) && endMinutes > toMinutes(slot.getStartTime()));
        if (hasOverlap) {
            throw new IllegalArgumentException("Availability overlaps with an existing slot");
        }
    }

    private int toMinutes(String time) {
        String[] parts = time.split(":");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid time format. Expected HH:mm");
        }
        try {
            int hours = Integer.parseInt(parts[0]);
            int minutes = Integer.parseInt(parts[1]);
            if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
                throw new IllegalArgumentException("Invalid time value. Expected HH:mm");
            }
            return hours * 60 + minutes;
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException("Invalid time format. Expected HH:mm");
        }
    }

    private Long parseSkillId(String skillId) {
        try {
            return Long.parseLong(skillId);
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException("Skill id must be numeric");
        }
    }

    private User toEntity(RegistrationRequest request) {
        return new User(
            null,
            request.getName(),
            request.getEmail(),
            request.getPassword(),
            request.getPhone(),
            request.getGender(),
            request.getBirthdate(),
            request.getAvatar(),
            UserRole.from(request.getRole())
        );
    }

    @Override
public List<TeacherAvailabilityDto> getTeacherAvailabilitiesById(String teacherId) {
    // Vérifie que le user existe et est bien un teacher
    User teacher = userRepository.findById(teacherId)
        .orElseThrow(() -> new ResourceNotFoundException(
                "User not found with id: " + teacherId));

    if (teacher.getRole() != UserRole.TEACHER) {
        throw new IllegalArgumentException(
                "User " + teacherId + " is not a teacher");
    }

    // Même logique que getCurrentTeacherAvailabilities()
    // mais avec teacherId au lieu du current user
    return teacherAvailabilityRepository
        .findByTeacherIdOrderByStartTimeAsc(teacherId)
        .stream()
        .map(this::toTeacherAvailabilityDto)
        .collect(Collectors.toList());
}
}