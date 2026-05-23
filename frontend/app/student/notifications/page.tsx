'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Bell, Trash2, Loader2, CheckCheck } from 'lucide-react'
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

export default function NotificationsPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [filterCategory, setFilterCategory] = useState<'all' | 'project' | 'deadline' | 'system'>('all')

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: () => NotificationService.getNotifications(user?.id ?? ''),
    enabled: !!user?.id,
  })

  // Optimistic update for marking as read
  const handleMarkAsRead = async (id: string) => {
    const notif = notifications.find(n => n.id === id)
    if (notif?.read) return

    queryClient.setQueryData(['notifications', user?.id], (old: Notification[]) => 
      old.map(n => n.id === id ? { ...n, read: true } : n)
    )
    await NotificationService.markAsRead(id)
  }

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter(n => !n.read)
    queryClient.setQueryData(['notifications', user?.id], (old: Notification[]) => 
      old.map(n => ({ ...n, read: true }))
    )
    await Promise.all(unread.map(n => NotificationService.markAsRead(n.id)))
  }

  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const handleDelete = (id: string) => {
    setDeletedIds([...deletedIds, id])
  }

  const getCategoryFromType = (type: string): 'project' | 'deadline' | 'system' => {
    if (['DEADLINE_REMINDER'].includes(type)) return 'deadline'
    if (['USER_CREATED'].includes(type)) return 'system'
    // Everything else (COMMIT, TASK, DOC) falls under project for students
    return 'project'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project': return 'text-blue-600 dark:text-blue-400'
      case 'deadline': return 'text-red-600 dark:text-red-400'
      case 'system': return 'text-purple-600 dark:text-purple-400'
      default: return 'text-gray-600'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'project': return 'Project'
      case 'deadline': return 'Deadline'
      case 'system': return 'System'
      default: return 'Other'
    }
  }

  const filteredNotifications = notifications
    .filter(n => !deletedIds.includes(n.id))
    .filter(n => filterCategory === 'all' ? true : getCategoryFromType(n.type) === filterCategory)

  const unreadCount = notifications.filter(n => !n.read).length

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Notifications" description="Loading..." />
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Stay updated with your project notifications"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'project', 'deadline', 'system'] as const).map((category) => (
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

      <div className="space-y-4">
        {filteredNotifications.map((notif) => {
          const cat = getCategoryFromType(notif.type)
          return (
            <div
              key={notif.id}
              className={`bg-card rounded-lg border transition-all p-4 flex gap-4 hover:border-primary/50 cursor-pointer ${
                notif.read ? 'border-border' : 'border-primary/30 bg-primary/5'
              }`}
              onClick={() => handleMarkAsRead(notif.id)}
            >
              <div className={`flex-shrink-0 mt-0.5 text-2xl w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 ${getCategoryColor(cat)}`}>
                {typeIconMap[notif.type] || "🔔"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className={`font-semibold ${notif.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notif.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                      </p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-secondary ${getCategoryColor(cat)}`}>
                        {getCategoryLabel(cat)}
                      </span>
                    </div>
                  </div>
                  {!notif.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />}
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="opacity-0 hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(notif.id)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )
        })}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">No notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  )
}
