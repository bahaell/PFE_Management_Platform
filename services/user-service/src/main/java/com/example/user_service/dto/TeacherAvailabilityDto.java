package com.example.user_service.dto;

public class TeacherAvailabilityDto {
    private Long id;
    private String start;
    private String end;
    private Boolean isRecurrent;
    private Boolean onlyDuringPFE;

    public TeacherAvailabilityDto() {
    }

    public TeacherAvailabilityDto(Long id, String start, String end, Boolean isRecurrent, Boolean onlyDuringPFE) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.isRecurrent = isRecurrent;
        this.onlyDuringPFE = onlyDuringPFE;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public Boolean getIsRecurrent() {
        return isRecurrent;
    }

    public void setIsRecurrent(Boolean recurrent) {
        isRecurrent = recurrent;
    }

    public Boolean getOnlyDuringPFE() {
        return onlyDuringPFE;
    }

    public void setOnlyDuringPFE(Boolean onlyDuringPFE) {
        this.onlyDuringPFE = onlyDuringPFE;
    }
}
