package com.example.user_service.dto;

import java.util.List;

public class ProfileSkillMetaDto {
    private SuggestedSkillsDto suggestedSkills;
    private List<SkillCategoryDto> skillCategories;

    public ProfileSkillMetaDto() {
    }

    public ProfileSkillMetaDto(SuggestedSkillsDto suggestedSkills, List<SkillCategoryDto> skillCategories) {
        this.suggestedSkills = suggestedSkills;
        this.skillCategories = skillCategories;
    }

    public SuggestedSkillsDto getSuggestedSkills() {
        return suggestedSkills;
    }

    public void setSuggestedSkills(SuggestedSkillsDto suggestedSkills) {
        this.suggestedSkills = suggestedSkills;
    }

    public List<SkillCategoryDto> getSkillCategories() {
        return skillCategories;
    }

    public void setSkillCategories(List<SkillCategoryDto> skillCategories) {
        this.skillCategories = skillCategories;
    }
}
