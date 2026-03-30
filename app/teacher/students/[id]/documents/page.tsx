'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { StudentDocumentList } from '@/components/academic/student-document-list'
import { PDFPreviewModal } from '@/components/academic/pdf-preview-modal'
import { AcademicDocumentsService } from '@/services/service_academic_documents'
import { StudentsService } from '@/services/service_students'
import type { AdministrativeDocument } from '@/models/academic-document.model'

export default function TeacherStudentDocumentsPage() {
  const router = useRouter()
  const params = useParams()
  const studentId = params?.id as string

  const [selectedDocument, setSelectedDocument] = useState<AdministrativeDocument | null>(null)

  const { data: student } = useQuery({
    queryKey: ['student', studentId],
    queryFn: async () => {
      const students = await StudentsService.getAllStudents()
      return students.find(s => s.id === studentId)
    },
    enabled: !!studentId,
  })

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['student-documents', studentId],
    queryFn: () => AcademicDocumentsService.getDocumentsForStudent(studentId),
    enabled: !!studentId,
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Documents - ${student?.name || 'Student'}`}
        description={`Official documents for student ${student?.name}`}
        action={
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        }
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
