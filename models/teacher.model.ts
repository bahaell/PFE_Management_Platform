import type { BaseUser } from './user.model'
import type { Skill } from './skill.model'

export interface Teacher extends BaseUser {
  grade: string
  title?: string
  speciality: string
  department: string
  bio: string
  researchInterests: string
  yearsOfExperience: number
  skills: Skill[] | string[]
  currentLoad?: number
  availableSlots?: { start: string; end: string }[]
}
