'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react'
import { ProjectModal, type ProjectData } from '@/components/modals/project-modal'
import { ProjectsService } from '@/services/service_projects'

interface Project {
  id: number
  title: string
  student: string
  teacher: string
  progress: number
  status: 'accepted' | 'in_progress' | 'completed' | 'failed'
  startDate: string
  deadline: string
}

export default function ProjectsPage() {
  const queryClient = useQueryClient()

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectsService.getAllProjects(),
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const selectedProject = selectedProjectId ? projects.find(p => p.id === selectedProjectId) : null

  const handleViewDetails = (id: number) => {
    setSelectedProjectId(id)
    setIsDetailsOpen(true)
  }

  const handleAddProject = (data: ProjectData) => {
    setIsModalOpen(false)
    setEditingId(null)
    queryClient.invalidateQueries({ queryKey: ['projects'] })
  }

  const handleDelete = (id: number) => {
    setDeleteId(null)
    queryClient.invalidateQueries({ queryKey: ['projects'] })
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
    setIsModalOpen(true)
  }

  const tableData = projects.map((p, idx) => ({
    id: p.id,
    student: ['Ali Hassan', 'Noor Mohamed', 'Layla Ahmed'][idx] || 'Student',
    subject: p.title,
    teacher: ['Dr. Ahmed Hassan', 'Eng. Fatima Zahra', 'Prof. Mohammed Ali'][idx] || 'Teacher',
    progress: p.progress,
    status: (p.status === 'In Progress' ? 'in_progress' : 'accepted') as 'accepted' | 'in_progress' | 'completed' | 'failed',
  }))

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Project Monitoring" description="Loading..." />
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Project Monitoring"
        description="Track all student PFE projects"
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        }
      />

      <DataTable
        columns={[
          { header: 'Student', accessor: 'student' },
          { header: 'Subject', accessor: 'subject' },
          { header: 'Teacher', accessor: 'teacher' },
          {
            header: 'Progress',
            accessor: 'progress',
            render: (value) => `${value}%`,
          },
          {
            header: 'Status',
            accessor: 'status',
            render: (value) => <StatusBadge status={value as any} />,
          },
          {
            header: 'Actions',
            accessor: 'id',
            render: (id) => (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewDetails(id)}
                  title="View details"
                >
                  <Eye className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(id)}
                  title="Edit"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                  onClick={() => setDeleteId(id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ),
          },
        ]}
        data={tableData}
      />

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 max-w-sm">
            <h3 className="text-lg font-semibold text-foreground mb-2">Delete Project?</h3>
            <p className="text-sm text-muted-foreground mb-4">This action cannot be undone.</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteId)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {isDetailsOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-6">{selectedProject.title}</h2>

            <div className="space-y-6 mb-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Progress</label>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-foreground">{selectedProject.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${selectedProject.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <StatusBadge status={selectedProject.status === 'In Progress' ? 'completed' : 'validated'} />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Timeline</label>
                <div className="mt-2 space-y-2 text-sm text-foreground">
                  <p>Start Date: {selectedProject.startDate}</p>
                  <p>Expected End: {selectedProject.deadline}</p>
                  <p>Next Deadline: 2024-03-15</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end border-t border-border pt-4">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingId(null)
        }}
        onSubmit={handleAddProject}
      />
    </div>
  )
}
