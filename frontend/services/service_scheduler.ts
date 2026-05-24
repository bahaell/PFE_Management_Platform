import type { JuryMember } from '@/models/jury.model'
import type { Teacher } from '@/models/teacher.model'
import type {
  PendingDefenseRequest,
  ScheduledDefenseEntry,
  SchedulerProject,
  SchedulerRecommendedSlot,
  SchedulerStatistics,
} from '@/models/scheduler.model'
import type { DefenseTimelineEvent } from '@/lib/defense-timeline-mock-data'
import type { TeacherDefense } from '@/lib/teacher-defense-mock-data'
import { apiClient } from '@/lib/api-client'

export type DefenseStatus = 'PENDING' | 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'POSTPONED'
export type JuryRole = 'PRESIDENT' | 'RAPPORTEUR' | 'SUPERVISOR' | 'EXAMINER'
export type UiJuryRole = 'president' | 'rapporteur' | 'encadrant' | 'examiner'

export interface BackendDefenseSession {
  id: number
  projectId: string
  roomId?: number
  roomNameSnapshot?: string
  academicYear: string
  date?: string
  startTime?: string
  endTime?: string
  status: DefenseStatus
  manuallyScheduled?: boolean
  createdAt?: string
  updatedAt?: string
  jury?: BackendDefenseJury[]
}

export interface BackendDefenseJury {
  id?: number
  defenseSessionId?: number
  teacherId: string
  role: JuryRole
}

export interface CreateDefensePayload {
  projectId: string
  roomId?: number
  roomNameSnapshot?: string
  academicYear?: string
  date?: string
  startTime?: string
  endTime?: string
  status?: DefenseStatus
  manuallyScheduled?: boolean
}

export interface AcademicPeriod {
  id?: number
  name?: string
  academicYear: string
  startDate?: string
  endDate?: string
  active?: boolean
}

interface BackendProject {
  id?: string
  projectId?: string
  title?: string
  subject?: string
  status?: string
  members?: { studentId: string }[]
  supervisors?: { teacherId: string; role?: string }[]
  mainSupervisorId?: string
  memberStudentIds?: string[]
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  return apiClient.request<T>(path, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  })
}

function currentAcademicYear(): string {
  const year = new Date().getFullYear()
  return `${year}-${year + 1}`
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'NA'
}

function projectLabel(projectId: string): string {
  return projectId?.startsWith('proj-') ? `Project ${projectId.replace('proj-', '')}` : `Project ${projectId || 'TBD'}`
}

function statusToUi(status: DefenseStatus): ScheduledDefenseEntry['status'] {
  return status === 'COMPLETED' ? 'completed' : 'scheduled'
}

function statusToTimeline(status: DefenseStatus, date?: string, startTime?: string): DefenseTimelineEvent['status'] {
  if (status === 'CANCELLED' || status === 'POSTPONED') return 'cancelled'
  if (status === 'COMPLETED') return 'completed'
  if (date && startTime && new Date(`${date}T${startTime}`) < new Date()) return 'completed'
  return 'scheduled'
}

function placeholderTeacher(teacherId: string, role: UiJuryRole): Teacher {
  return {
    id: teacherId,
    name: `Teacher ${teacherId}`,
    email: '',
    phone: '',
    gender: '',
    birthdate: '',
    avatar: null,
    role: 'teacher',
    grade: role === 'president' ? 'Professor' : 'Teacher',
    speciality: 'Not provided',
    department: 'Not provided',
    bio: '',
    researchInterests: '',
    yearsOfExperience: 0,
    yearsOfService: 0,
    skills: [],
  }
}

function backendRoleToUi(role: JuryRole): UiJuryRole {
  if (role === 'PRESIDENT') return 'president'
  if (role === 'RAPPORTEUR') return 'rapporteur'
  if (role === 'EXAMINER') return 'examiner'
  return 'encadrant'
}

function mapJuryMember(jury: BackendDefenseJury): JuryMember {
  const role = backendRoleToUi(jury.role)
  return {
    id: jury.id ?? jury.teacherId,
    teacher: placeholderTeacher(jury.teacherId, role),
    role,
  }
}

