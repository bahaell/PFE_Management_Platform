// services/service_chat.ts
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  Unsubscribe,
  limit,
} from 'firebase/firestore'
import {
  ref,
  set,
  onValue,
  onDisconnect,
  serverTimestamp as rtdbServerTimestamp,
  Unsubscribe as RtdbUnsubscribe,
} from 'firebase/database'
import { db, rtdb } from '@/lib/firebase'
import type { ChatMessage, ChatRoom, ChatPresence } from '@/models/message.model'

// ─── Firestore paths ──────────────────────────────────────────────────────────
const roomRef = (projectId: string) => doc(db, 'chatRooms', projectId)
const messagesRef = (projectId: string) => collection(db, 'chatRooms', projectId, 'messages')

// ─── Realtime Database paths ──────────────────────────────────────────────────
const presenceRef = (userId: string) => ref(rtdb, `presence/${userId}`)

// ─── ChatRoom ─────────────────────────────────────────────────────────────────

/**
 * Ensure the ChatRoom document exists in Firestore.
 * Called once when the chat tab is opened.
 */
export async function ensureChatRoom(projectId: string, academicYear: string): Promise<void> {
  const roomDocRef = roomRef(projectId)
  const snap = await getDoc(roomDocRef)
  if (!snap.exists()) {
    const room: Omit<ChatRoom, 'createdAt'> & { createdAt: ReturnType<typeof serverTimestamp> } = {
      projectId,
      academicYear,
      createdAt: serverTimestamp() as any,
    }
    await setDoc(roomDocRef, room)
  }
}

// ─── Messages (Firestore) ─────────────────────────────────────────────────────

/**
 * Send a new message to the Firestore chat room.
 * roomId = projectId directly (no hardcoded prefix).
 */
export async function sendMessage(
  projectId: string,
  payload: Omit<ChatMessage, 'id' | 'createdAt'>
): Promise<void> {
  await addDoc(messagesRef(projectId), {
    ...payload,
    createdAt: serverTimestamp(),
  })
}

/**
 * Listen to messages in real-time (last 100 messages, ordered by time).
 * Returns an unsubscribe function — call it on component unmount.
 */
export function listenMessages(
  projectId: string,
  callback: (messages: ChatMessage[]) => void
): Unsubscribe {
  const q = query(messagesRef(projectId), orderBy('createdAt', 'asc'), limit(100))
  return onSnapshot(q, (snapshot) => {
    const msgs: ChatMessage[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<ChatMessage, 'id'>),
    }))
    callback(msgs)
  })
}

// ─── Presence (Realtime Database) ────────────────────────────────────────────

/**
 * Set user as ONLINE and register auto-offline on disconnect.
 * Uses RTDB .onDisconnect() — not possible in Firestore.
 * Returns a cleanup function to call on logout/unmount.
 */
export function setUserOnline(userId: string): () => void {
  const userPresRef = presenceRef(userId)

  const presenceData: Omit<ChatPresence, 'userId'> = {
    online: true,
    typing: false,
    lastSeen: Date.now(),
  }

  // Set online immediately
  set(userPresRef, presenceData)

  // Auto-set offline when connection is lost (browser close, network drop)
  const disconnectRef = onDisconnect(userPresRef)
  disconnectRef.set({
    online: false,
    typing: false,
    lastSeen: rtdbServerTimestamp(),
  })

  // Return cleanup: manually set offline
  return () => {
    set(userPresRef, {
      online: false,
      typing: false,
      lastSeen: Date.now(),
    })
  }
}

/**
 * Set typing indicator for a user (true while typing, false after stopping).
 */
export function setTyping(userId: string, typing: boolean): void {
  set(ref(rtdb, `presence/${userId}/typing`), typing)
}

/**
 * Listen to presence of multiple users.
 * Returns an unsubscribe function.
 */
export function listenPresence(
  userIds: string[],
  callback: (presenceMap: Record<string, ChatPresence>) => void
): RtdbUnsubscribe[] {
  const unsubs: RtdbUnsubscribe[] = []

  const presenceMap: Record<string, ChatPresence> = {}

  userIds.forEach((userId) => {
    const unsub = onValue(presenceRef(userId), (snap) => {
      if (snap.exists()) {
        presenceMap[userId] = { userId, ...snap.val() }
      } else {
        presenceMap[userId] = { userId, online: false, typing: false, lastSeen: 0 }
      }
      callback({ ...presenceMap })
    })
    unsubs.push(unsub)
  })

  return unsubs
}
