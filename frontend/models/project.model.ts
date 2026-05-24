export enum ProjectStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  DEFENDED = 'DEFENDED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED'
}

export enum ProjectPhase {
  PROPOSAL = 'PROPOSAL',
  SPECIFICATION = 'SPECIFICATION',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  REPORT = 'REPORT',
  DEFENSE = 'DEFENSE'
}

export interface ProjectMember {
  id: string
  projectId: string
  studentId: string
  role: 'LEADER' | 'MEMBER'
  joinedAt: string
}

export interface ProjectSupervisor {
  id: string
  projectId: string
  teacherId: string
  role: 'MAIN_SUPERVISOR' | 'CO_SUPERVISOR'
}

export interface ProjectBasic {
  id: any
  title: string
  subject: string
  description: string
  type?: 'INTERNAL' | 'EXTERNAL'
  phase?: ProjectPhase
  academicYear?: string
  startDate: string
  deadline: string
  progress: number
  status: ProjectStatus
  members?: ProjectMember[]
  supervisors?: ProjectSupervisor[]
  companyId?: string
  requiredSkills?: string[]
  createdAt?: string
  updatedAt?: string
}

export type Project = ProjectBasic

export interface ProjectMatch {
  projectId: string
  title: string
  description: string
  subject: string
  requiredSkills: string[]
  matchedSkills: string[]
  matchScore: number
}
