'use client'

import { useState } from 'react'
import { X, Calendar, User, AlertCircle, Clock } from 'lucide-react'
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
import { getTaskPermissions, type UserRole } from '@/lib/permissions/kanban-permissions'

interface Task {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  assignee: string
  assigneeId: string // Added assigneeId
  dueDate: string
}

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (task: Omit<Task, 'id'>, column: string) => void
  column?: string
  userRole: UserRole // Added user role
  userId: string // Added user ID
}

export function AddTaskModal({ isOpen, onClose, onAdd, column = 'todo', userRole, userId }: AddTaskModalProps) {
  const permissions = getTaskPermissions(userRole, userId)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignee: 'Ahmed Ben Ali',
    assigneeId: 'std001',
    dueDate: '',
    column: column,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation() // Stop event propagation to parent
    
    if (!permissions.canCreate) {
      console.log('[v0] User does not have permission to create tasks')
      return
    }

    if (!formData.title || !formData.dueDate) return

    onAdd({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      assignee: formData.assignee,
      assigneeId: formData.assigneeId,
      dueDate: formData.dueDate,
    }, formData.column)

    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      assignee: 'Ahmed Ben Ali',
      assigneeId: 'std001',
      dueDate: '',
      column: 'todo',
    })
    onClose()
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation() // Stop event propagation to parent
    onClose()
  }

  const getPriorityStyles = (priority: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    }
    return styles[priority] || styles.low
  }

  if (!permissions.canCreate) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[200]"
          />

          {/* Modal - Changed from centered modal to side panel matching Edit Task */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-card border-l border-border shadow-2xl z-[200] overflow-hidden flex flex-col"
          >
            {/* Header - Added priority badge to header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">Add New Task</h2>
                <Badge className={getPriorityStyles(formData.priority)}>
                  {formData.priority}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form - Updated form layout to match Edit Task structure */}
            <form onSubmit={handleSubmit} className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Task Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter task description"
                  rows={4}
                  className="w-full resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') =>
                    setFormData({ ...formData, priority: value })
                  }
                >
                  <SelectTrigger id="priority" className="w-full">
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
                <Label htmlFor="column" className="text-sm font-medium">
                  Status
                </Label>
                <Select
                  value={formData.column}
                  onValueChange={(value) => setFormData({ ...formData, column: value })}
                >
                  <SelectTrigger id="column" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="inProgress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignee" className="text-sm font-medium flex items-center gap-2">
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
                  <SelectTrigger id="assignee" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="std001">Ahmed Ben Ali</SelectItem>
                    <SelectItem value="tch001">Dr. Fatima Zahra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Due Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-border bg-muted/30">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!formData.title || !formData.dueDate}
              >
                Add Task
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
