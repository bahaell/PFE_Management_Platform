import type { Notification } from "@/models/notification.model"

const NOTIFICATION_SERVICE_URL = "http://localhost:8085/api"

export const NotificationService = {
  /**
   * Fetch all notifications for a given userId
   * GET /api/notifications/{userId}
   */
  async getNotifications(userId: string): Promise<Notification[]> {
    try {
      const res = await fetch(`${NOTIFICATION_SERVICE_URL}/notifications/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    } catch (error) {
      console.error("[NotificationService] getNotifications error:", error)
      return []
    }
  },

  /**
   * Fetch only unread notifications for a given userId
   * GET /api/notifications/{userId}/unread
   */
  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    try {
      const res = await fetch(`${NOTIFICATION_SERVICE_URL}/notifications/${userId}/unread`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    } catch (error) {
      console.error("[NotificationService] getUnreadNotifications error:", error)
      return []
    }
  },

  /**
   * Mark a notification as read
   * PATCH /api/notifications/{id}/read
   */
  async markAsRead(notificationId: string): Promise<boolean> {
    try {
      const res = await fetch(`${NOTIFICATION_SERVICE_URL}/notifications/${notificationId}/read`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })
      return res.ok
    } catch (error) {
      console.error("[NotificationService] markAsRead error:", error)
      return false
    }
  },

  /**
   * Register a device FCM token for push notifications
   * POST /api/devices
   */
  async registerDeviceToken(userId: string, token: string): Promise<boolean> {
    try {
      const res = await fetch(`${NOTIFICATION_SERVICE_URL}/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: Number(userId), token }),
      })
      return res.ok
    } catch (error) {
      console.error("[NotificationService] registerDeviceToken error:", error)
      return false
    }
  },

  /**
   * Get unread count (derived from unread list)
   */
  async getUnreadCount(userId: string): Promise<number> {
    const unread = await NotificationService.getUnreadNotifications(userId)
    return unread.length
  },
}
