export interface AdministrativeDocument {
  id: string
  type: string
  studentId: string
  teacherId?: string
  projectId?: string
  generatedAt: string
  fileUrl: string
  templateId: string
  requestedBy: string
  createdAt: string
}
