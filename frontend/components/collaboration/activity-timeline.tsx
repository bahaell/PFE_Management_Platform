'use client'

import { MessageSquare, FileUp, CheckCircle, UserPlus, Zap, RefreshCw } from 'lucide-react'

interface Activity {
  id: number
  type: 'message' | 'upload' | 'status' | 'member' | 'task' | 'update'
  author: string
  action: string
  timestamp: string
}

export function ActivityTimeline() {
  const activities: Activity[] = [
    {
      id: 1,
      type: 'message',
      author: 'Dr. Ahmed Hassan',
      action: 'Added feedback on methodology section',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'upload',
      author: 'Ahmed Mohamed',
      action: 'Uploaded new version of Project Proposal',
      timestamp: '3 hours ago'
    },
    {
      id: 3,
      type: 'task',
      author: 'Dr. Ahmed Hassan',
      action: 'Created task: Model validation & testing',
      timestamp: '1 day ago'
    },
    {
      id: 4,
      type: 'status',
      author: 'System',
      action: 'Project status changed to In Progress',
      timestamp: '3 days ago'
    },
    {
      id: 5,
      type: 'member',
      author: 'Dr. Ahmed Hassan',
      action: 'Added as project supervisor',
      timestamp: '1 week ago'
    }
  ]

  const getIcon = (type: string) => {
    const iconClass = 'w-4 h-4'
    switch(type) {
      case 'message': return <MessageSquare className={iconClass} />
      case 'upload': return <FileUp className={iconClass} />
      case 'status': return <CheckCircle className={iconClass} />
      case 'member': return <UserPlus className={iconClass} />
      case 'task': return <Zap className={iconClass} />
      case 'update': return <RefreshCw className={iconClass} />
      default: return null
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border p-3 sm:p-6 shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Activity Timeline</h3>
      
      <div className="space-y-3 sm:space-y-4">
        {activities.map((activity, idx) => (
          <div key={activity.id} className="flex gap-3 sm:gap-4 relative">
            {idx !== activities.length - 1 && (
              <div className="absolute left-2 sm:left-3 top-8 bottom-0 w-0.5 bg-border"></div>
            )}
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 relative z-10">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 pt-0.5 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-foreground truncate">{activity.author}</p>
              <p className="text-xs sm:text-sm text-muted-foreground break-words">{activity.action}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
