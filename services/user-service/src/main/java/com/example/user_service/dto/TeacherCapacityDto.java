package com.example.user_service.dto;

public class TeacherCapacityDto {
    private Integer max;
    private Integer current;
    private Boolean available;

    public TeacherCapacityDto() {}

    public TeacherCapacityDto(Integer max, Integer current) {
        this.max = max != null ? max : 5;
        this.current = current != null ? current : 0;
        this.available = this.current < this.max;
    }

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }

    public Integer getCurrent() {
        return current;
    }

    public void setCurrent(Integer current) {
        this.current = current;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}
