'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/data-table'
import { Calendar, Eye, Zap, Users } from 'lucide-react'
import { MOCK_PENDING_REQUESTS } from '@/lib/scheduler-mock-data'

interface PendingRequestsTableProps {
  onAutoSchedule?: (id: number) => void
}

export function PendingRequestsTable({ onAutoSchedule }: PendingRequestsTableProps) {
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
      <DataTable
        columns={[
          { 
            id: 'project-info',
            header: 'Project', 
            accessor: 'project',
            render: (project) => (
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{project.subject}</span>
                <span className="text-xs text-muted-foreground">Student: {project.studentName}</span>
              </div>
            )
          },
          { 
            id: 'encadrant',
            header: 'Encadrant', 
            accessor: 'project',
            render: (project) => (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{project.assignedTeacher.name}</span>
              </div>
            )
          },
          {
            header: 'Date Range',
            accessor: 'requestedDateRange',
            render: (dateRange) => (
              <span className="text-sm text-foreground">
                {new Date(dateRange.from).toLocaleDateString()} - {new Date(dateRange.to).toLocaleDateString()}
              </span>
            )
          },
          {
            header: 'Priority',
            accessor: 'priority',
            render: (priority) => (
              <Badge className={`${getPriorityColor(priority)} border`}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Badge>
            )
          },
          {
            header: 'Actions',
            accessor: 'id',
            render: (id) => (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex items-center gap-1 bg-primary hover:bg-primary/90"
                  onClick={() => onAutoSchedule?.(id)}
                >
                  <Zap className="w-3 h-3" />
                  Auto-Schedule & Assign Jury
                </Button>
              </div>
            )
          }
        ]}
        data={MOCK_PENDING_REQUESTS}
      />
    </Card>
  )
}
