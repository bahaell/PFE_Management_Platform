import type { BaseUser } from './user.model'
import type { Skill } from './skill.model'

export interface StudentProfile extends BaseUser {
  level: string
  department: string
  studentId: string
  academicYear: string
  interests: string
  skills: Skill[]
}
