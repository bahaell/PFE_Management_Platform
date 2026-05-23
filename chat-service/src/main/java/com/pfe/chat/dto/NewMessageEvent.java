package com.pfe.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewMessageEvent {

    private String messageId; // Unique Firestore Document ID
    private String roomId;
    private String projectId;
    private String senderId;
    private String senderRole;
    private String content;
    private String academicYear;
    private LocalDateTime createdAt;
    
}
