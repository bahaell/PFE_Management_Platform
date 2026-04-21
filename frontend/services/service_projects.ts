import type { ProjectBasic, ProjectMatch } from "@/models/project.model"

let MOCK_PROJECTS: ProjectBasic[] = [
  {
    id: "1",
    title: 'AI in Healthcare',
    subject: 'Artificial Intelligence Applications',
    description: 'Building an intelligent system for early disease detection using machine learning',
    startDate: '2024-01-15',
    deadline: '2024-06-30',
    progress: 65,
    status: 'In Progress'
  },
  {
    id: "2",
    title: 'Blockchain Voting',
    subject: 'Decentralized Systems',
    description: 'Secure voting platform using blockchain technology',
    startDate: '2024-02-01',
    deadline: '2024-07-15',
    progress: 45,
    status: 'In Progress'
  }
]

export const ProjectsService = {
  async createProject(project: ProjectBasic): Promise<ProjectBasic> {
    const nextId = (Math.max(...MOCK_PROJECTS.map(p => Number(p.id)), 0) + 1).toString()
    const newProject = { 
      ...project, 
      id: nextId 
    }
    MOCK_PROJECTS.push(newProject)
    return Promise.resolve(newProject)
  },

  async getProjectById(id: string): Promise<ProjectBasic | null> {
    return Promise.resolve(MOCK_PROJECTS.find(p => p.id === id) || null)
  },

  async getAllProjects(): Promise<ProjectBasic[]> {
    return Promise.resolve(MOCK_PROJECTS)
  },

  async updateProject(id: string, updates: Partial<ProjectBasic>): Promise<ProjectBasic | null> {
    const project = MOCK_PROJECTS.find(p => p.id === id)
    if (!project) return Promise.resolve(null)
    Object.assign(project, updates, { id })
    return Promise.resolve(project)
  },

  async deleteProject(id: string): Promise<boolean> {
    const initialLength = MOCK_PROJECTS.length
    MOCK_PROJECTS = MOCK_PROJECTS.filter(p => p.id !== id)
    return Promise.resolve(MOCK_PROJECTS.length < initialLength)
  },

  async searchProjects(query: string): Promise<ProjectBasic[]> {
    const lowerQuery = query.toLowerCase()
    return Promise.resolve(MOCK_PROJECTS.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) || 
      p.subject.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    ))
  },

  async getProjectsByStatus(status: string): Promise<ProjectBasic[]> {
    return Promise.resolve(MOCK_PROJECTS.filter(p => p.status === status))
  },

  async updateProjectProgress(id: string, progress: number): Promise<ProjectBasic | null> {
    const project = MOCK_PROJECTS.find(p => p.id === id)
    if (!project) return Promise.resolve(null)
    project.progress = Math.min(100, Math.max(0, progress))
    return Promise.resolve(project)
  },

  async getProjectsByDateRange(startDate: string, endDate: string): Promise<ProjectBasic[]> {
    return Promise.resolve(MOCK_PROJECTS.filter(p => 
      p.startDate >= startDate && p.deadline <= endDate
    ))
  },

  async updateProgress(projectId: string, newProgress: number, byTeacherId?: string): Promise<ProjectBasic | null> {
    const project = MOCK_PROJECTS.find(p => p.id === projectId)
    if (!project) return Promise.resolve(null)
    project.progress = Math.min(100, Math.max(0, newProgress))
    return Promise.resolve(project)
  },

  async getProjectMatches(studentSkills: string[]): Promise<ProjectMatch[]> {
    const normalized = studentSkills.map(s => s.toLowerCase().trim()).filter(Boolean)
    const matches = MOCK_PROJECTS.map((project) => {
      const requiredSkills = project.subject
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 2)
      const matchedSkills = requiredSkills.filter((skill) =>
        normalized.some((s) => s.includes(skill.toLowerCase()) || skill.toLowerCase().includes(s)),
      )
      const matchScore = requiredSkills.length === 0
        ? 0
        : Math.round((matchedSkills.length * 100) / requiredSkills.length)

      return {
        projectId: project.id,
        title: project.title,
        description: project.description,
        subject: project.subject,
        requiredSkills,
        matchedSkills,
        matchScore,
      }
    }).sort((a, b) => b.matchScore - a.matchScore)

    return Promise.resolve(matches)
  },
}
