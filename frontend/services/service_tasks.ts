import { apiClient } from '@/lib/api-client'
import type { Task, TaskPriority, TaskStatus } from '@/models/task.model'

interface BackendTask {
  id: string
  title: string
  description?: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  assigneeId?: string
  dueDate?: string
  projectId: string
  createdAt?: string
  updatedAt?: string
}

function toUiStatus(status: BackendTask['status']): TaskStatus {
  if (status === 'IN_PROGRESS') return 'inProgress'
  if (status === 'DONE') return 'done'
  return 'todo'
}

function toBackendStatus(status?: TaskStatus): BackendTask['status'] {
  if (status === 'inProgress' || status === 'IN_PROGRESS') return 'IN_PROGRESS'
  if (status === 'done' || status === 'DONE') return 'DONE'
  return 'TODO'
}

function toUiPriority(priority: BackendTask['priority']): TaskPriority {
  return priority.toLowerCase() as TaskPriority
}

function toBackendPriority(priority?: TaskPriority): BackendTask['priority'] {
  if (priority === 'HIGH' || priority === 'high') return 'HIGH'
  if (priority === 'MEDIUM' || priority === 'medium') return 'MEDIUM'
  return 'LOW'
}

function mapTask(task: BackendTask): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? '',
    status: toUiStatus(task.status),
    priority: toUiPriority(task.priority),
    assigneeId: task.assigneeId,
    // Prefer backend-provided assignee name when available. If backend only provides id,
    // leave assignee empty so the calling UI can resolve the name from project members.
    assignee: (task as any).assigneeName || (task as any).assignee || (task.assigneeId ? '' : 'Unassigned'),
    dueDate: task.dueDate?.slice(0, 10),
    projectId: task.projectId,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }
}

function toPayload(task: Partial<Task> & { projectId: string | number }) {
  return {
    title: task.title ?? '',
    description: task.description ?? '',
    status: toBackendStatus(task.status),
    priority: toBackendPriority(task.priority),
    assigneeId: task.assigneeId && task.assigneeId !== 'UNASSIGNED' ? task.assigneeId : undefined,
    dueDate: task.dueDate ? `${task.dueDate}T00:00:00` : undefined,
    projectId: String(task.projectId),
  }
}

export const TasksService = {
  async getTasksByProject(projectId: string | number): Promise<Task[]> {
    const id = String(projectId)
    const tasks = await apiClient.get<BackendTask[]>(`/api/tasks/project/${encodeURIComponent(id)}`)
    return tasks.map(mapTask)
  },

  async createTask(task: Partial<Task> & { projectId: string | number }): Promise<Task> {
    const created = await apiClient.post<BackendTask>('/api/tasks', toPayload(task))
    return mapTask(created)
  },

  async updateTask(id: string | number, task: Partial<Task> & { projectId: string | number }): Promise<Task> {
    const updated = await apiClient.put<BackendTask>(`/api/tasks/${id}`, toPayload(task))
    return mapTask(updated)
  },

  async updateTaskStatus(id: string | number, status: TaskStatus): Promise<Task> {
    const updated = await apiClient.patch<BackendTask>(
      `/api/tasks/${id}/status?status=${encodeURIComponent(toBackendStatus(status))}`,
      {},
    )
    return mapTask(updated)
  },

  async deleteTask(id: string | number): Promise<boolean> {
    await apiClient.delete<void>(`/api/tasks/${id}`)
    return true
  },
}

export default TasksService
