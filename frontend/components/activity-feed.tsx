'use client'

import { Clock, BookOpen, Users, Calendar, FileUp } from 'lucide-react'

interface ActivityItem {
  id: number
  type: 'subject_validated' | 'student_assigned' | 'defense_scheduled' | 'document_uploaded'
  title: string
  timestamp: string
}

interface ActivityFeedProps {
  items: ActivityItem[]
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'subject_validated':
        return <BookOpen className="w-4 h-4" />
      case 'student_assigned':
        return <Users className="w-4 h-4" />
      case 'defense_scheduled':
        return <Calendar className="w-4 h-4" />
      case 'document_uploaded':
        return <FileUp className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="p-4 bg-secondary rounded-lg border border-border hover:border-primary transition-colors">
          <div className="flex items-start gap-3">
            <div className="text-primary mt-1">{getIcon(item.type)}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.timestamp}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
