'use client'

import { useState } from 'react'
import { Download, RotateCcw, FileText, Upload, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DocumentVersion {
  id: number
  name: string
  version: number
  uploadedBy: string
  uploadedAt: string
  size: string
  type: string
}

export function DocumentVersionsPanel() {
  const [documents, setDocuments] = useState<DocumentVersion[]>([
    { id: 1, name: 'Project Proposal v3', version: 3, uploadedBy: 'Ahmed Mohamed', uploadedAt: '3 hours ago', size: '1.2 MB', type: 'PDF' },
    { id: 2, name: 'Project Proposal v2', version: 2, uploadedBy: 'Ahmed Mohamed', uploadedAt: '2 days ago', size: '1.1 MB', type: 'PDF' },
    { id: 3, name: 'Project Proposal v1', version: 1, uploadedBy: 'Ahmed Mohamed', uploadedAt: '1 week ago', size: '0.9 MB', type: 'PDF' },
    { id: 4, name: 'Design Document v2', version: 2, uploadedBy: 'Ahmed Mohamed', uploadedAt: '3 days ago', size: '2.5 MB', type: 'DOCX' },
  ])

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-blue-500" />
  }

  return (
    <div className="bg-card rounded-lg border border-border p-3 sm:p-6 shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Document Versions</h3>
      
      {/* Upload Area */}
      <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer group">
        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
        <p className="text-xs sm:text-sm font-medium text-foreground mb-1">Upload new version</p>
        <p className="text-xs text-muted-foreground mb-3 sm:mb-4">Drag and drop or click to select</p>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">Choose File</Button>
      </div>

      {/* Documents List */}
      <div className="space-y-2">
        {documents.map((doc, idx) => (
          <div key={doc.id} className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-md ${idx === 0 ? 'bg-primary/5 border-primary' : 'bg-secondary border-border'}`}>
            <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
              {getFileIcon(doc.type)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  {idx === 0 && <Badge variant="default" className="text-xs shrink-0">Current</Badge>}
                </div>
                <p className="text-xs text-muted-foreground break-words sm:break-normal">{doc.uploadedBy} • {doc.uploadedAt} • {doc.size}</p>
              </div>
            </div>
            <div className="flex gap-1 ml-auto sm:ml-2">
              <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-primary/10">
                <Download className="w-4 h-4" />
              </Button>
              {idx !== 0 && (
                <>
                  <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-primary/10">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
