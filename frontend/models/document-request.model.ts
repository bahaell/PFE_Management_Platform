export type DocumentRequestStatus = 'pending' | 'approved' | 'rejected'

export interface DocumentRequest {
  id: string
  studentId: string
  type: string
  status: DocumentRequestStatus
  reason?: string
  createdAt: string
  processedAt?: string
  processedBy?: string
}
