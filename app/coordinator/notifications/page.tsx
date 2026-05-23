'use client'

import { useEffect, useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Bell, CheckCheck, Inbox, Loader2, Trash2 } from 'lucide-react'
import { useAuth } from '@/providers/auth-provider'
import { NotificationService } from '@/services/service_notifications'
import type { Notification } from '@/models/notification.model'
import { formatDistanceToNow } from 'date-fns'

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

export default function CoordinatorNotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState<'all' | 'project' | 'defense' | 'deadline' | 'system'>('all')

  useEffect(() => {
    if (!user?.id) return
    const fetchNotifications = async () => {
      const data = await NotificationService.getNotifications(user.id)
      setNotifications(data)
      setLoading(false)
    }
    fetchNotifications()
  }, [user])

  const handleMarkAsRead = async (id: string) => {
    await NotificationService.markAsRead(id)
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleDelete = (id: string) => {
    // Ideally this would hit a DELETE /api/notifications endpoint, 
    // but for now we remove locally
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.read)
    await Promise.all(unread.map((n) => NotificationService.markAsRead(n.id)))
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getMappedCategory = (type: string): 'project' | 'defense' | 'deadline' | 'system' => {
    if (type.includes('DEADLINE')) return 'deadline'
    if (type.includes('DEFENSE') || type.includes('JURY')) return 'defense'
    if (type.includes('PROJECT') || type.includes('SUBJECT') || type.includes('TASK') || type.includes('COMMIT')) return 'project'
    return 'system'
  }

  const filteredNotifications = notifications.filter((n) =>
    filterCategory === 'all' ? true : getMappedCategory(n.type) === filterCategory
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40'
      case 'defense':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40'
      case 'deadline':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40'
      case 'system':
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'project': return 'Project/Tasks'
      case 'defense': return 'Defense'
      case 'deadline': return 'Deadline'
      case 'system': return 'System'
      default: return 'Other'
    }
  }

  const getTimeLabel = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
    } catch {
      return dateStr
    }
  }

  return (
    <div>
      <PageHeader
        title="Coordinator Notifications"
        description="Stay updated with platform activities and important alerts"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'project', 'defense', 'deadline', 'system'] as const).map((category) => (
            <Button
              key={category}
              variant={filterCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'All' : getCategoryLabel(category)}
            </Button>
          ))}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark all as read ({unreadCount})
          </Button>
        )}
      </div>

      <div className="space-y-4 max-w-4xl">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground font-medium">All caught up!</p>
            <p className="text-sm text-muted-foreground/70">No notifications found.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const cat = getMappedCategory(notif.type)
            return (
              <div
                key={notif.id}
                className={`group bg-card rounded-lg border transition-all p-4 flex gap-4 hover:border-primary/50 cursor-pointer ${
                  notif.read ? 'border-border' : 'border-primary/40 bg-primary/5 shadow-sm'
                }`}
                onClick={() => !notif.read && handleMarkAsRead(notif.id)}
              >
                <div className={`flex-shrink-0 mt-0.5 w-10 h-10 flex items-center justify-center rounded-full text-xl ${getCategoryColor(cat)}`}>
                  {typeIconMap[notif.type] || "🔔"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className={`font-semibold ${notif.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {notif.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <p className="text-xs text-muted-foreground">{getTimeLabel(notif.createdAt)}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(cat).replace('bg-', 'bg-opacity-20 bg-')}`}>
                          {getCategoryLabel(cat)}
                        </span>
                      </div>
                    </div>
                    {!notif.read && <div className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-1.5 shadow-sm" />}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(notif.id)
                  }}
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
