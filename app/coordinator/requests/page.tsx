import React from 'react'
import RequestTable from '../../../components/academic/RequestTable'

export default function CoordinatorRequestsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Document Requests</h1>
      <RequestTable />
    </div>
  )
}
