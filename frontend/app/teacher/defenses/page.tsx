'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, Search, Calendar, Clock, MapPin, Users } from 'lucide-react'
import { MOCK_TEACHER_DEFENSES } from '@/lib/teacher-defense-mock-data'
import { getJuryRoleBadgeColor, getJuryRoleLabel } from '@/lib/scheduler-mock-data'

export default function TeacherDefensesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDefenses = MOCK_TEACHER_DEFENSES.filter(
    (defense) =>
      defense.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defense.subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
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
      <Badge className={colors[status as keyof typeof colors]}>
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

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by student name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredDefenses.map((defense) => (
          <Card key={defense.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              {/* Header with Student & Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {defense.student.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{defense.student.name}</h3>
                    <p className="text-xs text-muted-foreground">{defense.student.email}</p>
                  </div>
                </div>
                {getStatusBadge(defense.defense.status)}
              </div>

              {/* Subject */}
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

              {/* Defense Details */}
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

              {/* My Role & Jury */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">My Role:</span>
                  <Badge className={`${getJuryRoleBadgeColor(defense.teacherRole)} border text-xs`}>
                    {getJuryRoleLabel(defense.teacherRole)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center -space-x-2">
                    {defense.jury.slice(0, 3).map((member: any) => (
                      <div
                        key={member.teacher.id}
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary border-2 border-background"
                        title={member.teacher.name}
                      >
                        {member.teacher.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
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

      {filteredDefenses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No defenses found matching your search.</p>
        </div>
      )}
    </div>
  )
}
