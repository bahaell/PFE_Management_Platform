package com.pfe.scheduling.service;

import com.pfe.scheduling.dto.StatisticsResponse;
import com.pfe.scheduling.entity.ScheduledDefense;
import com.pfe.scheduling.repository.PendingDefenseRequestRepository;
import com.pfe.scheduling.repository.ScheduledDefenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final ScheduledDefenseRepository defenseRepo;
    private final PendingDefenseRequestRepository pendingRepo;

    public StatisticsResponse getStatistics() {

        // room utilization: roomName → count of defenses
        Map<String, Integer> roomUtil = defenseRepo.findAll().stream()
                .filter(d -> d.getRoom() != null)
                .collect(Collectors.groupingBy(
                        ScheduledDefense::getRoom,
                        Collectors.collectingAndThen(Collectors.counting(),
                                Long::intValue)));

        // teacher load: juryMemberName → number of defenses they appear in
        Map<String, Integer> teacherLoad = defenseRepo.findAll().stream()
                .filter(d -> d.getJuryMemberNames() != null)
                .flatMap(d -> d.getJuryMemberNames().stream())
                .collect(Collectors.groupingBy(
                        name -> name,
                        Collectors.collectingAndThen(Collectors.counting(),
                                Long::intValue)));

        return StatisticsResponse.builder()
                .totalScheduledDefenses((int) defenseRepo.count())
                .pendingRequests((int) pendingRepo.count())
                .roomUtilization(roomUtil)
                .teacherLoad(teacherLoad)
                .build();
    }
}