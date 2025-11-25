// lightweight id generator
function makeId(prefix = '') { return prefix + Math.random().toString(36).slice(2,9) }
import type { DocumentRequest } from '../models/document-request.model'

const requests: DocumentRequest[] = [
  {
    id: 'req-1',
    studentId: 'student-1',
    type: 'convention',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
]

export async function getRequests(filter?: Partial<DocumentRequest>): Promise<DocumentRequest[]> {
  if (!filter) return [...requests]
  // simple filter implementation
  return requests.filter((r) => {
    for (const k of Object.keys(filter)) {
      // @ts-ignore
      if ((r as any)[k] !== (filter as any)[k]) return false
    }
    return true
  })
}

export async function createRequest(input: Partial<DocumentRequest>): Promise<DocumentRequest> {
  const r: DocumentRequest = {
  id: input.id ?? makeId('req-'),
    studentId: input.studentId ?? 'unknown',
    type: input.type ?? 'autre',
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  requests.unshift(r)
  return r
}

export async function approveRequest(id: string, approverId: string): Promise<DocumentRequest | null> {
  const idx = requests.findIndex((r) => r.id === id)
  if (idx === -1) return null
  requests[idx].status = 'approved'
  requests[idx].processedAt = new Date().toISOString()
  requests[idx].processedBy = approverId
  return requests[idx]
}

export async function rejectRequest(id: string, approverId: string, reason?: string): Promise<DocumentRequest | null> {
  const idx = requests.findIndex((r) => r.id === id)
  if (idx === -1) return null
  requests[idx].status = 'rejected'
  requests[idx].processedAt = new Date().toISOString()
  requests[idx].processedBy = approverId
  requests[idx].reason = reason
  return requests[idx]
}

export default {
  getRequests,
  createRequest,
  approveRequest,
  rejectRequest,
}
