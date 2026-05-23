'use client'

import { PageHeader } from '@/components/page-header'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, DoughnutChart } from 'recharts'

const mostChosenSubjects = [
  { name: 'AI Healthcare', students: 12 },
  { name: 'Web3 Commerce', students: 8 },
  { name: 'IoT Smart', students: 10 },
  { name: 'ML Finance', students: 7 },
]

const pfesProgressionOverMonths = [
  { month: 'January', projects: 10 },
  { month: 'February', projects: 25 },
  { month: 'March', projects: 40 },
  { month: 'April', projects: 55 },
  { month: 'May', projects: 70 },
]

const projectStatusDistribution = [
  { name: 'In Progress', value: 20, fill: '#3b82f6' },
  { name: 'Completed', value: 8, fill: '#10b981' },
  { name: 'Pending', value: 5, fill: '#f59e0b' },
]

const pfesByLevel = [
  { name: 'L3', value: 35, fill: '#8b5cf6' },
  { name: 'M1', value: 45, fill: '#ec4899' },
  { name: 'M2', value: 20, fill: '#f59e0b' },
]

const teacherRanking = [
  { name: 'Dr. Ahmed Hassan', projects: 12, students: 24 },
  { name: 'Eng. Fatima Zahra', projects: 8, students: 16 },
  { name: 'Prof. Mohammed Ali', projects: 10, students: 20 },
  { name: 'Dr. Sara Mohamed', projects: 7, students: 14 },
]

export default function StatisticsPage() {
  return (
    <div>
      <PageHeader
        title="Statistics & Analytics"
        description="Comprehensive platform analytics and insights"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Most Chosen Subjects</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mostChosenSubjects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">PFEs Progression Over Months</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pfesProgressionOverMonths}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="projects" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Project Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectStatusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={{ fill: '#000' }}
                outerRadius={80}
                dataKey="value"
              >
                {projectStatusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">PFEs by Level</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pfesByLevel}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={{ fill: '#000' }}
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {pfesByLevel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Teacher Ranking</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4 font-semibold text-foreground">Teacher Name</th>
                <th className="text-left py-2 px-4 font-semibold text-foreground">Projects</th>
                <th className="text-left py-2 px-4 font-semibold text-foreground">Students</th>
                <th className="text-left py-2 px-4 font-semibold text-foreground">Avg. per Project</th>
              </tr>
            </thead>
            <tbody>
              {teacherRanking.map((teacher, i) => (
                <tr key={i} className="border-b border-border hover:bg-secondary">
                  <td className="py-3 px-4 text-foreground">{teacher.name}</td>
                  <td className="py-3 px-4 text-foreground font-medium">{teacher.projects}</td>
                  <td className="py-3 px-4 text-foreground font-medium">{teacher.students}</td>
                  <td className="py-3 px-4 text-foreground">{(teacher.students / teacher.projects).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
