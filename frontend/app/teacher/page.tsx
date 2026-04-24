'use client'

import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/providers/auth-provider'
import { PageHeader } from '@/components/page-header'
import { DashboardCard } from '@/components/dashboard-card'
import { DataTable } from '@/components/data-table'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, ClipboardList, Plus, Clock } from 'lucide-react'
import Link from 'next/link'
import { ProjectsService } from '@/services/service_projects'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const teacherName = user?.name || 'Teacher'
  const teacherRole = user?.role ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}` : 'Teacher'
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectsService.getAllProjects(),
  })

  const activePFEs = projects.slice(0, 4).map((p, idx) => ({
    id: p.id,
    studentName: ['Ali Hassan', 'Noor Mohamed', 'Layla Ahmed', 'Omar Hassan'][idx] || 'Student',
    subject: p.title,
    progress: `${p.progress}%`,
    status: (p.status === 'In Progress' ? 'ongoing' : 'completed') as const,
  }))

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Loading..." description="Loading your dashboard..." />
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title={`Welcome, ${teacherName} (${teacherRole})`}
        description="Overview of your PFE activity"
        action={
          <div className="flex gap-2 flex-col sm:flex-row">
            <Link href="/teacher/availability">
              <Button variant="outline" className="w-full sm:w-auto">
                <Clock className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">My Availability</span>
                <span className="sm:hidden">Availability</span>
              </Button>
            </Link>
            <Link href="/teacher/new-subject">
              <Button className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">New Subject</span>
                <span className="sm:hidden">New</span>
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <DashboardCard
          title="Subjects Proposed"
          value={projects.length.toString()}
          description="View Subjects"
          icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />}
        />
        <DashboardCard
          title="Students Supervised"
          value="12"
          description="View Students"
          icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
        />
        <DashboardCard
          title="Pending Validations"
          value="2"
          description="Awaiting coordinator approval"
          icon={<ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />}
        />
      </div>

      <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Active PFEs</h3>
        <DataTable
          columns={[
            { header: 'Student Name', accessor: 'studentName' },
            { header: 'Subject', accessor: 'subject' },
            { header: 'Progress', accessor: 'progress' },
            {
              header: 'Status',
              accessor: 'status',
              render: (value) => {
                const statusMap = {
                  ongoing: 'completed' as const,
                  completed: 'validated' as const,
                  pending: 'pending' as const,
                }
                return <StatusBadge status={statusMap[value as keyof typeof statusMap]} />
              },
            },
            {
              header: 'Actions',
              accessor: 'id',
              render: (id) => (
                <Link href={`/teacher/students`}>
                  <Button size="sm" variant="outline">View</Button>
                </Link>
              ),
            },
          ]}
          data={activePFEs}
        />
      </div>
    </div>
  )
}
