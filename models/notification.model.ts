export type NotificationEventType =
  | "NEW_COMMIT"
  | "NEW_MESSAGE"
  | "TASK_ASSIGNED"
  | "TASK_UPDATED"
  | "DOCUMENT_READY"
  | "DOCUMENT_UPLOADED"
  | "ACADEMIC_DOCUMENT_GENERATED"
  | "ACADEMIC_DOCUMENT_REQUESTED"
  | "DEFENSE_SCHEDULED"
  | "DEFENSE_REQUEST_CREATED"
  | "JURY_ASSIGNED"
  | "SUBJECT_APPROVED"
  | "SUBJECT_APPLICATION_CREATED"
  | "SUBJECT_APPLICATION_UPDATED"
  | "PROJECT_CREATED"
  | "USER_CREATED"
  | "DEADLINE_REMINDER"

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: NotificationEventType
  read: boolean
  createdAt: string
  data?: string // JSON string with context metadata
}

export interface NotificationPage {
  notifications: Notification[]
  totalUnread: number
}
