"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import type { AdministrativeDocument } from "@/models/academic-document.model"

interface DocumentPreviewModalProps {
  document: AdministrativeDocument | null
  isOpen: boolean
  onClose: () => void
  onDownload?: (document: AdministrativeDocument) => void
}

export function DocumentPreviewModal({ document, isOpen, onClose, onDownload }: DocumentPreviewModalProps) {
  if (!document) return null

  const handleDownload = () => {
    onDownload?.(document)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="capitalize">
                {document.type.replace("_", " ")} - {document.studentName}
              </DialogTitle>
              <DialogDescription>
                Generated on{" "}
                {new Date(document.generatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Document Preview Area */}
          <div className="border rounded-lg bg-muted/50 p-8 min-h-96 flex items-center justify-center">
            {document.fileUrl?.endsWith(".pdf") ? (
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">PDF Preview</p>
                <p className="text-lg font-medium">{document.type.replace("_", " ")}</p>
                <p className="text-sm text-muted-foreground">{document.studentName}</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Document Preview</p>
                <p className="text-lg font-medium">{document.type.replace("_", " ")}</p>
              </div>
            )}
          </div>

          {/* Document Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Student</p>
              <p className="font-medium">{document.studentName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium capitalize">{document.type.replace("_", " ")}</p>
            </div>
            {document.teacherName && (
              <div>
                <p className="text-muted-foreground">Supervisor</p>
                <p className="font-medium">{document.teacherName}</p>
              </div>
            )}
            {document.projectTitle && (
              <div>
                <p className="text-muted-foreground">Project</p>
                <p className="font-medium line-clamp-1">{document.projectTitle}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
