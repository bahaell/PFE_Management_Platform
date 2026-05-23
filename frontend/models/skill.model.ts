export interface Skill {
  id: string
  name: string
  category: string
  relevance: number
}

export interface SuggestedSkills {
  frontend: string[]
  backend: string[]
  devops: string[]
  ml: string[]
  general: string[]
}

export interface SkillCategory {
  id: string
  name: string
  color: string
}
