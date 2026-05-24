export const TaskPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  LEGACY_LOW: 'low',
  LEGACY_MEDIUM: 'medium',
  LEGACY_HIGH: 'high',
} as const
export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority]

export const TaskStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  LEGACY_TODO: 'todo',
  LEGACY_IN_PROGRESS: 'inProgress',
  LEGACY_DONE: 'done',
} as const
export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus]

export interface Task {
  [key: string]: any;
  id: string | number;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId?: string;
  assignee?: string;
  dueDate?: string;
  projectId?: string | number;
  createdAt?: string;
  updatedAt?: string;
}
