'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Send, Paperclip, AlertCircle, X } from 'lucide-react'
import type { Commit } from '@/models/commit.model'

interface CommitInputBoxProps {
  onSubmit: (data: {
    projectId: string
    documentId: string | null
    teacherId: string
    teacherName: string
    teacherAvatar: string
    comment: string
    previousProgress: number
    newProgress: number
    attachments: { id: string; name: string; url: string; type: string }[]
  }) => void
  isLoading: boolean
  previousProgress: number
  currentProgress: number
  maxProgress?: number
  projectId: string
  documentId?: string | null
}

export function CommitInputBox({
  onSubmit,
  isLoading,
  previousProgress,
  currentProgress,
  maxProgress = 100,
  projectId,
  documentId = null
}: CommitInputBoxProps) {
  const [comment, setComment] = useState('')
  const [newProgress, setNewProgress] = useState(currentProgress)
  const [attachments, setAttachments] = useState<Array<{ id: string; name: string; url: string; type: string }>>([])
  const [errors, setErrors] = useState<string[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [comment])

  const validateForm = (): boolean => {
    const newErrors: string[] = []
    
    if (!comment.trim() || comment.trim().length < 3) {
      newErrors.push('Feedback must be at least 3 characters')
    }
    
    if (newProgress < 0 || newProgress > maxProgress) {
      newErrors.push(`Progress must be between 0 and ${maxProgress}`)
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newAttachments: Array<{ id: string; name: string; url: string; type: string }> = []

    files.forEach(file => {
      newAttachments.push({
        id: `att-${Date.now()}-${Math.random()}`,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.split('/')[0]
      })
    })

    setAttachments([...attachments, ...newAttachments])
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter(att => att.id !== id))
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    onSubmit({
      projectId,
      documentId,
      teacherId: 'teacher-1',
      teacherName: 'Dr. Ahmed Hassan',
      teacherAvatar: 'AH',
      comment: comment.trim(),
      previousProgress,
      newProgress,
      attachments
    })

    setComment('')
    setNewProgress(currentProgress)
    setAttachments([])
    setErrors([])
  }

  const isSubmitDisabled = !comment.trim() || isLoading

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background rounded-2xl border border-border p-3 md:p-4 space-y-4"
    >
      {/* Errors */}
      {errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 border border-destructive/20 rounded-lg p-3"
        >
          {errors.map((error, idx) => (
            <div key={idx} className="flex gap-2 text-xs md:text-sm text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Comment Input */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">Feedback</label>
        <Textarea
          ref={textareaRef}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
            setErrors(errors.filter(e => !e.includes('Feedback')))
          }}
          placeholder="Write your feedback... (press Ctrl+Enter to send)"
          className="resize-none min-h-[60px] max-h-[200px] text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey && !isSubmitDisabled) {
              handleSubmit()
            }
          }}
        />
        <p className="text-xs text-muted-foreground">{comment.length} characters</p>
      </div>

      {/* Progress Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Progress</span>
          <span className="text-sm md:text-base font-bold text-primary">{newProgress}%</span>
        </div>
        <input
          type="range"
          min="0"
          max={maxProgress}
          value={newProgress}
          onChange={(e) => setNewProgress(Number(e.target.value))}
          className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>{Math.round(maxProgress / 2)}%</span>
          <span>{maxProgress}%</span>
        </div>
        <div className="bg-secondary/30 rounded-lg p-2 md:p-3 text-xs md:text-sm space-y-1">
          <p className="text-muted-foreground">
            Current: <span className="font-semibold text-foreground">{currentProgress}%</span> → 
            New: <span className="font-semibold text-primary">{newProgress}%</span>
          </p>
          <p className="text-green-600 dark:text-green-400 font-medium">
            (+{newProgress - currentProgress}%)
          </p>
        </div>
      </div>

      {/* Attachments */}
      {attachments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2 bg-secondary/30 rounded-lg p-3"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            {attachments.length} file{attachments.length !== 1 ? 's' : ''} attached
          </p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {attachments.map((att) => (
              <div key={att.id} className="flex items-center justify-between p-2 bg-background rounded border border-border/50 group text-xs md:text-sm">
                <span className="truncate text-foreground flex-1">{att.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveAttachment(att.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex flex-col xs:flex-row gap-2 items-stretch xs:items-end">
        <label className="flex-shrink-0">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={isLoading}
          />
          <Button
            variant="outline"
            size="sm"
            asChild
            className="cursor-pointer w-full xs:w-auto"
          >
            <span>
              <Paperclip className="w-4 h-4 mr-1" />
              Attach
            </span>
          </Button>
        </label>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="ml-0 xs:ml-auto rounded-full gap-2 px-4 md:px-6 w-full xs:w-auto"
          size="sm"
        >
          <Send className="w-4 h-4" />
          <span className="hidden xs:inline">Send</span>
        </Button>
      </div>
    </motion.div>
  )
}
