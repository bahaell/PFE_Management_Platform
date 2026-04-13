export interface TeacherRecommendation {
  teacherId: string
  teacherName: string
  score: number
  skillsMatched: string[]
  load: number
  maxCapacity: number
  reasoning: string[]
}
