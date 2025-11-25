'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Eye, Send } from 'lucide-react'
import type { AdministrativeDocument } from '@/models/academic-document.model'

interface StudentDocumentListProps {
  documents: AdministrativeDocument[]
  onRequest: (type: string) => void
  onPreview: (doc: AdministrativeDocument) => void
}

const STATUS_LABELS: Record<string, string> = {
  requested: 'Demandé',
  generated: 'Généré',
  delivered: 'Livré',
}

const STATUS_COLORS: Record<string, string> = {
  requested: 'bg-yellow-100 text-yellow-800',
  generated: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
}

const DOC_TYPES = ['convention', 'encadrement', 'demande_pfe', 'pv_soutenance', 'affectation', 'autre']

export function StudentDocumentList({
  documents,
  onRequest,
  onPreview,
}: StudentDocumentListProps) {
  const [activePhase, setActivePhase] = useState<'before' | 'after_supervisor' | 'after_approval' | 'after_defense'>('before')

  const phases = {
    before: { label: 'Avant superviseur', docs: [] },
    after_supervisor: { label: 'Après superviseur', docs: ['convention', 'demande_pfe'] },
    after_approval: { label: 'Après approbation', docs: ['encadrement', 'affectation'] },
    after_defense: { label: 'Après soutenance', docs: ['pv_soutenance'] },
  }

  const availableDocs = phases[activePhase].docs
  const requestedDocs = documents.map(d => d.type)

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Object.entries(phases).map(([key, phase]) => (
          <Button
            key={key}
            variant={activePhase === key ? 'default' : 'outline'}
            onClick={() => setActivePhase(key as any)}
            className="whitespace-nowrap"
          >
            {phase.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {availableDocs.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Aucun document disponible à cette phase</p>
          </Card>
        ) : (
          availableDocs.map(docType => {
            const existing = documents.find(d => d.type === docType)
            return (
              <Card key={docType} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium capitalize">{docType.replace('_', ' ')}</h3>
                    {existing ? (
                      <p className="text-sm text-muted-foreground">
                        État: <Badge className={STATUS_COLORS[existing.status]}>{STATUS_LABELS[existing.status]}</Badge>
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Non demandé</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {existing ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onPreview(existing)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Aperçu
                        </Button>
                        {existing.status === 'delivered' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        )}
                      </>
                    ) : (
                      <Button
                        onClick={() => onRequest(docType)}
                        size="sm"
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Demander
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
