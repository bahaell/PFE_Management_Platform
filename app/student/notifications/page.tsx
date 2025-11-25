'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Bell, Zap, Calendar, Trash2 } from 'lucide-react'
import { ActivityService } from '@/services/service_collaboration'

interface Notification {
  id: number
  title: string
  message: string
  time: string
  category: 'project' | 'deadline' | 'system'
  read: boolean
  icon: React.ReactNode
}

export default function NotificationsPage() {
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => ActivityService.getAllActivities(),
  })

  const [filterCategory, setFilterCategory] = useState<'all' | 'project' | 'deadline' | 'system'>('all')
  const [deletedIds, setDeletedIds] = useState<number[]>([])

  const handleDelete = (id: number) => {
    setDeletedIds([...deletedIds, id])
  }

  const filteredNotifications = activities
    .filter(n => !deletedIds.includes(n.id))
    .filter((n) => filterCategory === 'all' ? true : n.category === filterCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project':
        return 'text-blue-600 dark:text-blue-400'
      case 'deadline':
        return 'text-red-600 dark:text-red-400'
      case 'system':
        return 'text-purple-600 dark:text-purple-400'
      default:
        return 'text-gray-600'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'project':
        return 'Project'
      case 'deadline':
        return 'Deadline'
      case 'system':
        return 'System'
      default:
        return 'Other'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Notifications" description="Loading..." />
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">Loading notifications...</p>
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

      <div className="flex gap-2 mb-6 flex-wrap">
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

      <div className="space-y-6">
        {filteredNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`bg-card rounded-lg border transition-all p-4 flex gap-4 hover:border-primary/50 cursor-pointer ${
              notif.read ? 'border-border' : 'border-primary/30 bg-primary/5'
            }`}
          >
            <div className={`flex-shrink-0 mt-0.5 ${getCategoryColor(notif.category)}`}>
              {notif.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className={`font-semibold ${notif.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {notif.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-secondary ${getCategoryColor(notif.category)}`}>
                      {getCategoryLabel(notif.category)}
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
        ))}

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
