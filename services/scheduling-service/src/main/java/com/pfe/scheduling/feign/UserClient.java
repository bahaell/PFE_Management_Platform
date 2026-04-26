package com.pfe.scheduling.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@FeignClient(name = "user-service", url = "${services.user.url}")
public interface UserClient {

    @GetMapping("/api/users/{id}/availability")
    List<TeacherAvailabilityDto> getTeacherAvailability(
            @PathVariable("id") String teacherId);

    @GetMapping("/api/users/{id}")
    UserDto getUserById(@PathVariable("id") String id);

    // ── DTOs — doivent correspondre exactement aux champs
    //           de TeacherAvailabilityDto.java dans user-service ──

    record TeacherAvailabilityDto(
            Long id,
            String start,          // ← "start" pas "startTime"
            String end,            // ← "end" pas "endTime"
            Boolean isRecurrent,
            Boolean onlyDuringPFE) {
    }

    record UserDto(
            String id,
            String name,
            String email,
            String role) {
    }
}