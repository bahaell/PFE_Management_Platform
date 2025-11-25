'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Bell, Calendar, Users, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react'

interface Notification {
  id: number
  title: string
  message: string
  time: string
  category: 'project' | 'defense' | 'deadline' | 'system'
  read: boolean
  icon: React.ReactNode
}

const notificationsData: Notification[] = [
  {
    id: 1,
    title: 'New project submitted',
    message: '5 new project proposals are pending your approval.',
    time: '1 hour ago',
    category: 'project',
    read: false,
    icon: <Bell className="w-5 h-5" />,
  },
  {
    id: 2,
    title: 'Defense schedule conflict',
    message: 'Room A101 is double-booked for March 15, 2024. Please resolve the conflict.',
    time: '3 hours ago',
    category: 'defense',
    read: false,
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 3,
    title: 'Jury member assigned',
    message: 'Prof. Amari has confirmed participation in defense session.',
    time: '5 hours ago',
    category: 'defense',
    read: false,
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 4,
    title: 'Submission deadline approaching',
    message: 'Project submission deadline is in 3 days. 12 projects still pending.',
    time: '1 day ago',
    category: 'deadline',
    read: true,
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 5,
    title: 'All defenses scheduled',
    message: 'All defense sessions have been successfully scheduled for this semester.',
    time: '2 days ago',
    category: 'defense',
    read: true,
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    id: 6,
    title: 'System maintenance scheduled',
    message: 'Platform will be unavailable on Sunday from 2AM to 4AM.',
    time: '3 days ago',
    category: 'system',
    read: true,
    icon: <AlertCircle className="w-5 h-5" />,
  },
]

export default function CoordinatorNotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [filterCategory, setFilterCategory] = useState<'all' | 'project' | 'defense' | 'deadline' | 'system'>('all')

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const filteredNotifications = notifications.filter((n) =>
    filterCategory === 'all' ? true : n.category === filterCategory
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  const groupedByDate = {
    today: filteredNotifications.filter((n) => n.time.includes('ago') && (n.time.includes('minute') || n.time.includes('hour')) && !n.time.includes('day')),
    yesterday: filteredNotifications.filter((n) => n.time.includes('1 day ago')),
    older: filteredNotifications.filter((n) => n.time.includes('day') && !n.time.includes('1 day ago')),
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project':
        return 'text-blue-600 dark:text-blue-400'
      case 'defense':
        return 'text-green-600 dark:text-green-400'
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
      case 'defense':
        return 'Defense'
      case 'deadline':
        return 'Deadline'
      case 'system':
        return 'System'
      default:
        return 'Other'
    }
  }

  return (
    <div>
      <PageHeader
        title="Notifications"
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
            Mark all as read ({unreadCount})
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {groupedByDate.today.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Today</h3>
            <div className="space-y-2">
              {groupedByDate.today.map((notif) => (
                <div
                  key={notif.id}
                  className={`bg-card rounded-lg border transition-all p-4 flex gap-4 hover:border-primary/50 cursor-pointer ${
                    notif.read ? 'border-border' : 'border-primary/30 bg-primary/5'
                  }`}
                  onClick={() => handleMarkAsRead(notif.id)}
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
            </div>
          </div>
        )}

        {groupedByDate.yesterday.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Yesterday</h3>
            <div className="space-y-2">
              {groupedByDate.yesterday.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-card rounded-lg border border-border p-4 flex gap-4 hover:border-primary/50 cursor-pointer transition-all"
                  onClick={() => handleMarkAsRead(notif.id)}
                >
                  <div className={`flex-shrink-0 mt-0.5 ${getCategoryColor(notif.category)}`}>
                    {notif.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-muted-foreground">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-secondary ${getCategoryColor(notif.category)}`}>
                        {getCategoryLabel(notif.category)}
                      </span>
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
            </div>
          </div>
        )}

        {groupedByDate.older.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Older</h3>
            <div className="space-y-2">
              {groupedByDate.older.map((notif) => (
                <div
                  key={notif.id}
                  className="bg-card rounded-lg border border-border p-4 flex gap-4 hover:border-primary/50 cursor-pointer transition-all opacity-75"
                  onClick={() => handleMarkAsRead(notif.id)}
                >
                  <div className={`flex-shrink-0 mt-0.5 ${getCategoryColor(notif.category)}`}>
                    {notif.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-muted-foreground">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-secondary ${getCategoryColor(notif.category)}`}>
                        {getCategoryLabel(notif.category)}
                      </span>
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
            </div>
          </div>
        )}

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
