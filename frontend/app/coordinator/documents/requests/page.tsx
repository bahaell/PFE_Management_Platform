'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { RequestTable } from '@/components/academic/request-table'
import { DocumentGenerationModal } from '@/components/academic/document-generation-modal'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AcademicRequestsService } from '@/services/service_academic_requests'
import { AcademicTemplatesService } from '@/services/service_academic_templates'
import type { AcademicDocumentRequest } from '@/models/academic-document-request.model'

export default function CoordinatorRequestsPage() {
  const [generationOpen, setGenerationOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<AcademicDocumentRequest | null>(null)

  const { data: requests = [] } = useQuery({
    queryKey: ['academic-requests'],
    queryFn: () => AcademicRequestsService.getAllRequests(),
  })

  const { data: templates = [] } = useQuery({
    queryKey: ['academic-templates'],
    queryFn: () => AcademicTemplatesService.getAllTemplates(),
  })

  const acceptMutation = useMutation({
    mutationFn: (id: string) => AcademicRequestsService.acceptRequest(id, 'COORD001'),
  })

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      AcademicRequestsService.rejectRequest(id, 'COORD001', reason),
  })

  const deliverMutation = useMutation({
    mutationFn: (id: string) => AcademicRequestsService.markAsDelivered(id),
  })

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Demandes de Documents" 
        description="Gérez les demandes de documents soumises par les étudiants"
      />

      <RequestTable
        requests={requests}
        onAccept={(id) => acceptMutation.mutate(id)}
        onReject={(id) => rejectMutation.mutate({ id, reason: 'Rejeté' })}
        onGenerate={(id) => {
          const req = requests.find(r => r.id === id)
          if (req) {
            setSelectedRequest(req)
            setGenerationOpen(true)
          }
        }}
        onDeliver={(id) => deliverMutation.mutate(id)}
        onPreview={() => {}}
      />

      <DocumentGenerationModal
        open={generationOpen}
        request={selectedRequest}
        templates={templates}
        onClose={() => { setGenerationOpen(false); setSelectedRequest(null); }}
        onGenerate={(requestId, templateId, filledData) => {
          console.log('Generating:', { requestId, templateId, filledData })
          setGenerationOpen(false)
        }}
      />
    </div>
  )
}
