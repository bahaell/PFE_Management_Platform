package com.example.user_service.dto;

public class ProfileDataDto {
    private StudentProfileDto student;
    private TeacherProfileDto teacher;
    private CoordinatorProfileDto coordinator;

    public ProfileDataDto() {
    }

    public StudentProfileDto getStudent() {
        return student;
    }

    public void setStudent(StudentProfileDto student) {
        this.student = student;
    }

    public TeacherProfileDto getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherProfileDto teacher) {
        this.teacher = teacher;
    }

    public CoordinatorProfileDto getCoordinator() {
        return coordinator;
    }

    public void setCoordinator(CoordinatorProfileDto coordinator) {
        this.coordinator = coordinator;
    }
}
