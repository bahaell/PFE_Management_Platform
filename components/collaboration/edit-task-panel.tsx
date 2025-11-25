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
import { motion, AnimatePresence } from 'framer-motion'
import { getTaskPermissions, canModifyField, type UserRole } from '@/lib/permissions/kanban-permissions'

interface Task {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  assignee: string
  assigneeId: string // Added assigneeId
  dueDate: string
}

interface EditTaskPanelProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onUpdate: (taskId: number, updates: Partial<Task>) => void
  onDelete: (taskId: number) => void
  userRole: UserRole // Added user role
  userId: string // Added user ID
}

export function EditTaskPanel({ isOpen, onClose, task, onUpdate, onDelete, userRole, userId }: EditTaskPanelProps) {
  const permissions = task ? getTaskPermissions(userRole, userId, task.assigneeId) : {
    canEdit: false,
    canDelete: false,
    canAssign: false,
    canModifyPriority: false,
    canModifyDueDate: false,
    canModifyDescription: false,
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
    e.stopPropagation() // Stop event propagation to parent
    if (!task) return

    if (!permissions.canEdit) {
      console.log('[v0] User does not have permission to edit this task')
      return
    }

    const updates: Partial<Task> = {}
    
    if (formData.title !== task.title && permissions.canEdit) {
      updates.title = formData.title
    }
    
    if (formData.description !== task.description && permissions.canModifyDescription) {
      updates.description = formData.description
    }
    
    if (formData.priority !== task.priority && permissions.canModifyPriority) {
      updates.priority = formData.priority
    }
    
    if (formData.dueDate !== task.dueDate && permissions.canModifyDueDate) {
      updates.dueDate = formData.dueDate
    }
    
    if (formData.assigneeId !== task.assigneeId && permissions.canAssign) {
      updates.assigneeId = formData.assigneeId
      updates.assignee = formData.assignee
    }

    onUpdate(task.id, updates)
    onClose()
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation() // Stop event propagation to parent
    if (!task) return
    
    if (!permissions.canDelete) {
      alert('You do not have permission to delete this task.')
      return
    }

    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id)
    }
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation() // Stop event propagation to parent
    onClose()
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation() // Stop event propagation to parent
    onClose()
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

  return (
    <AnimatePresence>
      {isOpen && task && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[200]"
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-card border-l border-border shadow-2xl z-[200] overflow-hidden flex flex-col"
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
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {!permissions.canEdit && (
              <div className="mx-4 sm:mx-6 mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  You can view and update the description of tasks assigned to you, but cannot modify other fields.
                </p>
              </div>
            )}

            {/* Due Date Badge */}
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
                  disabled={!permissions.canModifyDescription}
                  className="w-full resize-none"
                />
                {!permissions.canModifyDescription && permissions.canEdit && (
                  <p className="text-xs text-muted-foreground">Only supervisors can modify this field</p>
                )}
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
                  disabled={!permissions.canModifyPriority}
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
                {!permissions.canModifyPriority && permissions.canEdit && (
                  <p className="text-xs text-muted-foreground">Only supervisors can modify priority</p>
                )}
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
                {!permissions.canAssign && (
                  <p className="text-xs text-muted-foreground">Only supervisors can assign tasks</p>
                )}
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
                  disabled={!permissions.canModifyDueDate}
                  className="w-full"
                />
                {!permissions.canModifyDueDate && permissions.canEdit && (
                  <p className="text-xs text-muted-foreground">Only supervisors can modify due dates</p>
                )}
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
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
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
        </>
      )}
    </AnimatePresence>
  )
}
