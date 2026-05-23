'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { listenMessages, sendMessage, ensureChatRoom, setTyping } from '@/services/service_chat'
import type { ChatMessage } from '@/models/message.model'
import { useAuth } from '@/providers/auth-provider'

interface UseChatOptions {
  projectId: string
  academicYear?: string
}

interface UseChatReturn {
  messages: ChatMessage[]
  loading: boolean
  sendMsg: (content: string) => Promise<void>
  setTypingState: (typing: boolean) => void
}

/**
 * useChat — hooks into Firestore real-time messages for a project chat room.
 * 
 * Usage:
 *   const { messages, loading, sendMsg, setTypingState } = useChat({ projectId })
 */
export function useChat({ projectId, academicYear = '2024-2025' }: UseChatOptions): UseChatReturn {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!projectId) return

    // Ensure room exists, then start listening
    ensureChatRoom(projectId, academicYear).then(() => {
      const unsubscribe = listenMessages(projectId, (msgs) => {
        setMessages(msgs)
        setLoading(false)
      })
      return () => unsubscribe()
    })
  }, [projectId, academicYear])

  const sendMsg = useCallback(
    async (content: string) => {
      if (!user || !content.trim()) return

      // Map mock role IDs to roles
      const role: ChatMessage['senderRole'] =
        user.role === 'teacher' ? 'teacher'
        : user.role === 'coordinator' ? 'coordinator'
        : 'student'

      // Generate avatar initials from name
      const nameParts = (user.name || user.id).split(' ')
      const avatar = nameParts.map((p: string) => p[0]).join('').toUpperCase().slice(0, 2)

      await sendMessage(projectId, {
        roomId: projectId,
        projectId,
        senderId: user.id,
        senderName: user.name || user.id,
        senderAvatar: avatar,
        senderRole: role,
        content: content.trim(),
        academicYear,
        edited: false,
        deleted: false,
      })
    },
    [user, projectId, academicYear]
  )

  const setTypingState = useCallback(
    (typing: boolean) => {
      if (!user) return

      // Clear any existing debounce timer
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)

      setTyping(user.id, typing)

      // Auto-stop typing after 3 seconds
      if (typing) {
        typingTimerRef.current = setTimeout(() => {
          setTyping(user.id, false)
        }, 3000)
      }
    },
    [user]
  )

  return { messages, loading, sendMsg, setTypingState }
}
