'use client'

import { DefenseTimelineItem } from './defense-timeline-item'
import type { DefenseTimelineEvent } from '@/lib/defense-timeline-mock-data'

interface DefenseTimelineProps {
  events: DefenseTimelineEvent[]
  showTeacherRole?: boolean
}

export function DefenseTimeline({ events, showTeacherRole = false }: DefenseTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">No defense events found</p>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {events.map((event) => (
        <DefenseTimelineItem
          key={event.id}
          event={event}
          showTeacherRole={showTeacherRole}
        />
      ))}
    </div>
  )
}
