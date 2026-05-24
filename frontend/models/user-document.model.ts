export interface UserDocument {
  id: number
  title: string
  description?: string
  fileUrl: string
  fileName: string
  mimeType: string
  createdAt: string
  studentId: string
  studentName: string
  teacherId?: string
  teacherName?: string
  coordinatorId: string
  coordinatorName: string
}
