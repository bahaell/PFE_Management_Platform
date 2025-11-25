"use client"
import React, { useEffect, useState } from 'react'
import { getTemplates, deleteTemplate } from '../../services/service_templates'
import type { AcademicTemplate } from '../../models/academic-template.model'
import Link from 'next/link'
import { Trash } from 'lucide-react'

export default function TemplateTable() {
  const [templates, setTemplates] = useState<AcademicTemplate[]>([])

  useEffect(() => {
    getTemplates().then(setTemplates)
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete this template?')) return
    await deleteTemplate(id)
    setTemplates((t) => t.filter((x) => x.id !== id))
  }

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-medium">Templates</div>
        <Link href="/coordinator/templates/new" className="rounded bg-blue-600 text-white px-3 py-1">New template</Link>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500">
            <th>Name</th>
            <th>Type</th>
            <th>Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {templates.map((t) => (
            <tr key={t.id} className="border-t">
              <td className="py-2">{t.name}</td>
              <td>{t.type}</td>
              <td>{new Date(t.updatedAt).toLocaleString()}</td>
              <td>
                <div className="flex gap-2">
                  <Link href={`/coordinator/templates/${t.id}`} className="text-blue-600">Edit</Link>
                  <button title="Delete" onClick={() => handleDelete(t.id)} className="text-red-600 flex items-center"><Trash size={14} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
