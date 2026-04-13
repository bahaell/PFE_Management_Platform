import { BaseModal } from './base-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProjectData) => void
  initialData?: ProjectData
}

export interface ProjectData {
  student: string
  subject: string
  teacher: string
  progress: number
}

export function ProjectModal({ isOpen, onClose, onSubmit, initialData }: ProjectModalProps) {
  const [formData, setFormData] = useState<ProjectData>({
    student: '',
    subject: '',
    teacher: '',
    progress: 0,
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ student: '', subject: '', teacher: '', progress: 0 })
    }
  }, [isOpen, initialData])

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Update Project' : 'Create Project'}
      onConfirm={handleSubmit}
      confirmText={initialData ? 'Update' : 'Create'}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="student">Student Name</Label>
          <Input
            id="student"
            value={formData.student}
            onChange={(e) => setFormData({ ...formData, student: e.target.value })}
            placeholder="Student name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="Project subject"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="teacher">Teacher/Supervisor</Label>
          <Input
            id="teacher"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            placeholder="Supervisor name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="progress">Progress (%)</Label>
          <Input
            id="progress"
            type="number"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) =>
              setFormData({ ...formData, progress: Math.min(100, Math.max(0, parseInt(e.target.value))) })
            }
            placeholder="0"
            className="mt-1"
          />
        </div>
      </div>
    </BaseModal>
  )
}
