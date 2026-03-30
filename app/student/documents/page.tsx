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
import type { AdministrativeDocument, AcademicDocumentType } from '@/models/academic-document.model'

// Mock current student ID - in real app would come from auth
const CURRENT_STUDENT_ID = 'STU001'

export default function StudentDocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<AdministrativeDocument | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<AcademicDocumentType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['student-documents', CURRENT_STUDENT_ID],
    queryFn: () => AcademicDocumentsService.getDocumentsForStudent(CURRENT_STUDENT_ID),
  })

  const { data: phaseLockStatus } = useQuery({
    queryKey: ['phase-lock-status', CURRENT_STUDENT_ID],
    queryFn: () => AcademicRequestsService.getPhaseLockStatus(CURRENT_STUDENT_ID),
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
                onPreview={handlePreview}
              />
            )}
          </Card>
        </div>
      </div>

      <PDFPreviewModal
        document={selectedDocument}
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      <RequestDocumentModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        studentId={CURRENT_STUDENT_ID}
      />
    </div>
  )
}
