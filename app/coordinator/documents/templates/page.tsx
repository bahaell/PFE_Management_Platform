'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { TemplateTable } from '@/components/academic/template-table'
import { TemplateEditorModal } from '@/components/academic/template-editor-modal'
import { TemplatePreview } from '@/components/academic/template-preview'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AcademicTemplatesService } from '@/services/service_academic_templates'
import type { AcademicTemplate } from '@/models/academic-template.model'
import { useQuery, useMutation } from '@tanstack/react-query'

export default function CoordinatorTemplatesPage() {
  const [editorOpen, setEditorOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<AcademicTemplate | null>(null)
  const [cloneModalOpen, setCloneModalOpen] = useState(false)

  const { data: templates = [] } = useQuery({
    queryKey: ['academic-templates'],
    queryFn: () => AcademicTemplatesService.getAllTemplates(),
  })

  const createMutation = useMutation({
    mutationFn: (template: Omit<AcademicTemplate, 'id' | 'createdAt' | 'updatedAt' | 'version'>) =>
      AcademicTemplatesService.createTemplate(template),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => AcademicTemplatesService.deleteTemplate(id),
  })

  const cloneMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      AcademicTemplatesService.cloneTemplate(id, name),
  })

  const handleCreate = (template: Omit<AcademicTemplate, 'id' | 'createdAt' | 'updatedAt' | 'version'>) => {
    createMutation.mutate(template, {
      onSuccess: () => {
        setEditorOpen(false)
      },
    })
  }

  const handleClone = (id: string) => {
    setSelectedTemplate(templates.find(t => t.id === id) || null)
    setCloneModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Modèles de Documents" description="Gérez les modèles de documents académiques" />
        <Button onClick={() => { setSelectedTemplate(null); setEditorOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau modèle
        </Button>
      </div>

      <TemplateTable
        templates={templates}
        onEdit={(template) => { setSelectedTemplate(template); setEditorOpen(true); }}
        onDelete={(id) => deleteMutation.mutate(id)}
        onClone={handleClone}
        onPreview={(template) => { setSelectedTemplate(template); setPreviewOpen(true); }}
      />

      <TemplateEditorModal
        open={editorOpen}
        template={selectedTemplate}
        onClose={() => { setEditorOpen(false); setSelectedTemplate(null); }}
        onSave={handleCreate}
      />

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Aperçu du modèle</DialogTitle>
          </DialogHeader>
          {selectedTemplate && <TemplatePreview template={selectedTemplate} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
