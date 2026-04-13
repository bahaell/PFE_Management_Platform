"use client"
import React from 'react'

export default function RequestStatusBadge({ status }: { status: 'pending' | 'approved' | 'rejected' }) {
  const cls = status === 'approved' ? 'bg-green-100 text-green-800' : status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
  return <span className={`px-2 py-1 rounded text-xs ${cls}`}>{status}</span>
}
