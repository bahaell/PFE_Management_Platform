'use client'

import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/status-badge'
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react'
import { ProjectModal, type ProjectData } from '@/components/modals/project-modal'
import { ProjectsService } from '@/services/service_projects'
import { StudentsService } from '@/services/service_students'
import { TeachersService } from '@/services/service_teachers'
import { ProjectPhase, ProjectStatus, type ProjectBasic } from '@/models/project.model'
import { useToast } from '@/hooks/use-toast'

type ProjectTableStatus = 'pending' | 'validated' | 'rejected' | 'completed' | 'assigned'

export default function ProjectsPage() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectsService.getAllProjects(),
  })

  const { data: students = [], isLoading: isStudentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: () => StudentsService.getAllStudents(),
  })

  const { data: teachers = [], isLoading: isTeachersLoading } = useQuery({
    queryKey: ['teachers'],
    queryFn: () => TeachersService.getAllTeachers(),
  })

  const deleteProjectMutation = useMutation({
    mutationFn: (id: number | string) => ProjectsService.deleteProject(id),
    onSuccess: () => {
      setDeleteId(null)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast({
        title: 'Project deleted',
        description: 'The project has been removed.',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Unable to delete project',
        description: error?.message ?? 'Please check that the API is reachable.',
        variant: 'destructive',
      })
    },
  })

  const saveProjectMutation = useMutation({
    mutationFn: async (data: ProjectData) => {
      const requiredSkills = data.requiredSkills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)

      if (editingId) {
        const currentProject = projects.find((project) => String(project.id) === String(editingId))
        if (!currentProject) {
          throw new Error('Project not found')
        }

        await ProjectsService.updateProject(editingId, {
          title: data.title,
          description: data.description,
          type: data.type,
          phase: data.phase,
          academicYear: data.academicYear,
          startDate: data.startDate,
          deadline: data.deadline,
          requiredSkills,
        })

        if (data.status !== currentProject.status) {
          await ProjectsService.updateProjectStatus(editingId, data.status)
        }

        return
      }

      const createdProject = await ProjectsService.createProject({
        title: data.title,
        description: data.description,
        type: data.type,
        status: data.status,
        phase: data.phase,
        academicYear: data.academicYear,
        startDate: data.startDate,
        deadline: data.deadline,
        requiredSkills,
      })

      if (data.studentId) {
        await ProjectsService.addProjectMember(createdProject.id, data.studentId, 'MEMBER')
      }
      if (data.teacherId) {
        await ProjectsService.addProjectSupervisor(createdProject.id, data.teacherId, 'MAIN_SUPERVISOR')
      }
    },
    onSuccess: () => {
      setIsModalOpen(false)
      setEditingId(null)
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast({
        title: editingId ? 'Project updated' : 'Project created',
        description: editingId ? 'The project has been saved.' : 'The project has been created.',
      })
    },
    onError: (error: any) => {
      toast({
        title: editingId ? 'Unable to update project' : 'Unable to create project',
        description: error?.message ?? 'Please check the project data and API status.',
        variant: 'destructive',
      })
    },
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | number | null>(null)
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [deleteId, setDeleteId] = useState<string | number | null>(null)

  const selectedProject = selectedProjectId ? projects.find(p => String(p.id) === String(selectedProjectId)) : null
  const editingProject = editingId ? projects.find(p => String(p.id) === String(editingId)) : null

  const handleViewDetails = (id: string | number) => {
    setSelectedProjectId(id)
    setIsDetailsOpen(true)
  }

  const handleAddProject = (data: ProjectData) => {
    saveProjectMutation.mutate(data)
  }

  const handleDelete = (id: number | string) => {
    deleteProjectMutation.mutate(id)
  }

  const handleEdit = (id: string | number) => {
    setEditingId(id)
    setIsModalOpen(true)
  }

  const mapProjectStatus = (status: ProjectStatus | string): ProjectTableStatus => {
    if (status === ProjectStatus.PENDING) return 'pending'
    if (status === ProjectStatus.IN_PROGRESS) return 'assigned'
    if (status === ProjectStatus.DEFENDED || status === ProjectStatus.ARCHIVED) return 'completed'
    if (status === ProjectStatus.REJECTED) return 'rejected'
    return 'validated'
  }

  const getPrimaryStudentId = (project: ProjectBasic) => {
    return (project.members?.find((member) => member.role === 'LEADER') ?? project.members?.[0])?.studentId ?? ''
  }

  const getPrimaryTeacherId = (project: ProjectBasic) => {
    return (
      project.supervisors?.find((supervisor) => supervisor.role === 'MAIN_SUPERVISOR') ?? project.supervisors?.[0]
    )?.teacherId ?? ''
  }

  const toModalData = (project?: ProjectBasic | null): ProjectData | undefined => {
    if (!project) return undefined
    return {
      title: project.title,
      description: project.description ?? '',
      studentId: getPrimaryStudentId(project),
      teacherId: getPrimaryTeacherId(project),
      status: project.status,
      type: project.type ?? 'INTERNAL',
      phase: project.phase ?? ProjectPhase.PROPOSAL,
      academicYear: project.academicYear ?? '',
      startDate: project.startDate ?? '',
      deadline: project.deadline ?? '',
      requiredSkills: project.requiredSkills?.join(', ') ?? '',
    }
  }

  const studentNameById = useMemo(() => {
    const map = new Map<string, string>()
    students.forEach((student) => {
      map.set(String(student.id), student.name)
      if (student.studentId) map.set(String(student.studentId), student.name)
    })
    return map
  }, [students])

  const teacherNameById = useMemo(() => {
    const map = new Map<string, string>()
    teachers.forEach((teacher) => {
      map.set(String(teacher.id), teacher.name)
    })
    return map
  }, [teachers])

  const tableData = useMemo(() => projects.map((project) => {
    const mainMember = project.members?.find((member) => member.role === 'LEADER') ?? project.members?.[0]
    const mainSupervisor =
      project.supervisors?.find((supervisor) => supervisor.role === 'MAIN_SUPERVISOR') ?? project.supervisors?.[0]
    const studentId = mainMember?.studentId
    const teacherId = mainSupervisor?.teacherId

    return {
      id: project.id,
      student: studentId ? studentNameById.get(String(studentId)) ?? studentId : 'Unassigned',
      subject: project.title,
      teacher: teacherId ? teacherNameById.get(String(teacherId)) ?? teacherId : 'Unassigned',
      progress: project.progress,
      status: mapProjectStatus(project.status),
    }
  }), [projects, studentNameById, teacherNameById])

  if (isLoading || isStudentsLoading || isTeachersLoading) {
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
              <Button variant="destructive" onClick={() => handleDelete(deleteId)} disabled={deleteProjectMutation.isPending}>
                {deleteProjectMutation.isPending ? 'Deleting...' : 'Delete'}
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
                  <StatusBadge status={mapProjectStatus(selectedProject.status)} />
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
        initialData={toModalData(editingProject)}
        students={students.map((student) => ({ id: String(student.id), name: student.name }))}
        teachers={teachers.map((teacher) => ({ id: String(teacher.id), name: teacher.name }))}
        isLoading={saveProjectMutation.isPending}
        mode={editingProject ? 'edit' : 'create'}
      />
    </div>
  )
}
