'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Bell, FileText, MessageSquare, Users, AlertCircle, Trash2, Clock } from 'lucide-react'

interface Notification {
  id: number
  title: string
  message: string
  time: string
  category: 'students' | 'projects' | 'applications' | 'system'
  read: boolean
  icon: React.ReactNode
}

const notificationsData: Notification[] = [
  {
    id: 1,
    title: 'New Project Application',
    message: 'Sarah Martin applied for "Machine Learning for Healthcare Diagnostics"',
    time: '30 minutes ago',
    category: 'applications',
    read: false,
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    id: 2,
    title: 'Project Update Submitted',
    message: 'Alex Johnson submitted progress update for "IoT Smart Home System"',
    time: '2 hours ago',
    category: 'projects',
    read: false,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 3,
    title: 'Student Message',
    message: 'Emma Davis sent you a message regarding project guidelines',
    time: '5 hours ago',
    category: 'students',
    read: false,
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 4,
    title: 'Document Review Required',
    message: 'Final report submitted by Michael Brown requires your review',
    time: '1 day ago',
    category: 'projects',
    read: true,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 5,
    title: 'New Student Inquiry',
    message: 'Lisa Anderson is interested in your research area',
    time: '2 days ago',
    category: 'students',
    read: true,
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 6,
    title: 'System Update',
    message: 'Platform maintenance scheduled for this weekend',
    time: '3 days ago',
    category: 'system',
    read: true,
    icon: <AlertCircle className="w-5 h-5" />,
  },
]

export default function TeacherNotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [filterCategory, setFilterCategory] = useState<'all' | 'students' | 'projects' | 'applications' | 'system'>('all')

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
      case 'students':
        return 'text-blue-600 dark:text-blue-400'
      case 'projects':
        return 'text-green-600 dark:text-green-400'
      case 'applications':
        return 'text-purple-600 dark:text-purple-400'
      case 'system':
        return 'text-orange-600 dark:text-orange-400'
      default:
        return 'text-gray-600'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'students':
        return 'Students'
      case 'projects':
        return 'Projects'
      case 'applications':
        return 'Applications'
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
        description="Stay updated with your students and projects"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'students', 'projects', 'applications', 'system'] as const).map((category) => (
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
