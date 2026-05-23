export interface TeacherRecommendation {
  teacherId: string
  teacherName: string
  score: number
  skillsMatched: string[]
  load: number
  maxCapacity: number
  reasoning: string[]
}

export interface ProjectRecommendation {
  projectId: string
  title: string
  description: string
  subject: string
  requiredSkills: string[]
  matchedSkills: string[]
  matchScore: number
}
