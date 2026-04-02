"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, CheckCheck, Inbox, Loader2, X } from "lucide-react"
import { NotificationService } from "@/services/service_notifications"
import type { Notification } from "@/models/notification.model"
import { formatDistanceToNow } from "date-fns"

interface NotificationPanelProps {
  userId: string
}

const typeIconMap: Record<string, string> = {
  NEW_COMMIT: "💬",
  NEW_MESSAGE: "✉️",
  TASK_ASSIGNED: "📌",
  TASK_UPDATED: "🔄",
  DOCUMENT_READY: "📄",
  DOCUMENT_UPLOADED: "📤",
  ACADEMIC_DOCUMENT_GENERATED: "🎓",
  ACADEMIC_DOCUMENT_REQUESTED: "📋",
  DEFENSE_SCHEDULED: "🗓️",
  DEFENSE_REQUEST_CREATED: "📝",
  JURY_ASSIGNED: "👩‍⚖️",
  SUBJECT_APPROVED: "✅",
  SUBJECT_APPLICATION_CREATED: "📨",
  SUBJECT_APPLICATION_UPDATED: "🔔",
  PROJECT_CREATED: "🚀",
  USER_CREATED: "👤",
  DEADLINE_REMINDER: "⏰",
}

function getRelativeTime(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
  } catch {
    return dateStr
  }
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function NotificationSkeleton() {
  return (
    <div className="p-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 bg-muted rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-muted rounded w-2/3" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-2 bg-muted rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Inbox className="w-10 h-10 text-muted-foreground mb-3 opacity-50" />
      <p className="text-sm font-medium text-foreground">All caught up!</p>
      <p className="text-xs text-muted-foreground mt-1">No notifications yet.</p>
    </div>
  )
}

// ─── Single notification item ─────────────────────────────────────────────────
function NotificationItem({
  notification,
  index,
  onMarkRead,
}: {
  notification: Notification
  index: number
  onMarkRead: (id: string) => void
}) {
  const icon = typeIconMap[notification.type] ?? "🔔"
  const time = getRelativeTime(notification.createdAt)

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
      className={`group relative flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 cursor-pointer transition-colors hover:bg-muted/40 ${
        !notification.read ? "bg-primary/5" : ""
      }`}
      onClick={() => !notification.read && onMarkRead(notification.id)}
    >
      {/* Icon */}
      <div className="mt-0.5 w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 text-base">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 justify-between">
          <p className="text-sm font-semibold text-foreground truncate">{notification.title}</p>
          {!notification.read && (
            <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.message}</p>
        <p className="text-xs text-muted-foreground/60 mt-1">{time}</p>
      </div>
    </motion.div>
  )
}

// ─── Main Panel ───────────────────────────────────────────────────────────────
export function NotificationPanel({ userId }: NotificationPanelProps) {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const fetchNotifications = useCallback(async () => {
    if (!userId) return
    setLoading(true)
    setError(false)
    try {
      const data = await NotificationService.getNotifications(userId)
      setNotifications(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Fetch on mount and on panel open
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  useEffect(() => {
    if (open) fetchNotifications()
  }, [open, fetchNotifications])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest("#notification-panel-root")) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  const handleMarkRead = async (id: string) => {
    await NotificationService.markAsRead(id)
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.read)
    await Promise.all(unread.map((n) => NotificationService.markAsRead(n.id)))
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div id="notification-panel-root" className="relative">
      {/* Bell Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5 text-foreground" />
        {unreadCount > 0 && (
          <motion.span
            key={unreadCount}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-screen max-w-[calc(100vw-2rem)] sm:w-[360px] bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleMarkAllRead}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded-md hover:bg-primary/10"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mark all read</span>
                  </motion.button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[400px] overflow-y-auto">
              {loading ? (
                <NotificationSkeleton />
              ) : error ? (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  <p>Unable to load notifications.</p>
                  <button
                    onClick={fetchNotifications}
                    className="mt-2 text-primary hover:underline text-xs"
                  >
                    Try again
                  </button>
                </div>
              ) : notifications.length === 0 ? (
                <EmptyState />
              ) : (
                <div>
                  {notifications.map((n, i) => (
                    <NotificationItem
                      key={n.id}
                      notification={n}
                      index={i}
                      onMarkRead={handleMarkRead}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2.5 border-t border-border bg-muted/20">
                <button
                  onClick={() => setOpen(false)}
                  className="block w-full text-center text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  View all notifications →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
