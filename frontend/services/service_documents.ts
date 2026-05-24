import { apiClient } from '@/lib/api-client'
import type { ProjectDocument } from '@/models/document.model'

interface BackendProjectDocument {
  id: string
  projectId: string
  title: string
  description?: string
  fileUrl: string
  fileType?: string
  version: number
  uploadedBy: string
  status: string
  createdAt: string
}

function mapDocument(document: BackendProjectDocument): ProjectDocument {
  return {
    id: document.id,
    projectId: document.projectId,
    name: document.title,
    title: document.title,
    description: document.description ?? '',
    fileUrl: document.fileUrl,
    fileType: document.fileType,
    type: document.fileType,
    version: document.version,
    uploadedBy: document.uploadedBy,
    uploadedAt: document.createdAt,
    createdAt: document.createdAt,
    status: document.status,
  }
}

export const DocumentsService = {
  async getDocuments(projectId: string) {
    const documents = await apiClient.get<BackendProjectDocument[]>(`/api/projects/${projectId}/documents`)
    return documents.map(mapDocument)
  },

  async addDocument(projectId: string, document: {
    title: string
    description?: string
    fileUrl: string
    fileType?: string
    uploadedBy: string
    version?: number
  }) {
    const created = await apiClient.post<BackendProjectDocument>(`/api/projects/${projectId}/documents`, document)
    return mapDocument(created)
  },
}
