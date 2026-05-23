import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import { getJuryRoleBadgeColor, getJuryRoleLabel } from '@/lib/scheduler-mock-data'
import type { TeacherDefense } from '@/lib/teacher-defense-mock-data'

interface DefenseCardProps {
  defense: TeacherDefense
}

export function DefenseCard({ defense }: DefenseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100'
      case 'completed':
        return 'bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-100'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100'
      default:
        return 'bg-gray-100 text-gray-900 dark:bg-gray-900/20 dark:text-gray-100'
    }
  }

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
    <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Soutenance</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {defense.student.name} • {defense.subject.title}
          </p>
        </div>
        <Badge className={getStatusColor(defense.defense.status)}>
          {defense.defense.status}
        </Badge>
      </div>

      {/* Defense Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{formatDate(defense.defense.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{defense.defense.time} ({defense.defense.duration})</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{defense.defense.room}</span>
        </div>
      </div>

      {/* Your Role */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Your Role:</span>
          <Badge className={`${getJuryRoleBadgeColor(defense.teacherRole)} border`}>
            {getJuryRoleLabel(defense.teacherRole)}
          </Badge>
        </div>
      </div>
    </Card>
  )
}
