import type { Teacher } from '@/models/teacher.model'
import type { Room } from '@/models/room.model'
import type { JuryMember } from '@/models/jury.model'
import type { SchedulerProject, ScheduledDefenseEntry, PendingDefenseRequest, SchedulerStatistics } from '@/models/scheduler.model'

interface Project {
  id: string
  studentName: string
  subject: string
  assignedTeacher: Teacher
  skills: string[]
  status: 'pending' | 'scheduled' | 'completed'
}

interface RecommendedSlot {
  id: number
  time: string
  startTime: string
  endTime: string
  room: Room
  jury: JuryMember[]
  confidence: number
  conflicts: string[]
  isRecommended: boolean
  aiReasoning: string[]
}

const MOCK_ROOMS: Room[] = [
  { 
    id: 1, 
    name: 'Room A - Amphitheater', 
    capacity: 50, 
    location: 'Building A',
    status: 'available',
    description: 'Large amphitheater',
    equipment: {
      projector: { present: true, status: 'ok' },
      smartBoard: { present: true, status: 'ok' },
      speakers: { present: true, status: 'ok' },
      microphone: { present: true, status: 'ok' },
      hdmiSystem: { present: true, status: 'ok' },
      recordingCamera: { present: true, status: 'ok' },
      airConditioning: { present: true, status: 'ok' },
      ethernet: { present: true, status: 'ok' },
      wifi: { present: true, status: 'ok' },
      screen: { present: true, status: 'ok' }
    },
    bookings: []
  }
]

const MOCK_TEACHERS: Teacher[] = [
  { 
    id: 'dr-sami', 
    name: 'Dr. Sami Ahmed', 
    email: 'sami@university.edu',
    phone: '+216 90 000 001',
    gender: 'Male',
    birthdate: '1975-03-20',
    avatar: 'SA',
    role: 'teacher',
    grade: 'Professor', 
    speciality: 'Artificial Intelligence', 
    department: 'Computer Science',
    bio: 'AI expert',
    researchInterests: 'ML, DL',
    yearsOfExperience: 20,
    skills: [
      { id: 'skill-1', name: 'Machine Learning', category: 'ML', relevance: 95 },
      { id: 'skill-2', name: 'Deep Learning', category: 'ML', relevance: 95 }
    ]
  },
  { 
    id: 'dr-hatem', 
    name: 'Dr. Hatem Hassan', 
    email: 'hatem@university.edu',
    phone: '+216 90 000 002',
    gender: 'Male',
    birthdate: '1980-05-15',
    avatar: 'HH',
    role: 'teacher',
    grade: 'Associate Professor', 
    speciality: 'Data Science', 
    department: 'Computer Science',
    bio: 'Data science expert',
    researchInterests: 'Big Data, Mining',
    yearsOfExperience: 15,
    skills: [
      { id: 'skill-1', name: 'Data Mining', category: 'DS', relevance: 90 }
    ]
  }
]

let MOCK_PROJECTS: Project[] = [
  { id: 'proj-1', studentName: 'Ahmed Youssef', subject: 'AI Traffic System Optimization', assignedTeacher: MOCK_TEACHERS[0], skills: ['Machine Learning', 'Computer Vision', 'Deep Learning'], status: 'pending' },
  { id: 'proj-2', studentName: 'Mariem Khaled', subject: 'Blockchain Voting Platform', assignedTeacher: MOCK_TEACHERS[1], skills: ['Blockchain', 'Cryptography', 'Web Development'], status: 'pending' }
]

let MOCK_SCHEDULED_DEFENSES: ScheduledDefenseEntry[] = []

let MOCK_PENDING_REQUESTS: PendingDefenseRequest[] = [
  { id: 1, project: { id: 'proj-1', studentName: 'Ahmed Youssef', subject: 'AI Traffic System Optimization', assignedTeacher: MOCK_TEACHERS[0], skills: ['Machine Learning'], status: 'pending' }, requestedDateRange: { from: '2024-03-01', to: '2024-03-15' }, priority: 'high' }
]

