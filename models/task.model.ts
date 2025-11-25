export type TaskPriority = 'high' | 'medium' | 'low'
export type TaskStatus = 'todo' | 'inProgress' | 'done'

export interface Task {
  id: number
  title: string
  description: string
  priority: TaskPriority
  assignee: string
  dueDate: string
  status: TaskStatus
  completed: boolean
}
