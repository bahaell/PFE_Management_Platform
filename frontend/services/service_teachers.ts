import type { Teacher } from '@/models/teacher.model'
import { apiClient } from '@/lib/api-client'

export const TeachersService = {
  async createTeacher(teacher: Teacher): Promise<Teacher> {
    return apiClient.post<Teacher>('/api/users', teacher)
  },

  async getTeacherById(id: string): Promise<Teacher | null> {
    try {
      return await apiClient.get<Teacher>(`/api/users/${id}`)
    } catch {
      return null
    }
  },

  async getAllTeachers(filters?: {
    grade?: string;
    speciality?: string;
    department?: string;
    minYears?: number;
    q?: string;
  }): Promise<Teacher[]> {
    const params = new URLSearchParams()
    if (filters?.grade) params.append('grade', filters.grade)
    if (filters?.speciality) params.append('speciality', filters.speciality)
    if (filters?.department) params.append('department', filters.department)
    if (filters?.minYears !== undefined) params.append('minYears', filters.minYears.toString())
    if (filters?.q) params.append('q', filters.q)
    
    const queryString = params.toString()
    const url = queryString ? `/api/users/teachers?${queryString}` : '/api/users/teachers'
    return apiClient.get<Teacher[]>(url)
  },

  async updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher | null> {
    try {
      return await apiClient.put<Teacher>(`/api/users/${id}`, updates)
    } catch {
      return null
    }
  },

  async deleteTeacher(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/api/users/${id}`)
      return true
    } catch {
      return false
    }
  }
}
