import type { ExternalCompany } from "@/models/company.model"
import { apiClient } from "@/lib/api-client"

type BackendCompanyStatus = "PENDING" | "APPROVED" | "BLACKLISTED" | "REJECTED"

interface BackendCompany {
  id: string
  name: string
  description?: string
  email: string
  phone: string
  country?: string
  city?: string
  status: BackendCompanyStatus
  blacklistReason?: string
  createdAt?: string
  updatedAt?: string
}

function mapCompany(company: BackendCompany): ExternalCompany {
  return {
    id: company.id,
    name: company.name,
    description: company.description ?? "",
    email: company.email,
    phone: company.phone,
    country: company.country ?? "",
    city: company.city ?? "",
    status: company.status.toLowerCase() as ExternalCompany["status"],
    blacklistReason: company.blacklistReason,
    createdAt: company.createdAt ?? "",
    updatedAt: company.updatedAt ?? company.createdAt ?? "",
  }
}

function toBackendCompany(company: ExternalCompany): Partial<BackendCompany> {
  return {
    name: company.name,
    description: company.description,
    email: company.email,
    phone: company.phone,
    country: company.country,
    city: company.city,
    status: company.status.toUpperCase() as BackendCompanyStatus,
    blacklistReason: company.blacklistReason,
  }
}

export async function getCompanies() {
  const companies = await apiClient.get<BackendCompany[]>("/api/companies")
  return companies.map(mapCompany)
}

export async function getCompanyById(id: string) {
  return mapCompany(await apiClient.get<BackendCompany>(`/api/companies/${id}`))
}

export async function createCompany(company: ExternalCompany) {
  return mapCompany(await apiClient.post<BackendCompany>("/api/companies", toBackendCompany(company)))
}

export async function updateCompany(id: string, company: ExternalCompany) {
  return mapCompany(await apiClient.put<BackendCompany>(`/api/companies/${id}`, toBackendCompany(company)))
}

export async function deleteCompany(id: string) {
  await apiClient.delete<void>(`/api/companies/${id}`)
  return true
}

export async function approveCompany(id: string) {
  return mapCompany(await apiClient.put<BackendCompany>(`/api/companies/${id}/approve`, {}))
}

export async function blacklistCompany(id: string, reason: string) {
  return mapCompany(await apiClient.put<BackendCompany>(`/api/companies/${id}/blacklist`, { reason }))
}

export async function rejectCompany(id: string, reason?: string) {
  const company = await getCompanyById(id)
  return updateCompany(id, {
    ...company,
    status: "rejected",
    blacklistReason: reason ?? company.blacklistReason,
  })
}
