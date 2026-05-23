import { BaseModal } from './base-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

interface SubjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SubjectData) => void
  initialData?: SubjectData
}

export interface SubjectData {
  title: string
  description: string
  tags?: string
}

export function SubjectModal({ isOpen, onClose, onSubmit, initialData }: SubjectModalProps) {
  const [formData, setFormData] = useState<SubjectData>({
    title: '',
    description: '',
    tags: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ title: '', description: '', tags: '' })
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
      title={initialData ? 'Edit Subject' : 'Add New Subject'}
      onConfirm={handleSubmit}
      confirmText={initialData ? 'Update' : 'Add'}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Subject title"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Subject description"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="AI, ML, Healthcare"
            className="mt-1"
          />
        </div>
      </div>
    </BaseModal>
  )
}
