package com.pfe.scheduling.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@FeignClient(name = "user-service", url = "${services.user.url}")
public interface UserClient {

    @GetMapping("/api/users/{id}")
    UserDto getUserById(@PathVariable("id") String id);

    @GetMapping("/api/users/{id}/availability")
    List<TeacherAvailabilityDto> getTeacherAvailability(
            @PathVariable("id") String teacherId);

    record UserDto(
            String id,
            String name,
            String email,
            String role) {}

    record TeacherAvailabilityDto(
            Long id,
            String start,
            String end,
            Boolean isRecurrent,
            Boolean onlyDuringPFE) {}
}