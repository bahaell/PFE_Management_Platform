import { BaseModal } from './base-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

interface StudentFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FeedbackData) => void
  initialData?: FeedbackData
  studentName?: string
}

export interface FeedbackData {
  feedback: string
  rating: number
}

export function StudentFeedbackModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  studentName = 'Student',
}: StudentFeedbackModalProps) {
  const [formData, setFormData] = useState<FeedbackData>({
    feedback: '',
    rating: 5,
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ feedback: '', rating: 5 })
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
      title={`Feedback for ${studentName}`}
      onConfirm={handleSubmit}
      confirmText="Save Feedback"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="feedback">Feedback</Label>
          <Input
            id="feedback"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            placeholder="Enter your feedback..."
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="rating">Progress Rating (1-10)</Label>
          <Input
            id="rating"
            type="number"
            min="1"
            max="10"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: Math.min(10, Math.max(1, parseInt(e.target.value))) })
            }
            className="mt-1"
          />
        </div>
      </div>
    </BaseModal>
  )
}
