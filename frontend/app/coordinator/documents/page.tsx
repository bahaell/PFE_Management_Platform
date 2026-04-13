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
import type { AdministrativeDocument } from "@/models/academic-document.model"

export default function CoordinatorDocumentsPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
  const [isPDFPreviewOpen, setIsPDFPreviewOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<AdministrativeDocument | null>(null)

  const { data: allRequests = [], isLoading: requestsLoading } = useQuery({
    queryKey: ["academic-requests"],
    queryFn: () => AcademicRequestsService.getAllRequests(),
  })

  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ["academic-templates"],
    queryFn: () => AcademicTemplatesService.getAllTemplates(),
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
                onSelectRequest={(request) => {
                  setIsGeneratorOpen(true)
                }}
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
              <RequestTable requests={allRequests} />
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
            <TemplateTable templates={templates} readOnly={false} />
          ) : (
            <div className="text-center py-12 text-muted-foreground">No templates found</div>
          )}
        </Card>
      </div>

      <DocumentGenerationModal
        open={isGeneratorOpen}
        request={null}
        templates={templates}
        onClose={() => setIsGeneratorOpen(false)}
        onGenerate={handleGenerateSuccess}
      />

      <PDFPreviewModal
        document={selectedDocument}
        isOpen={isPDFPreviewOpen}
        onClose={() => setIsPDFPreviewOpen(false)}
      />
    </div>
  )
}
