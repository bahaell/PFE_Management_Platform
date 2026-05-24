'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Download, Eye, Search, Send } from 'lucide-react'
import { PhaseLockBanner } from '@/components/academic/phase-lock-banner'
import { RequestDocumentModal } from '@/components/academic/request-document-modal'
import { PDFPreviewModal } from '@/components/academic/pdf-preview-modal'
import { AcademicRequestsService } from '@/services/service_academic_requests'
import { UserDocumentsService } from '@/services/service_user_documents'
import type { AdministrativeDocument } from '@/models/academic-document.model'
import type { UserDocument } from '@/models/user-document.model'
import { useAuth } from '@/providers/auth-provider'

function toPreviewDocument(doc: UserDocument): AdministrativeDocument {
  return {
    id: String(doc.id),
    type: 'autre',
    studentId: doc.studentId,
    studentName: doc.studentName,
    teacherId: doc.teacherId,
    teacherName: doc.teacherName,
    generatedAt: doc.createdAt,
    fileUrl: doc.fileUrl,
    status: 'delivered',
  }
}

export default function StudentDocumentsPage() {
  const { user } = useAuth()
  const currentStudentId = user?.id || ''
  const [selectedDocument, setSelectedDocument] = useState<AdministrativeDocument | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  const { data: phaseLockStatus } = useQuery({
    queryKey: ['phase-lock-status', currentStudentId],
    queryFn: () => AcademicRequestsService.getPhaseLockStatus(currentStudentId),
    enabled: !!currentStudentId,
  })

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['student-coordinator-documents', currentStudentId],
    queryFn: () => UserDocumentsService.getMyStudentDocuments(),
    enabled: !!currentStudentId,
  })

  const filteredDocuments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return documents
    return documents.filter((doc) =>
      doc.title.toLowerCase().includes(query) ||
      doc.fileName.toLowerCase().includes(query) ||
      doc.description?.toLowerCase().includes(query) ||
      doc.teacherName?.toLowerCase().includes(query) ||
      doc.coordinatorName.toLowerCase().includes(query),
    )
  }, [documents, searchQuery])

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Academic Documents"
        description="Consult, download, and request your official academic documents"
        action={
          <Button onClick={() => setIsRequestModalOpen(true)}>
            <Send className="w-4 h-4 mr-2" />
            Request Document
          </Button>
        }
      />

      {phaseLockStatus && phaseLockStatus.isLocked && (
        <PhaseLockBanner message={phaseLockStatus.message} />
      )}

      <Card className="p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title, file, teacher, or coordinator..."
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No academic documents available yet.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium truncate">{doc.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{doc.fileName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    Coordinator: {doc.coordinatorName}
                    {doc.teacherName ? ` • Teacher: ${doc.teacherName}` : ''}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => setSelectedDocument(toPreviewDocument(doc))}>
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(doc.fileUrl, '_blank')}>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <PDFPreviewModal
        document={selectedDocument}
        open={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      <RequestDocumentModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        studentId={currentStudentId}
      />
    </div>
  )
}
