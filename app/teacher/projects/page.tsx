'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, MessageCircle, FileText, TrendingUp, Clock, CheckCircle2, AlertCircle, KanbanSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedCard } from '@/components/animations/animated-card'
import { useModalManager } from '@/hooks/use-modal-manager'
import { ProjectsService } from '@/services/service_projects'
import type { ProjectBasic } from '@/models/project.model'

export default function TeacherProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { open } = useModalManager()

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectsService.getAllProjects(),
  })

  const studentNames = ['Ahmed Mohamed', 'Sara Ali', 'Omar Hassan', 'Layla Ahmed']
  const studentEmails = ['ahmed@student.edu', 'sara@student.edu', 'omar@student.edu', 'layla@student.edu']

  const enrichedProjects = projects.map((p, idx) => ({
    id: p.id,
    title: p.title,
    student: {
      name: studentNames[idx] || 'Student',
      email: studentEmails[idx] || 'student@edu',
      avatar: studentNames[idx]?.split(' ').map(n => n[0]).join('') || 'ST',
    },
    progress: p.progress,
    status: (p.progress > 70 ? 'on-track' : p.progress > 40 ? 'at-risk' : 'pending') as 'on-track' | 'at-risk' | 'completed' | 'pending',
    lastUpdate: '3 hours ago',
    nextDeadline: `Milestone ${Math.ceil(p.progress / 25)} - Feb ${25 + idx}`,
    unreadMessages: idx,
    documentsCount: 3 + idx,
  }))

  const filteredProjects = enrichedProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.student.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'on-track':
        return { color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle2, label: 'On Track' }
      case 'at-risk':
        return { color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: AlertCircle, label: 'At Risk' }
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock, label: 'Pending' }
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: FileText, label: 'Unknown' }
    }
  }

  const stats = [
    { label: 'Total Projects', value: filteredProjects.length, icon: FileText, color: 'text-blue-600' },
    { label: 'On Track', value: filteredProjects.filter(p => p.status === 'on-track').length, icon: TrendingUp, color: 'text-green-600' },
    { label: 'At Risk', value: filteredProjects.filter(p => p.status === 'at-risk').length, icon: AlertCircle, color: 'text-red-600' },
    { label: 'Unread Messages', value: filteredProjects.reduce((sum, p) => sum + p.unreadMessages, 0), icon: MessageCircle, color: 'text-purple-600' },
  ]

  const mockTasks = {
    todo: [
      { id: 1, title: 'Literature Review', description: 'Complete the literature review section', priority: 'high' as const, assignee: 'Student', assigneeId: 'student-1', dueDate: '2024-02-25' },
      { id: 2, title: 'Data Collection', description: 'Gather required data sets', priority: 'medium' as const, assignee: 'Student', assigneeId: 'student-1', dueDate: '2024-02-28' },
    ],
    inProgress: [
      { id: 3, title: 'System Design', description: 'Create system architecture diagram', priority: 'high' as const, assignee: 'Student', assigneeId: 'student-1', dueDate: '2024-02-20' },
    ],
    done: [
      { id: 4, title: 'Proposal Submission', description: 'Submit initial project proposal', priority: 'low' as const, assignee: 'Student', assigneeId: 'student-1', dueDate: '2024-02-10' },
    ],
  }

  const handleOpenTasks = (projectId: number) => {
    open({
      id: 'expand-tasks-modal',
      type: 'expand-tasks',
      level: 1,
      props: {
        tasks: mockTasks,
        onTasksUpdate: (updatedTasks: any) => {
          console.log('[v0] Tasks updated:', updatedTasks)
        },
      },
    })
  }

  const handleOpenChat = (project: any) => {
    open({
      id: `chat-modal-${project.id}`,
      type: 'chat',
      level: 1,
      props: {
        projectId: project.id,
        projectTitle: project.title,
      },
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Student Projects" description="Loading..." />
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <PageHeader
        title="Student Projects"
        description="Monitor and collaborate on projects with your assigned students"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <AnimatedCard key={stat.label} delay={index * 0.1}>
              <Card className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-lg bg-secondary ${stat.color}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
          )
        })}
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects or students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredProjects.map((project, index) => {
          const statusConfig = getStatusConfig(project.status)
          const StatusIcon = statusConfig.icon

          return (
            <AnimatedCard key={project.id} delay={index * 0.1}>
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                          {project.student.avatar}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {project.student.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {project.student.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${statusConfig.color} shrink-0`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="truncate">{project.lastUpdate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>{project.documentsCount} docs</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-xs font-medium text-blue-700 dark:text-blue-300 uppercase mb-1">
                      Next Deadline
                    </p>
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      {project.nextDeadline}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleOpenTasks(project.id)}
                      className="flex-1"
                      size="sm"
                    >
                      <KanbanSquare className="w-4 h-4 mr-2" />
                      Tasks
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="relative"
                      onClick={() => handleOpenChat(project)}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {project.unreadMessages > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {project.unreadMessages}
                        </span>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => open({
                        id: `commits-modal-${project.id}`,
                        type: 'commits',
                        level: 1,
                        props: { projectId: project.id }
                      })}
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? 'Try adjusting your search query' : 'No projects assigned yet'}
          </p>
        </Card>
      )}
    </div>
  )
}
