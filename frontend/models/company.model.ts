export interface ExternalCompany {
  id: string
  name: string
  description: string
  email: string
  phone: string
  country: string
  city: string
  status: "pending" | "approved" | "blacklisted" | "rejected"
  blacklistReason?: string
  createdAt: string
  updatedAt: string
}
