'use client'

import { MessageSquare, FileUp, CheckCircle, UserPlus, Zap, RefreshCw } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { TasksService } from '@/services/service_tasks'

interface Activity {
  id: string | number
  type: 'message' | 'upload' | 'status' | 'member' | 'task' | 'update'
  author: string
  action: string
  timestamp: string
}

interface ActivityTimelineProps {
  projectId?: string | number
}

function formatTimestamp(value?: string) {
  if (!value) return 'Recently'
  return new Date(value).toLocaleString()
}

export function ActivityTimeline({ projectId }: ActivityTimelineProps) {
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ['project-task-activity', projectId],
    queryFn: () => TasksService.getTasksByProject(projectId!),
    enabled: Boolean(projectId),
  })

  const activities: Activity[] = tasks.map((task) => ({
    id: task.id,
    type: 'task',
    author: task.assignee || 'Project Service',
    action: `${task.status === 'done' ? 'Completed' : task.status === 'inProgress' ? 'Updated' : 'Created'} task: ${task.title}`,
    timestamp: formatTimestamp(task.updatedAt ?? task.createdAt),
  }))

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
        {isLoading && <p className="text-sm text-muted-foreground">Loading activity...</p>}
        {isError && <p className="text-sm text-destructive">Unable to load activity.</p>}
        {!isLoading && !isError && activities.length === 0 && (
          <p className="text-sm text-muted-foreground">No project activity yet.</p>
        )}
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
