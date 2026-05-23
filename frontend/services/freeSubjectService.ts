import type { FreeSubjectRequest } from "@/models/freeSubject.model"
import { apiClient } from "@/lib/api-client"

const mockRequests: FreeSubjectRequest[] = [
  {
    id: "fs1",
    studentId: "s1",
    studentName: "Ahmed Benali",
    status: "pending",
    subjectTitle: "AI-Powered Web Application Development",
    subjectDescription: "Building a machine learning-based recommendation engine for e-commerce",
    motivation: "I am passionate about AI and want to gain practical experience",
    company: {
      id: "c1",
      name: "TechVision Solutions",
      description: "Leading software development company",
      email: "hr@techvision.com",
      phone: "+213 21 123 4567",
      country: "Algeria",
      city: "Algiers",
      status: "approved",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    companyPhone: "+213 21 123 4567",
    companyEmail: "hr@techvision.com",
    companySupervisorName: "Karim El-Mansouri",
    companySupervisorEmail: "karim@techvision.com",
    createdAt: "2024-02-10",
    updatedAt: "2024-02-10",
  },
  {
    id: "fs2",
    studentId: "s2",
    studentName: "Fatima Zara",
    teacherId: "t2",
    teacherName: "Prof. Fatima Benali",
    status: "accepted",
    subjectTitle: "Big Data Analytics Platform",
    subjectDescription: "Developing a real-time analytics dashboard for monitoring IoT data",
    motivation: "I want to work with big data technologies",
    company: {
      id: "c2",
      name: "DataDrive Analytics",
      description: "Big data and business intelligence solutions",
      email: "contact@datadrive.dz",
      phone: "+213 21 234 5678",
      country: "Algeria",
      city: "Oran",
      status: "approved",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-20",
    },
    companyPhone: "+213 21 234 5678",
    companyEmail: "contact@datadrive.dz",
    companySupervisorName: "Nadia Siddiqui",
    companySupervisorEmail: "nadia@datadrive.dz",
    createdAt: "2024-02-05",
    updatedAt: "2024-02-08",
  },
]

export async function getStudentRequests(studentId: string) {
  try {
    const items = await apiClient.get<any[]>(`/api/projects/external-subjects/student/${studentId}`)
    return items.map(mapApiToModel)
  } catch {
    return mockRequests.filter((r) => r.studentId === studentId)
  }
}

export async function getTeacherRequests(teacherId: string) {
  try {
    const items = await apiClient.get<any[]>(`/api/projects/external-subjects/teacher/${teacherId}`)
    return items.map(mapApiToModel)
  } catch {
    return mockRequests.filter((r) => !r.teacherId || r.teacherId === teacherId || r.status === "pending")
  }
}

export async function submitFreeSubjectRequest(data: Omit<FreeSubjectRequest, "id" | "createdAt" | "updatedAt">) {
  try {
    const payload = {
      studentName: data.studentName,
      teacherId: data.teacherId,
      teacherName: data.teacherName,
      status: data.status.toUpperCase(),
      subjectTitle: data.subjectTitle,
      subjectDescription: data.subjectDescription,
      motivation: data.motivation,
      companyId: data.company.id,
      companyName: data.company.name,
      companyDescription: data.company.description,
      companyPhone: data.companyPhone,
      companyEmail: data.companyEmail,
      companySupervisorName: data.companySupervisorName,
      companySupervisorEmail: data.companySupervisorEmail,
    }
    const created = await apiClient.post<any>("/api/projects/external-subjects", payload)
    return mapApiToModel(created)
  } catch {
    const newRequest: FreeSubjectRequest = {
      ...data,
      id: `fs${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockRequests.push(newRequest)
    return newRequest
  }
}

export async function updateRequestStatus(
  requestId: string,
  status: "pending" | "accepted" | "rejected" | "validated",
  teacherId?: string,
  teacherName?: string,
) {
  try {
    const updated = await apiClient.patch<any>(
      `/api/projects/external-subjects/${requestId}/status?status=${status.toUpperCase()}`,
      {},
      { headers: { "X-User-Id": teacherId ?? "", "X-User-Name": teacherName ?? "" } },
    )
    return mapApiToModel(updated)
  } catch {
    const request = mockRequests.find((r) => r.id === requestId)
    if (request) {
      request.status = status
      if (teacherId) request.teacherId = teacherId
      if (teacherName) request.teacherName = teacherName
      request.updatedAt = new Date().toISOString()
    }
    return request
  }
}

export async function getAllRequests() {
  try {
    const items = await apiClient.get<any[]>("/api/projects/external-subjects")
    return items.map(mapApiToModel)
  } catch {
    return mockRequests
  }
}

function mapApiToModel(item: any): FreeSubjectRequest {
  return {
    id: item.id,
    studentId: item.studentId,
    studentName: item.studentName,
    teacherId: item.teacherId,
    teacherName: item.teacherName,
    status: (item.status?.toLowerCase?.() ?? "pending") as FreeSubjectRequest["status"],
    subjectTitle: item.subjectTitle,
    subjectDescription: item.subjectDescription,
    motivation: item.motivation,
    company: {
      id: item.companyId,
      name: item.companyName,
      description: item.companyDescription ?? "",
      email: item.companyEmail,
      phone: item.companyPhone,
      country: "",
      city: "",
      status: "approved",
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    },
    companyPhone: item.companyPhone,
    companyEmail: item.companyEmail,
    companySupervisorName: item.companySupervisorName,
    companySupervisorEmail: item.companySupervisorEmail,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }
}
