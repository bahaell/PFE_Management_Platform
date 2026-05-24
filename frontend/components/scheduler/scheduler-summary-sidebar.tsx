'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, BookOpen, TrendingUp, AlertCircle } from 'lucide-react'
import { SchedulerService } from '@/services/service_scheduler'
import type { SchedulerStatistics } from '@/models/scheduler.model'

const EMPTY_STATS: SchedulerStatistics = {
  totalScheduledDefenses: 0,
  pendingRequests: 0,
  roomUtilization: {},
  teacherLoad: {},
}

export function SchedulerSummarySidebar() {
  const [stats, setStats] = useState<SchedulerStatistics>(EMPTY_STATS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    SchedulerService.getStatistics()
      .then(setStats)
      .catch(() => setStats(EMPTY_STATS))
      .finally(() => setIsLoading(false))
  }, [])

  const teacherLoadData = Object.entries(stats.teacherLoad).map(([name, load]) => ({
    name: name.split(' ')[0],
    load,
  }))

  const roomUtilizationData = Object.entries(stats.roomUtilization).map(([name, count]) => ({
    name: name.replace('Room ', ''),
    utilization: Math.min(100, count * 20),
    count,
  }))

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Scheduled Defenses</p>
            <p className="text-2xl font-bold text-primary">{isLoading ? '...' : stats.totalScheduledDefenses}</p>
          </div>
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground">
          Out of {stats.pendingRequests + stats.totalScheduledDefenses} total
        </p>
      </Card>

      <Card className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Pending Requests</p>
            <p className="text-2xl font-bold text-accent">{isLoading ? '...' : stats.pendingRequests}</p>
          </div>
          <AlertCircle className="w-5 h-5 text-accent" />
        </div>
        <p className="text-xs text-muted-foreground">Awaiting scheduling</p>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
          <Users className="w-4 h-4" />
          Teacher Load Distribution
        </h3>
        {teacherLoadData.length > 0 ? (
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
        ) : (
          <p className="text-xs text-muted-foreground">No jury load data from scheduling-service yet.</p>
        )}
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Room Utilization
        </h3>
        <div className="space-y-2">
          {roomUtilizationData.length === 0 && (
            <p className="text-xs text-muted-foreground">No room usage yet.</p>
          )}
          {roomUtilizationData.map((room) => (
            <div key={room.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">{room.name}</span>
                <span className="text-xs text-muted-foreground">{room.count} defenses</span>
              </div>
              <Progress value={room.utilization} className="h-2" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm">Jury Availability</h3>
        <Badge variant="secondary">Uses live scheduling data when juries are exposed by API</Badge>
      </Card>
    </div>
  )
}
