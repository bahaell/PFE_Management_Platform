import { BaseModal } from './base-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

interface DefenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: DefenseData) => void
  initialData?: DefenseData
}

export interface DefenseData {
  projectName: string
  students: string
  date: string
  time: string
  room: string
}

export function DefenseModal({ isOpen, onClose, onSubmit, initialData }: DefenseModalProps) {
  const [formData, setFormData] = useState<DefenseData>({
    projectName: initialData?.projectName || '',
    students: initialData?.students || '',
    date: initialData?.date || '',
    time: initialData?.time || '',
    room: initialData?.room || '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ projectName: '', students: '', date: '', time: '', room: '' })
    }
  }, [initialData])

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Defense' : 'Schedule Defense'}
      onConfirm={handleSubmit}
      confirmText={initialData ? 'Update' : 'Schedule'}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="project">Project Name</Label>
          <Input
            id="project"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            placeholder="Project name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="students">Students (comma-separated)</Label>
          <Input
            id="students"
            value={formData.students}
            onChange={(e) => setFormData({ ...formData, students: e.target.value })}
            placeholder="Student names"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="room">Room</Label>
          <Input
            id="room"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            placeholder="e.g., Room 101"
            className="mt-1"
          />
        </div>
      </div>
    </BaseModal>
  )
}
