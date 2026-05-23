package com.pfe.chat.firebase;

import com.google.cloud.firestore.DocumentChange;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.pfe.chat.dto.NewMessageEvent;
import com.pfe.chat.rabbitmq.ChatEventProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class FirebaseSyncService {

    private final Firestore firestore;
    private final ChatEventProducer eventProducer;
    
    // Store listeners to avoid attaching multiple times to the same room
    private final Map<String, Boolean> activeListeners = new ConcurrentHashMap<>();

    /**
     * Attaches a listener to a specific room's messages collection.
     * Prevents listening to the entire chatRooms collection.
     */
    public void listenToRoom(String roomId) {
        if (activeListeners.containsKey(roomId)) {
            return;
        }

        log.info("Attaching Firestore listener for room: {}", roomId);
        
        firestore.collection("chatRooms")
                 .document(roomId)
                 .collection("messages")
                 .addSnapshotListener((snapshots, e) -> {
                     if (e != null) {
                         log.error("Listen failed for room {}: {}", roomId, e.getMessage());
                         return;
                     }

                     if (snapshots != null) {
                         for (DocumentChange dc : snapshots.getDocumentChanges()) {
                             switch (dc.getType()) {
                                 case ADDED:
                                     handleNewMessage(roomId, dc.getDocument());
                                     break;
                                 case MODIFIED:
                                 case REMOVED:
                                     // Handle edit/delete if necessary
                                     break;
                             }
                         }
                     }
                 });
                 
        activeListeners.put(roomId, true);
    }

    private void handleNewMessage(String roomId, QueryDocumentSnapshot document) {
        // Skip messages that don't have a server timestamp yet (pending writes)
        if (!document.contains("createdAt") || document.get("createdAt") == null) {
            return;
        }

        try {
            Date createdAtDate = document.getDate("createdAt");
            LocalDateTime createdAt = createdAtDate.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
            
            // To prevent spamming old messages on startup, you could check if createdAt is > server start time
            // For now, we publish all ADDED events. In production, maintain a watermark.

            NewMessageEvent event = NewMessageEvent.builder()
                    .messageId(document.getId())
                    .roomId(roomId)
                    .projectId(document.getString("projectId"))
                    .senderId(document.getString("senderId"))
                    .senderRole(document.getString("senderRole"))
                    .content(document.getString("content"))
                    .academicYear(document.getString("academicYear"))
                    .createdAt(createdAt)
                    .build();

            eventProducer.publishNewMessageEvent(event);

        } catch (Exception ex) {
            log.error("Error parsing message document: {}", ex.getMessage());
        }
    }
    
    /**
     * Reads presence data from Realtime Database (RTDB).
     * Useful for checking if a user is offline before sending a notification.
     */
    public boolean isUserOnline(String userId) {
        try {
            // Note: In Spring Boot Admin SDK, RTDB access requires configuring the database URL in FirebaseOptions
            // This is a placeholder for the RTDB gateway logic.
            // DatabaseReference ref = FirebaseDatabase.getInstance().getReference("presence/" + userId + "/online");
            // ... fetch logic
            return false;
        } catch (Exception ex) {
            log.warn("Failed to check RTDB presence for user {}: {}", userId, ex.getMessage());
            return false;
        }
    }
}
