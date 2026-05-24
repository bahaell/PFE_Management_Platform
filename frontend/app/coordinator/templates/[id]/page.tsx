import React from 'react'
import TemplateEditor from '../../../../components/academic/TemplateEditor'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditTemplatePage({ params }: Props) {
  const { id } = await params

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Template</h1>
      {/* TemplateEditor expects prop id when editing */}
      <TemplateEditor id={id} />
    </div>
  )
}
