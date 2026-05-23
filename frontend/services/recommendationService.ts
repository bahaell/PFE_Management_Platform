import type { ProjectRecommendation, TeacherRecommendation } from "@/models/recommendation.model"
import { apiClient } from "@/lib/api-client"

const mockTeachers = [
  {
    id: "t1",
    name: "Dr. Ahmed Hassan",
    specializations: ["Web Development", "Cloud Computing", "AI"],
    currentLoad: 2,
    maxCapacity: 5,
  },
  {
    id: "t2",
    name: "Prof. Fatima Benali",
    specializations: ["Machine Learning", "Data Science", "Big Data"],
    currentLoad: 3,
    maxCapacity: 5,
  },
  {
    id: "t3",
    name: "Dr. Mohamed Karim",
    specializations: ["Mobile Development", "Cloud Computing", "Security"],
    currentLoad: 1,
    maxCapacity: 5,
  },
  {
    id: "t4",
    name: "Prof. Leila Sahraoui",
    specializations: ["Database Design", "Web Development", "Systems"],
    currentLoad: 4,
    maxCapacity: 5,
  },
  {
    id: "t5",
    name: "Dr. Hassan El-Mansouri",
    specializations: ["AI", "Machine Learning", "Neural Networks"],
    currentLoad: 2,
    maxCapacity: 5,
  },
]

export async function generateTeacherRecommendations(
  subjectDescription: string,
  companyDescription: string,
): Promise<TeacherRecommendation[]> {
  // Simulate AI recommendation logic
  const keywords = `${subjectDescription} ${companyDescription}`.toLowerCase()

  const recommendations = mockTeachers
    .map((teacher) => {
      let score = 0
      const matchedSkills: string[] = []

      teacher.specializations.forEach((spec) => {
        if (keywords.includes(spec.toLowerCase())) {
          score += 25
          matchedSkills.push(spec)
        }
      })

      // Load balance factor
      const loadFactor = (teacher.currentLoad / teacher.maxCapacity) * 30
      score = Math.max(0, score - loadFactor)

      // Random boost for variety
      score += Math.random() * 10

      const reasoning = [
        `${matchedSkills.length} skill matches: ${matchedSkills.join(", ")}`,
        `Current workload: ${teacher.currentLoad}/${teacher.maxCapacity} students`,
        `Experience score: ${Math.round(score)}/100`,
      ]

      return {
        teacherId: teacher.id,
        teacherName: teacher.name,
        score: Math.round(score),
        skillsMatched: matchedSkills,
        load: teacher.currentLoad,
        maxCapacity: teacher.maxCapacity,
        reasoning,
      }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return recommendations
}

export async function getAllTeachers() {
  return mockTeachers
}

export async function generateProjectRecommendations(studentSkills: string[]): Promise<ProjectRecommendation[]> {
  try {
    return await apiClient.post<ProjectRecommendation[]>("/api/projects/matching", { studentSkills })
  } catch {
    return []
  }
}
