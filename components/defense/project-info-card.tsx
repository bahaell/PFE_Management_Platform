import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GraduationCap, Mail, Download } from 'lucide-react'
import type { TeacherDefense } from '@/lib/teacher-defense-mock-data'

interface ProjectInfoCardProps {
  defense: TeacherDefense
}

export function ProjectInfoCard({ defense }: ProjectInfoCardProps) {
  return (
    <Card className="p-6 space-y-6">
      {/* Student Info */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary">
          {defense.student.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">{defense.student.name}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-3 h-3" />
            <span>{defense.student.email}</span>
          </div>
        </div>
      </div>

      {/* Subject Info */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground">Subject</h4>
        <h5 className="text-base font-semibold text-foreground">{defense.subject.title}</h5>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {defense.subject.description}
        </p>
      </div>

      {/* Technologies */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {defense.subject.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Supervisor */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground">Supervisor</h4>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
            {defense.jury.find(m => m.role === 'encadrant')?.teacher.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {defense.jury.find(m => m.role === 'encadrant')?.teacher.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {defense.jury.find(m => m.role === 'encadrant')?.teacher.title}
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <Button variant="outline" className="w-full">
        <Download className="w-4 h-4 mr-2" />
        Download Project Summary
      </Button>
    </Card>
  )
}
