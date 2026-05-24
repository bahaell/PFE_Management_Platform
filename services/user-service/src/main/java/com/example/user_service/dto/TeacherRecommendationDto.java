package com.example.user_service.dto;

public class TeacherRecommendationDto {
    private String teacherId;
    private Integer score;
    private String reason;
    private TeacherProfileDto profile;

    public TeacherRecommendationDto() {}

    public TeacherRecommendationDto(String teacherId, Integer score, String reason, TeacherProfileDto profile) {
        this.teacherId = teacherId;
        this.score = score;
        this.reason = reason;
        this.profile = profile;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public TeacherProfileDto getProfile() {
        return profile;
    }

    public void setProfile(TeacherProfileDto profile) {
        this.profile = profile;
    }
}
