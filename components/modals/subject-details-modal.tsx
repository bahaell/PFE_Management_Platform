'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface Subject {
  id: number
  teacher: string
  title: string
  description: string
  status: 'pending' | 'validated' | 'rejected'
  domain?: string
  technologies?: string[]
  level?: string
}

interface SubjectDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  subject?: Subject
  onApprove?: (id: number) => void
  onReject?: (id: number) => void
}

export function SubjectDetailsModal({ isOpen, onClose, subject, onApprove, onReject }: SubjectDetailsModalProps) {
  if (!isOpen || !subject) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg border border-border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">{subject.title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Teacher</label>
            <p className="text-foreground mt-1">{subject.teacher}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Domain</label>
            <p className="text-foreground mt-1">{subject.domain || 'Not specified'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Level</label>
            <p className="text-foreground mt-1">{subject.level || 'Not specified'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Description</label>
            <p className="text-foreground mt-1 whitespace-pre-wrap">{subject.description}</p>
          </div>

          {subject.technologies && subject.technologies.length > 0 && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Technologies</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {subject.technologies.map((tech, i) => (
                  <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 justify-end border-t border-border pt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {subject.status === 'pending' && (
            <>
              <Button variant="destructive" onClick={() => onReject?.(subject.id)}>
                Reject
              </Button>
              <Button onClick={() => onApprove?.(subject.id)}>
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
