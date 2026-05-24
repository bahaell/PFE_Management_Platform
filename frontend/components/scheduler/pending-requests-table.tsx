'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/data-table'
import { Calendar, Zap, Users } from 'lucide-react'
import { SchedulerService } from '@/services/service_scheduler'
import type { PendingDefenseRequest } from '@/models/scheduler.model'

interface PendingRequestsTableProps {
  onAutoSchedule?: (id: number) => void
}

export function PendingRequestsTable({ onAutoSchedule }: PendingRequestsTableProps) {
  const [requests, setRequests] = useState<PendingDefenseRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    SchedulerService.getAllPendingRequests()
      .then(setRequests)
      .catch(() => setRequests([]))
      .finally(() => setIsLoading(false))
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-900 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300'
      default:
        return 'bg-green-100 text-green-900 border-green-300'
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Pending Scheduling Requests
      </h3>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading pending requests...</p>
      ) : (
        <DataTable
          columns={[
          { 
            id: 'project-info',
            header: 'Project', 
            accessor: 'project',
            render: (_value, row) => (
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{row.project.subject}</span>
                <span className="text-xs text-muted-foreground">Student: {row.project.studentName}</span>
              </div>
            )
          },
          { 
            id: 'encadrant',
            header: 'Encadrant', 
            accessor: 'project',
            render: (_value, row) => (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{row.project.assignedTeacher.name}</span>
              </div>
            )
          },
          {
            header: 'Date Range',
            accessor: 'requestedDateRange',
            render: (_value, row) => (
              <span className="text-sm text-foreground">
                {new Date(row.requestedDateRange.from).toLocaleDateString()} - {new Date(row.requestedDateRange.to).toLocaleDateString()}
              </span>
            )
          },
          {
            header: 'Priority',
            accessor: 'priority',
            render: (_value, row) => (
              <Badge className={`${getPriorityColor(row.priority)} border`}>
                {row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
              </Badge>
            )
          },
          {
            header: 'Actions',
            accessor: 'id',
            render: (_value, row) => (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex items-center gap-1 bg-primary hover:bg-primary/90"
                  onClick={() => onAutoSchedule?.(row.id)}
                >
                  <Zap className="w-3 h-3" />
                  Auto-Schedule & Assign Jury
                </Button>
              </div>
            )
          }
        ]}
          data={requests}
        />
      )}
    </Card>
  )
}
