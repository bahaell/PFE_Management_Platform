'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { AlertCircle } from 'lucide-react'
import { useAuth } from '@/providers/auth-provider'
import type { Commit } from '@/models/commit.model'

interface CommitFormProps {
  projectId: string
  previousProgress: number
  onSubmit: (data: Omit<Commit, 'id' | 'createdAt'>) => void
  isLoading: boolean
  onCancel: () => void
}

const ALLOWED_FILE_TYPES = ['pdf', 'docx', 'doc', 'png', 'jpg', 'jpeg']
const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB

export function CommitForm({
  projectId,
  previousProgress,
  onSubmit,
  isLoading,
  onCancel
}: CommitFormProps) {
  const { user } = useAuth()
  
  const [comment, setComment] = useState('')
  const [newProgress, setNewProgress] = useState(Math.min(100, previousProgress + 10))
  const [attachments, setAttachments] = useState<Commit['attachments']>([])
  const [applyProgress, setApplyProgress] = useState(true)
  const [errors, setErrors] = useState<string[]>([])

  const validateForm = (): boolean => {
    const newErrors: string[] = []
    
    if (!comment.trim() || comment.trim().length < 5) {
      newErrors.push('Comment must be at least 5 characters long')
    }
    
    if (newProgress < 0 || newProgress > 100) {
      newErrors.push('Progress must be between 0 and 100')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newErrors: string[] = []
    const newAttachments: Commit['attachments'] = []
    
    let totalSize = attachments.reduce((sum, att) => {
      const sizeMatch = att.url.match(/size=(\d+)/)
      return sum + (sizeMatch ? parseInt(sizeMatch[1]) : 0)
    }, 0)

    files.forEach(file => {
      const ext = file.name.split('.').pop()?.toLowerCase() || ''
      
      if (!ALLOWED_FILE_TYPES.includes(ext)) {
        newErrors.push(`File type .${ext} not allowed. Use: ${ALLOWED_FILE_TYPES.join(', ')}`)
        return
      }
      
      if (file.size > MAX_FILE_SIZE) {
        newErrors.push(`File ${file.name} exceeds 15MB limit`)
        return
      }
      
      totalSize += file.size
      if (totalSize > MAX_FILE_SIZE) {
        newErrors.push('Total file size exceeds 15MB')
        return
      }
      
      newAttachments.push({
        id: `att-${Date.now()}-${Math.random()}`,
        name: file.name,
        url: `${URL.createObjectURL(file)}?size=${file.size}`,
        type: ext
      })
    })

    if (newErrors.length > 0) {
      setErrors(prev => [...prev, ...newErrors])
      return
    }

    setAttachments([...attachments, ...newAttachments])
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter(att => att.id !== id))
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    const finalNewProgress = applyProgress ? newProgress : previousProgress

    onSubmit({
      projectId,
      teacherId: user?.id || 'teacher-1',
      teacherName: user?.name || 'Teacher',
      teacherAvatar: user?.name?.substring(0, 2).toUpperCase() || 'T',
      comment: comment.trim(),
      previousProgress,
      newProgress: finalNewProgress,
      attachments
    })
  }

  const isSubmitDisabled = !comment.trim() || isLoading

  return (
    <div className="space-y-6">
      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          {errors.map((error, idx) => (
            <div key={idx} className="flex gap-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment */}
      <div className="space-y-2">
        <Label htmlFor="comment">Feedback Comment</Label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
            setErrors(errors.filter(e => !e.includes('Comment')))
          }}
          placeholder="Write your feedback and observations (minimum 5 characters)..."
          className="min-h-[120px] resize-none"
        />
        <p className="text-xs text-muted-foreground">{comment.length} characters</p>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>New Progress</Label>
          <span className="text-lg font-bold text-primary">{newProgress}%</span>
        </div>
        <Slider
          value={[newProgress]}
          onValueChange={([value]) => setNewProgress(value)}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        <div className="bg-secondary rounded-lg p-3 text-sm">
          <p className="text-muted-foreground">Previous: <span className="font-semibold text-foreground">{previousProgress}%</span></p>
          <p className="text-muted-foreground">Change: <span className="font-semibold text-foreground">+{newProgress - previousProgress}%</span></p>
        </div>
      </div>

      {/* Apply Progress */}
      <div className="flex items-center gap-2">
        <input
          id="apply"
          type="checkbox"
          checked={applyProgress}
          onChange={(e) => setApplyProgress(e.target.checked)}
          className="rounded border-gray-300"
        />
        <Label htmlFor="apply" className="cursor-pointer">Apply progress to project immediately</Label>
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <Label htmlFor="files">Attachments (Optional)</Label>
        <Input
          id="files"
          type="file"
          multiple
          onChange={handleFileSelect}
          accept={ALLOWED_FILE_TYPES.map(t => `.${t}`).join(',')}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          Allowed: {ALLOWED_FILE_TYPES.join(', ')} | Max 15MB total
        </p>
        
        {attachments.length > 0 && (
          <div className="space-y-2 mt-4">
            <p className="text-sm font-semibold">Selected files:</p>
            {attachments.map((att) => (
              <div key={att.id} className="flex items-center justify-between p-2 bg-secondary rounded">
                <span className="text-sm truncate">{att.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveAttachment(att.id)}
                  disabled={isLoading}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="flex-1"
          size="lg"
        >
          {isLoading ? 'Sending...' : 'Send Feedback'}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
          size="lg"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
