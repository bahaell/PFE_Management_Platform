package com.pfe.chat.service;

import com.google.cloud.firestore.Firestore;
import com.pfe.chat.dto.CreateRoomRequest;
import com.pfe.chat.firebase.FirebaseSyncService;
import com.pfe.chat.model.ChatParticipant;
import com.pfe.chat.model.ChatRoom;
import com.pfe.chat.repository.ChatParticipantRepository;
import com.pfe.chat.repository.ChatRoomRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomOrchestratorService {

    private final ChatRoomRepository roomRepository;
    private final ChatParticipantRepository participantRepository;
    private final FirebaseSyncService firebaseSyncService;
    private final Firestore firestore;

    /**
     * On startup, attach listeners to all active rooms
     */
    @PostConstruct
    public void initListeners() {
        // Ideally, only fetch active and non-archived rooms
        List<ChatRoom> activeRooms = roomRepository.findAll();
        for (ChatRoom room : activeRooms) {
            if (!room.isArchived() && room.isActive()) {
                firebaseSyncService.listenToRoom(room.getId());
            }
        }
    }

    @Transactional
    public ChatRoom createRoom(CreateRoomRequest request) {
        String roomId = request.getProjectId(); // Using projectId as roomId

        Optional<ChatRoom> existingRoom = roomRepository.findByProjectId(roomId);
        if (existingRoom.isPresent()) {
            return existingRoom.get();
        }

        // 1. Create in PostgreSQL
        ChatRoom newRoom = ChatRoom.builder()
                .id(roomId)
                .projectId(request.getProjectId())
                .academicYear(request.getAcademicYear())
                .active(true)
                .archived(false)
                .createdAt(LocalDateTime.now())
                .build();
        
        ChatRoom savedRoom = roomRepository.save(newRoom);

        // 2. Add Participants in PostgreSQL
        if (request.getParticipants() != null) {
            for (CreateRoomRequest.ParticipantRequest p : request.getParticipants()) {
                ChatParticipant participant = ChatParticipant.builder()
                        .roomId(roomId)
                        .userId(p.getUserId())
                        .role(p.getRole())
                        .joinedAt(LocalDateTime.now())
                        .build();
                participantRepository.save(participant);
            }
        }

        // 3. Create Metadata in Firestore (AJOUT 1)
        Map<String, Object> firestoreMetadata = new HashMap<>();
        firestoreMetadata.put("projectId", request.getProjectId());
        firestoreMetadata.put("academicYear", request.getAcademicYear());
        firestoreMetadata.put("active", true);
        firestoreMetadata.put("createdAt", com.google.cloud.firestore.FieldValue.serverTimestamp());
        
        firestore.collection("chatRooms")
                 .document(roomId)
                 .set(firestoreMetadata);

        // 4. Attach listener dynamically (PRIORITÉ 1)
        // This ensures the new room is immediately watched for messages without restarting the server
        firebaseSyncService.listenToRoom(roomId);

        return savedRoom;
    }

    @Transactional(readOnly = true)
    public boolean canAccessRoom(String userId, String roomId) {
        // Here we could add logic: if user is admin/coordinator, return true
        return participantRepository.existsByRoomIdAndUserId(roomId, userId);
    }
}
