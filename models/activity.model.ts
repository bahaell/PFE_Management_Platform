export interface ActivityItem {
  id: number
  type: 'message' | 'upload' | 'task' | 'status' | 'member'
  author: string
  action: string
  timestamp: string
  icon: string
}
