package com.example.user_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private String birthdate;

    private String avatar;

    private String department;

    @Enumerated(EnumType.STRING)
    private StudentLevel classLevel;
    private String studentNumber;
    private String groupName;
    private String cvUrl;
    private String portfolioUrl;
    private String githubUrl;
    private boolean validated = false;
    private String academicYear;
    private String interests;
    @Enumerated(EnumType.STRING)
    private TeacherGrade grade;
    private String speciality;
    private String bio;
    private String researchInterests;
    private Integer yearsOfExperience;
    private Integer yearsOfService;
    private String office;
    private String responsibilities;

    // ── Coordinator Administrative Info ───────────────────────────────────────
    private String position;
    @Enumerated(EnumType.STRING)
    private ResponsibilityLevel responsibilityLevel;
    @Column(columnDefinition = "TEXT")
    private String managedAcademicYearsJson;
    private String signatureUrl;
    private String administrativeCode;

    // ── Capacity (for AI recommendation) ─────────────────────────────────────
    private Integer maxSupervisedStudents = 5;
    private Integer currentSupervisedStudents = 0;

    // ── Social & Extended Profile ──────────────────────────────────────────────
    private String linkedinUrl;

    // ── Lifecycle ─────────────────────────────────────────────────────────────
    @Column(nullable = false)
    private boolean active = true;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    @Column(columnDefinition = "TEXT")
    private String skillsJson;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    public User() {
    }

    public User(String id, String name, String email, String password, String phone, String gender, String birthdate, String avatar, UserRole role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.gender = gender;
        this.birthdate = birthdate;
        this.avatar = avatar;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public StudentLevel getClassLevel() {
        return classLevel;
    }

    public void setClassLevel(StudentLevel classLevel) {
        this.classLevel = classLevel;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getCvUrl() {
        return cvUrl;
    }

    public void setCvUrl(String cvUrl) {
        this.cvUrl = cvUrl;
    }

    public String getPortfolioUrl() {
        return portfolioUrl;
    }

    public void setPortfolioUrl(String portfolioUrl) {
        this.portfolioUrl = portfolioUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public boolean isValidated() {
        return validated;
    }

    public void setValidated(boolean validated) {
        this.validated = validated;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public TeacherGrade getGrade() {
        return grade;
    }

    public void setGrade(TeacherGrade grade) {
        this.grade = grade;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getResearchInterests() {
        return researchInterests;
    }

    public void setResearchInterests(String researchInterests) {
        this.researchInterests = researchInterests;
    }

    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public Integer getYearsOfService() {
        return yearsOfService;
    }

    public void setYearsOfService(Integer yearsOfService) {
        this.yearsOfService = yearsOfService;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }

    public String getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(String responsibilities) {
        this.responsibilities = responsibilities;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public ResponsibilityLevel getResponsibilityLevel() {
        return responsibilityLevel;
    }

    public void setResponsibilityLevel(ResponsibilityLevel responsibilityLevel) {
        this.responsibilityLevel = responsibilityLevel;
    }

    public String getManagedAcademicYearsJson() {
        return managedAcademicYearsJson;
    }

    public void setManagedAcademicYearsJson(String managedAcademicYearsJson) {
        this.managedAcademicYearsJson = managedAcademicYearsJson;
    }

    public String getSignatureUrl() {
        return signatureUrl;
    }

    public void setSignatureUrl(String signatureUrl) {
        this.signatureUrl = signatureUrl;
    }

    public String getAdministrativeCode() {
        return administrativeCode;
    }

    public void setAdministrativeCode(String administrativeCode) {
        this.administrativeCode = administrativeCode;
    }

    public String getSkillsJson() {
        return skillsJson;
    }

    public void setSkillsJson(String skillsJson) {
        this.skillsJson = skillsJson;
    }

    public Integer getMaxSupervisedStudents() {
        return maxSupervisedStudents;
    }

    public void setMaxSupervisedStudents(Integer maxSupervisedStudents) {
        this.maxSupervisedStudents = maxSupervisedStudents;
    }

    public Integer getCurrentSupervisedStudents() {
        return currentSupervisedStudents;
    }

    public void setCurrentSupervisedStudents(Integer currentSupervisedStudents) {
        this.currentSupervisedStudents = currentSupervisedStudents;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}