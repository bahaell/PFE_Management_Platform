import type { Notification, NotificationEventType } from "@/models/notification.model"
import { apiClient } from "@/lib/api-client"

interface BackendNotification {
  id: number
  type: NotificationEventType
  title: string
  message: string
  read?: boolean
  isRead?: boolean
  createdAt: string
  data?: string
}

function resolveNumericUserId(userId: string): number {
  const legacyIds: Record<string, number> = {
    std001: 1,
    tch001: 2,
    coo001: 3,
  }
  return legacyIds[userId] ?? (Number.parseInt(userId, 10) || 1)
}

function mapNotification(item: BackendNotification, userId: string): Notification {
  return {
    id: String(item.id),
    userId,
    title: item.title,
    message: item.message,
    type: item.type,
    read: Boolean(item.read ?? item.isRead),
    createdAt: item.createdAt,
    data: item.data,
  }
}

export const NotificationService = {
  async getNotifications(userId: string): Promise<Notification[]> {
    if (!userId?.trim()) return []
    const numericId = resolveNumericUserId(userId)
    const items = await apiClient.get<BackendNotification[]>(`/api/notifications/${numericId}`)
    return items.map((item) => mapNotification(item, userId))
  },

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    if (!userId?.trim()) return []
    const numericId = resolveNumericUserId(userId)
    const items = await apiClient.get<BackendNotification[]>(`/api/notifications/${numericId}/unread`)
    return items.map((item) => mapNotification(item, userId))
  },

  async markAsRead(notificationId: string): Promise<boolean> {
    await apiClient.patch<void>(`/api/notifications/${notificationId}/read`, {})
    return true
  },

  async registerDeviceToken(userId: string, token: string): Promise<boolean> {
    await apiClient.post<void>('/api/devices', {
      userId: resolveNumericUserId(userId),
      token,
    })
    return true
  },

  async getUnreadCount(userId: string): Promise<number> {
    const unread = await NotificationService.getUnreadNotifications(userId)
    return unread.length
  },
}
