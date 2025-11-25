'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, Eye } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { ApplicationModal, type ApplicationData } from '@/components/modals/application-modal'
import { ProjectsService } from '@/services/service_projects'
import type { ProjectBasic } from '@/models/project.model'

export default function ApplicationsPage() {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: () => ProjectsService.getAllProjects(),
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [viewingId, setViewingId] = useState<number | null>(null)
  const [appliedIds, setAppliedIds] = useState<number[]>([])

  const handleEditApplication = (data: ApplicationData) => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleDelete = (id: number) => {
    setAppliedIds(appliedIds.filter(aid => aid !== id))
    setDeleteId(null)
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
    setIsModalOpen(true)
  }

  const viewingApplication = viewingId ? projects.find((p) => p.id === viewingId) : undefined

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="My Applications" description="Loading..." />
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Applications"
        description="Track your project subject applications"
      />

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Subject</th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Area</th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Status</th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Date</th>
                <th className="text-right px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-medium">{project.title}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground">{project.subject}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <StatusBadge status={appliedIds.includes(project.id) ? 'validated' : 'pending'} />
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{project.startDate}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                    <div className="flex gap-2 justify-end flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewingId(project.id)}
                        className="gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      {!appliedIds.includes(project.id) && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(project.id)}
                            className="gap-1"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive gap-1"
                            onClick={() => setDeleteId(project.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                            <span className="hidden sm:inline">Cancel</span>
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <p className="text-sm sm:text-base text-muted-foreground">No applications yet. Browse subjects to get started!</p>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 w-full max-w-sm">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Cancel Application?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button variant="outline" onClick={() => setDeleteId(null)} className="w-full sm:w-auto">
                Keep
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteId)} className="w-full sm:w-auto">
                Cancel Application
              </Button>
            </div>
          </div>
        </div>
      )}

      {viewingId && viewingApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Application Details</h3>
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-muted-foreground">Subject</p>
                <p className="text-sm sm:text-base font-medium text-foreground">{viewingApplication.title}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Area</p>
                <p className="text-sm sm:text-base font-medium text-foreground">{viewingApplication.subject}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <div className="mt-1">
                  <StatusBadge status={appliedIds.includes(viewingApplication.id) ? 'validated' : 'pending'} />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Application Date</p>
                <p className="text-sm sm:text-base font-medium text-foreground">{viewingApplication.startDate}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setViewingId(null)}>
              Close
            </Button>
          </div>
        </div>
      )}

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingId(null)
        }}
        onSubmit={handleEditApplication}
      />
    </div>
  )
}
