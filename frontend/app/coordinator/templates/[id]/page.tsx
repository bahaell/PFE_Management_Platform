import React from 'react'
import TemplateEditor from '../../../../../components/academic/TemplateEditor'

interface Props {
  params: { id: string }
}

export default function EditTemplatePage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Template</h1>
      {/* TemplateEditor expects prop id when editing */}
      {/* @ts-expect-error server component passing to client */}
      <TemplateEditor id={params.id} />
    </div>
  )
}
