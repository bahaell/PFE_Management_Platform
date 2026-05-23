"use client"
import React, { useEffect, useState } from 'react'
import { createTemplate, getTemplate, updateTemplate } from '../../services/service_templates'
import type { AcademicTemplate } from '../../models/academic-template.model'
import { useRouter } from 'next/navigation'

interface Props {
  id?: string
}

export default function TemplateEditor({ id }: Props) {
  const router = useRouter()
  const [template, setTemplate] = useState<Partial<AcademicTemplate>>({})

  useEffect(() => {
    if (!id) return
    getTemplate(id).then((t) => setTemplate(t ?? {}))
  }, [id])

  async function handleSave() {
    if (id) {
      await updateTemplate(id, template as AcademicTemplate)
    } else {
      await createTemplate(template as AcademicTemplate)
    }
    router.push('/coordinator/templates')
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="mb-2">
        <label className="block text-sm font-medium">Name</label>
        <input value={template.name ?? ''} onChange={(e) => setTemplate({ ...template, name: e.target.value })} className="w-full border px-2 py-1 rounded" />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Type</label>
        <input value={(template.type as any) ?? ''} onChange={(e) => setTemplate({ ...template, type: e.target.value as any })} className="w-full border px-2 py-1 rounded" />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Content (use placeholders like {'{{student.name}}'})</label>
        <textarea value={(template as any).content ?? ''} onChange={(e) => setTemplate({ ...(template as any), content: e.target.value })} className="w-full border px-2 py-1 rounded h-40" />
      </div>
      <div className="flex gap-2">
        <button onClick={handleSave} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
        <button onClick={() => router.back()} className="px-3 py-1 border rounded">Cancel</button>
      </div>
    </div>
  )
}
