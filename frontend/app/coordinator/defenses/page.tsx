'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, Zap } from 'lucide-react'
import { DefenseModal, type DefenseData } from '@/components/modals/defense-modal'
import { EnhancedSmartCalendar } from '@/components/scheduler/enhanced-smart-calendar'
import { SchedulerSummarySidebar } from '@/components/scheduler/scheduler-summary-sidebar'
import { PendingRequestsTable } from '@/components/scheduler/pending-requests-table'
import { Card } from '@/components/ui/card'
import { getJuryRoleBadgeColor } from '@/lib/scheduler-mock-data'
import { SchedulerService } from '@/services/service_scheduler'
import { useEffect } from 'react'
import type { ScheduledDefenseEntry } from '@/models/scheduler.model'

export default function DefensesPage() {
  const [defenses, setDefenses] = useState<ScheduledDefenseEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  const loadDefenses = async () => {
    setIsLoading(true)
    SchedulerService.getAllScheduledDefenses()
      .then(setDefenses)
      .catch(() => setDefenses([]))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadDefenses()
  }, [])

  const handleEdit = (id: number) => {
    setEditingId(id)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    await SchedulerService.deleteScheduledDefense(id)
    setDefenses(defenses.filter((d) => d.id !== id))
    setDeleteConfirm(null)
  }

  const editingDefense = editingId ? defenses.find((defense) => defense.id === editingId) : null
  const [editingStartTime, editingEndTime] = editingDefense?.time?.split('-').map((part) => part.trim()) ?? []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Defense Scheduling"
        description="Intelligent auto-scheduling system for PFE defenses with complete jury management"
        action={
          <div className="flex gap-2">
            <Button onClick={() => window.location.href = '/coordinator/defenses/recommend'} className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Auto-Schedule
            </Button>
            <Button
              onClick={() => {
                setEditingId(null)
                setIsModalOpen(true)
              }}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Schedule Defense
            </Button>
          </div>
        }
      />

      {/* Main Layout: Calendar and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EnhancedSmartCalendar
            events={defenses
              .filter((defense) => defense.date && defense.date !== 'TBD')
              .map((defense) => ({
                date: defense.date,
                title: defense.projectName,
                type: 'confirmed' as const,
                time: defense.time,
              }))}
            onDateSelect={(date) => {
              setEditingId(null)
              setIsModalOpen(true)
            }}
          />
        </div>
        <div>
          <SchedulerSummarySidebar />
        </div>
      </div>

      {/* Pending Requests Section */}
      <div>
        <PendingRequestsTable
          onAutoSchedule={(id) => {
            window.location.href = '/coordinator/defenses/recommend'
          }}
        />
      </div>

      {/* Scheduled Defenses Table with Jury Roles */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Scheduled Defenses</h3>
        {isLoading && <p className="text-sm text-muted-foreground mb-4">Loading defenses from scheduling-service...</p>}
        <DataTable
          columns={[
            { header: 'Project', accessor: 'projectName' },
            { header: 'Student', accessor: 'student' },
            { header: 'Room', accessor: 'room' },
            { header: 'Date', accessor: 'date' },
            { header: 'Time', accessor: 'time' },
            {
              id: 'president',
              header: 'Président',
              accessor: 'jury',
              render: (_value, row) => {
                const president = row.jury.find((m: any) => m.role === 'president')
                return president ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{president.teacher.name}</span>
                    <Badge className={`${getJuryRoleBadgeColor('president')} border w-fit text-xs`}>
                      Président
                    </Badge>
                  </div>
                ) : '-'
              }
            },
            {
              id: 'rapporteur',
              header: 'Rapporteur',
              accessor: 'jury',
              render: (_value, row) => {
                const rapporteur = row.jury.find((m: any) => m.role === 'rapporteur')
                return rapporteur ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{rapporteur.teacher.name}</span>
                    <Badge className={`${getJuryRoleBadgeColor('rapporteur')} border w-fit text-xs`}>
                      Rapporteur
                    </Badge>
                  </div>
                ) : '-'
              }
            },
            {
              id: 'encadrant',
              header: 'Encadrant',
              accessor: 'jury',
              render: (_value, row) => {
                const encadrant = row.jury.find((m: any) => m.role === 'encadrant')
                return encadrant ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{encadrant.teacher.name}</span>
                    <Badge className={`${getJuryRoleBadgeColor('encadrant')} border w-fit text-xs`}>
                      Encadrant
                    </Badge>
                  </div>
                ) : '-'
              }
            },
            {
              header: 'Actions',
              accessor: 'id',
              render: (_value, row) => (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(row.id)}
                    className="flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setDeleteConfirm(row.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ),
            },
          ]}
          data={defenses}
        />
      </Card>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 max-w-sm">
            <h3 className="text-lg font-semibold text-foreground mb-2">Delete Defense?</h3>
            <p className="text-sm text-muted-foreground mb-4">This action cannot be undone.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteConfirm)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <DefenseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingId(null)
        }}
        initialData={editingDefense ? {
          projectId: editingDefense.projectId,
          roomId: editingDefense.roomId,
          date: editingDefense.date === 'TBD' ? '' : editingDefense.date,
          startTime: editingStartTime || '09:00',
          endTime: editingEndTime || '09:45',
          roomNameSnapshot: editingDefense.room,
        } : undefined}
        onSubmit={async (data) => {
          if (editingId) {
            await SchedulerService.updateDefense(editingId, data)
          } else {
            await SchedulerService.createDefense({
              ...data,
              status: 'PENDING',
              manuallyScheduled: false,
            })
          }
          await loadDefenses()
          setIsModalOpen(false)
          setEditingId(null)
        }}
      />
    </div>
  )
}
