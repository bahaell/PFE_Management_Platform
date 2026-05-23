import type { JuryMember } from './jury.model'

export interface TimelineAttachment {
  id: string
  name: string
  type: string
  url: string
}

export interface TimelineEntry {
  arrival: string
  setup: string
  presentation: string
  qa: string
  deliberation: string
  result: string
}

export interface DefenseTimelineEvent {
  id: string
  date: string
  time: string
  room: string
  status: 'scheduled' | 'completed' | 'cancelled'

  student: {
    name: string
    avatar: string
    email: string
  }

  subject: {
    title: string
    description: string
    tags: string[]
  }

  jury: JuryMember[]

  teacherRole?: 'president' | 'rapporteur' | 'encadrant' | null

  attachments: TimelineAttachment[]

  timeline: TimelineEntry

  progress?: {
    thesisSubmitted: boolean
    slidesUploaded: boolean
    documentsComplete: boolean
  }
}
