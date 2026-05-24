'use client'

import { useCallback, useState, useRef } from 'react'
import { Download, RotateCcw, FileText, Upload, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DocumentsService } from '@/services/service_documents'
import { toast } from '@/hooks/use-toast'
import type { ProjectDocument } from '@/models/document.model'

interface DocumentVersion {
  id: number
  name: string
  version: number
  uploadedBy: string
  uploadedAt: string
  size: string
  type: string
}

export function DocumentVersionsPanel({ projectId }: { projectId?: string | number }) {
  const [documents, setDocuments] = useState<DocumentVersion[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const loadDocuments = useCallback(async (projId?: string | number) => {
    if (!projId) return
    try {
      const docs = await DocumentsService.getDocuments(String(projId))
      // map to local DocumentVersion shape
      const mapped = docs.map((d: ProjectDocument, idx: number) => ({
        id: typeof d.id === 'number' ? d.id : idx,
        name: d.title ?? d.name,
        version: d.version ?? 1,
        uploadedBy: d.uploadedBy ?? 'Unknown',
        uploadedAt: d.uploadedAt ?? d.createdAt ?? '',
        size: '—',
        type: d.fileType ?? d.type ?? 'file',
      }))
      setDocuments(mapped)
    } catch (err) {
      console.error('Failed to load documents', err)
    }
  }, [])

  // initial load if projectId provided
  if (projectId && documents.length === 0) {
    loadDocuments(projectId)
  }

  async function handleFileInComponent(file: File) {
    if (!projectId) {
      toast({ title: 'No project selected', description: 'Cannot upload without a project.', variant: 'destructive' })
      return
    }
    try {
      setIsUploading(true)
      const created = await uploadFileAndCreate(projectId, file)
      // update local list
      const newDoc: DocumentVersion = {
        id: typeof created.id === 'number' ? created.id : documents.length,
        name: created.title ?? created.name,
        version: created.version ?? 1,
        uploadedBy: created.uploadedBy ?? 'Me',
        uploadedAt: created.createdAt ?? created.uploadedAt ?? new Date().toISOString(),
        size: '—',
        type: created.fileType ?? created.type ?? 'file',
      }
      setDocuments((prev) => [newDoc, ...prev])
      toast({ title: 'Uploaded', description: `${file.name} uploaded successfully.` })
    } catch (err) {
      console.error('Upload failed', err)
      toast({ title: 'Upload failed', description: (err as any)?.message || 'Error uploading file', variant: 'destructive' })
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-blue-500" />
  }

  return (
    <div className="bg-card rounded-lg border border-border p-3 sm:p-6 shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Document Versions</h3>
      
      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={async (e) => {
          e.preventDefault()
          const file = e.dataTransfer?.files?.[0]
          if (file) await handleFileInComponent(file)
        }}
        className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer group"
      >
        <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
        <p className="text-xs sm:text-sm font-medium text-foreground mb-1">Upload new version</p>
        <p className="text-xs text-muted-foreground mb-3 sm:mb-4">Drag and drop or click to select</p>
        <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}>
          {isUploading ? 'Uploading...' : 'Choose File'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            if (file) await handleFileInComponent(file)
            // reset value so same file can be picked again
            if (fileInputRef.current) fileInputRef.current.value = ''
          }}
        />
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
                <p className="text-xs text-muted-foreground wrap-break-word sm:break-normal">{doc.uploadedBy} • {doc.uploadedAt} • {doc.size}</p>
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

async function uploadFileAndCreate(projectId: string | number, file: File) {
  // NOTE: In this implementation we don't have an upload bucket helper.
  // We'll create an object URL for preview and send the file metadata as fileUrl.
  // Replace with real upload logic (S3/MinIO) in a production setup.
  const fileUrl = URL.createObjectURL(file)
  const payload = {
    title: file.name,
    description: '',
    fileUrl,
    fileType: file.type,
    uploadedBy: 'Me',
  }
  const created = await DocumentsService.addDocument(String(projectId), payload)
  return created
}

async function handleFile(file: File) {
  // This function exists only to satisfy external calls when file handlers are used outside component scope.
  // Real upload logic is defined inside the component where projectId and state are available.
  return Promise.resolve(null)
}
