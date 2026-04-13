import type { ExternalCompany } from "./company.model"

export interface FreeSubjectRequest {
  id: string
  studentId: string
  studentName: string
  teacherId?: string
  teacherName?: string
  status: "pending" | "accepted" | "rejected" | "validated"
  subjectTitle: string
  subjectDescription: string
  motivation: string
  company: ExternalCompany
  companyPhone: string
  companyEmail: string
  companySupervisorName: string
  companySupervisorEmail: string
  documents?: string[]
  createdAt: string
  updatedAt: string
}
