import type { AcademicDocumentType } from './academic-document.model'

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'generated' | 'delivered'

export interface AcademicDocumentRequest {
  id: string
  documentType: AcademicDocumentType
  templateId: string
  studentId: string
  studentName: string
  teacherId?: string
  teacherName?: string
  projectId?: string
  projectTitle?: string
  status: RequestStatus
  requestedAt: string
  respondedAt?: string
  responseMessage?: string
  coordinatorId?: string
  generatedDocumentId?: string
  deliveredAt?: string
  phase: 'before_supervisor' | 'after_supervisor' | 'after_approval' | 'after_defense'
}
