import type { JuryMember } from './jury.model'

export type DefenseStatus = 'scheduled' | 'completed' | 'cancelled' | 'in-progress'

export interface DefenseAttachment {
  id: string
  name: string
  type: string
  url: string
}

export interface DefenseTimeline {
  arrival: string
  setup: string
  presentation: string
  qa: string
  deliberation: string
  result: string
}

export interface DefenseProgress {
  thesisSubmitted: boolean
  slidesUploaded: boolean
  documentsComplete: boolean
}

export interface DefenseProjectSummary {
  title: string
  description: string
  tags: string[]
}

export interface DefenseStudentSummary {
  name: string
  avatar: string
  email: string
}

export interface DefenseEvent {
  id: string
  date: string
  time: string
  room: string
  status: DefenseStatus

  student: DefenseStudentSummary
  subject: DefenseProjectSummary
  jury: JuryMember[]

  teacherRole?: JuryRole | null

  attachments: DefenseAttachment[]
  timeline: DefenseTimeline
  progress?: DefenseProgress
}
