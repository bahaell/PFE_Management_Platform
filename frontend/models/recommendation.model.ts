export interface TeacherRecommendation {
  teacherId: string
  teacherName: string
  email?: string
  department?: string
  grade?: string
  speciality?: string
  score: number
  skillsMatched: string[]
  load: number
  maxCapacity: number
  currentJuryCount: number
  isAvailableOnDate: boolean
  reasoning: string[]
  subScores?: {
    availabilityScore: number
    workloadScore: number
    skillMatchScore: number
    seniorityScore: number
  }
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

