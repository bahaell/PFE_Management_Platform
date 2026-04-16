package com.example.defense.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@FeignClient(name = "projects", path = "/api/projects")
public interface ProjectClient {

    @PatchMapping("/{id}/status")
    void updateProjectStatus(
            @PathVariable("id") UUID id,
            @RequestParam("status") String status
    );
}
