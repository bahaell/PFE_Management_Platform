import type { StudentProfile } from './student.model'
import type { Teacher } from './teacher.model'
import type { CoordinatorProfile } from './coordinator.model'
import type { SuggestedSkills, SkillCategory } from './skill.model'

export interface ProfileData {
  student?: StudentProfile
  teacher?: Teacher
  coordinator?: CoordinatorProfile
}

export interface ProfileSkillMeta {
  suggestedSkills: SuggestedSkills
  skillCategories: SkillCategory[]
}
