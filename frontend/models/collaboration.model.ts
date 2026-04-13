import type { Task } from './task.model'
import type { ProjectDocument } from './document.model'
import type { ProjectMessage } from './message.model'
import type { NestedComment } from './comment.model'
import type { ActivityItem } from './activity.model'
import type { JuryMember } from './jury.model'
import type { Teacher } from './teacher.model'
import type { StudentProfile } from './student.model'

export interface CollaborationProjectInfo {
  id: number
  title: string
  subject: string
  description: string
  startDate: string
  deadline: string
  progress: number
  status: string
}

export interface CollaborationTeacherInfo {
  id: number
  name: string
  avatar: string
  role: string
  email: string
  online: boolean
}

export interface CollaborationStudentInfo {
  id: number
  name: string
  avatar: string
  role: string
  email: string
  online: boolean
}

export interface CollaborationDefenseInfo {
  date: string
  time: string
  room: string
  duration: string
}

export interface CollaborationData {
  project: CollaborationProjectInfo
  teacher: CollaborationTeacherInfo
  student: CollaborationStudentInfo
  jury: JuryMember[]
  defense: CollaborationDefenseInfo
  messages: ProjectMessage[]
  tasks: Task[]
  documents: ProjectDocument[]
  comments: NestedComment[]
  activities: ActivityItem[]
}
