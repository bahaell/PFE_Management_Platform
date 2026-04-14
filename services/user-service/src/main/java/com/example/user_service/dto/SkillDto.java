package com.example.user_service.dto;

public class SkillDto {
    private String id;
    private String name;
    private String category;
    private Integer relevance;

    public SkillDto() {
    }

    public SkillDto(String id, String name, String category, Integer relevance) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.relevance = relevance;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getRelevance() {
        return relevance;
    }

    public void setRelevance(Integer relevance) {
        this.relevance = relevance;
    }
}
