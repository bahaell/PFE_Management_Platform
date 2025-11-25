"use client"
import React, { useEffect, useState } from 'react'
import { getDocuments } from '../../services/service_academic_documents'
import type { AdministrativeDocument } from '../../models/administrative_document.model'

export default function DocumentTable({ studentId }: { studentId: string }) {
  const [documents, setDocuments] = useState<AdministrativeDocument[]>([])

  useEffect(() => { load() }, [studentId])

  async function load() {
    const docs = await getDocuments({ studentId })
    setDocuments(docs)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-medium mb-2">Documents for {studentId}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500"><th>Type</th><th>Generated</th><th>Template</th><th></th></tr>
        </thead>
        <tbody>
          {documents.map((d) => (
            <tr key={d.id} className="border-t">
              <td className="py-2">{d.type}</td>
              <td>{new Date(d.generatedAt).toLocaleString()}</td>
              <td>{d.templateId}</td>
              <td><a href={d.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600">Open</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
