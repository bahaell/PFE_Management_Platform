import React from 'react'
import DocumentRequestForm from '../../../../components/academic/DocumentRequestForm'
import DocumentRequestList from '../../../../components/academic/DocumentRequestList'

export default function StudentDocumentRequestPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Request a document</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <DocumentRequestForm />
        </div>
        <div>
          <DocumentRequestList />
        </div>
      </div>
    </div>
  )
}
