"use client"
import React, { useEffect, useState } from 'react'
import { getRequests } from '../../services/service_document_requests'
import type { DocumentRequest } from '../../models/document-request.model'
import RequestStatusBadge from './RequestStatusBadge'
import { getDocuments } from '../../services/service_academic_documents'

export default function DocumentRequestList() {
  const [requests, setRequests] = useState<DocumentRequest[]>([])

  useEffect(() => {
    refresh()
  }, [])

  async function refresh() {
    const rs = await getRequests({ studentId: 'student-1' })
    setRequests(rs)
  }

  async function handleDownload(request: DocumentRequest) {
    // find generated document for this student and type
    const docs = await getDocuments({ studentId: request.studentId })
    const doc = docs.find((d) => d.type === request.type)
    if (doc) {
      window.open(doc.fileUrl, '_blank')
    } else {
      alert('Document not yet generated')
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-medium mb-2">Your requests</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500"><th>Type</th><th>Created</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="py-2">{r.type}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td><RequestStatusBadge status={r.status} /></td>
              <td>
                <button onClick={() => handleDownload(r)} className="text-blue-600">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
