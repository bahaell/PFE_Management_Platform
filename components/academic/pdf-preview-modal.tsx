'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, X } from 'lucide-react'
import type { AdministrativeDocument } from '@/models/academic-document.model'

interface PDFPreviewModalProps {
  open: boolean
  document?: AdministrativeDocument | null
  onClose: () => void
}

export function PDFPreviewModal({
  open,
  document,
  onClose,
}: PDFPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Aperçu du document</DialogTitle>
        </DialogHeader>
        {document && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded">
              <p className="text-sm"><span className="font-medium">Étudiant:</span> {document.studentName}</p>
              <p className="text-sm"><span className="font-medium">Type:</span> {document.type}</p>
              {document.generatedAt && (
                <p className="text-sm"><span className="font-medium">Généré:</span> {new Date(document.generatedAt).toLocaleDateString('fr-FR')}</p>
              )}
            </div>
            <iframe
              src={document.fileUrl}
              className="w-full h-96 border rounded"
              title="PDF Preview"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => window.open(document.fileUrl, '_blank')}
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Fermer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
