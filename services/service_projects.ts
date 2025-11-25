interface ProjectBasic {
  id: number
  title: string
  subject: string
  description: string
  startDate: string
  deadline: string
  progress: number
  status: string
}

let MOCK_PROJECTS: ProjectBasic[] = [
  {
    id: 1,
    title: 'AI in Healthcare',
    subject: 'Artificial Intelligence Applications',
    description: 'Building an intelligent system for early disease detection using machine learning',
    startDate: '2024-01-15',
    deadline: '2024-06-30',
    progress: 65,
    status: 'In Progress'
  },
  {
    id: 2,
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
    const newProject = { 
      ...project, 
      id: Math.max(...MOCK_PROJECTS.map(p => p.id), 0) + 1 
    }
    MOCK_PROJECTS.push(newProject)
    return Promise.resolve(newProject)
  },

  async getProjectById(id: number): Promise<ProjectBasic | null> {
    return Promise.resolve(MOCK_PROJECTS.find(p => p.id === id) || null)
  },

  async getAllProjects(): Promise<ProjectBasic[]> {
    return Promise.resolve(MOCK_PROJECTS)
  },

  async updateProject(id: number, updates: Partial<ProjectBasic>): Promise<ProjectBasic | null> {
    const project = MOCK_PROJECTS.find(p => p.id === id)
    if (!project) return Promise.resolve(null)
    Object.assign(project, updates, { id })
    return Promise.resolve(project)
  },

  async deleteProject(id: number): Promise<boolean> {
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

  async updateProjectProgress(id: number, progress: number): Promise<ProjectBasic | null> {
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
    const project = MOCK_PROJECTS.find(p => p.id === Number(projectId))
    if (!project) return Promise.resolve(null)
    project.progress = Math.min(100, Math.max(0, newProgress))
    return Promise.resolve(project)
  },
}
