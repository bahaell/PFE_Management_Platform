package com.pfe.chat.controller;

import com.pfe.chat.dto.CreateRoomRequest;
import com.pfe.chat.dto.ParticipantResponse;
import com.pfe.chat.model.ChatParticipant;
import com.pfe.chat.model.ChatRoom;
import com.pfe.chat.repository.ChatParticipantRepository;
import com.pfe.chat.service.RoomOrchestratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rooms") // API Gateway will route /api/chat/rooms here
@RequiredArgsConstructor
public class RoomController {

    private final RoomOrchestratorService roomOrchestratorService;
    private final ChatParticipantRepository participantRepository;

    @PostMapping
    public ResponseEntity<ChatRoom> createRoom(
            @RequestHeader(value = "X-USER-ID", required = false) String userId,
            @RequestHeader(value = "X-USER-ROLE", required = false) String userRole,
            @RequestBody CreateRoomRequest request) {
            
        // Future JWT Gateway Validation
        // if (userId == null || !userRole.equals("coordinator")) {
        //     return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        // }

        ChatRoom room = roomOrchestratorService.createRoom(request);
        return ResponseEntity.ok(room);
    }

    @GetMapping("/{roomId}/access")
    public ResponseEntity<Boolean> checkAccess(
            @PathVariable String roomId,
            @RequestHeader("X-USER-ID") String userId) {
            
        boolean canAccess = roomOrchestratorService.canAccessRoom(userId, roomId);
        if (canAccess) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(false);
    }

    /**
     * Retourne la liste des participants d'une room.
     * Utilisé par le notification-service pour identifier qui notifier
     * lorsqu'un nouveau message est publié dans la room.
     *
     * Accès : interne (microservice-to-microservice), pas exposé au public.
     * Dans un vrai environnement : protégé par un secret inter-service (ex: X-INTERNAL-KEY).
     */
    @GetMapping("/{roomId}/participants")
    public ResponseEntity<List<ParticipantResponse>> getParticipants(
            @PathVariable String roomId) {

        List<ParticipantResponse> participants = participantRepository.findByRoomId(roomId)
                .stream()
                .map(p -> ParticipantResponse.builder()
                        .userId(p.getUserId())
                        .role(p.getRole())
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(participants);
    }
}
