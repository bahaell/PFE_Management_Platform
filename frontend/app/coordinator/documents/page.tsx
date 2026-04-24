"use client"

import { useState, useMemo } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { TemplateTable } from "@/components/academic/template-table"
import { RequestTable } from "@/components/academic/request-table"
import { DocumentGenerationModal } from "@/components/academic/document-generation-modal"
import { PDFPreviewModal } from "@/components/academic/pdf-preview-modal"
import { AcademicTemplatesService } from "@/services/service_academic_templates"
import { AcademicRequestsService } from "@/services/service_academic_requests"
import { UserDocumentsService } from "@/services/service_user_documents"
import { StudentsService } from "@/services/service_students"
import { uploadPdfToCloudinary } from "@/lib/cloudinary"
import type { AdministrativeDocument } from "@/models/academic-document.model"

export default function CoordinatorDocumentsPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
  const [isPDFPreviewOpen, setIsPDFPreviewOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<AdministrativeDocument | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null)
  const [initialTemplateId, setInitialTemplateId] = useState<string>("")
  const [studentId, setStudentId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isUploadingPdf, setIsUploadingPdf] = useState(false)

  const { data: allRequests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["academic-requests"],
    queryFn: () => AcademicRequestsService.getAllRequests(),
  })

  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ["academic-templates"],
    queryFn: () => AcademicTemplatesService.getAllTemplates(),
  })

  const { data: students = [] } = useQuery({
    queryKey: ["students", "documents"],
    queryFn: () => StudentsService.getAllStudents(),
  })

  const { data: coordinatorDocs = [], isLoading: docsLoading } = useQuery({
    queryKey: ["coordinator-user-documents"],
    queryFn: () => UserDocumentsService.getCoordinatorDocuments(),
  })

  const pendingRequests = useMemo(() => allRequests.filter((req) => req.status === "pending"), [allRequests])

  const handlePDFPreview = (doc: AdministrativeDocument) => {
    setSelectedDocument(doc)
    setIsPDFPreviewOpen(true)
  }

  const handleGenerateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["academic-requests"] })
    setIsGeneratorOpen(false)
    toast({
      title: "Success",
      description: "Document generated successfully",
    })
  }

  const handleOpenGenerator = (request: any) => {
    setSelectedRequest(request)
    setInitialTemplateId("")
    setIsGeneratorOpen(true)
  }

  const handleGenerateFromTemplate = async (
    requestId: string,
    templateId: string,
    filledData: Record<string, any>
  ) => {
    const request = allRequests.find((r) => r.id === requestId)
    const template = templates.find((t) => t.id === templateId)
    if (!request || !template) return

    try {
      const content = [
        `Template: ${template.name}`,
        `Type: ${template.type}`,
        `Student: ${request.studentName}`,
        `Project: ${request.projectTitle || "N/A"}`,
        "",
        "Filled Data:",
        JSON.stringify(filledData, null, 2),
      ].join("\n")

      // Lightweight generated file from template data, then persisted in backend
      const generatedFile = new File([content], `${template.name}-${request.studentName}.pdf`, {
        type: "application/pdf",
      })
      const fileUrl = await uploadPdfToCloudinary(generatedFile)

      await UserDocumentsService.createCoordinatorDocument({
        studentId: request.studentId,
        title: `${template.name} - ${request.studentName}`,
        description: `Generated from template ${template.name}`,
        fileUrl,
        fileName: generatedFile.name,
        mimeType: "application/pdf",
      })

      await AcademicRequestsService.markAsGenerated(requestId, "generated")
      queryClient.invalidateQueries({ queryKey: ["academic-requests"] })
      queryClient.invalidateQueries({ queryKey: ["coordinator-user-documents"] })
      toast({ title: "Success", description: "Document generated and published to student." })
    } catch {
      toast({ title: "Generation failed", description: "Unable to generate document.", variant: "destructive" })
    }
  }

  const handleCloneTemplateToDocument = (templateId: string) => {
    if (!studentId) {
      toast({
        title: "Select student first",
        description: "Choose a student before cloning a template to a document.",
        variant: "destructive",
      })
      return
    }

    const selectedStudent = students.find((s: any) => s.id === studentId)
    const template = templates.find((t) => t.id === templateId)
    if (!selectedStudent || !template) {
      toast({
        title: "Invalid selection",
        description: "Unable to prepare template cloning.",
        variant: "destructive",
      })
      return
    }

    // Build a virtual request so the generation modal can fill and assign directly.
    setSelectedRequest({
      id: `manual-${Date.now()}`,
      documentType: template.type,
      studentId: selectedStudent.id,
      studentName: selectedStudent.name || selectedStudent.email || selectedStudent.id,
      status: "accepted",
      requestedAt: new Date().toISOString(),
      projectTitle: "",
    })
    setInitialTemplateId(template.id)
    setIsGeneratorOpen(true)
  }

  const handleUploadCoordinatorPdf = async () => {
    if (!studentId || !title || !pdfFile) {
      toast({
        title: "Missing data",
        description: "Please select student, title and PDF file.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploadingPdf(true)
      const fileUrl = await uploadPdfToCloudinary(pdfFile)
      await UserDocumentsService.createCoordinatorDocument({
        studentId,
        title,
        description,
        fileUrl,
        fileName: pdfFile.name,
        mimeType: "application/pdf",
      })
      setTitle("")
      setDescription("")
      setPdfFile(null)
      queryClient.invalidateQueries({ queryKey: ["coordinator-user-documents"] })
      toast({
        title: "Success",
        description: "PDF uploaded and assigned to student.",
      })
    } catch {
      toast({
        title: "Upload failed",
        description: "Unable to upload PDF document.",
        variant: "destructive",
      })
    } finally {
      setIsUploadingPdf(false)
    }
  }

  const handleDeleteCoordinatorDoc = async (id: number) => {
    try {
      await UserDocumentsService.deleteCoordinatorDocument(id)
      queryClient.invalidateQueries({ queryKey: ["coordinator-user-documents"] })
      toast({ title: "Deleted", description: "Document removed successfully." })
    } catch {
      toast({ title: "Delete failed", description: "Could not delete document.", variant: "destructive" })
    }
  }

  const handleAcceptRequest = async (id: string) => {
    await AcademicRequestsService.acceptRequest(id, "COORDINATOR")
    queryClient.invalidateQueries({ queryKey: ["academic-requests"] })
  }

  const handleRejectRequest = async (id: string) => {
    await AcademicRequestsService.rejectRequest(id, "COORDINATOR", "Rejected by coordinator")
    queryClient.invalidateQueries({ queryKey: ["academic-requests"] })
  }

  const handleDeliverRequest = async (id: string) => {
    await AcademicRequestsService.markAsDelivered(id)
    queryClient.invalidateQueries({ queryKey: ["academic-requests"] })
  }

  const uploadedDocs = coordinatorDocs.filter(doc => !doc.description?.startsWith('Document généré') && !doc.description?.startsWith('Generated from template'))
  const generatedDocs = coordinatorDocs.filter(doc => doc.description?.startsWith('Document généré') || doc.description?.startsWith('Generated from template'))

  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Management"
        description="Manage document requests, templates, and generation"
        action={
          <div className="flex gap-2">
            <Button onClick={() => router.push("/coordinator/documents/templates")} variant="outline">
              Manage Templates
            </Button>
            <Button onClick={() => setIsGeneratorOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Generate Document
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Generated Files</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {docsLoading ? (
              <p className="text-sm text-muted-foreground">Loading documents...</p>
            ) : generatedDocs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No generated documents yet.</p>
            ) : (
              generatedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{doc.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {doc.studentName}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => window.open(doc.fileUrl, "_blank")}>
                      Open
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteCoordinatorDoc(doc.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-foreground">Uploaded Files</h3>
          <div className="grid grid-cols-1 gap-3">
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full border border-border bg-background rounded-md px-3 py-2"
            >
              <option value="">Select student</option>
              {students.map((student: any) => (
                <option key={student.id} value={student.id}>
                  {student.name || student.email || student.id}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title"
              className="w-full border border-border bg-background rounded-md px-3 py-2"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full border border-border bg-background rounded-md px-3 py-2"
              rows={2}
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>
          <Button type="button" onClick={handleUploadCoordinatorPdf} disabled={isUploadingPdf} className="w-full">
            {isUploadingPdf ? "Uploading..." : "Upload PDF for Student"}
          </Button>

          <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto">
            {docsLoading ? (
              <p className="text-sm text-muted-foreground">Loading documents...</p>
            ) : uploadedDocs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No uploaded documents yet.</p>
            ) : (
              uploadedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div className="min-w-0">
                    <p className="font-medium truncate">{doc.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {doc.studentName}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => window.open(doc.fileUrl, "_blank")}>
                      Open
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteCoordinatorDoc(doc.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Requests ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="all">All Requests ({allRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card className="p-6">
            {requestsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : pendingRequests.length > 0 ? (
              <RequestTable
                requests={pendingRequests}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
                onGenerate={(id) => {
                  const req = allRequests.find((r) => r.id === id)
                  if (req) handleOpenGenerator(req)
                }}
                onDeliver={handleDeliverRequest}
                onPreview={(request) => handleOpenGenerator(request)}
              />
            ) : (
              <div className="text-center py-12 text-muted-foreground">No pending requests</div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card className="p-6">
            {requestsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : allRequests.length > 0 ? (
              <RequestTable
                requests={allRequests}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
                onGenerate={(id) => {
                  const req = allRequests.find((r) => r.id === id)
                  if (req) handleOpenGenerator(req)
                }}
                onDeliver={handleDeliverRequest}
                onPreview={(request) => handleOpenGenerator(request)}
              />
            ) : (
              <div className="text-center py-12 text-muted-foreground">No requests found</div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-semibold text-foreground mb-4">Recent Templates</h3>
          {templatesLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : templates.length > 0 ? (
            <TemplateTable
              templates={templates}
              onEdit={() => router.push("/coordinator/documents/templates")}
              onDelete={() => toast({ title: "Info", description: "Delete templates from templates page." })}
              onClone={() => toast({ title: "Info", description: "Clone templates from templates page." })}
              onUse={handleCloneTemplateToDocument}
              onPreview={() => toast({ title: "Info", description: "Preview templates from templates page." })}
            />
          ) : (
            <div className="text-center py-12 text-muted-foreground">No templates found</div>
          )}
        </Card>
      </div>

      <DocumentGenerationModal
        open={isGeneratorOpen}
        request={selectedRequest}
        templates={templates}
        onClose={() => setIsGeneratorOpen(false)}
        onGenerate={handleGenerateFromTemplate}
        initialTemplateId={initialTemplateId}
      />

      <PDFPreviewModal
        document={selectedDocument}
        open={isPDFPreviewOpen}
        onClose={() => setIsPDFPreviewOpen(false)}
      />
    </div>
  )
}
