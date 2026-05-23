// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
}

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// ─── Firestore (chat messages & rooms) ───────────────────────────────────────
export const db = getFirestore(app)

// ─── Realtime Database (presence, typing, online/offline) ────────────────────
export const rtdb = getDatabase(app)

// ─── Messaging (push notifications) ─────────────────────────────────────────
let messaging: Messaging | null = null
if (typeof window !== 'undefined') {
  try {
    messaging = getMessaging(app)
  } catch (error) {
    console.error('Failed to initialize Firebase Messaging:', error)
  }
}

export { app, messaging }

export const requestNotificationPermissionAndGetToken = async (): Promise<string | null> => {
  if (!messaging) return null

  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      })
      if (currentToken) {
        return currentToken
      } else {
        console.warn('No registration token available.')
        return null
      }
    } else {
      console.warn('Notification permission denied.')
      return null
    }
  } catch (error) {
    console.error('An error occurred while retrieving token.', error)
    return null
  }
}
