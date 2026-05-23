package com.pfe.chat.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_rooms")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

    @Id
    private String id; // Equal to projectId (e.g. "proj_1")

    private String projectId;
    
    private String academicYear; // e.g. "2024-2025"
    
    private boolean active;
    
    private boolean archived; // Soft delete for multi-year support
    
    private LocalDateTime createdAt;
    
    // Last Message Metadata for Sidebar Optimization
    private String lastMessagePreview;
    private LocalDateTime lastMessageAt;

}
