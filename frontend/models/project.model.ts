export enum ProjectStatus {
  PROPOSED = 'PROPOSED',
  APPROVED = 'APPROVED',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface ProjectBasic {
  id: string
  title: string
  subject: string
  description: string
  startDate: string
  deadline: string
  progress: number
  status: string
  supervisorId?: string
  studentIds?: string[]
  companyId?: string
  createdAt?: string
  updatedAt?: string
}

export interface ProjectMatch {
  projectId: string
  title: string
  description: string
  subject: string
  requiredSkills: string[]
  matchedSkills: string[]
  matchScore: number
}
