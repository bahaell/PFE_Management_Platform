package com.pfe.scheduling.solver;

import ai.timefold.solver.core.api.solver.SolverManager;
import ai.timefold.solver.core.config.solver.SolverConfig;
import ai.timefold.solver.core.config.solver.termination.TerminationConfig;
import ai.timefold.solver.core.api.solver.SolverFactory;
import com.pfe.scheduling.entity.DefenseSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.Duration;

@Configuration
public class TimefoldConfig {

    @Bean
    public SolverFactory<DefenseTimetable> solverFactory() {
        SolverConfig solverConfig = new SolverConfig()
                .withSolutionClass(DefenseTimetable.class)
                .withEntityClasses(DefenseSession.class)
                .withConstraintProviderClass(DefenseConstraintProvider.class)
                .withTerminationConfig(new TerminationConfig()
                        .withSpentLimit(Duration.ofSeconds(30)));

        return SolverFactory.create(solverConfig);
    }

    @Bean
    public SolverManager<DefenseTimetable, Long> solverManager(
            SolverFactory<DefenseTimetable> solverFactory) {
        return SolverManager.create(solverFactory);
    }
}