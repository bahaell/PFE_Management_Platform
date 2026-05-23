import { apiClient } from '@/lib/api-client'
import type { UserDocument } from '@/models/user-document.model'

export const UserDocumentsService = {
  async getMyStudentDocuments(): Promise<UserDocument[]> {
    return apiClient.get<UserDocument[]>('/api/users/me/documents')
  },

  async getCoordinatorDocuments(studentId?: string): Promise<UserDocument[]> {
    const query = studentId ? `?studentId=${encodeURIComponent(studentId)}` : ''
    return apiClient.get<UserDocument[]>(`/api/users/documents${query}`)
  },

  async createCoordinatorDocument(payload: {
    title: string
    description?: string
    fileUrl: string
    fileName: string
    mimeType?: string
    studentId: string
  }): Promise<UserDocument> {
    return apiClient.post<UserDocument>('/api/users/documents', payload)
  },

  async updateCoordinatorDocument(
    id: number,
    updates: Partial<{
      title: string
      description: string
      fileUrl: string
      fileName: string
      mimeType: string
      studentId: string
    }>
  ): Promise<UserDocument> {
    return apiClient.put<UserDocument>(`/api/users/documents/${id}`, updates)
  },

  async deleteCoordinatorDocument(id: number): Promise<void> {
    await apiClient.delete<void>(`/api/users/documents/${id}`)
  },
}
