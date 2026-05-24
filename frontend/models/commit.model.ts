export interface Commit {
  id: string
  projectId: string
  documentId: string
  teacherId: string
  teacherName: string
  teacherAvatar: string | null
  comment: string
  previousProgress: number
  newProgress: number
  previousPhase?: string
  newPhase?: string
  attachments: { id: string; name: string; url: string; type: string }[]
  createdAt: string
}
