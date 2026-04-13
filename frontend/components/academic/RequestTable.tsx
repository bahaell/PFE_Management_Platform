"use client"
import React, { useEffect, useState } from 'react'
import { getRequests, approveRequest, rejectRequest } from '../../services/service_document_requests'
import { generateDocumentFromTemplate } from '../../services/service_templates'
import type { DocumentRequest } from '../../models/document-request.model'

export default function RequestTable() {
  const [requests, setRequests] = useState<DocumentRequest[]>([])

  useEffect(() => { refresh() }, [])

  async function refresh() {
    const rs = await getRequests()
    setRequests(rs)
  }

  async function handleApprove(r: DocumentRequest) {
    await approveRequest(r.id, 'coordinator-1')
    // Auto-generate using a simple context mock
    await generateDocumentFromTemplate(r.type === 'convention' ? 'tpl-convention-1' : 'tpl-convention-1', {
      student: { id: r.studentId, name: r.studentId },
      project: { id: r.studentId, title: 'Sample project' },
      requestedBy: 'student',
    })
    refresh()
  }

  async function handleReject(r: DocumentRequest) {
    const reason = prompt('Reason for rejection') ?? undefined
    await rejectRequest(r.id, 'coordinator-1', reason)
    refresh()
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500"><th>Student</th><th>Type</th><th>Created</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="py-2">{r.studentId}</td>
              <td>{r.type}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td>{r.status}</td>
              <td>
                {r.status === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(r)} className="text-green-600">Approve</button>
                    <button onClick={() => handleReject(r)} className="text-red-600">Reject</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
