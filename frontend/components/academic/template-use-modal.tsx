'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { AcademicTemplate, TemplateField } from '@/models/academic-template.model'
import { useQuery } from '@tanstack/react-query'
import { StudentsService } from '@/services/service_students'
import { UserDocumentsService } from '@/services/service_user_documents'
import { uploadPdfToCloudinary } from '@/lib/cloudinary'
import { Loader2 } from 'lucide-react'

interface TemplateUseModalProps {
  open: boolean
  template: AcademicTemplate | null
  onClose: () => void
  onSuccess: () => void
}

export function TemplateUseModal({ open, template, onClose, onSuccess }: TemplateUseModalProps) {
  const [studentId, setStudentId] = useState<string>('')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: students = [], isLoading: isLoadingStudents } = useQuery({
    queryKey: ['students-list'],
    queryFn: () => StudentsService.getAllStudents(),
    enabled: open
  })

  useEffect(() => {
    if (open && template) {
      setStudentId('')
      setFormData({})
    }
  }, [open, template])

  if (!template) return null

  const handleFieldChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentId) return

    setIsSubmitting(true)
    try {
      const generatedContent = `Document généré: ${template.name}\n\n` + 
        template.fields.map(f => `${f.label}: ${formData[f.key] || ''}`).join('\n')
      
      const generatedFile = new File([generatedContent], `${template.name.replace(/\s+/g, '_')}.pdf`, {
        type: "application/pdf",
      })

      const fileUrl = await uploadPdfToCloudinary(generatedFile)

      await UserDocumentsService.createCoordinatorDocument({
        title: `Généré: ${template.name}`,
        description: `Document généré automatiquement à partir du modèle ${template.name}`,
        fileUrl: fileUrl,
        fileName: generatedFile.name,
        mimeType: 'application/pdf',
        studentId: studentId
      })
      
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Failed to generate document:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Générer un document: {template.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Étudiant cible <span className="text-destructive">*</span></Label>
              <Select value={studentId} onValueChange={setStudentId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un étudiant" />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingStudents ? (
                    <div className="p-2 text-sm text-muted-foreground">Chargement...</div>
                  ) : students.length > 0 ? (
                    students.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.studentId || 'N/A'})
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">Aucun étudiant trouvé</div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium mb-4">Champs du modèle</h4>
              <div className="grid gap-4">
                {template.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label>
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        required={field.required}
                        value={formData[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <Input
                        type={field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text'}
                        required={field.required}
                        value={formData[field.key] || ''}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting || !studentId}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Générer et envoyer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
