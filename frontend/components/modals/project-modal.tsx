import { BaseModal } from './base-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { ProjectPhase, ProjectStatus } from '@/models/project.model'

type ProjectType = 'INTERNAL' | 'EXTERNAL'

interface ProjectUserOption {
  id: string
  name: string
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProjectData) => void
  initialData?: ProjectData
  students?: ProjectUserOption[]
  teachers?: ProjectUserOption[]
  isLoading?: boolean
  mode?: 'create' | 'edit'
}

export interface ProjectData {
  title: string
  description: string
  studentId: string
  teacherId: string
  status: ProjectStatus
  type: ProjectType
  phase: ProjectPhase
  academicYear: string
  startDate: string
  deadline: string
  requiredSkills: string
}

const emptyProjectData: ProjectData = {
  title: '',
  description: '',
  studentId: '',
  teacherId: '',
  status: ProjectStatus.PENDING,
  type: 'INTERNAL',
  phase: ProjectPhase.PROPOSAL,
  academicYear: '',
  startDate: '',
  deadline: '',
  requiredSkills: '',
}

export function ProjectModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  students = [],
  teachers = [],
  isLoading = false,
  mode = initialData ? 'edit' : 'create',
}: ProjectModalProps) {
  const [formData, setFormData] = useState<ProjectData>({
    ...emptyProjectData,
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ ...emptyProjectData })
    }
  }, [isOpen, initialData])

  const isEditMode = mode === 'edit'

  const handleSubmit = () => {
    onSubmit(formData)
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Update Project' : 'Create Project'}
      onConfirm={handleSubmit}
      confirmText={isEditMode ? 'Update' : 'Create'}
      isLoading={isLoading}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Project title"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Project description"
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as ProjectType })}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INTERNAL">Internal</SelectItem>
                <SelectItem value="EXTERNAL">External</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as ProjectStatus })}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProjectStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replaceAll('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Phase</Label>
            <Select value={formData.phase} onValueChange={(value) => setFormData({ ...formData, phase: value as ProjectPhase })}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProjectPhase).map((phase) => (
                  <SelectItem key={phase} value={phase}>
                    {phase}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="academicYear">Academic Year</Label>
            <Input
              id="academicYear"
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              placeholder="2026-2027"
              className="mt-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Student</Label>
            <Select
              value={formData.studentId}
              onValueChange={(value) => setFormData({ ...formData, studentId: value })}
              disabled={isEditMode}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Supervisor</Label>
            <Select
              value={formData.teacherId}
              onValueChange={(value) => setFormData({ ...formData, teacherId: value })}
              disabled={isEditMode}
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select a supervisor" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="requiredSkills">Required Skills</Label>
          <Input
            id="requiredSkills"
            value={formData.requiredSkills}
            onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
            placeholder="React, Spring Boot, AI"
            className="mt-1"
          />
        </div>
      </div>
    </BaseModal>
  )
}
