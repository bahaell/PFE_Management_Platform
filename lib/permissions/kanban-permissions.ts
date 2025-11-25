export type UserRole = 'student' | 'teacher' | 'coordinator'

export interface TaskPermissions {
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canMove: boolean
  canAssign: boolean
  canModifyPriority: boolean
  canModifyDueDate: boolean
  canModifyDescription: boolean
}

/**
 * Enforces role-based permissions:
 * - Supervisor (teacher/coordinator): Full control (create, edit, delete, move, assign, modify all fields)
 * - Student: Can only manage assigned tasks (move, update description, but cannot delete or modify priority/due date)
 */
export function getTaskPermissions(
  userRole: UserRole,
  userId: string,
  taskAssigneeId?: string
): TaskPermissions {
  // Supervisors (teachers/coordinators) have full control
  if (userRole === 'teacher' || userRole === 'coordinator') {
    return {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canMove: true,
      canAssign: true,
      canModifyPriority: true,
      canModifyDueDate: true,
      canModifyDescription: true,
    }
  }

  // Students have limited permissions
  if (userRole === 'student') {
    const isAssignedToUser = !taskAssigneeId || taskAssigneeId === userId

    return {
      canCreate: false, // Students cannot create tasks
      canEdit: isAssignedToUser, // Can edit only assigned tasks
      canDelete: false, // Students cannot delete tasks
      canMove: isAssignedToUser, // Can only move assigned tasks between columns
      canAssign: false, // Cannot assign tasks to others
      canModifyPriority: false, // Cannot modify priority
      canModifyDueDate: false, // Cannot modify due date
      canModifyDescription: isAssignedToUser, // Can only update description of assigned tasks
    }
  }

  // Default: no permissions
  return {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canMove: false,
    canAssign: false,
    canModifyPriority: false,
    canModifyDueDate: false,
    canModifyDescription: false,
  }
}

/**
 * Check if user can drag/drop a task
 */
export function canDragTask(
  userRole: UserRole,
  userId: string,
  taskAssigneeId?: string
): boolean {
  const permissions = getTaskPermissions(userRole, userId, taskAssigneeId)
  return permissions.canMove
}

/**
 * Check if user can modify specific task field
 */
export function canModifyField(
  userRole: UserRole,
  userId: string,
  taskAssigneeId: string,
  fieldName: 'priority' | 'dueDate' | 'description'
): boolean {
  const permissions = getTaskPermissions(userRole, userId, taskAssigneeId)
  
  switch (fieldName) {
    case 'priority':
      return permissions.canModifyPriority
    case 'dueDate':
      return permissions.canModifyDueDate
    case 'description':
      return permissions.canModifyDescription
    default:
      return false
  }
}
