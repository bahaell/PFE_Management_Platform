import { BaseModal } from './base-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ApplicationData) => void
  initialData?: ApplicationData
}

export interface ApplicationData {
  subject: string
  teacher: string
  motivation: string
}

export function ApplicationModal({ isOpen, onClose, onSubmit, initialData }: ApplicationModalProps) {
  const [formData, setFormData] = useState<ApplicationData>({
    subject: '',
    teacher: '',
    motivation: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ subject: '', teacher: '', motivation: '' })
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
      title={initialData ? 'Edit Application' : 'New Application'}
      onConfirm={handleSubmit}
      confirmText={initialData ? 'Update' : 'Submit'}
    >
      <div className="space-y-4">
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
          <Label htmlFor="teacher">Teacher</Label>
          <Input
            id="teacher"
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            placeholder="Supervisor name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="motivation">Motivation</Label>
          <Input
            id="motivation"
            value={formData.motivation}
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            placeholder="Why do you want this subject?"
            className="mt-1"
          />
        </div>
      </div>
    </BaseModal>
  )
}
