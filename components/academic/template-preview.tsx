'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { AcademicTemplate } from '@/models/academic-template.model'

interface TemplatePreviewProps {
  template: AcademicTemplate
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const typeLabels: Record<string, string> = {
    convention: 'Convention de Stage',
    encadrement: 'Fiche d\'Encadrement',
    demande_pfe: 'Demande de PFE',
    pv_soutenance: 'PV de Soutenance',
    affectation: 'Affectation Encadrant',
    autre: 'Autre Document',
  }

  return (
    <Card className="p-6 bg-muted/30">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{template.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
          </div>
          <Badge>{typeLabels[template.type]}</Badge>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-medium mb-3">Champs du document</h3>
          <div className="space-y-2">
            {template.fields.map((field) => (
              <div
                key={field.key}
                className="flex items-center justify-between p-2 bg-background rounded"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{field.label}</p>
                  <p className="text-xs text-muted-foreground">{field.key}</p>
                </div>
                <div className="flex items-center gap-2">
                  {field.required && (
                    <Badge variant="secondary" className="text-xs">
                      Obligatoire
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {field.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t text-xs text-muted-foreground">
          <p>Version {template.version} • Créé le {new Date(template.createdAt).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>
    </Card>
  )
}
