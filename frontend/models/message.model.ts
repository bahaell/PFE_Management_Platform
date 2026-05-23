// models/message.model.ts
import type { Timestamp } from 'firebase/firestore'

/**
 * Legacy model — kept for compatibility with existing mock data structures.
 */
export interface ProjectMessage {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  createdAt: Date
}

/**
 * ChatMessage — stored in Firestore under:
 *   chatRooms/{projectId}/messages/{messageId}
 *
 * Corrections applied:
 *  - createdAt: Timestamp (not string) → avoids timezone/ordering issues
 *  - academicYear included for multi-year project support
 *  - attachments optional for file sharing
 *  - readBy for future unread-count badge support
 *  - roomId = projectId directly (no "project_" prefix)
 */
export interface ChatMessage {
  id: string                                   // Firestore auto-generated doc ID
  roomId: string                               // = projectId
  projectId: string
  senderId: string                             // e.g. "std001" or "tch001"
  senderName: string
  senderAvatar?: string                        // initials e.g. "AM"
  senderRole: 'student' | 'teacher' | 'coordinator'
  content: string
  attachments?: ChatAttachment[]               // optional file attachments
  readBy?: string[]                            // userIds who read the message
  academicYear: string                         // e.g. "2024-2025"
  edited?: boolean
  deleted?: boolean
  createdAt: Timestamp                         // Firestore server timestamp
}

export interface ChatAttachment {
  name: string
  url: string
  type: 'pdf' | 'image' | 'doc' | 'other'
}

/**
 * ChatRoom — stored in Firestore under:
 *   chatRooms/{projectId}
 */
export interface ChatRoom {
  projectId: string
  academicYear: string
  createdAt: Timestamp
}

/**
 * ChatPresence — stored in Firebase Realtime Database under:
 *   presence/{userId}
 *
 * Uses RTDB instead of Firestore because:
 *  - RTDB supports .onDisconnect() for auto-offline detection
 *  - cheaper and faster for high-frequency presence updates
 */
export interface ChatPresence {
  userId: string
  online: boolean
  typing: boolean
  lastSeen: number   // Unix timestamp (ms)
}
