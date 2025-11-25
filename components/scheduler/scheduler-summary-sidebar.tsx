'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, BookOpen, TrendingUp, AlertCircle } from 'lucide-react'
import { MOCK_STATISTICS, MOCK_TEACHERS } from '@/lib/scheduler-mock-data'

export function SchedulerSummarySidebar() {
  const teacherLoadData = Object.entries(MOCK_STATISTICS.teacherLoad).map(([name, load]) => ({
    name: name.split(' ')[0], // First name only for chart
    load
  }))

  const roomUtilizationData = Object.entries(MOCK_STATISTICS.roomUtilization).map(([name, utilization]) => ({
    name: name.replace('Room ', ''),
    utilization
  }))

  return (
    <div className="space-y-4">
      {/* Scheduled Defenses */}
      <Card className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Scheduled Defenses</p>
            <p className="text-2xl font-bold text-primary">{MOCK_STATISTICS.totalScheduledDefenses}</p>
          </div>
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground">Out of {MOCK_STATISTICS.pendingRequests + MOCK_STATISTICS.totalScheduledDefenses} total</p>
      </Card>

      {/* Pending Requests */}
      <Card className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Pending Requests</p>
            <p className="text-2xl font-bold text-accent">{MOCK_STATISTICS.pendingRequests}</p>
          </div>
          <AlertCircle className="w-5 h-5 text-accent" />
        </div>
        <p className="text-xs text-muted-foreground">Awaiting scheduling</p>
      </Card>

      {/* Teacher Load Distribution */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
          <Users className="w-4 h-4" />
          Teacher Load Distribution
        </h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teacherLoadData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: `1px solid var(--border)` }} />
              <Bar dataKey="load" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Room Utilization */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Room Utilization
        </h3>
        <div className="space-y-2">
          {roomUtilizationData.map((room) => (
            <div key={room.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">{room.name}</span>
                <span className="text-xs text-muted-foreground">{room.utilization}%</span>
              </div>
              <Progress value={room.utilization} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Jury Availability */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm">Jury Availability</h3>
        <div className="space-y-2">
          {MOCK_TEACHERS.slice(0, 3).map((teacher) => (
            <div key={teacher.id} className="flex items-center justify-between">
              <span className="text-xs text-foreground">{teacher.name.split(' ')[0]}</span>
              <Badge variant={teacher.currentLoad <= 2 ? 'default' : 'secondary'}>
                {teacher.currentLoad} assigned
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
