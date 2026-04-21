package com.pfe.scheduling;

import ai.timefold.solver.spring.boot.autoconfigure.TimefoldSolverAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication(exclude = { TimefoldSolverAutoConfiguration.class })
@EnableFeignClients
@EnableDiscoveryClient
public class SchedulingServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(SchedulingServiceApplication.class, args);
    }
}