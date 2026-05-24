import type { ProjectRecommendation, TeacherRecommendation } from "@/models/recommendation.model"
import { apiClient } from "@/lib/api-client"

interface BackendTeacher {
  id: string
  name?: string
  fullName?: string
  email?: string
  department?: string
  grade?: string
  speciality?: string
  specialty?: string
}

interface BackendJuryRecommendation {
  teacherId: string
  teacherName?: string
  email?: string
  department?: string
  grade?: string
  speciality?: string
  score: number
  skillsMatched?: string[]
  load?: number
  maxCapacity?: number
  currentJuryCount?: number
  isAvailableOnDate?: boolean
  reasoning?: string[]
  availabilityScore?: number
  workloadScore?: number
  skillMatchScore?: number
  seniorityScore?: number
  subScores?: TeacherRecommendation["subScores"]
}

interface BackendSupervisorRecommendation {
  teacherId: string
  score: number
  reasoning?: string
}

function normalizeTeacherRecommendation(
  rec: BackendJuryRecommendation,
  teacher?: BackendTeacher
): TeacherRecommendation {
  const speciality = rec.speciality ?? teacher?.speciality ?? teacher?.specialty ?? ""
  const currentLoad = rec.load ?? rec.currentJuryCount ?? 0

  return {
    teacherId: String(rec.teacherId),
    teacherName: rec.teacherName ?? teacher?.name ?? teacher?.fullName ?? `Teacher ${rec.teacherId}`,
    email: rec.email ?? teacher?.email,
    department: rec.department ?? teacher?.department,
    grade: rec.grade ?? teacher?.grade,
    speciality,
    score: Math.round(rec.score),
    skillsMatched: rec.skillsMatched ?? (speciality ? [speciality] : []),
    load: currentLoad,
    maxCapacity: rec.maxCapacity ?? 10,
    currentJuryCount: rec.currentJuryCount ?? currentLoad,
    isAvailableOnDate: rec.isAvailableOnDate ?? true,
    reasoning: rec.reasoning?.length ? rec.reasoning : ["Recommended by the backend scoring engine."],
    subScores: rec.subScores ?? {
      availabilityScore: rec.availabilityScore ?? 0,
      workloadScore: rec.workloadScore ?? 0,
      skillMatchScore: rec.skillMatchScore ?? 0,
      seniorityScore: rec.seniorityScore ?? 0,
    },
  }
}

function keywordsFromText(...texts: string[]): string[] {
  const stopWords = new Set(["the", "and", "for", "with", "dans", "pour", "avec", "une", "des", "les", "sur"])
  return Array.from(new Set(
    texts
      .join(" ")
      .split(/[^a-zA-Z0-9+#.-]+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 2 && !stopWords.has(word.toLowerCase()))
      .slice(0, 12)
  ))
}

export async function getAllTeachers(): Promise<BackendTeacher[]> {
  try {
    return await apiClient.get<BackendTeacher[]>("/api/users/teachers")
  } catch (error) {
    console.error("Failed to fetch teachers", error)
    return []
  }
}

export async function generateJuryRecommendations(
  projectId: string,
  date: string
): Promise<TeacherRecommendation[]> {
  try {
    const params = new URLSearchParams({ projectId, date })
    const recommendations = await apiClient.get<BackendJuryRecommendation[]>(`/api/schedule/recommend/jury?${params}`)
    return recommendations.map((rec) => normalizeTeacherRecommendation(rec))
  } catch (error) {
    console.error("Failed to fetch jury recommendations", error)
    return []
  }
}

export async function generateSupervisorRecommendations(params: {
  studentId?: string
  subjectId?: string
  academicYear?: string
  subjectDescription: string
  companyDescription?: string
  keywords?: string[]
  studentSkills?: string[]
}): Promise<TeacherRecommendation[]> {
  try {
    const teachers = await getAllTeachers()
    const teacherById = new Map(teachers.map((teacher) => [String(teacher.id), teacher]))
    const subjectKeywords = params.keywords?.length
      ? params.keywords
      : keywordsFromText(params.subjectDescription, params.companyDescription ?? "")

    const backendRecommendations = await apiClient.post<BackendSupervisorRecommendation[]>(
      "/api/recommendations/supervisors",
      {
        studentId: params.studentId ?? "current-student",
        subjectId: params.subjectId ?? "external-subject",
        academicYear: params.academicYear ?? `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
        studentSkills: params.studentSkills ?? subjectKeywords,
        subjectKeywords,
      }
    )

    return backendRecommendations.map((rec) => {
      const teacher = teacherById.get(String(rec.teacherId))
      return normalizeTeacherRecommendation({
        teacherId: String(rec.teacherId),
        teacherName: teacher?.name ?? teacher?.fullName,
        email: teacher?.email,
        department: teacher?.department,
        grade: teacher?.grade,
        speciality: teacher?.speciality ?? teacher?.specialty,
        score: rec.score,
        skillsMatched: subjectKeywords,
        load: 0,
        maxCapacity: 5,
        currentJuryCount: 0,
        isAvailableOnDate: true,
        reasoning: rec.reasoning ? [rec.reasoning] : ["Recommended for this external subject."],
      }, teacher)
    })
  } catch (error) {
    console.error("Failed to fetch supervisor recommendations", error)
    return []
  }
}

export async function generateTeacherRecommendations(
  projectId: string,
  date: string
): Promise<TeacherRecommendation[]> {
  return generateJuryRecommendations(projectId, date)
}

export async function generateProjectRecommendations(studentSkills: string[]): Promise<ProjectRecommendation[]> {
  try {
    return await apiClient.post<ProjectRecommendation[]>("/api/projects/matching", { studentSkills })
  } catch {
    return []
  }
}
