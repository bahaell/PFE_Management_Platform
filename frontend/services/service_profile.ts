import type { StudentProfile } from '@/models/student.model'
import type { Teacher } from '@/models/teacher.model'
import type { CoordinatorProfile } from '@/models/coordinator.model'
import type { Skill } from '@/models/skill.model'
import { apiClient } from '@/lib/api-client'

export const ProfileService = {
  async getProfile(role: string): Promise<StudentProfile | Teacher | CoordinatorProfile | null> {
    try {
      const data = await apiClient.get<any>('/api/users/me/profile')
      if (data && data[role.toLowerCase()]) {
        return data[role.toLowerCase()]
      }
      return data
    } catch {
      return null
    }
  },

  async createProfile(role: string, data: StudentProfile | Teacher | CoordinatorProfile): Promise<StudentProfile | Teacher | CoordinatorProfile> {
    return apiClient.put<StudentProfile | Teacher | CoordinatorProfile>('/api/users/me/profile', data)
  },

  async updateProfile(role: string, data: Partial<StudentProfile | Teacher | CoordinatorProfile>): Promise<StudentProfile | Teacher | CoordinatorProfile | null> {
    try {
      const response = await apiClient.put<any>('/api/users/me/profile', data)
      if (response && response[role.toLowerCase()]) {
        return response[role.toLowerCase()]
      }
      return response
    } catch {
      return null
    }
  },

  async deleteProfile(role: string): Promise<boolean> {
    // Current user deletion might be handled at user level
    return Promise.resolve(true)
  },

  async getAllProfiles(): Promise<(StudentProfile | Teacher | CoordinatorProfile)[]> {
    return apiClient.get<(StudentProfile | Teacher | CoordinatorProfile)[]>('/api/users')
  },

  async getSuggestedSkills() {
    try {
      const meta = await apiClient.get<any>('/api/users/me/skills/meta')
      return meta?.suggestedSkills || {}
    } catch {
      return {}
    }
  },

  async getSkillCategories() {
    try {
      const meta = await apiClient.get<any>('/api/users/me/skills/meta')
      return meta?.skillCategories || []
    } catch {
      return []
    }
  },

  async addSkill(role: string, skill: Skill): Promise<Skill | null> {
    try {
      return await apiClient.post<Skill>('/api/users/me/skills', skill)
    } catch {
      return null
    }
  },

  async removeSkill(role: string, skillId: string): Promise<boolean> {
    try {
      await apiClient.delete(`/api/users/me/skills/${skillId}`)
      return true
    } catch {
      return false
    }
  },

  async updateSkill(role: string, skillId: string, updates: Partial<Skill>): Promise<Skill | null> {
    try {
      return await apiClient.put<Skill>(`/api/users/me/skills/${skillId}`, updates)
    } catch {
      return null
    }
  },

  async getSkill(role: string, skillId: string): Promise<Skill | null> {
    try {
      return await apiClient.get<Skill>(`/api/users/me/skills/${skillId}`)
    } catch {
      return null
    }
  },

  async getAllSkills(role: string): Promise<Skill[]> {
    try {
      return await apiClient.get<Skill[]>('/api/users/me/skills')
    } catch {
      return []
    }
  },
}
