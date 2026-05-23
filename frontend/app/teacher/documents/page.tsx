'use client'

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { DocumentFilters } from '@/components/academic-documents/document-filters'
import { DocumentTable } from '@/components/academic-documents/document-table'
import { DocumentPreviewModal } from '@/components/academic-documents/document-preview-modal'
import { StudentDocumentList } from '@/components/academic/student-document-list'
import { PDFPreviewModal } from '@/components/academic/pdf-preview-modal'
import { AcademicDocumentsService } from '@/services/service_academic_documents'
import type { AdministrativeDocument, AcademicDocumentType } from '@/models/academic-document.model'

// Mock current teacher ID - in real app would come from auth
const CURRENT_TEACHER_ID = 'TEACH001'

export default function TeacherDocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<AdministrativeDocument | null>(null)

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['teacher-supervised-documents', CURRENT_TEACHER_ID],
    queryFn: () => AcademicDocumentsService.getDocumentsForTeacher(CURRENT_TEACHER_ID),
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Students' Documents"
        description="View documents for your supervised students"
      />

      <Card className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <StudentDocumentList
            documents={documents}
            onPreview={setSelectedDocument}
            readOnly={true}
          />
        )}
      </Card>

      <PDFPreviewModal
        document={selectedDocument}
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  )
}
