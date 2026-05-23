import type { ExternalCompany } from "@/models/company.model"

let mockCompanies: ExternalCompany[] = [
  {
    id: "c1",
    name: "TechVision Solutions",
    description: "Leading software development company specializing in AI and cloud solutions",
    email: "hr@techvision.com",
    phone: "+213 21 123 4567",
    country: "Algeria",
    city: "Algiers",
    status: "approved",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "c2",
    name: "DataDrive Analytics",
    description: "Big data and business intelligence solutions provider",
    email: "contact@datadrive.dz",
    phone: "+213 21 234 5678",
    country: "Algeria",
    city: "Oran",
    status: "approved",
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
  },
  {
    id: "c3",
    name: "CloudNine Infrastructure",
    description: "Cloud infrastructure and DevOps services",
    email: "sales@cloudnine.com",
    phone: "+213 21 345 6789",
    country: "Algeria",
    city: "Constantine",
    status: "pending",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
  },
  {
    id: "c4",
    name: "SecureNet Systems",
    description: "Cybersecurity and network solutions",
    email: "info@securenet.dz",
    phone: "+213 21 456 7890",
    country: "Algeria",
    city: "Algiers",
    status: "blacklisted",
    blacklistReason: "Compliance violations",
    createdAt: "2024-01-10",
    updatedAt: "2024-02-05",
  },
]

export async function getCompanies() {
  return mockCompanies
}

export async function getCompanyById(id: string) {
  return mockCompanies.find((c) => c.id === id)
}

export async function createCompany(company: ExternalCompany) {
  mockCompanies.push(company)
  return company
}

export async function updateCompany(id: string, company: ExternalCompany) {
  const existingCompany = mockCompanies.find((c) => c.id === id)
  if (existingCompany) {
    existingCompany.name = company.name
    existingCompany.description = company.description
    existingCompany.email = company.email
    existingCompany.phone = company.phone
    existingCompany.country = company.country
    existingCompany.city = company.city
    existingCompany.status = company.status
    existingCompany.updatedAt = new Date().toISOString()
  }
  return existingCompany
}

export async function deleteCompany(id: string) {
  const company = mockCompanies.find((c) => c.id === id)
  if (company) {
    mockCompanies = mockCompanies.filter((c) => c.id !== id)
  }
  return company
}

export async function approveCompany(id: string) {
  const company = mockCompanies.find((c) => c.id === id)
  if (company) {
    company.status = "approved"
    company.updatedAt = new Date().toISOString()
  }
  return company
}

export async function blacklistCompany(id: string, reason: string) {
  const company = mockCompanies.find((c) => c.id === id)
  if (company) {
    company.status = "blacklisted"
    company.blacklistReason = reason
    company.updatedAt = new Date().toISOString()
  }
  return company
}
