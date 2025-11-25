export interface Commit {
  id: string
  projectId: string
  documentId: string | null
  teacherId: string
  teacherName: string
  teacherAvatar: string | null
  comment: string
  previousProgress: number
  newProgress: number
  attachments: { id: string; name: string; url: string; type: string }[]
  createdAt: string
}
