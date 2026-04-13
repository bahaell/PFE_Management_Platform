'use client'

import { Calendar, Users, CrossIcon as ProgressIcon, Target, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface ProjectInfoSidebarProps {
  project?: {
    title: string
    subject: string
    description: string
    deadline: string
    progress: number
    status: string
  }
  teacher?: {
    name: string
    avatar: string
    role: string
  }
  student?: {
    name: string
    avatar: string
    role: string
  }
}

export function ProjectInfoSidebar({ 
  project = { title: 'AI in Healthcare', subject: 'Artificial Intelligence', description: 'Building an intelligent system for disease detection', deadline: '2024-06-30', progress: 65, status: 'In Progress' },
  teacher = { name: 'Dr. Ahmed Hassan', avatar: 'AH', role: 'Supervisor' },
  student = { name: 'Ahmed Mohamed', avatar: 'AM', role: 'Student' }
}: ProjectInfoSidebarProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Project Header */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h2 className="text-lg font-bold text-foreground truncate">{project.title}</h2>
        <p className="text-xs text-muted-foreground mt-1">{project.subject}</p>
        <Badge className="mt-3">{project.status}</Badge>
      </div>

      {/* Progress */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <ProgressIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Progress</span>
        </div>
        <Progress value={project.progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">{project.progress}% Complete</p>
      </div>

      {/* Deadline */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Deadline</span>
        </div>
        <p className="text-sm text-foreground">{new Date(project.deadline).toLocaleDateString()}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {Math.ceil((new Date(project.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
        </p>
      </div>

      {/* Participants */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Participants</span>
        </div>
        
        {/* Teacher */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-white">
            {teacher.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{teacher.name}</p>
            <p className="text-xs text-muted-foreground">{teacher.role}</p>
          </div>
        </div>

        {/* Student */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-white">
            {student.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
            <p className="text-xs text-muted-foreground">{student.role}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Tasks</span>
            <span className="text-sm font-semibold text-foreground">6</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Documents</span>
            <span className="text-sm font-semibold text-foreground">5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Messages</span>
            <span className="text-sm font-semibold text-foreground">12</span>
          </div>
        </div>
      </div>
    </div>
  )
}
