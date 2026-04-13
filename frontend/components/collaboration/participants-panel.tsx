'use client'

import { Users, Circle, Calendar, Clock, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Participant {
  id: number
  name: string
  avatar: string
  role: string
  online: boolean
}

interface DefenseInfo {
  date: string
  time: string
  room: string
  duration?: string
}

interface ParticipantsPanelProps {
  teacher?: Participant
  student?: Participant
  jury?: Participant[]
  defense?: DefenseInfo
  onStartChat?: () => void
  onAssignTask?: () => void
  onUploadDocument?: () => void
}
// </CHANGE>

export function ParticipantsPanel({
  teacher = { id: 1, name: 'Dr. Ahmed Hassan', avatar: 'AH', role: 'Supervisor', online: true },
  student = { id: 2, name: 'Ahmed Mohamed', avatar: 'AM', role: 'Student', online: true },
  jury = [
    { id: 3, name: 'Dr. Fatima Al-Mansouri', avatar: 'FM', role: 'Jury Member', online: false },
    { id: 4, name: 'Prof. Mohammed Al-Zarouni', avatar: 'MZ', role: 'Jury Member', online: true },
  ],
  defense,
}: ParticipantsPanelProps) {
  const renderParticipant = (participant: Participant) => (
    <div key={participant.id} className="flex items-center gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0 mb-3 last:mb-0">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-white">
          {participant.avatar}
        </div>
        <Circle
          className={`w-3 h-3 absolute -bottom-0.5 -right-0.5 ${participant.online ? 'text-green-500 fill-green-500' : 'text-gray-400 fill-gray-400'}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{participant.name}</p>
        <p className="text-xs text-muted-foreground">{participant.role}</p>
      </div>
    </div>
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
  // </CHANGE>

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Title */}
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Participants</h3>
      </div>

      {/* Supervisor */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Supervisor</h4>
        {renderParticipant(teacher)}
      </div>

      {/* Student */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Student</h4>
        {renderParticipant(student)}
      </div>

      {/* Jury Members */}
      {jury && jury.length > 0 && (
        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Jury Members</h4>
          {jury.map(member => renderParticipant(member))}
        </div>
      )}

      {defense && (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Soutenance</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium text-foreground">{formatDate(defense.date)}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Heure</p>
                <p className="text-sm font-medium text-foreground">
                  {defense.time} {defense.duration && `(${defense.duration})`}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Salle</p>
                <p className="text-sm font-medium text-foreground">{defense.room}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* </CHANGE> */}
    </div>
  )
}
