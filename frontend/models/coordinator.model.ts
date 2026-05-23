import type { BaseUser } from './user.model'
import type { Skill } from './skill.model'

export interface CoordinatorProfile extends BaseUser {
  department: string
  office: string
  responsibilities: string
  yearsOfService: number
  skills: Skill[]
}
