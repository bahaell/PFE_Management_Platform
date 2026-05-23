"use client"
import React, { useState } from 'react'
import { createRequest } from '../../services/service_document_requests'

export default function DocumentRequestForm() {
  const [type, setType] = useState('convention')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In a real app we'd use current logged-in student id
    await createRequest({ studentId: 'student-1', type })
    alert('Request submitted')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <label className="block text-sm font-medium mb-2">Document Type</label>
      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border p-2 rounded mb-4">
        <option value="convention">Convention de stage</option>
        <option value="demande_pfe">Demande PFE</option>
        <option value="encadrement">Fiche d'encadrement</option>
        <option value="attestation">Attestation</option>
      </select>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Request</button>
      </div>
    </form>
  )
}
