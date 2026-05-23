'use client'

import { useEffect, createContext, useContext } from 'react'
import { useAuth } from './auth-provider'
import { requestNotificationPermissionAndGetToken, messaging } from '@/lib/firebase'
import { NotificationService } from '@/services/service_notifications'
import { onMessage } from 'firebase/messaging'
import { useQueryClient } from '@tanstack/react-query'
import { useSelfPresence } from '@/hooks/use-presence'

const FirebaseContext = createContext({})

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  useSelfPresence()

  useEffect(() => {
    if (!user?.id) return

    const initFirebase = async () => {
      // Small delay to let the app load smoothly before asking for permission popup
      setTimeout(async () => {
        try {
          const token = await requestNotificationPermissionAndGetToken()
          if (token) {
            console.log("Got FCM Device Token:", token)
            await NotificationService.registerDeviceToken(user.id, token)
          }
        } catch (e) {
          console.error("Firebase init failed:", e)
        }
      }, 2000)
    }

    initFirebase()

    // Listen to foreground messages
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload: any) => {
        console.log('[Foreground Push] Message received:', payload)
        // Automatically invalidate the notifications query to refresh the bell and pages!
        queryClient.invalidateQueries({ queryKey: ['notifications'] })
        
        // Optional: you could add a toast here like sonner toast("New notification")
      })
      return () => unsubscribe()
    }
  }, [user, queryClient])

  return <FirebaseContext.Provider value={{}}>{children}</FirebaseContext.Provider>
}

export const useFirebase = () => useContext(FirebaseContext)
