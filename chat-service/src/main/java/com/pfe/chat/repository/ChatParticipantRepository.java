package com.pfe.chat.repository;

import com.pfe.chat.model.ChatParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {
    List<ChatParticipant> findByRoomId(String roomId);
    List<ChatParticipant> findByUserId(String userId);
    boolean existsByRoomIdAndUserId(String roomId, String userId);
}
