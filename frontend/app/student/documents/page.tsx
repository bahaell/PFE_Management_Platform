'use client'

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { DocumentFilters } from '@/components/academic-documents/document-filters'
import { StudentDocumentList } from '@/components/academic/student-document-list'
import { PhaseLockBanner } from '@/components/academic/phase-lock-banner'
import { RequestDocumentModal } from '@/components/academic/request-document-modal'
import { PDFPreviewModal } from '@/components/academic/pdf-preview-modal'
import { AcademicDocumentsService } from '@/services/service_academic_documents'
import { AcademicRequestsService } from '@/services/service_academic_requests'
import { UserDocumentsService } from '@/services/service_user_documents'
import type { AdministrativeDocument, AcademicDocumentType } from '@/models/academic-document.model'
import { useAuth } from '@/providers/auth-provider'

export default function StudentDocumentsPage() {
  const { user } = useAuth()
  const currentStudentId = user?.id || ''
  const [selectedDocument, setSelectedDocument] = useState<AdministrativeDocument | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<AcademicDocumentType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['student-documents', currentStudentId],
    queryFn: () => AcademicDocumentsService.getDocumentsForStudent(currentStudentId),
    enabled: !!currentStudentId,
  })

  const { data: phaseLockStatus } = useQuery({
    queryKey: ['phase-lock-status', currentStudentId],
    queryFn: () => AcademicRequestsService.getPhaseLockStatus(currentStudentId),
    enabled: !!currentStudentId,
  })

  const { data: coordinatorDocuments = [], isLoading: coordinatorDocsLoading } = useQuery({
    queryKey: ['student-coordinator-documents'],
    queryFn: () => UserDocumentsService.getMyStudentDocuments(),
  })

  const filteredDocuments = useMemo(() => {
    let filtered = documents

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        doc =>
          doc.type.toLowerCase().includes(query) ||
          doc.projectTitle?.toLowerCase().includes(query)
      )
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(doc => selectedTypes.includes(doc.type))
    }

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(doc => selectedStatuses.includes(doc.status))
    }

    return filtered
  }, [documents, searchQuery, selectedTypes, selectedStatuses])

  const handlePreview = (doc: AdministrativeDocument) => {
    setSelectedDocument(doc)
  }

  const handleRequestDocument = () => {
    setIsRequestModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Documents"
        description="Download your official academic documents"
      />

      {phaseLockStatus && phaseLockStatus.isLocked && (
        <PhaseLockBanner message={phaseLockStatus.message} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <Card className="lg:col-span-1 p-6 h-fit">
          <h3 className="font-semibold text-foreground mb-4">Filters</h3>
          <DocumentFilters
            onSearchChange={setSearchQuery}
            onTypeFilterChange={setSelectedTypes}
            onStatusFilterChange={setSelectedStatuses}
          />
        </Card>

        {/* Documents Table */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <StudentDocumentList
                documents={filteredDocuments}
                onRequest={handleRequestDocument}
                onPreview={handlePreview}
              />
            )}
          </Card>
        </div>
      </div>

      <PDFPreviewModal
        document={selectedDocument}
        open={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      <Card className="p-6">
        <h3 className="font-semibold text-foreground mb-4">Coordinator PDF Documents</h3>
        {coordinatorDocsLoading ? (
          <div className="text-sm text-muted-foreground">Loading coordinator documents...</div>
        ) : coordinatorDocuments.length === 0 ? (
          <div className="text-sm text-muted-foreground">No coordinator documents available yet.</div>
        ) : (
          <div className="space-y-3">
            {coordinatorDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium truncate">{doc.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{doc.fileName}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                    <button className="px-3 py-1 border rounded text-sm">Consult</button>
                  </a>
                  <a href={doc.fileUrl} download={doc.fileName}>
                    <button className="px-3 py-1 border rounded text-sm">Download</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <RequestDocumentModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        studentId={currentStudentId}
      />
    </div>
  )
}
