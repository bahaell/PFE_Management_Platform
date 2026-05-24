package com.example.user_service.dto;

import com.example.user_service.entity.ResponsibilityLevel;
import com.example.user_service.entity.StudentLevel;
import com.example.user_service.entity.TeacherGrade;
import java.util.List;

public class ProfileUpdateRequest {
    private StudentLevel classLevel;
    private String department;
    private String studentNumber;
    private String academicYear;
    private String interests;
    private String groupName;
    private String cvUrl;
    private String portfolioUrl;
    private String githubUrl;
    private String biography;
    private TeacherGrade grade;
    private String speciality;
    private String bio;
    private String researchInterests;
    private Integer yearsOfExperience;
    private String office;
    private String responsibilities;
    private Integer yearsOfService;
    private String position;
    private ResponsibilityLevel responsibilityLevel;
    private List<String> managedAcademicYears;
    private String signatureUrl;
    private String administrativeCode;
    private String name;
    private String phone;
    private String gender;
    private String birthdate;
    private String avatar;
    private String linkedinUrl;
    private List<SkillDto> skills;

    public ProfileUpdateRequest() {
    }

    public StudentLevel getClassLevel() {
        return classLevel;
    }

    public void setClassLevel(StudentLevel classLevel) {
        this.classLevel = classLevel;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getStudentNumber() {
        return studentNumber;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
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

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
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

    public Integer getYearsOfService() {
        return yearsOfService;
    }

    public void setYearsOfService(Integer yearsOfService) {
        this.yearsOfService = yearsOfService;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
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

    public List<String> getManagedAcademicYears() {
        return managedAcademicYears;
    }

    public void setManagedAcademicYears(List<String> managedAcademicYears) {
        this.managedAcademicYears = managedAcademicYears;
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

    public List<SkillDto> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillDto> skills) {
        this.skills = skills;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
