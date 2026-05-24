import type { JuryMember } from './jury.model'
import type { Room } from './room.model'
import type { Teacher } from './teacher.model'

export interface SchedulerProject {
  id: string
  studentName: string
  subject: string
  assignedTeacher: Teacher
  skills: string[]
  status: 'pending' | 'scheduled' | 'completed'
}

export interface SchedulerRecommendedSlot {
  id: any
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

export interface ScheduledDefenseEntry {
  id: any
  projectId?: string
  roomId?: number
  projectName: string
  student: string
  date: string
  time: string
  room: string
  jury: JuryMember[]
  status: 'scheduled' | 'completed'
}

export type Jury = JuryMember[]
export type ScheduledDefense = ScheduledDefenseEntry

export interface PendingDefenseRequest {
  id: any
  project: SchedulerProject
  requestedDateRange: { from: string; to: string }
  priority: 'low' | 'medium' | 'high'
}

export interface SchedulerStatistics {
  totalScheduledDefenses: number
  pendingRequests: number
  roomUtilization: Record<string, number>
  teacherLoad: Record<string, number>
}
