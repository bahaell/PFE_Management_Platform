'use client'

import { useState, useEffect } from 'react'
import { X, Plus, GripVertical, Maximize2 } from 'lucide-react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogPortal } from '@/components/ui/dialog'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { AddTaskModal } from './add-task-modal'
import { EditTaskPanel } from './edit-task-panel'
import { motion } from 'framer-motion'
import { useAuth } from '@/providers/auth-provider'
import { getTaskPermissions, canDragTask } from '@/lib/permissions/kanban-permissions'
import { cn } from '@/lib/utils'

interface Task {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  assignee: string
  assigneeId: string
  dueDate: string
}

interface Tasks {
  todo: Task[]
  inProgress: Task[]
  done: Task[]
}

interface TasksExpansionModalProps {
  isOpen: boolean
  onClose: () => void
  tasks: Tasks
  onTasksUpdate?: (tasks: Tasks) => void
}

export function TasksExpansionModal({
  isOpen,
  onClose,
  tasks: initialTasks,
  onTasksUpdate,
}: TasksExpansionModalProps) {
  const { user } = useAuth()
  
  const [tasks, setTasks] = useState<Tasks>(initialTasks)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [addTaskColumn, setAddTaskColumn] = useState<string>('todo')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false)

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  const columns = [
    { key: 'todo', title: 'To Do', color: 'border-red-300 bg-red-50 dark:bg-red-950/20' },
    { key: 'inProgress', title: 'In Progress', color: 'border-blue-300 bg-blue-50 dark:bg-blue-950/20' },
    { key: 'done', title: 'Done', color: 'border-green-300 bg-green-50 dark:bg-green-950/20' }
  ]

  const getPriorityStyles = (priority: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400'
    }
    return styles[priority] || styles.low
  }

  const getDueDateStatus = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const daysLeft = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysLeft < 0) return { text: 'Overdue', color: 'text-red-600' }
    if (daysLeft === 0) return { text: 'Today', color: 'text-orange-600' }
    if (daysLeft === 1) return { text: 'Tomorrow', color: 'text-yellow-600' }
    return { text: `${daysLeft}d left`, color: 'text-muted-foreground' }
  }

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination || !user) return

    const sourceColumn = source.droppableId as keyof Tasks
    const draggedTask = tasks[sourceColumn][source.index]

    // Check if user has permission to move this task
    if (!canDragTask(user.role, user.id, draggedTask.assigneeId)) {
      console.log('[v0] User does not have permission to move this task')
      return
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    const destColumn = destination.droppableId as keyof Tasks

    if (sourceColumn === destColumn) {
      const column = Array.from(tasks[sourceColumn])
      const [removed] = column.splice(source.index, 1)
      column.splice(destination.index, 0, removed)

      const updatedTasks = {
        ...tasks,
        [sourceColumn]: column,
      }
      setTasks(updatedTasks)
      onTasksUpdate?.(updatedTasks)
    } else {
      const sourceCol = Array.from(tasks[sourceColumn])
      const destCol = Array.from(tasks[destColumn])
      const [removed] = sourceCol.splice(source.index, 1)
      destCol.splice(destination.index, 0, removed)

      const updatedTasks = {
        ...tasks,
        [sourceColumn]: sourceCol,
        [destColumn]: destCol,
      }
      setTasks(updatedTasks)
      onTasksUpdate?.(updatedTasks)
    }
  }

  const handleAddTask = (task: Omit<Task, 'id'>, column: string) => {
    const newTask = {
      ...task,
      id: Date.now(),
    }

    const updatedTasks = {
      ...tasks,
      [column]: [...tasks[column as keyof Tasks], newTask],
    }
    setTasks(updatedTasks)
    onTasksUpdate?.(updatedTasks)
  }

  const handleUpdateTask = (taskId: number, updates: Partial<Task>) => {
    const updatedTasks = { ...tasks }
    
    Object.keys(updatedTasks).forEach((column) => {
      const columnKey = column as keyof Tasks
      const taskIndex = updatedTasks[columnKey].findIndex((t) => t.id === taskId)
      if (taskIndex !== -1) {
        updatedTasks[columnKey][taskIndex] = {
          ...updatedTasks[columnKey][taskIndex],
          ...updates,
        }
      }
    })

    setTasks(updatedTasks)
    onTasksUpdate?.(updatedTasks)
  }

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = { ...tasks }
    
    Object.keys(updatedTasks).forEach((column) => {
      const columnKey = column as keyof Tasks
      updatedTasks[columnKey] = updatedTasks[columnKey].filter((t) => t.id !== taskId)
    })

    setTasks(updatedTasks)
    onTasksUpdate?.(updatedTasks)
    setIsEditPanelOpen(false)
    setSelectedTask(null)
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsEditPanelOpen(true)
  }

  const handleAddTaskClick = (column: string) => {
    setAddTaskColumn(column)
    setIsAddTaskOpen(true)
  }

  const canCreateTasks = user && getTaskPermissions(user.role, user.id).canCreate

  const isChildModalOpen = isAddTaskOpen || isEditPanelOpen

  if (!user) return null

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open && !isChildModalOpen) {
          onClose()
        }
      }}>
        <DialogPortal>
          {!isChildModalOpen && <DialogOverlay className="z-[50]" />}
          
          <DialogPrimitive.Content
            className={cn(
              'fixed left-[50%] top-[50%] grid w-full max-w-[95vw] translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-card shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-lg max-h-[90vh] overflow-hidden flex flex-col p-0 z-[50]'
            )}
            onPointerDownOutside={(e) => {
              if (isChildModalOpen) {
                e.preventDefault()
              }
            }}
            onInteractOutside={(e) => {
              if (isChildModalOpen) {
                e.preventDefault()
              }
            }}
          >
            <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-5 h-5 text-primary" />
                <DialogTitle className="text-lg">Task Management Workspace</DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogHeader>

            <div className="flex-1 overflow-auto p-6">
              <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {columns.map((col) => (
                    <div key={col.key} className="flex flex-col min-h-[500px]">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                        <h4 className="font-semibold text-foreground">{col.title}</h4>
                        <Badge variant="secondary">{tasks[col.key as keyof Tasks]?.length || 0}</Badge>
                      </div>

                      <Droppable droppableId={col.key}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 space-y-3 p-3 rounded-lg transition-colors ${
                              snapshot.isDraggingOver ? 'bg-muted/50' : ''
                            }`}
                          >
                            {tasks[col.key as keyof Tasks]?.map((task, index) => {
                              const canDrag = canDragTask(user.role, user.id, task.assigneeId)
                              
                              return (
                                <Draggable 
                                  key={task.id} 
                                  draggableId={task.id.toString()} 
                                  index={index}
                                  isDragDisabled={!canDrag}
                                >
                                  {(provided, snapshot) => (
                                    <motion.div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      onClick={() => handleTaskClick(task)}
                                      className={`bg-background border border-border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer group ${
                                        snapshot.isDragging ? 'shadow-xl rotate-2 scale-105' : ''
                                      } ${!canDrag ? 'opacity-60' : ''}`}
                                      whileHover={{ scale: canDrag ? 1.02 : 1 }}
                                      whileTap={{ scale: canDrag ? 0.98 : 1 }}
                                    >
                                      <div className="flex gap-2 mb-2 items-start">
                                        <div {...provided.dragHandleProps}>
                                          <GripVertical className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-opacity ${
                                            canDrag ? 'opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing' : 'opacity-30 cursor-not-allowed'
                                          }`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="font-medium text-foreground mb-1">{task.title}</p>
                                          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-2 flex-wrap mt-3">
                                        <Badge className={getPriorityStyles(task.priority)} variant="outline">
                                          {task.priority}
                                        </Badge>
                                      </div>

                                      <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-border">
                                        <span className={`text-xs font-medium ${getDueDateStatus(task.dueDate).color}`}>
                                          {getDueDateStatus(task.dueDate).text}
                                        </span>
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs text-muted-foreground">{task.assignee}</span>
                                          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-white">
                                            {task.assignee.charAt(0)}
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </Draggable>
                              )
                            })}
                            {provided.placeholder}

                            {canCreateTasks && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleAddTaskClick(col.key)
                                }}
                                className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground mt-3"
                              >
                                <Plus className="w-4 h-4" />
                                Add Task
                              </Button>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  ))}
                </div>
              </DragDropContext>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

      {isOpen && isAddTaskOpen && (
        <AddTaskModal
          isOpen={true}
          onClose={() => setIsAddTaskOpen(false)}
          onAdd={handleAddTask}
          column={addTaskColumn}
          userRole={user.role}
          userId={user.id}
        />
      )}

      {isOpen && isEditPanelOpen && selectedTask && (
        <EditTaskPanel
          isOpen={true}
          onClose={() => setIsEditPanelOpen(false)}
          task={selectedTask}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          userRole={user.role}
          userId={user.id}
        />
      )}
    </>
  )
}
