import { apiClient } from '@/lib/api-client'

export type FreeSubjectProposalStatus = 'PENDING' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'AUTO_REJECTED'

export interface FreeSubjectProposal {
  id: string
  studentId: string
  title: string
  description: string
  companyName: string
  technologies: string[]
  preferredSupervisorId?: string
  status: FreeSubjectProposalStatus
  academicYear: string
  projectId?: string
  createdAt: string
  updatedAt: string
}

export const ProposalsService = {
  async getAllProposals(status?: FreeSubjectProposalStatus): Promise<FreeSubjectProposal[]> {
    const params = new URLSearchParams()
    if (status) params.set('status', status)
    const query = params.toString()
    return await apiClient.get<FreeSubjectProposal[]>(`/api/free-subjects${query ? `?${query}` : ''}`)
  },

  async getProposalsByStudent(studentId: string): Promise<FreeSubjectProposal[]> {
    return await apiClient.get<FreeSubjectProposal[]>(`/api/free-subjects/student/${studentId}`)
  },

  async acceptProposal(id: string): Promise<FreeSubjectProposal> {
    return await apiClient.put<FreeSubjectProposal>(
      `/api/free-subjects/${id}/accept`,
      {},
      {
        headers: { 'X-User-Role': 'COORDINATOR' },
      }
    )
  },

  async rejectProposal(id: string): Promise<FreeSubjectProposal> {
    return await apiClient.put<FreeSubjectProposal>(
      `/api/free-subjects/${id}/reject`,
      {},
      {
        headers: { 'X-User-Role': 'COORDINATOR' },
      }
    )
  },
}

export default ProposalsService
