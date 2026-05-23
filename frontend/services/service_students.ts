import type { StudentProfile } from '@/models/student.model'
import { apiClient } from '@/lib/api-client'

export const StudentsService = {
  async createStudent(student: StudentProfile): Promise<StudentProfile> {
    return apiClient.post<StudentProfile>('/api/users', student)
  },

  async getStudentById(id: string): Promise<StudentProfile | null> {
    try {
      return await apiClient.get<StudentProfile>(`/api/users/${id}`)
    } catch {
      return null
    }
  },

  async getAllStudents(filters?: { 
    level?: string; 
    department?: string; 
    academicYear?: string;
    q?: string;
  }): Promise<StudentProfile[]> {
    const params = new URLSearchParams()
    if (filters?.level) params.append('level', filters.level)
    if (filters?.department) params.append('department', filters.department)
    if (filters?.academicYear) params.append('academicYear', filters.academicYear)
    if (filters?.q) params.append('q', filters.q)
    
    const queryString = params.toString()
    const url = queryString ? `/api/users/students?${queryString}` : '/api/users/students'
    return apiClient.get<StudentProfile[]>(url)
  },

  async updateStudent(id: string, updates: Partial<StudentProfile>): Promise<StudentProfile | null> {
    try {
      return await apiClient.put<StudentProfile>(`/api/users/${id}`, updates)
    } catch {
      return null
    }
  },

  async deleteStudent(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/api/users/${id}`)
      return true
    } catch {
      return false
    }
  }
}
