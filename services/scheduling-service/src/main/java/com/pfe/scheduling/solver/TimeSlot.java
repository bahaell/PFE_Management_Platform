package com.pfe.scheduling.solver;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeSlot {

    private String id;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
}