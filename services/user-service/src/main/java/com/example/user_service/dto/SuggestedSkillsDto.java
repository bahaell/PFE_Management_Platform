package com.example.user_service.dto;

import java.util.List;

public class SuggestedSkillsDto {
    private List<String> frontend;
    private List<String> backend;
    private List<String> devops;
    private List<String> ml;
    private List<String> general;

    public SuggestedSkillsDto() {
    }

    public SuggestedSkillsDto(List<String> frontend, List<String> backend, List<String> devops, List<String> ml, List<String> general) {
        this.frontend = frontend;
        this.backend = backend;
        this.devops = devops;
        this.ml = ml;
        this.general = general;
    }

    public List<String> getFrontend() {
        return frontend;
    }

    public void setFrontend(List<String> frontend) {
        this.frontend = frontend;
    }

    public List<String> getBackend() {
        return backend;
    }

    public void setBackend(List<String> backend) {
        this.backend = backend;
    }

    public List<String> getDevops() {
        return devops;
    }

    public void setDevops(List<String> devops) {
        this.devops = devops;
    }

    public List<String> getMl() {
        return ml;
    }

    public void setMl(List<String> ml) {
        this.ml = ml;
    }

    public List<String> getGeneral() {
        return general;
    }

    public void setGeneral(List<String> general) {
        this.general = general;
    }
}
