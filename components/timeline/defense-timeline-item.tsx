'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, FileText, Users, Circle, CheckCircle, XCircle } from 'lucide-react'
import { getJuryRoleBadgeColor, getJuryRoleLabel } from '@/lib/scheduler-mock-data'
import type { DefenseTimelineEvent } from '@/lib/defense-timeline-mock-data'

interface DefenseTimelineItemProps {
  event: DefenseTimelineEvent
  showTeacherRole?: boolean
}

export function DefenseTimelineItem({ event, showTeacherRole = false }: DefenseTimelineItemProps) {
  const [expanded, setExpanded] = useState(false)

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'scheduled':
        return { color: 'bg-blue-500', label: 'Scheduled', badgeClass: 'bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100' }
      case 'completed':
        return { color: 'bg-green-500', label: 'Completed', badgeClass: 'bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-100' }
      case 'cancelled':
        return { color: 'bg-red-500', label: 'Cancelled', badgeClass: 'bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-100' }
      default:
        return { color: 'bg-gray-500', label: status, badgeClass: 'bg-gray-100 text-gray-900 dark:bg-gray-900/20 dark:text-gray-100' }
    }
  }

  const statusConfig = getStatusConfig(event.status)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="flex gap-3 sm:gap-4 group">
      {/* Timeline Line */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${statusConfig.color} ring-2 sm:ring-4 ring-background`} />
        <div className="w-px sm:w-0.5 h-full bg-border mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-6 sm:pb-8 min-w-0">
        <Card className="p-3 sm:p-4 hover:shadow-md transition-all duration-200">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                <Badge className={`${statusConfig.badgeClass} text-xs`}>
                  {statusConfig.label}
                </Badge>
                {showTeacherRole && event.teacherRole && (
                  <Badge className={`${getJuryRoleBadgeColor(event.teacherRole)} border text-xs`}>
                    {getJuryRoleLabel(event.teacherRole)}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                  {event.student.avatar}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">{event.student.name}</h3>
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground mb-2 line-clamp-2">{event.subject.title}</p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {event.subject.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Defense Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
              <span className="text-foreground truncate">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
              <span className="text-foreground">{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
              <span className="text-foreground">{event.room}</span>
            </div>
          </div>

          {/* Jury Preview */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
            <span className="text-xs sm:text-sm text-muted-foreground">Jury:</span>
            <div className="flex -space-x-1.5 sm:-space-x-2">
              {event.jury.slice(0, 3).map((member) => (
                <div
                  key={member.teacher.id}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary border-2 border-background"
                  title={member.teacher.name}
                >
                  {member.teacher.name.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
            </div>
          </div>

          {/* Expand Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="w-full h-9 text-xs sm:text-sm"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show Details
              </>
            )}
          </Button>

          {/* Expanded Content */}
          {expanded && (
            <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-border animate-in slide-in-from-top-2">
              {/* Description */}
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2">Subject Description</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {event.subject.description}
                </p>
              </div>

              {/* Full Jury Composition */}
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Jury Composition</h4>
                <div className="space-y-2">
                  {event.jury.map((member) => (
                    <div
                      key={member.teacher.id}
                      className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="relative shrink-0">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                            {member.teacher.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <Circle className="w-2 h-2 sm:w-2.5 sm:h-2.5 absolute -bottom-0.5 -right-0.5 text-green-500 fill-green-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs sm:text-sm font-medium text-foreground truncate">{member.teacher.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{member.teacher.title}</p>
                        </div>
                      </div>
                      <Badge className={`${getJuryRoleBadgeColor(member.role)} border text-xs shrink-0`}>
                        {getJuryRoleLabel(member.role)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Timeline */}
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Event Timeline</h4>
                <div className="space-y-1.5 sm:space-y-2">
                  {Object.entries(event.timeline).map(([key, time]) => (
                    <div key={key} className="flex items-center justify-between text-xs sm:text-sm gap-2">
                      <span className="text-muted-foreground capitalize truncate">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-foreground font-medium shrink-0">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              {event.attachments.length > 0 && (
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Attachments</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {event.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
                          <span className="text-xs sm:text-sm text-foreground truncate">{attachment.name}</span>
                        </div>
                        <Button size="sm" variant="ghost" className="shrink-0 h-8 w-8 p-0">
                          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Student Progress */}
              {event.progress && (
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3">Student Progress</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Thesis Submitted</span>
                      {event.progress.thesisSubmitted ? (
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Slides Uploaded</span>
                      {event.progress.slidesUploaded ? (
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Documents Complete</span>
                      {event.progress.documentsComplete ? (
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
