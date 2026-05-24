import type { FreeSubjectRequest } from "@/models/freeSubject.model"
import { apiClient } from "@/lib/api-client"

interface BackendExternalSubject {
  id: string
  studentId: string
  studentName?: string
  teacherId?: string
  teacherName?: string
  preferredSupervisorId?: string
  status: string
  title?: string
  description?: string
  subjectTitle?: string
  subjectDescription?: string
  motivation?: string
  companyId?: string
  companyName: string
  companyDescription?: string
  companyPhone?: string
  companyEmail?: string
  companySupervisorName?: string
  companySupervisorEmail?: string
  technologies?: string[]
  academicYear?: string
  projectId?: string
  createdAt: string
  updatedAt?: string
}

export async function getStudentRequests(studentId: string) {
  const items = await apiClient.get<BackendExternalSubject[]>(`/api/free-subjects/student/${studentId}`)
  return items.map(mapApiToModel)
}

export async function getTeacherRequests(teacherId: string) {
  const items = await apiClient.get<BackendExternalSubject[]>(`/api/free-subjects/by-supervisor/${teacherId}`)
  return items.map(mapApiToModel)
}

function currentAcademicYear(): string {
  const year = new Date().getFullYear()
  return `${year}-${year + 1}`
}

function mapStatus(status?: string): FreeSubjectRequest["status"] {
  const normalized = status?.toLowerCase?.() ?? "pending"
  if (normalized === "under_review") return "under_review"
  if (normalized === "accepted") return "accepted"
  if (normalized === "rejected") return "rejected"
  if (normalized === "auto_rejected") return "auto_rejected"
  if (normalized === "validated") return "validated"
  return "pending"
}

export async function getAllRequests() {
  const items = await apiClient.get<BackendExternalSubject[]>("/api/free-subjects")
  return items.map(mapApiToModel)
}

export async function submitFreeSubjectRequest(data: Omit<FreeSubjectRequest, "id" | "createdAt" | "updatedAt">) {
  const payload = {
    studentId: data.studentId,
    title: data.subjectTitle,
    description: data.subjectDescription,
    companyName: data.company.name,
    technologies: [],
    preferredSupervisorId: data.teacherId,
    academicYear: currentAcademicYear(),
  }
  const created = await apiClient.post<BackendExternalSubject>("/api/free-subjects", payload)
  return mapApiToModel(created)
}

export async function updateRequestStatus(
  requestId: string,
  status: "pending" | "accepted" | "rejected" | "validated",
  teacherId?: string,
  teacherName?: string,
) {
  const endpoint = status === "accepted" ? "teacher-accept" : status === "validated" ? "accept" : "reject"
  const userRole = status === "validated" ? "COORDINATOR" : "TEACHER"
  const updated = await apiClient.put<BackendExternalSubject>(
    `/api/free-subjects/${requestId}/${endpoint}`,
    {},
    {
      headers: {
        "X-User-Role": userRole,
        ...(teacherId ? { "X-User-Id": teacherId } : {}),
        ...(teacherName ? { "X-User-Name": teacherName } : {}),
      },
    },
  )
  return mapApiToModel(updated)
}

function mapApiToModel(item: BackendExternalSubject): FreeSubjectRequest {
  const supervisorId = item.preferredSupervisorId ?? item.teacherId
  return {
    id: item.id,
    studentId: item.studentId,
    studentName: item.studentName ?? item.studentId,
    teacherId: supervisorId,
    teacherName: item.teacherName ?? supervisorId,
    status: mapStatus(item.status),
    subjectTitle: item.subjectTitle ?? item.title ?? "",
    subjectDescription: item.subjectDescription ?? item.description ?? "",
    motivation: item.motivation ?? "",
    company: {
      id: item.companyId ?? item.companyName,
      name: item.companyName,
      description: item.companyDescription ?? "",
      email: item.companyEmail ?? "",
      phone: item.companyPhone ?? "",
      country: "",
      city: "",
      status: "approved",
      createdAt: item.createdAt,
      updatedAt: item.updatedAt ?? item.createdAt,
    },
    companyPhone: item.companyPhone ?? "",
    companyEmail: item.companyEmail ?? "",
    companySupervisorName: item.companySupervisorName ?? "",
    companySupervisorEmail: item.companySupervisorEmail ?? "",
    createdAt: item.createdAt,
    updatedAt: item.updatedAt ?? item.createdAt,
  }
}
