import { apiClient } from '@/lib/api-client'
import { getAuthState } from '@/lib/auth'

export type SubjectType = 'INTERNAL' | 'EXTERNAL'
export type SubjectStatus = 'PENDING' | 'ACCEPTED' | 'APPROVED' | 'REJECTED' | 'ARCHIVED' | 'CONVERTED'
export type SubjectApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED'

export interface Subject {
  id: string
  title: string
  description: string
  technologies: string[]
  type: SubjectType
  status: SubjectStatus
  academicYear: string
  teacherId?: string
  companyName?: string
  createdAt?: string
}

export interface SubjectApplication {
  id: string
  subjectId: string
  subjectTitle: string
  studentId: string
  status: SubjectApplicationStatus
  createdAt?: string
  updatedAt?: string
}

interface BackendSubject {
  id: string
  title: string
  description?: string
  technologies?: string[] | Set<string>
  type: SubjectType
  status: SubjectStatus
  academicYear: string
  teacherId?: string
  companyName?: string
  createdAt?: string
}

function currentAcademicYear(): string {
  const year = new Date().getFullYear()
  return `${year}-${year + 1}`
}

function authHeaders(roleOverride?: 'STUDENT' | 'TEACHER' | 'COORDINATOR') {
  const user = getAuthState()
  return {
    ...(user?.id ? { 'X-User-Id': user.id } : {}),
    'X-User-Role': roleOverride ?? user?.role?.toUpperCase() ?? '',
  }
}

function mapSubject(subject: BackendSubject): Subject {
  return {
    id: subject.id,
    title: subject.title,
    description: subject.description ?? '',
    technologies: Array.from(subject.technologies ?? []),
    type: subject.type,
    status: subject.status,
    academicYear: subject.academicYear,
    teacherId: subject.teacherId,
    companyName: subject.companyName,
    createdAt: subject.createdAt,
  }
}

export const SubjectsService = {
  async getAllSubjects(filters?: {
    academicYear?: string
    status?: SubjectStatus
    teacherId?: string
    role?: 'STUDENT' | 'TEACHER' | 'COORDINATOR'
  }): Promise<Subject[]> {
    const params = new URLSearchParams()
    if (filters?.academicYear) params.set('academicYear', filters.academicYear)
    if (filters?.status) params.set('status', filters.status)
    if (filters?.teacherId) params.set('teacherId', filters.teacherId)
    const query = params.toString()
    const subjects = await apiClient.get<BackendSubject[]>(
      `/api/subjects${query ? `?${query}` : ''}`,
      { headers: authHeaders(filters?.role) },
    )
    return subjects.map(mapSubject)
  },

  async getSubjectById(id: string): Promise<Subject | null> {
    try {
      return mapSubject(await apiClient.get<BackendSubject>(`/api/subjects/${id}`))
    } catch {
      return null
    }
  },

  async createSubject(subject: {
    title: string
    description?: string
    technologies?: string[]
    type?: SubjectType
    status?: SubjectStatus
    academicYear?: string
    companyName?: string
  }): Promise<Subject> {
    const user = getAuthState()
    const created = await apiClient.post<BackendSubject>('/api/subjects', {
      title: subject.title,
      description: subject.description ?? '',
      technologies: subject.technologies ?? [],
      type: subject.type ?? 'INTERNAL',
      status: 'PENDING',
      academicYear: subject.academicYear ?? currentAcademicYear(),
      teacherId: user?.id,
      companyName: subject.companyName,
    }, { headers: authHeaders('TEACHER') })
    return mapSubject(created)
  },

  async updateSubjectStatus(id: string, status: SubjectStatus): Promise<Subject> {
    const updated = await apiClient.patch<BackendSubject>(
      `/api/subjects/${id}/status?status=${encodeURIComponent(status)}`,
      {},
      { headers: authHeaders('COORDINATOR') },
    )
    return mapSubject(updated)
  },

  async applyToSubject(subjectId: string, studentId?: string): Promise<SubjectApplication> {
    const user = getAuthState()
    return apiClient.post<SubjectApplication>(
      `/api/subjects/${subjectId}/applications`,
      { studentId: studentId ?? user?.id },
      { headers: authHeaders('STUDENT') },
    )
  },

  async getApplicationsBySubject(subjectId: string): Promise<SubjectApplication[]> {
    return apiClient.get<SubjectApplication[]>(
      `/api/subjects/${subjectId}/applications`,
      { headers: authHeaders('TEACHER') },
    )
  },

  async getApplicationsByStudent(studentId?: string): Promise<SubjectApplication[]> {
    const user = getAuthState()
    const resolvedStudentId = studentId ?? user?.id
    if (!resolvedStudentId) return []
    return apiClient.get<SubjectApplication[]>(
      `/api/subjects/applications/student/${encodeURIComponent(resolvedStudentId)}`,
      { headers: authHeaders('STUDENT') },
    )
  },

  async updateApplicationStatus(applicationId: string, status: SubjectApplicationStatus): Promise<SubjectApplication> {
    return apiClient.patch<SubjectApplication>(
      `/api/subjects/applications/${applicationId}/status?status=${encodeURIComponent(status)}`,
      {},
      { headers: authHeaders('TEACHER') },
    )
  },
}

export default SubjectsService
