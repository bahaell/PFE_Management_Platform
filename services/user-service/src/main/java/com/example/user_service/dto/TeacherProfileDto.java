package com.example.user_service.dto;

import com.example.user_service.entity.TeacherGrade;
import java.util.List;

public class TeacherProfileDto extends UserDto {
    private TeacherGrade grade;
    private String speciality;
    private String department;
    private String bio;
    private String researchInterests;
    private Integer yearsOfExperience;
    private Integer yearsOfService;
    private Integer maxSupervisedStudents;
    private Integer currentSupervisedStudents;
    private String linkedinUrl;
    private List<SkillDto> skills;

    public TeacherProfileDto() {
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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

    public List<SkillDto> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillDto> skills) {
        this.skills = skills;
    }
}
