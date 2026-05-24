'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { FileUp, BookOpen, Info, Users, Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CollapsibleSidebar } from '@/components/collaboration/collapsible-sidebar'
import { ProjectInfoSidebar } from '@/components/collaboration/project-info-sidebar'
import { ParticipantsPanel } from '@/components/collaboration/participants-panel'
import { ProjectChatPanel } from '@/components/collaboration/project-chat-panel'
import { ProjectKanban } from '@/components/collaboration/project-kanban'
import { DocumentVersionsPanel } from '@/components/collaboration/document-versions-panel'
import { ActivityTimeline } from '@/components/collaboration/activity-timeline'
import { CommitPanelChatGPT } from '@/components/collaboration/commit-panel-chatgpt'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ProjectsService } from '@/services/service_projects'
import { useAuth } from '@/providers/auth-provider'
import type { ProjectBasic } from '@/models/project.model'

function initials(value?: string) {
  return value?.split(/[.\s_-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'NA'
}

function buildProjectParticipants(project: ProjectBasic, currentStudent?: { id: string; name: string }) {
  const supervisorId = project.supervisors?.find((item) => item.role === 'MAIN_SUPERVISOR')?.teacherId ?? project.supervisors?.[0]?.teacherId ?? 'supervisor'
  const studentId = currentStudent?.id ?? project.members?.[0]?.studentId ?? 'student'

  return {
    teacher: {
      id: supervisorId,
      name: `Teacher ${supervisorId}`,
      avatar: initials(supervisorId),
      role: 'Supervisor',
      online: false,
    },
    student: {
      id: studentId,
      name: currentStudent?.name ?? `Student ${studentId}`,
      avatar: initials(currentStudent?.name ?? studentId),
      role: 'Student',
      online: false,
    },
    jury: [],
  }
}

export default function ProjectPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)

  const [leftMobileOpen, setLeftMobileOpen] = useState(false)
  const [rightMobileOpen, setRightMobileOpen] = useState(false)

  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ['student-project', user?.id],
    queryFn: () => ProjectsService.getProjectsByStudent(user?.id ?? ''),
    enabled: Boolean(user?.id),
  })

  const project = projects[0]
  const hasProject = Boolean(project)
  const participants = project ? buildProjectParticipants(project, user ? { id: user.id, name: user.name } : undefined) : null

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!hasProject) {
    return (
      <div className="p-4 sm:p-6">
        <PageHeader
          title="My Project"
          description="Manage your final year project"
        />
        <div className="bg-card rounded-lg border border-border p-6 sm:p-12 text-center mt-6">
          <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">No Project Yet</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            {isError ? "Unable to load your project right now." : "You haven't been assigned a project. Apply for subjects to get started."}
          </p>
          <Button className="w-full sm:w-auto">Browse Subjects</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <div className="flex-shrink-0 px-4 sm:px-6 pt-4 pb-2">
        <div className="flex items-start justify-between gap-4">
          <PageHeader
            title={project.title}
            description={project.description}
          />
          
          <div className="flex gap-2 lg:hidden">
            <Sheet open={leftMobileOpen} onOpenChange={setLeftMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="shrink-0">
                  <Info className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Project Info</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ProjectInfoSidebar
                    project={project}
                    teacher={participants?.teacher}
                    student={participants?.student}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <Sheet open={rightMobileOpen} onOpenChange={setRightMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="shrink-0">
                  <Users className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Participants</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ParticipantsPanel
                    teacher={participants?.teacher}
                    student={participants?.student}
                    jury={participants?.jury}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 px-4 sm:px-6 pb-4 min-h-0">
        <div className={cn(
          "hidden lg:block flex-shrink-0 transition-all duration-300",
          leftCollapsed ? "w-14" : "w-64 xl:w-72"
        )}>
          <div className="h-full overflow-y-auto rounded-lg border border-border bg-card shadow-sm">
            <CollapsibleSidebar
              side="left"
              onCollapsedChange={setLeftCollapsed}
              icon={<Info className="w-5 h-5" />}
            >
              <div className="p-4">
                <ProjectInfoSidebar
                  project={project}
                  teacher={participants?.teacher}
                  student={participants?.student}
                />
              </div>
            </CollapsibleSidebar>
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-y-auto rounded-lg border border-border bg-card shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
            <div className="flex-shrink-0 border-b border-border overflow-x-auto">
              <TabsList className="inline-flex h-auto w-full lg:grid lg:grid-cols-6 rounded-none border-0 bg-transparent p-0">
                <TabsTrigger value="overview" className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm">Overview</TabsTrigger>
                <TabsTrigger value="chat" className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm">Chat</TabsTrigger>
                <TabsTrigger value="tasks" className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm">Tasks</TabsTrigger>
                <TabsTrigger value="documents" className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm">Docs</TabsTrigger>
                <TabsTrigger value="activity" className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm">Activity</TabsTrigger>
                <TabsTrigger value="commits" className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm">Feedback</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 min-h-0">
              <TabsContent value="overview" className="h-full m-0 p-4 sm:p-6 overflow-y-auto data-[state=inactive]:hidden">
                <div className="space-y-4 sm:space-y-6 max-w-4xl">
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    <div className="bg-background rounded-lg border border-border p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Project Status</h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <p className="text-sm sm:text-base text-muted-foreground">Current Phase</p>
                          <p className="font-semibold text-foreground">{project.phase ?? 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm sm:text-base text-muted-foreground">Completion Rate</p>
                          <p className="font-semibold text-foreground">{project.progress}%</p>
                        </div>
                        <div>
                          <p className="text-sm sm:text-base text-muted-foreground">Last Update</p>
                          <p className="font-semibold text-foreground">{(project.updatedAt ?? project.createdAt) ? new Date((project.updatedAt ?? project.createdAt) as string).toLocaleString() : '—'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background rounded-lg border border-border p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Project Description</h3>
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed">{project.description}</p>
                  </div>

                  <div className="bg-background rounded-lg border border-border p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Upload Report</h3>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                      <FileUp className="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-2 sm:mb-3" />
                      <p className="text-sm sm:text-base text-foreground font-medium mb-1">Drop your report here</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">or click to select</p>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">Select File</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chat" className="h-full m-0 p-4 sm:p-6 data-[state=inactive]:hidden">
                <ProjectChatPanel 
                  projectId={project.id.toString()}
                  participantsIds={[
                    participants?.student.id.toString() ?? '',
                    participants?.teacher.id.toString() ?? '',
                    ...(participants?.jury?.map(j => j.id.toString()) || [])
                  ]} 
                />
              </TabsContent>

              <TabsContent value="tasks" className="h-full m-0 p-4 sm:p-6 overflow-hidden data-[state=inactive]:hidden">
                <ProjectKanban projectId={project.id} />
              </TabsContent>

              <TabsContent value="documents" className="h-full m-0 p-4 sm:p-6 overflow-y-auto data-[state=inactive]:hidden">
                <DocumentVersionsPanel />
              </TabsContent>

              <TabsContent value="activity" className="h-full m-0 p-4 sm:p-6 overflow-y-auto data-[state=inactive]:hidden">
                <ActivityTimeline projectId={project.id} />
              </TabsContent>

              <TabsContent value="commits" className="h-full m-0 p-4 sm:p-6 overflow-y-auto data-[state=inactive]:hidden">
                <CommitPanelChatGPT projectId={project.id.toString()} userRole="student" />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className={cn(
          "hidden lg:block flex-shrink-0 transition-all duration-300",
          rightCollapsed ? "w-14" : "w-64 xl:w-72"
        )}>
          <div className="h-full overflow-y-auto rounded-lg border border-border bg-card shadow-sm">
            <CollapsibleSidebar
              side="right"
              onCollapsedChange={setRightCollapsed}
              icon={<Users className="w-5 h-5" />}
            >
              <div className="p-4">
                <ParticipantsPanel
                  teacher={participants?.teacher}
                  student={participants?.student}
                  jury={participants?.jury}
                />
              </div>
            </CollapsibleSidebar>
          </div>
        </div>
      </div>
    </div>
  )
}
