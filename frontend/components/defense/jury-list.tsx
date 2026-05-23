import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Circle } from 'lucide-react'
import { getJuryRoleBadgeColor, getJuryRoleLabel, type JuryMember } from '@/lib/scheduler-mock-data'

interface JuryListProps {
  jury: JuryMember[]
}

export function JuryList({ jury }: JuryListProps) {
  return (
    <Card className="p-6">
      <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Users className="w-4 h-4 text-muted-foreground" />
        Jury Composition
      </h4>
      <div className="space-y-3">
        {jury.map((member) => (
          <div
            key={member.teacher.id}
            className="flex items-center justify-between p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {member.teacher.name.split(' ').map(n => n[0]).join('')}
                </div>
                <Circle className="w-3 h-3 absolute -bottom-0.5 -right-0.5 text-green-500 fill-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{member.teacher.name}</p>
                <p className="text-xs text-muted-foreground">
                  {member.teacher.title} • {member.teacher.speciality}
                </p>
              </div>
            </div>
            <Badge className={`${getJuryRoleBadgeColor(member.role)} border`}>
              {getJuryRoleLabel(member.role)}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}