function mapBackendSessionToUIEntry(session: BackendDefenseSession): ScheduledDefenseEntry {
  return {
    id: session.id,
    projectId: session.projectId,
    roomId: session.roomId,
    projectName: projectLabel(session.projectId),
    student: 'Student assigned to project',
    date: session.date || 'TBD',
    time: session.startTime ? `${session.startTime} - ${session.endTime || '??:??'}` : 'TBD',
    room: session.roomNameSnapshot || (session.roomId ? `Room ${session.roomId}` : 'Room TBD'),
    jury: (session.jury || []).map(mapJuryMember),
    status: statusToUi(session.status),
  }
}

function mapBackendSessionToTimelineEvent(session: BackendDefenseSession, teacherRole: UiJuryRole | null = null): DefenseTimelineEvent {
  const title = projectLabel(session.projectId)
  const start = session.startTime || 'TBD'
  return {
    id: String(session.id),
    date: session.date || 'TBD',
    time: start,
    room: session.roomNameSnapshot || (session.roomId ? `Room ${session.roomId}` : 'Room TBD'),
    status: statusToTimeline(session.status, session.date, session.startTime),
    student: {
      name: 'Student assigned to project',
      avatar: 'ST',
      email: '',
    },
    subject: {
      title,
      description: `Defense session for ${title}`,
      tags: [],
    },
    jury: (session.jury || []).map(mapJuryMember),
    teacherRole,
    attachments: [],
    timeline: {
      arrival: start,
      setup: start,
      presentation: start,
      qa: '',
      deliberation: '',
      result: '',
    },
    progress: {
      thesisSubmitted: session.status !== 'PENDING',
      slidesUploaded: session.status !== 'PENDING',
      documentsComplete: session.status !== 'PENDING',
    },
  }
}

function mapBackendSessionToTeacherDefense(session: BackendDefenseSession, teacherRole: UiJuryRole = 'encadrant'): TeacherDefense {
  const event = mapBackendSessionToTimelineEvent(session, teacherRole)
  return {
    id: String(session.id),
    student: event.student,
    subject: {
      title: event.subject.title,
      description: event.subject.description,
      technologies: event.subject.tags,
    },
    defense: {
      date: event.date,
      time: event.time,
      room: event.room,
      duration: '45 min',
      status: event.status === 'completed' ? 'completed' : 'scheduled',
    },
    jury: event.jury,
    teacherRole,
    attachments: event.attachments,
  }
}

function mapBackendProjectToSchedulerProject(project: BackendProject): SchedulerProject {
  const id = project.projectId || project.id || ''
  const supervisorId = project.mainSupervisorId || project.supervisors?.[0]?.teacherId || 'supervisor'
  const studentId = project.memberStudentIds?.[0] || project.members?.[0]?.studentId || 'student'

  return {
    id,
    studentName: `Student ${studentId}`,
    subject: project.title || project.subject || projectLabel(id),
    assignedTeacher: placeholderTeacher(supervisorId, 'encadrant'),
    skills: [],
    status: project.status === 'DEFENDED' ? 'completed' : project.status === 'IN_PROGRESS' ? 'scheduled' : 'pending',
  }
}

