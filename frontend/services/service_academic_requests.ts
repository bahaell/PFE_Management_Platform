import type { AcademicDocumentRequest, RequestStatus } from '@/models/academic-document-request.model'
import type { AcademicDocumentType } from '@/models/academic-document.model'

let MOCK_REQUESTS: AcademicDocumentRequest[] = [
  {
    id: 'REQ001',
    documentType: 'demande_pfe',
    templateId: 'TPL003',
    studentId: 'STU001',
    studentName: 'Ali Hassan Mohamed',
    teacherId: 'TEACH001',
    teacherName: 'Dr. Ahmed Hassan',
    projectId: 'PROJ001',
    projectTitle: 'AI Healthcare Diagnosis System',
    status: 'pending',
    requestedAt: '2024-02-15',
    phase: 'after_supervisor',
  },
  {
    id: 'REQ002',
    documentType: 'convention',
    templateId: 'TPL001',
    studentId: 'STU002',
    studentName: 'Noor Ahmed Fatima',
    teacherId: 'TEACH002',
    teacherName: 'Eng. Fatima Zahra',
    projectId: 'PROJ002',
    projectTitle: 'Blockchain Voting Platform',
    status: 'accepted',
    requestedAt: '2024-02-10',
    respondedAt: '2024-02-12',
    coordinatorId: 'COORD001',
    phase: 'after_supervisor',
  },
  {
    id: 'REQ003',
    documentType: 'encadrement',
    templateId: 'TPL002',
    studentId: 'STU003',
    studentName: 'Layla Ibrahim Zahra',
    teacherId: 'TEACH003',
    teacherName: 'Prof. Mohammed Ali',
    projectId: 'PROJ003',
    projectTitle: 'IoT Smart City Management',
    status: 'generated',
    requestedAt: '2024-02-05',
    respondedAt: '2024-02-08',
    coordinatorId: 'COORD001',
    generatedDocumentId: 'DOC001',
    phase: 'after_supervisor',
  },
  {
    id: 'REQ004',
    documentType: 'pv_soutenance',
    templateId: 'TPL004',
    studentId: 'STU001',
    studentName: 'Ali Hassan Mohamed',
    teacherId: 'TEACH001',
    teacherName: 'Dr. Ahmed Hassan',
    projectId: 'PROJ001',
    projectTitle: 'AI Healthcare Diagnosis System',
    status: 'delivered',
    requestedAt: '2024-02-01',
    respondedAt: '2024-02-03',
    coordinatorId: 'COORD001',
    generatedDocumentId: 'DOC002',
    deliveredAt: '2024-02-04',
    phase: 'after_defense',
  },
  {
    id: 'REQ005',
    documentType: 'affectation',
    templateId: 'TPL005',
    studentId: 'STU004',
    studentName: 'Mohammed Karim Hassan',
    teacherId: 'TEACH001',
    teacherName: 'Dr. Ahmed Hassan',
    projectId: 'PROJ004',
    projectTitle: 'Cloud-Based Analytics Engine',
    status: 'rejected',
    requestedAt: '2024-02-13',
    respondedAt: '2024-02-14',
    responseMessage: 'Template needs update for this project type',
    phase: 'after_approval',
  },
  {
    id: 'REQ006',
    documentType: 'demande_pfe',
    templateId: 'TPL003',
    studentId: 'STU005',
    studentName: 'Sara Abdelaziz Ahmed',
    status: 'pending',
    requestedAt: '2024-02-16',
    phase: 'after_supervisor',
  },
  {
    id: 'REQ007',
    documentType: 'convention',
    templateId: 'TPL001',
    studentId: 'STU001',
    studentName: 'Ali Hassan Mohamed',
    teacherId: 'TEACH001',
    teacherName: 'Dr. Ahmed Hassan',
    projectId: 'PROJ001',
    projectTitle: 'AI Healthcare Diagnosis System',
    status: 'accepted',
    requestedAt: '2024-02-12',
    respondedAt: '2024-02-13',
    coordinatorId: 'COORD001',
    phase: 'after_supervisor',
  },
  {
    id: 'REQ008',
    documentType: 'encadrement',
    templateId: 'TPL002',
    studentId: 'STU002',
    studentName: 'Noor Ahmed Fatima',
    teacherId: 'TEACH002',
    teacherName: 'Eng. Fatima Zahra',
    projectId: 'PROJ002',
    projectTitle: 'Blockchain Voting Platform',
    status: 'generated',
    requestedAt: '2024-02-14',
    respondedAt: '2024-02-15',
    coordinatorId: 'COORD001',
    generatedDocumentId: 'DOC003',
    phase: 'after_supervisor',
  },
  {
    id: 'REQ009',
    documentType: 'pv_soutenance',
    templateId: 'TPL004',
    studentId: 'STU003',
    studentName: 'Layla Ibrahim Zahra',
    teacherId: 'TEACH003',
    teacherName: 'Prof. Mohammed Ali',
    projectId: 'PROJ003',
    projectTitle: 'IoT Smart City Management',
    status: 'pending',
    requestedAt: '2024-02-17',
    phase: 'after_defense',
  },
  {
    id: 'REQ010',
    documentType: 'affectation',
    templateId: 'TPL005',
    studentId: 'STU005',
    studentName: 'Sara Abdelaziz Ahmed',
    teacherId: 'TEACH002',
    teacherName: 'Eng. Fatima Zahra',
    projectId: 'PROJ001',
    projectTitle: 'AI Healthcare Diagnosis System',
    status: 'accepted',
    requestedAt: '2024-02-16',
    respondedAt: '2024-02-17',
    coordinatorId: 'COORD001',
    phase: 'after_approval',
  },
]

