import type { ProjectBasic, ProjectMatch } from "@/models/project.model"
import { apiClient } from "@/lib/api-client"

const PROJECTS_ENDPOINT = "/api/projects"

function normalizeId(id: string | number) {
  return typeof id === 'number' ? id.toString() : id
}

export const ProjectsService = {
  async createProject(project: ProjectBasic): Promise<ProjectBasic> {
    const payload = { ...project }
    return apiClient.post<ProjectBasic>(PROJECTS_ENDPOINT, payload)
  },

  async getProjectById(id: string | number): Promise<ProjectBasic | null> {
    const normalizedId = normalizeId(id)
    return apiClient.get<ProjectBasic>(`${PROJECTS_ENDPOINT}/${normalizedId}`)
  },

  async getAllProjects(): Promise<ProjectBasic[]> {
    return apiClient.get<ProjectBasic[]>(PROJECTS_ENDPOINT)
  },

  async updateProject(id: string | number, updates: Partial<ProjectBasic>): Promise<ProjectBasic | null> {
    const normalizedId = normalizeId(id)
    const payload = { ...updates }
    return apiClient.put<ProjectBasic>(`${PROJECTS_ENDPOINT}/${normalizedId}`, payload)
  },

  async deleteProject(id: string | number): Promise<boolean> {
    const normalizedId = normalizeId(id)
    await apiClient.delete<void>(`${PROJECTS_ENDPOINT}/${normalizedId}`)
    return true
  },

  async searchProjects(query: string): Promise<ProjectBasic[]> {
    if (!query.trim()) {
      return this.getAllProjects()
    }

    const projects = await this.getAllProjects()
    const lowerQuery = query.toLowerCase()
    return projects.filter((p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.subject.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery),
    )
  },

  async getProjectsByStatus(status: string): Promise<ProjectBasic[]> {
    return apiClient.get<ProjectBasic[]>(`${PROJECTS_ENDPOINT}/status/${encodeURIComponent(status)}`)
  },

  async updateProjectProgress(id: string | number, progress: number): Promise<ProjectBasic | null> {
    const normalizedId = normalizeId(id)
    return apiClient.patch<ProjectBasic>(`${PROJECTS_ENDPOINT}/${normalizedId}/progress?progress=${progress}`, {})
  },

  async getProjectsByDateRange(startDate: string, endDate: string): Promise<ProjectBasic[]> {
    const projects = await this.getAllProjects()
    return projects.filter((p) => p.startDate >= startDate && p.deadline <= endDate)
  },

  async updateProgress(projectId: string | number, newProgress: number): Promise<ProjectBasic | null> {
    return this.updateProjectProgress(projectId, newProgress)
  },

  async getProjectMatches(studentSkills: string[]): Promise<ProjectMatch[]> {
    return apiClient.post<ProjectMatch[]>(`${PROJECTS_ENDPOINT}/matching`, { studentSkills })
  },
}
