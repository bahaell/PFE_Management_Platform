'use client'

import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { DashboardCard } from '@/components/dashboard-card'
import { ActivityFeed } from '@/components/activity-feed'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BookOpen, CheckCircle2, Users, ClipboardList } from 'lucide-react'
import { ProjectsService } from '@/services/service_projects'
import { StudentsService } from '@/services/service_students'

export default function CoordinatorDashboard() {
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectsService.getAllProjects(),
  })

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: () => StudentsService.getAllStudents(),
  })

  const barChartData = [
    { name: 'Dr. Ahmed Hassan', value: projects.length },
    { name: 'Eng. Fatima Zahra', value: Math.ceil(projects.length / 2) },
    { name: 'Prof. Mohammed Ali', value: Math.ceil(projects.length / 1.5) },
  ]

  const pieChartData = [
    { name: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length, fill: '#3b82f6' },
    { name: 'Completed', value: projects.filter(p => p.status === 'Completed').length, fill: '#10b981' },
    { name: 'Pending', value: Math.max(1, 5 - projects.length), fill: '#f59e0b' },
  ]

  const activityItems = [
    {
      id: 1,
      type: 'subject_validated' as const,
      title: 'Subject approved: IoT Smart Home',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'defense_scheduled' as const,
      title: 'Defense scheduled: AI Healthcare Group 1',
      timestamp: '1 day ago',
    },
    {
      id: 3,
      type: 'student_assigned' as const,
      title: 'Student assigned to Web3 E-Commerce',
      timestamp: '2 days ago',
    },
    {
      id: 4,
      type: 'document_uploaded' as const,
      title: 'Document uploaded: Project Report',
      timestamp: '3 days ago',
    },
  ]

  return (
    <div>
      <PageHeader
        title="Coordinator Dashboard"
        description="Global overview of all PFE activity"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Subjects"
          value={projects.length.toString()}
          description="All proposed subjects"
          icon={<BookOpen className="w-6 h-6" />}
        />
        <DashboardCard
          title="Validated Subjects"
          value={Math.ceil(projects.length * 0.75).toString()}
          description="Approved subjects"
          icon={<CheckCircle2 className="w-6 h-6" />}
        />
        <DashboardCard
          title="Total Students"
          value={students.length.toString()}
          description="Enrolled students"
          icon={<Users className="w-6 h-6" />}
        />
        <DashboardCard
          title="Scheduled Defenses"
          value={projects.length.toString()}
          description="Active defenses"
          icon={<ClipboardList className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">PFEs per Teacher</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Project Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} label={{ fill: '#000' }} outerRadius={80} dataKey="value">
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <ActivityFeed items={activityItems} />
      </div>
    </div>
  )
}
