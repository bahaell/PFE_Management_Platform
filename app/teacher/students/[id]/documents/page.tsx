import React from 'react'
import DocumentTable from '../../../../components/academic/DocumentTable'

interface Props { params: { id: string } }

export default function TeacherStudentDocumentsPage({ params }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Documents</h1>
      {/* @ts-expect-error server -> client */}
      <DocumentTable studentId={params.id} />
    </div>
  )
}
