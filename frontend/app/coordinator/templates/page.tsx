import React from 'react'
import TemplateTable from '../../../components/academic/TemplateTable'

export const metadata = {
  title: 'Templates — Coordinator',
}

export default function TemplatesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrative Templates</h1>
      <TemplateTable />
    </div>
  )
}