export const SchedulerService = {
  async createTeacher(teacher: Teacher): Promise<Teacher> {
    const newTeacher = { ...teacher, role: 'teacher' as const }
    MOCK_TEACHERS.push(newTeacher)
    return Promise.resolve(newTeacher)
  },

  async getTeacherById(id: string): Promise<Teacher | null> {
    return Promise.resolve(MOCK_TEACHERS.find(t => t.id === id) || null)
  },

  async getAllTeachers(): Promise<Teacher[]> {
    return Promise.resolve(MOCK_TEACHERS)
  },

  async updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher | null> {
    const teacher = MOCK_TEACHERS.find(t => t.id === id)
    if (!teacher) return Promise.resolve(null)
    Object.assign(teacher, updates, { id, role: 'teacher' })
    return Promise.resolve(teacher)
  },

  async deleteTeacher(id: string): Promise<boolean> {
    const initialLength = MOCK_TEACHERS.length
    const filtered = MOCK_TEACHERS.filter(t => t.id !== id)
    if (filtered.length < initialLength) {
      MOCK_TEACHERS.length = 0
      MOCK_TEACHERS.push(...filtered)
      return Promise.resolve(true)
    }
    return Promise.resolve(false)
  },

  async createProject(project: Project): Promise<Project> {
    const newProject = { ...project, id: `proj-${Date.now()}` }
    MOCK_PROJECTS.push(newProject)
    return Promise.resolve(newProject)
  },

  async getProjectById(id: string): Promise<Project | null> {
    return Promise.resolve(MOCK_PROJECTS.find(p => p.id === id) || null)
  },

  async getAllProjects(): Promise<Project[]> {
    return Promise.resolve(MOCK_PROJECTS)
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
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

  async getRoomById(id: number): Promise<Room | null> {
    return Promise.resolve(MOCK_ROOMS.find(r => r.id === id) || null)
  },

  async getAllRooms(): Promise<Room[]> {
    return Promise.resolve(MOCK_ROOMS)
  },

  async createPendingRequest(request: PendingDefenseRequest): Promise<PendingDefenseRequest> {
    const newRequest = { ...request, id: Math.max(...MOCK_PENDING_REQUESTS.map(r => r.id), 0) + 1 }
    MOCK_PENDING_REQUESTS.push(newRequest)
    return Promise.resolve(newRequest)
  },

  async getPendingRequestById(id: number): Promise<PendingDefenseRequest | null> {
    return Promise.resolve(MOCK_PENDING_REQUESTS.find(r => r.id === id) || null)
  },

  async getAllPendingRequests(): Promise<PendingDefenseRequest[]> {
    return Promise.resolve(MOCK_PENDING_REQUESTS)
  },

  async updatePendingRequest(id: number, updates: Partial<PendingDefenseRequest>): Promise<PendingDefenseRequest | null> {
    const request = MOCK_PENDING_REQUESTS.find(r => r.id === id)
    if (!request) return Promise.resolve(null)
    Object.assign(request, updates, { id })
    return Promise.resolve(request)
  },

  async deletePendingRequest(id: number): Promise<boolean> {
    const initialLength = MOCK_PENDING_REQUESTS.length
    MOCK_PENDING_REQUESTS = MOCK_PENDING_REQUESTS.filter(r => r.id !== id)
    return Promise.resolve(MOCK_PENDING_REQUESTS.length < initialLength)
  },

  async createScheduledDefense(defense: ScheduledDefenseEntry): Promise<ScheduledDefenseEntry> {
    const newDefense = { ...defense, id: Math.max(...MOCK_SCHEDULED_DEFENSES.map(d => d.id), 0) + 1 }
    MOCK_SCHEDULED_DEFENSES.push(newDefense)
    return Promise.resolve(newDefense)
  },

  async getScheduledDefenseById(id: number): Promise<ScheduledDefenseEntry | null> {
    return Promise.resolve(MOCK_SCHEDULED_DEFENSES.find(d => d.id === id) || null)
  },

  async getAllScheduledDefenses(): Promise<ScheduledDefenseEntry[]> {
    return Promise.resolve(MOCK_SCHEDULED_DEFENSES)
  },

  async updateScheduledDefense(id: number, updates: Partial<ScheduledDefenseEntry>): Promise<ScheduledDefenseEntry | null> {
    const defense = MOCK_SCHEDULED_DEFENSES.find(d => d.id === id)
    if (!defense) return Promise.resolve(null)
    Object.assign(defense, updates, { id })
    return Promise.resolve(defense)
  },

  async deleteScheduledDefense(id: number): Promise<boolean> {
    const initialLength = MOCK_SCHEDULED_DEFENSES.length
    MOCK_SCHEDULED_DEFENSES = MOCK_SCHEDULED_DEFENSES.filter(d => d.id !== id)
    return Promise.resolve(MOCK_SCHEDULED_DEFENSES.length < initialLength)
  },

  async generateRecommendedSlots(projectId?: string): Promise<RecommendedSlot[]> {
    if (!projectId) return Promise.resolve([])
    const project = MOCK_PROJECTS.find(p => p.id === projectId)
    if (!project) return Promise.resolve([])
    return Promise.resolve([])
  },

  async getStatistics(): Promise<SchedulerStatistics> {
    return Promise.resolve({
      totalScheduledDefenses: MOCK_SCHEDULED_DEFENSES.length,
      pendingRequests: MOCK_PENDING_REQUESTS.length,
      roomUtilization: {},
      teacherLoad: {}
    })
  },
}

export { MOCK_TEACHERS }
