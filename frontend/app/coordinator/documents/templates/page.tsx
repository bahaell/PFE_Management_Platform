'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { TemplateTable } from '@/components/academic/template-table'
import { TemplateEditorModal } from '@/components/academic/template-editor-modal'
import { TemplatePreview } from '@/components/academic/template-preview'
import { TemplateUseModal } from '@/components/academic/template-use-modal'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AcademicTemplatesService } from '@/services/service_academic_templates'
import type { AcademicTemplate } from '@/models/academic-template.model'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function CoordinatorTemplatesPage() {
  const queryClient = useQueryClient()
  const [editorOpen, setEditorOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [useModalOpen, setUseModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<AcademicTemplate | null>(null)

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
        queryClient.invalidateQueries({ queryKey: ['academic-templates'] })
        setEditorOpen(false)
      },
    })
  }

  const handleClone = (id: string) => {
    const current = templates.find(t => t.id === id)
    if (!current) return
    cloneMutation.mutate(
      { id, name: `${current.name} (clone)` },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['academic-templates'] })
        },
      }
    )
  }

  const handleUseSuccess = () => {
    // Optionally trigger a success notification or invalidate documents query if we show them here
    console.log('Document successfully generated and sent to student!')
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
        onDelete={(id) =>
          deleteMutation.mutate(id, {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ['academic-templates'] }),
          })
        }
        onClone={handleClone}
        onUse={(template) => { setSelectedTemplate(template); setUseModalOpen(true); }}
        onPreview={(template) => { setSelectedTemplate(template); setPreviewOpen(true); }}
      />

      <TemplateEditorModal
        open={editorOpen}
        template={selectedTemplate}
        onClose={() => { setEditorOpen(false); setSelectedTemplate(null); }}
        onSave={handleCreate}
      />

      <TemplateUseModal
        open={useModalOpen}
        template={selectedTemplate}
        onClose={() => { setUseModalOpen(false); setSelectedTemplate(null); }}
        onSuccess={handleUseSuccess}
      />

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          {selectedTemplate && <TemplatePreview template={selectedTemplate} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

