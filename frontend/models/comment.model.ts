export interface NestedComment {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  replies: NestedComment[]
}
