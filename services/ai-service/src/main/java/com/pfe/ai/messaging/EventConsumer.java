package com.pfe.ai.messaging;

import com.pfe.ai.model.entity.SkillProfile;
import com.pfe.ai.model.enums.OwnerType;
import com.pfe.ai.repository.SkillProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

/**
 * Async event consumer for RabbitMQ integration.
 * Only activated when spring.rabbitmq.enabled=true.
 * In local/dev mode (no RabbitMQ), this bean is skipped entirely.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@ConditionalOnProperty(name = "spring.rabbitmq.enabled", havingValue = "true", matchIfMissing = false)
public class EventConsumer {

    private final SkillProfileRepository skillProfileRepository;

    // @RabbitListener annotations are guarded by the ConditionalOnProperty above
    // so they won't register if RabbitMQ is disabled.
    public void handleTeacherUpdated(TeacherEvent event) {
        log.info("Received TEACHER_UPDATED event for teacher ID: {}", event.teacherId());
        
        Optional<SkillProfile> existing = skillProfileRepository.findByOwnerIdAndOwnerType(event.teacherId(), OwnerType.TEACHER);
        SkillProfile profile = existing.orElseGet(() -> SkillProfile.builder()
                .ownerId(event.teacherId())
                .ownerType(OwnerType.TEACHER)
                .build());
                
        profile.setSkills(Arrays.asList("Java", "Spring", "AI"));
        skillProfileRepository.save(profile);
    }

    public void handleStudentUpdated(StudentEvent event) {
        log.info("Received STUDENT_UPDATED event for student ID: {}", event.studentId());
    }

    public record TeacherEvent(String teacherId, String action) {}
    public record StudentEvent(String studentId, String action) {}
}
