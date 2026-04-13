'use client'

import { useState } from 'react'
import { Plus, GripVertical, Maximize2 } from 'lucide-react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useModalManager } from '@/hooks/use-modal-manager'
import { motion } from 'framer-motion'
import { useAuth } from '@/providers/auth-provider'
import { getTaskPermissions, canDragTask } from '@/lib/permissions/kanban-permissions'

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

export function ProjectKanban() {
  const { user, isLoading } = useAuth()
  const { open } = useModalManager()
  
  const [tasks, setTasks] = useState<Tasks>({
    todo: [
      { id: 2, title: 'ML algorithm implementation', description: 'Build the core prediction model', priority: 'high', assignee: 'Ahmed Ben Ali', assigneeId: 'std001', dueDate: '2024-02-15' },
      { id: 3, title: 'Model validation & testing', description: 'Comprehensive testing with metrics', priority: 'medium', assignee: 'Ahmed Ben Ali', assigneeId: 'std001', dueDate: '2024-02-25' },
      { id: 4, title: 'API development', description: 'RESTful API for model serving', priority: 'medium', assignee: 'Ahmed Ben Ali', assigneeId: 'std001', dueDate: '2024-03-05' }
    ],
    inProgress: [
      { id: 1, title: 'Data preprocessing', description: 'Clean and normalize dataset', priority: 'high', assignee: 'Ahmed Ben Ali', assigneeId: 'std001', dueDate: '2024-02-08' }
    ],
    done: [
      { id: 5, title: 'Environment setup', description: 'Configure development environment', priority: 'low', assignee: 'Ahmed Ben Ali', assigneeId: 'std001', dueDate: '2024-01-30' }
    ]
  })

  const columns = [
    { key: 'todo', title: 'To Do', color: 'border-red-300 bg-red-50 dark:bg-red-950/20' },
    { key: 'inProgress', title: 'In Progress', color: 'border-blue-300 bg-blue-50 dark:bg-blue-950/20' },
    { key: 'done', title: 'Done', color: 'border-green-300 bg-green-50 dark:bg-green-950/20' }
  ]

  const getPriorityStyles = (priority: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
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
    const { source, destination, draggableId } = result

    if (!destination) return

    const sourceColumn = source.droppableId as keyof Tasks
    const draggedTask = tasks[sourceColumn][source.index]

    const userRole = user?.role || 'student'
    const userId = user?.id || 'std001'
    
    if (!canDragTask(userRole, userId, draggedTask.assigneeId)) {
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

      setTasks({
        ...tasks,
        [sourceColumn]: column,
      })
    } else {
      const sourceCol = Array.from(tasks[sourceColumn])
      const destCol = Array.from(tasks[destColumn])
      const [removed] = sourceCol.splice(source.index, 1)
      destCol.splice(destination.index, 0, removed)

      setTasks({
        ...tasks,
        [sourceColumn]: sourceCol,
        [destColumn]: destCol,
      })
    }
  }

  const handleAddTask = (task: Omit<Task, 'id'>, column: string) => {
    const newTask = {
      ...task,
      id: Date.now(),
    }

    setTasks({
      ...tasks,
      [column]: [...tasks[column as keyof Tasks], newTask],
    })
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
  }

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = { ...tasks }
    
    Object.keys(updatedTasks).forEach((column) => {
      const columnKey = column as keyof Tasks
      updatedTasks[columnKey] = updatedTasks[columnKey].filter((t) => t.id !== taskId)
    })

    setTasks(updatedTasks)
  }

  const handleTaskClick = (task: Task) => {
    open({
      id: 'edit-task-modal',
      type: 'edit-task',
      level: 2,
      props: {
        task,
        onUpdate: handleUpdateTask,
        onDelete: handleDeleteTask,
        userRole: user?.role || 'student',
        userId: user?.id || 'std001',
      },
    })
  }

  const handleAddTaskClick = (column: string) => {
    open({
      id: 'add-task-modal',
      type: 'add-task',
      level: 2,
      props: {
        column,
        onAdd: handleAddTask,
        userRole: user?.role || 'student',
        userId: user?.id || 'std001',
      },
    })
  }

  const handleExpandClick = () => {
    open({
      id: 'expand-tasks-modal',
      type: 'expand-tasks',
      level: 1,
      props: {
        tasks,
        onTasksUpdate: setTasks,
      },
    })
  }

  const userRole = user?.role || 'student'
  const userId = user?.id || 'std001'
  const canCreateTasks = getTaskPermissions(userRole, userId).canCreate

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-between mb-4 px-1 flex-shrink-0">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Project Tasks</h3>
          <Button
            size="sm"
            variant="outline"
            onClick={handleExpandClick}
            className="gap-2"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">Expand</span>
          </Button>
        </div>

        <div className="flex-1 min-h-0 w-full overflow-x-auto overflow-y-hidden">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-3 sm:gap-4 h-full pb-2 px-1">
              {columns.map((col) => (
                <div key={col.key} className="w-72 sm:w-80 flex-shrink-0 flex flex-col">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-border flex-shrink-0">
                    <h4 className="font-semibold text-foreground text-sm">{col.title}</h4>
                    <Badge variant="secondary" className="text-xs">{tasks[col.key as keyof typeof tasks].length}</Badge>
                  </div>

                  <Droppable droppableId={col.key}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 space-y-2 sm:space-y-3 min-h-[200px] p-2 rounded-lg transition-colors overflow-y-auto ${
                          snapshot.isDraggingOver ? 'bg-muted/50' : ''
                        }`}
                      >
                        {tasks[col.key as keyof typeof tasks].map((task, index) => {
                          const canDrag = canDragTask(userRole, userId, task.assigneeId)
                          
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
                                  className={`bg-background border border-border rounded-lg p-3 hover:shadow-md transition-all cursor-pointer group ${
                                    snapshot.isDragging ? 'shadow-xl rotate-2' : ''
                                  } ${!canDrag ? 'opacity-60 cursor-not-allowed' : ''}`}
                                  whileHover={{ scale: canDrag ? 1.02 : 1 }}
                                  whileTap={{ scale: canDrag ? 0.98 : 1 }}
                                >
                                  <div className="flex gap-2 mb-2 items-start">
                                    <div {...provided.dragHandleProps}>
                                      <GripVertical className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5 transition-opacity ${
                                        canDrag ? 'opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing' : 'opacity-30 cursor-not-allowed'
                                      }`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-sm text-foreground line-clamp-2">{task.title}</p>
                                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 flex-wrap mt-3">
                                    <Badge className={getPriorityStyles(task.priority)} variant="outline">
                                      {task.priority}
                                    </Badge>
                                  </div>

                                  <div className="flex items-center justify-between gap-2 mt-3">
                                    <span className={`text-xs font-medium ${getDueDateStatus(task.dueDate).color}`}>
                                      {getDueDateStatus(task.dueDate).text}
                                    </span>
                                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
                                      {task.assignee.charAt(0)}
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
                            onClick={() => handleAddTaskClick(col.key)}
                            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground mt-2"
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
      </div>
    </>
  )
}
