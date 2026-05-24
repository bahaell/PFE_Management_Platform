'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, Search, Calendar, Clock, MapPin, Users } from 'lucide-react'
import { getJuryRoleBadgeColor, getJuryRoleLabel } from '@/lib/scheduler-mock-data'
import { SchedulerService } from '@/services/service_scheduler'
import { useAuth } from '@/providers/auth-provider'
import type { TeacherDefense } from '@/lib/teacher-defense-mock-data'

export default function TeacherDefensesPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [defenses, setDefenses] = useState<TeacherDefense[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    SchedulerService.getTeacherDefenses(user?.id)
      .then(setDefenses)
      .catch(() => setDefenses([]))
      .finally(() => setIsLoading(false))
  }, [user?.id])

  const filteredDefenses = defenses.filter(
    (defense) =>
      defense.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defense.subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === 'TBD') return 'TBD'
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100',
      completed: 'bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-100',
      'in-progress': 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100'
    }
    return (
      <Badge className={colors[status as keyof typeof colors] || colors.scheduled}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Defenses"
        description="View all defenses where you are assigned as jury member"
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by student name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading defenses from scheduling-service...</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {filteredDefenses.map((defense) => (
          <Card key={defense.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {defense.student.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{defense.student.name}</h3>
                    <p className="text-xs text-muted-foreground">{defense.student.email || 'No email provided'}</p>
                  </div>
                </div>
                {getStatusBadge(defense.defense.status)}
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">{defense.subject.title}</h4>
                <div className="flex flex-wrap gap-1">
                  {defense.subject.technologies.slice(0, 4).map((tech: string) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(defense.defense.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{defense.defense.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{defense.defense.room}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">My Role:</span>
                  <Badge className={`${getJuryRoleBadgeColor(defense.teacherRole)} border text-xs`}>
                    {getJuryRoleLabel(defense.teacherRole)}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{defense.jury.length} jury members</span>
                </div>
              </div>

              <Link href={`/teacher/defenses/${defense.id}`} className="block mt-4">
                <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoading && filteredDefenses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No defenses found matching your search.</p>
        </div>
      )}
    </div>
  )
}
