'use client'

import { useState, useEffect } from 'react'
import { X, Calendar, User, Trash2, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { getTaskPermissions, type UserRole } from '@/lib/permissions/kanban-permissions'

interface Task {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  assignee: string
  assigneeId: string
  dueDate: string
}

interface EditTaskModalContentProps {
  onClose: () => void
  task: Task | null
  onUpdate: (taskId: number, updates: Partial<Task>) => void
  onDelete: (taskId: number) => void
  userRole: UserRole
  userId: string
}

export function EditTaskModalContent({ onClose, task, onUpdate, onDelete, userRole, userId }: EditTaskModalContentProps) {
  const permissions = task ? getTaskPermissions(userRole, userId, task.assigneeId) : {
    canEdit: false,
    canDelete: false,
    canAssign: false,
  }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignee: '',
    assigneeId: '',
    dueDate: '',
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        assignee: task.assignee,
        assigneeId: task.assigneeId,
        dueDate: task.dueDate,
      })
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!task) return

    if (!permissions.canEdit) {
      return
    }

    onUpdate(task.id, formData)
    onClose()
  }

  const handleDelete = () => {
    if (!task) return
    
    if (!permissions.canDelete) {
      alert('You do not have permission to delete this task.')
      return
    }

    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id)
      onClose()
    }
  }

  const getDueDateStatus = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const daysLeft = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysLeft < 0) return { text: 'Overdue', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' }
    if (daysLeft === 0) return { text: 'Due Today', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' }
    if (daysLeft === 1) return { text: 'Due Tomorrow', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' }
    return { text: `${daysLeft} days left`, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' }
  }

  const getPriorityStyles = (priority: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    }
    return styles[priority] || styles.low
  }

  if (!task) return null

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-card border-l border-border shadow-2xl overflow-hidden flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">
            {permissions.canEdit ? 'Edit Task' : 'View Task'}
          </h2>
          <Badge className={getPriorityStyles(formData.priority)}>
            {formData.priority}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {!permissions.canEdit && (
        <div className="mx-4 sm:mx-6 mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 dark:text-blue-300">
            You can only view this task. Only supervisors or assigned students can edit tasks.
          </p>
        </div>
      )}

      {formData.dueDate && (
        <div className="px-4 sm:px-6 pt-4">
          <Badge className={`${getDueDateStatus(formData.dueDate).color} flex items-center gap-2 w-fit`}>
            <Clock className="w-3 h-3" />
            {getDueDateStatus(formData.dueDate).text}
          </Badge>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto">
        <div className="space-y-2">
          <Label htmlFor="edit-title" className="text-sm font-medium">
            Task Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="edit-title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter task title"
            required
            disabled={!permissions.canEdit}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-description" className="text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="edit-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter task description"
            rows={4}
            disabled={!permissions.canEdit}
            className="w-full resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-priority" className="text-sm font-medium">
            Priority
          </Label>
          <Select
            value={formData.priority}
            onValueChange={(value: 'low' | 'medium' | 'high') =>
              setFormData({ ...formData, priority: value })
            }
            disabled={!permissions.canEdit}
          >
            <SelectTrigger id="edit-priority" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Low Priority
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  Medium Priority
                </div>
              </SelectItem>
              <SelectItem value="high">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  High Priority
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-assignee" className="text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4" />
            Assignee
          </Label>
          <Select
            value={formData.assigneeId}
            onValueChange={(value) => {
              const assigneeMap: Record<string, string> = {
                'std001': 'Ahmed Ben Ali',
                'tch001': 'Dr. Fatima Zahra',
              }
              setFormData({ 
                ...formData, 
                assigneeId: value,
                assignee: assigneeMap[value] || 'Unknown'
              })
            }}
            disabled={!permissions.canAssign}
          >
            <SelectTrigger id="edit-assignee" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="std001">Ahmed Ben Ali</SelectItem>
              <SelectItem value="tch001">Dr. Fatima Zahra</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-dueDate" className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Due Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="edit-dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
            disabled={!permissions.canEdit}
            className="w-full"
          />
        </div>

        {permissions.canDelete && (
          <div className="pt-4 border-t border-border">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="w-full gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Task
            </Button>
          </div>
        )}
      </form>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-border bg-muted/30">
        <Button type="button" variant="outline" onClick={onClose}>
          {permissions.canEdit ? 'Cancel' : 'Close'}
        </Button>
        {permissions.canEdit && (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!formData.title || !formData.dueDate}
          >
            Save Changes
          </Button>
        )}
      </div>
    </motion.div>
  )
}