export const SchedulerService = {
  async getRawDefenses(): Promise<BackendDefenseSession[]> {
    return request<BackendDefenseSession[]>('GET', '/api/schedule/defenses')
  },

  async getDefenseJury(defenseId: number): Promise<BackendDefenseJury[]> {
    return request<BackendDefenseJury[]>('GET', `/api/schedule/defenses/${defenseId}/jury`)
  },

  async getRawDefensesWithJury(): Promise<BackendDefenseSession[]> {
    const sessions = await this.getRawDefenses()
    const juryBySession = await Promise.all(
      sessions.map((session) => this.getDefenseJury(session.id).catch(() => []))
    )
    return sessions.map((session, index) => ({
      ...session,
      jury: juryBySession[index],
    }))
  },

  async getAllScheduledDefenses(): Promise<ScheduledDefenseEntry[]> {
    const sessions = await this.getRawDefensesWithJury()
    return sessions
      .filter((session) => ['SCHEDULED', 'ONGOING', 'COMPLETED'].includes(session.status))
      .map(mapBackendSessionToUIEntry)
  },

  async getScheduledDefenseById(id: number): Promise<ScheduledDefenseEntry | null> {
    try {
      const session = await request<BackendDefenseSession>('GET', `/api/schedule/defenses/${id}`)
      session.jury = await this.getDefenseJury(id).catch(() => [])
      return mapBackendSessionToUIEntry(session)
    } catch {
      return null
    }
  },

  async getTimelineEvents(options?: { userRole?: 'student' | 'teacher' | 'coordinator'; userId?: string }): Promise<DefenseTimelineEvent[]> {
    const sessions = await this.getRawDefensesWithJury()
    return sessions
      .filter((session) => options?.userRole === 'coordinator' || session.status !== 'PENDING')
      .filter((session) => {
        if (options?.userRole !== 'teacher' || !options.userId) return true
        return (session.jury || []).some((member) => member.teacherId === options.userId)
      })
      .map((session) => mapBackendSessionToTimelineEvent(session, options?.userRole === 'teacher' ? 'encadrant' : null))
  },

  async getTeacherDefenses(teacherId?: string): Promise<TeacherDefense[]> {
    const sessions = await this.getRawDefensesWithJury()
    return sessions
      .filter((session) => session.status !== 'PENDING')
      .filter((session) => !teacherId || (session.jury || []).some((member) => member.teacherId === teacherId))
      .map((session) => {
        const teacherRole = (session.jury || []).find((member) => member.teacherId === teacherId)?.role
        return mapBackendSessionToTeacherDefense(session, teacherRole ? backendRoleToUi(teacherRole) : 'encadrant')
      })
  },

  async getTeacherDefenseById(id: number): Promise<TeacherDefense | null> {
    try {
      const session = await request<BackendDefenseSession>('GET', `/api/schedule/defenses/${id}`)
      session.jury = await this.getDefenseJury(id).catch(() => [])
      return mapBackendSessionToTeacherDefense(session)
    } catch {
      return null
    }
  },

  async createDefense(payload: CreateDefensePayload): Promise<ScheduledDefenseEntry> {
    const session = await request<BackendDefenseSession>('POST', '/api/schedule/defenses', {
      academicYear: payload.academicYear || currentAcademicYear(),
      status: payload.status || 'PENDING',
      manuallyScheduled: payload.manuallyScheduled ?? true,
      ...payload,
    })
    return mapBackendSessionToUIEntry(session)
  },

  async updateDefense(id: number, payload: Partial<CreateDefensePayload>): Promise<ScheduledDefenseEntry> {
    const session = await request<BackendDefenseSession>('PUT', `/api/schedule/defenses/${id}?forceOverride=true`, payload)
    session.jury = await this.getDefenseJury(id).catch(() => [])
    return mapBackendSessionToUIEntry(session)
  },

  async updateScheduledDefense(id: number, updates: Partial<ScheduledDefenseEntry>): Promise<ScheduledDefenseEntry | null> {
    const backendUpdates: Partial<BackendDefenseSession> = {}
    if (updates.date && updates.date !== 'TBD') backendUpdates.date = updates.date
    if (updates.room) backendUpdates.roomNameSnapshot = updates.room
    if (updates.time && updates.time !== 'TBD') {
      const parts = updates.time.split('-').map((part) => part.trim())
      backendUpdates.startTime = parts[0]
      if (parts[1]) backendUpdates.endTime = parts[1]
    }
    const session = await request<BackendDefenseSession>('PUT', `/api/schedule/defenses/${id}?forceOverride=true`, backendUpdates)
    return mapBackendSessionToUIEntry(session)
  },

  async deleteScheduledDefense(id: number): Promise<boolean> {
    await request<void>('DELETE', `/api/schedule/defenses/${id}`)
    return true
  },

  async getStatistics(): Promise<SchedulerStatistics> {
    const sessions = await this.getRawDefensesWithJury()
    const scheduled = sessions.filter((session) => session.status !== 'PENDING')
    const pending = sessions.filter((session) => session.status === 'PENDING')
    const roomUtilization: Record<string, number> = {}
    const teacherLoad: Record<string, number> = {}

    scheduled.forEach((session) => {
      const room = session.roomNameSnapshot || (session.roomId ? `Room ${session.roomId}` : 'Unassigned')
      roomUtilization[room] = (roomUtilization[room] || 0) + 1
      ;(session.jury || []).forEach((member) => {
        teacherLoad[member.teacherId] = (teacherLoad[member.teacherId] || 0) + 1
      })
    })

    return {
      totalScheduledDefenses: scheduled.length,
      pendingRequests: pending.length,
      roomUtilization,
      teacherLoad,
    }
  },

  async createTeacher(teacher: Teacher): Promise<Teacher> { return teacher },
  async getTeacherById(id: string): Promise<Teacher | null> {
    try {
      const user = await apiClient.get<any>(`/api/users/${id}`)
      return {
        id: String(user.id ?? id),
        name: user.name ?? user.fullName ?? user.email ?? `Teacher ${id}`,
        email: user.email ?? '',
        phone: user.phone ?? '',
        gender: user.gender ?? '',
        birthdate: user.birthdate ?? '',
        avatar: user.avatar ?? null,
        role: 'teacher',
        grade: user.grade ?? 'Teacher',
        speciality: user.speciality ?? user.specialty ?? '',
        department: user.department ?? '',
        bio: user.bio ?? '',
        researchInterests: user.researchInterests ?? '',
        yearsOfExperience: user.yearsOfExperience ?? 0,
        yearsOfService: user.yearsOfService ?? 0,
        skills: user.skills ?? [],
      }
    } catch {
      return null
    }
  },
  async getAllTeachers(): Promise<Teacher[]> {
    const users = await apiClient.get<any[]>('/api/users/teachers')
    return users.map((user) => ({
      id: String(user.id),
      name: user.name ?? user.fullName ?? user.email ?? `Teacher ${user.id}`,
      email: user.email ?? '',
      phone: user.phone ?? '',
      gender: user.gender ?? '',
      birthdate: user.birthdate ?? '',
      avatar: user.avatar ?? null,
      role: 'teacher',
      grade: user.grade ?? 'Teacher',
      speciality: user.speciality ?? user.specialty ?? '',
      department: user.department ?? '',
      bio: user.bio ?? '',
      researchInterests: user.researchInterests ?? '',
      yearsOfExperience: user.yearsOfExperience ?? 0,
      yearsOfService: user.yearsOfService ?? 0,
      skills: user.skills ?? [],
    }))
  },
  async updateTeacher(_id: string, _updates: Partial<Teacher>): Promise<Teacher | null> { return null },
  async deleteTeacher(_id: string): Promise<boolean> { return false },

  async createProject(project: SchedulerProject): Promise<SchedulerProject> { return project },
  async getProjectById(id: string): Promise<SchedulerProject | null> {
    try {
      const project = await apiClient.get<BackendProject>(`/api/projects/${id}`)
      return mapBackendProjectToSchedulerProject(project)
    } catch {
      return null
    }
  },
  async getAllProjects(): Promise<SchedulerProject[]> {
    const projects = await apiClient.get<BackendProject[]>('/api/projects/scheduling-candidates?status=IN_PROGRESS')
    return projects.map(mapBackendProjectToSchedulerProject)
  },
  async updateProject(_id: string, _updates: Partial<SchedulerProject>): Promise<SchedulerProject | null> { return null },
  async deleteProject(_id: string): Promise<boolean> { return false },

  async createPendingRequest(pendingRequest: PendingDefenseRequest): Promise<PendingDefenseRequest> {
    await request<BackendDefenseSession>('POST', '/api/schedule/defenses', {
      projectId: pendingRequest.project.id,
      academicYear: currentAcademicYear(),
      status: 'PENDING',
      manuallyScheduled: false,
    })
    return pendingRequest
  },

  async getPendingRequestById(id: number): Promise<PendingDefenseRequest | null> {
    const requests = await this.getAllPendingRequests()
    return requests.find((request) => request.id === id) || null
  },

  async getAllPendingRequests(): Promise<PendingDefenseRequest[]> {
    const sessions = await this.getRawDefensesWithJury()
    return sessions
      .filter((session) => session.status === 'PENDING')
      .map((session) => ({
        id: session.id,
        project: {
          id: session.projectId,
          studentName: 'Student assigned to project',
          subject: projectLabel(session.projectId),
          assignedTeacher: placeholderTeacher('supervisor', 'encadrant'),
          skills: [],
          status: 'pending',
        },
        requestedDateRange: {
          from: session.date || new Date().toISOString().slice(0, 10),
          to: session.date || new Date().toISOString().slice(0, 10),
        },
        priority: 'medium',
      }))
  },

  async updatePendingRequest(id: number, _updates: Partial<PendingDefenseRequest>): Promise<PendingDefenseRequest | null> {
    return this.getPendingRequestById(id)
  },

  async deletePendingRequest(id: number): Promise<boolean> {
    return this.deleteScheduledDefense(id)
  },

  async generateRecommendedSlots(_projectId?: string): Promise<SchedulerRecommendedSlot[]> {
    const today = new Date().toISOString().slice(0, 10)
    const rooms = await apiClient.get<any[]>(`/api/rooms/available?date=${today}&startTime=08:00&endTime=10:00&capacity=0`)
    return rooms.slice(0, 3).map((room, index) => ({
      id: `${today}-${room.id}-${index}`,
      time: '08:00 - 10:00',
      startTime: '08:00',
      endTime: '10:00',
      room: {
        id: room.id,
        name: room.name,
        capacity: room.capacity,
        location: room.location,
        building: room.building,
        floor: room.floor,
        status: room.status,
      },
      jury: [],
      confidence: Math.max(70, 95 - index * 10),
      conflicts: [],
      isRecommended: index === 0,
      aiReasoning: ['Room is available for the selected academic slot'],
    }))
  },

  async solveSchedule(requests: unknown[]): Promise<{ jobId: number }> {
    return request<{ jobId: number }>('POST', '/api/schedule/solve', requests)
  },

  async addJuryMember(defenseId: number, teacherId: string, role: JuryRole, forceOverride = false): Promise<BackendDefenseJury> {
    const q = new URLSearchParams({ teacherId, role, forceOverride: String(forceOverride) })
    return request<BackendDefenseJury>('POST', `/api/schedule/defenses/${defenseId}/jury?${q}`)
  },

  async updateJuryMember(defenseId: number, juryId: number, teacherId: string, role: JuryRole, forceOverride = false): Promise<BackendDefenseJury> {
    const q = new URLSearchParams({ teacherId, role, forceOverride: String(forceOverride) })
    return request<BackendDefenseJury>('PUT', `/api/schedule/defenses/${defenseId}/jury/${juryId}?${q}`)
  },

  async deleteJuryMember(defenseId: number, juryId: number): Promise<boolean> {
    await request<void>('DELETE', `/api/schedule/defenses/${defenseId}/jury/${juryId}`)
    return true
  },

  async getAcademicPeriods(): Promise<AcademicPeriod[]> {
    return request<AcademicPeriod[]>('GET', '/api/schedule/periods')
  },

  async getActiveAcademicPeriod(): Promise<AcademicPeriod> {
    return request<AcademicPeriod>('GET', '/api/schedule/periods/active')
  },

  async createAcademicPeriod(period: AcademicPeriod): Promise<AcademicPeriod> {
    return request<AcademicPeriod>('POST', '/api/schedule/periods', period)
  },

  async activateAcademicPeriod(id: number): Promise<AcademicPeriod> {
    return request<AcademicPeriod>('PUT', `/api/schedule/periods/${id}/activate`)
  },

  mapJuryMember,
}

export default SchedulerService
