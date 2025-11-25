"use client"
import React from 'react'
import { generateDocumentFromTemplate } from '../../services/service_templates'

interface Props {
  templateId: string
  context?: Record<string, any>
}

export default function TemplatePreview({ templateId, context = {} }: Props) {
  const [url, setUrl] = React.useState<string | null>(null)

  async function handleGenerate() {
    const res = await generateDocumentFromTemplate(templateId, context)
    if (res) setUrl(res.fileUrl)
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button onClick={handleGenerate} className="px-3 py-1 bg-green-600 text-white rounded">Generate sample</button>
        {url && <a className="underline" href={url} target="_blank" rel="noreferrer">Open generated</a>}
      </div>
      {url && (
        <iframe src={url} className="w-full h-96 border" />
      )}
    </div>
  )
}
