import type { BaseUser } from './user.model'
import type { Skill } from './skill.model'

export interface Teacher extends BaseUser {
  grade: string
  speciality: string
  department: string
  bio: string
  researchInterests: string
  yearsOfExperience: number
  yearsOfService: number
  skills: Skill[]
}
