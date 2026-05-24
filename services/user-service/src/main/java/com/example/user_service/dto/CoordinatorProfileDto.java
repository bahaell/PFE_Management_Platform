package com.example.user_service.dto;

import com.example.user_service.entity.ResponsibilityLevel;
import java.util.List;

public class CoordinatorProfileDto extends UserDto {
    private String department;
    private String office;
    private String responsibilities;
    private String position;
    private ResponsibilityLevel responsibilityLevel;
    private List<String> managedAcademicYears;
    private String signatureUrl;
    private String administrativeCode;
    private Integer yearsOfService;
    private List<SkillDto> skills;

    public CoordinatorProfileDto() {
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
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
}