export const AcademicRequestsService = {
  async getAllRequests(): Promise<AcademicDocumentRequest[]> {
    return Promise.resolve([...MOCK_REQUESTS])
  },

  async getRequestById(id: string): Promise<AcademicDocumentRequest | null> {
    return Promise.resolve(
      MOCK_REQUESTS.find(r => r.id === id) || null
    )
  },

  async getRequestsByStudent(studentId: string): Promise<AcademicDocumentRequest[]> {
    return Promise.resolve(
      MOCK_REQUESTS.filter(r => r.studentId === studentId)
    )
  },

  async getRequestsByStatus(status: RequestStatus): Promise<AcademicDocumentRequest[]> {
    return Promise.resolve(
      MOCK_REQUESTS.filter(r => r.status === status)
    )
  },

  async getPendingRequests(): Promise<AcademicDocumentRequest[]> {
    return Promise.resolve(
      MOCK_REQUESTS.filter(r => r.status === 'pending')
    )
  },

  async createRequest(request: Omit<AcademicDocumentRequest, 'id' | 'requestedAt'>): Promise<AcademicDocumentRequest> {
    const id = `REQ${String(MOCK_REQUESTS.length + 1).padStart(3, '0')}`
    const newRequest: AcademicDocumentRequest = {
      ...request,
      id,
      requestedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    }
    MOCK_REQUESTS.push(newRequest)
    return Promise.resolve(newRequest)
  },

  async updateRequestStatus(
    id: string,
    status: RequestStatus,
    coordinatorId?: string,
    responseMessage?: string
  ): Promise<AcademicDocumentRequest | null> {
    const request = MOCK_REQUESTS.find(r => r.id === id)
    if (!request) return Promise.resolve(null)
    
    Object.assign(request, {
      status,
      respondedAt: new Date().toISOString().split('T')[0],
      coordinatorId,
      responseMessage,
    })
    return Promise.resolve(request)
  },

  async acceptRequest(id: string, coordinatorId: string): Promise<AcademicDocumentRequest | null> {
    return this.updateRequestStatus(id, 'accepted', coordinatorId)
  },

  async rejectRequest(id: string, coordinatorId: string, reason: string): Promise<AcademicDocumentRequest | null> {
    return this.updateRequestStatus(id, 'rejected', coordinatorId, reason)
  },

  async markAsGenerated(id: string, documentId: string): Promise<AcademicDocumentRequest | null> {
    const request = MOCK_REQUESTS.find(r => r.id === id)
    if (!request) return Promise.resolve(null)
    Object.assign(request, {
      status: 'generated',
      generatedDocumentId: documentId,
    })
    return Promise.resolve(request)
  },

  async markAsDelivered(id: string): Promise<AcademicDocumentRequest | null> {
    const request = MOCK_REQUESTS.find(r => r.id === id)
    if (!request) return Promise.resolve(null)
    Object.assign(request, {
      status: 'delivered',
      deliveredAt: new Date().toISOString().split('T')[0],
    })
    return Promise.resolve(request)
  },

  async searchRequests(query: string): Promise<AcademicDocumentRequest[]> {
    const lowerQuery = query.toLowerCase()
    return Promise.resolve(
      MOCK_REQUESTS.filter(
        r =>
          r.studentName.toLowerCase().includes(lowerQuery) ||
          r.documentType.toLowerCase().includes(lowerQuery) ||
          r.projectTitle?.toLowerCase().includes(lowerQuery)
      )
    )
  },
}
