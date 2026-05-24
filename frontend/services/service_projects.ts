import type { ProjectBasic, ProjectMatch, ProjectMember, ProjectSupervisor } from "@/models/project.model"
import { ProjectStatus } from "@/models/project.model"
import { apiClient } from "@/lib/api-client"

const PROJECTS_ENDPOINT = "/api/projects"

interface BackendProjectResponse extends Omit<ProjectBasic, 'deadline' | 'startDate'> {
  startDate?: string
  endDate?: string
  deadline?: string
}

type ProjectPayload = Partial<ProjectBasic> & {
  subjectId?: string
  endDate?: string
}

type ProjectMemberRole = 'LEADER' | 'MEMBER'
type ProjectSupervisorRole = 'MAIN_SUPERVISOR' | 'CO_SUPERVISOR'

function normalizeId(id: string | number) {
  return typeof id === 'number' ? id.toString() : id
}

function toLocalDateTime(value?: string) {
  if (!value) return undefined
  return value.includes('T') ? value : `${value}T00:00:00`
}

function toProjectPayload(project: ProjectPayload) {
  const {
    id,
    subject,
    progress,
    members,
    supervisors,
    createdAt,
    updatedAt,
    deadline,
    ...payload
  } = project

  return {
    ...payload,
    startDate: toLocalDateTime(project.startDate),
    endDate: toLocalDateTime(project.deadline ?? project.endDate),
  }
}

function mapProject(project: BackendProjectResponse): ProjectBasic {
  return {
    ...project,
    subject: project.subject ?? project.title,
    description: project.description ?? '',
    startDate: project.startDate?.slice(0, 10) ?? '',
    deadline: (project.deadline ?? project.endDate ?? '').slice(0, 10),
    progress: project.progress ?? 0,
  }
}

export const ProjectsService = {
  async createProject(project: ProjectPayload): Promise<ProjectBasic> {
    return mapProject(await apiClient.post<BackendProjectResponse>(PROJECTS_ENDPOINT, toProjectPayload(project)))
  },

  async getProjectById(id: string | number): Promise<ProjectBasic | null> {
    const normalizedId = normalizeId(id)
    return mapProject(await apiClient.get<BackendProjectResponse>(`${PROJECTS_ENDPOINT}/${normalizedId}`))
  },

  async getAllProjects(): Promise<ProjectBasic[]> {
    const projects = await apiClient.get<BackendProjectResponse[]>(PROJECTS_ENDPOINT)
    return projects.map(mapProject)
  },

  async getProjectsBySupervisor(teacherId: string): Promise<ProjectBasic[]> {
    const projects = await apiClient.get<BackendProjectResponse[]>(`${PROJECTS_ENDPOINT}/supervisor/${teacherId}`)
    return projects.map(mapProject)
  },

  async getProjectsByStudent(studentId: string): Promise<ProjectBasic[]> {
    const projects = await apiClient.get<BackendProjectResponse[]>(`${PROJECTS_ENDPOINT}/student/${studentId}`)
    return projects.map(mapProject)
  },

  async updateProject(id: string | number, updates: ProjectPayload): Promise<ProjectBasic | null> {
    const normalizedId = normalizeId(id)
    return mapProject(await apiClient.put<BackendProjectResponse>(`${PROJECTS_ENDPOINT}/${normalizedId}`, toProjectPayload(updates)))
  },

  async updateProjectStatus(id: string | number, status: ProjectStatus): Promise<ProjectBasic> {
    const normalizedId = normalizeId(id)
    return mapProject(await apiClient.patch<BackendProjectResponse>(
      `${PROJECTS_ENDPOINT}/${normalizedId}/status?status=${encodeURIComponent(status)}`,
      {},
      { headers: { 'X-User-Role': 'COORDINATOR' } },
    ))
  },

  async addProjectMember(
    projectId: string | number,
    studentId: string,
    role: ProjectMemberRole = 'MEMBER',
  ): Promise<ProjectMember> {
    const normalizedId = normalizeId(projectId)
    return apiClient.post<ProjectMember>(`${PROJECTS_ENDPOINT}/${normalizedId}/members`, { studentId, role })
  },

  async addProjectSupervisor(
    projectId: string | number,
    teacherId: string,
    role: ProjectSupervisorRole = 'MAIN_SUPERVISOR',
  ): Promise<ProjectSupervisor> {
    const normalizedId = normalizeId(projectId)
    return apiClient.post<ProjectSupervisor>(`${PROJECTS_ENDPOINT}/${normalizedId}/supervisors`, { teacherId, role })
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
    const projects = await apiClient.get<BackendProjectResponse[]>(`${PROJECTS_ENDPOINT}/status/${encodeURIComponent(status)}`)
    return projects.map(mapProject)
  },

  async getProjectsByDateRange(startDate: string, endDate: string): Promise<ProjectBasic[]> {
    const projects = await this.getAllProjects()
    return projects.filter((p) => p.startDate >= startDate && p.deadline <= endDate)
  },

  async getProjectMatches(studentSkills: string[]): Promise<ProjectMatch[]> {
    return apiClient.post<ProjectMatch[]>(`${PROJECTS_ENDPOINT}/matching`, { studentSkills })
  },
}
