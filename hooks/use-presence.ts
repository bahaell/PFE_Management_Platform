'use client'

import { useState, useEffect } from 'react'
import { listenPresence, setUserOnline } from '@/services/service_chat'
import type { ChatPresence } from '@/models/message.model'
import { useAuth } from '@/providers/auth-provider'

/**
 * usePresence — hooks into Realtime Database to get online/typing status of a list of users.
 */
export function usePresence(userIds: string[]) {
  const [presenceMap, setPresenceMap] = useState<Record<string, ChatPresence>>({})

  useEffect(() => {
    if (!userIds || userIds.length === 0) return

    const unsubscribes = listenPresence(userIds, (updatedMap) => {
      setPresenceMap(updatedMap)
    })

    return () => {
      unsubscribes.forEach((unsub) => unsub())
    }
  }, [userIds.join(',')])

  return { presenceMap }
}

/**
 * useSelfPresence — sets the current user's online status in RTDB using .onDisconnect.
 * Call this once near the root of the app or in a global provider/layout.
 */
export function useSelfPresence() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    // Set online and setup .onDisconnect cleanup
    const cleanup = setUserOnline(user.id)

    return () => {
      cleanup() // Sets offline on unmount
    }
  }, [user])
}
