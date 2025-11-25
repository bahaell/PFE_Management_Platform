'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import type { AcademicDocumentRequest } from '@/models/academic-document-request.model'
import type { AcademicTemplate } from '@/models/academic-template.model'

interface DocumentGenerationModalProps {
  open: boolean
  request?: AcademicDocumentRequest | null
  templates: AcademicTemplate[]
  onClose: () => void
  onGenerate: (requestId: string, templateId: string, filledData: Record<string, any>) => void
}

export function DocumentGenerationModal({
  open,
  request,
  templates,
  onClose,
  onGenerate,
}: DocumentGenerationModalProps) {
  const [templateId, setTemplateId] = useState<string>('')
  const [filledData, setFilledData] = useState<Record<string, any>>({})

  const selectedTemplate = templates.find(t => t.id === templateId)

  const handleFieldChange = (key: string, value: string) => {
    setFilledData(prev => ({ ...prev, [key]: value }))
  }

  const handleGenerate = () => {
    if (templateId && request) {
      onGenerate(request.id, templateId, filledData)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Générer un document</DialogTitle>
          <DialogDescription>
            Sélectionnez un modèle et remplissez les champs nécessaires
          </DialogDescription>
        </DialogHeader>

        {request && (
          <div className="space-y-6">
            <Card className="p-4 bg-muted/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Étudiant</p>
                  <p className="font-medium">{request.studentName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Encadrant</p>
                  <p className="font-medium">{request.teacherName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Projet</p>
                  <p className="font-medium">{request.projectTitle || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type de document</p>
                  <p className="font-medium capitalize">{request.documentType.replace('_', ' ')}</p>
                </div>
              </div>
            </Card>

            <div className="space-y-2">
              <Label>Sélectionnez un modèle</Label>
              <Select value={templateId} onValueChange={setTemplateId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisissez un modèle..." />
                </SelectTrigger>
                <SelectContent>
                  {templates
                    .filter(t => t.type === request.documentType)
                    .map(t => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                <h3 className="font-medium">Champs à remplir</h3>
                <div className="space-y-3">
                  {selectedTemplate.fields.map(field => (
                    <div key={field.key} className="space-y-1">
                      <Label className="text-sm">
                        {field.label}
                        {field.required && <span className="text-destructive ml-1">*</span>}
                      </Label>
                      {field.type === 'textarea' ? (
                        <textarea
                          className="w-full px-3 py-2 border rounded-md text-sm"
                          placeholder={field.placeholder}
                          value={filledData[field.key] || ''}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                          rows={3}
                        />
                      ) : (
                        <Input
                          type={field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text'}
                          placeholder={field.placeholder}
                          value={filledData[field.key] || ''}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button onClick={handleGenerate} disabled={!templateId}>
                Générer le document
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
