'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, FileText, Eye, Copy } from 'lucide-react'
import type { AcademicTemplate } from '@/models/academic-template.model'

interface TemplateTableProps {
  templates: AcademicTemplate[]
  onEdit: (template: AcademicTemplate) => void
  onDelete: (id: string) => void
  onUse: (template: AcademicTemplate) => void
  onClone: (id: string) => void
  onPreview: (template: AcademicTemplate) => void
}

export function TemplateTable({
  templates,
  onEdit,
  onDelete,
  onUse,
  onClone,
  onPreview,
}: TemplateTableProps) {
  const [search, setSearch] = useState('')

  const filtered = templates.filter(
    t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase())
  )

  const typeColors: Record<string, string> = {
    convention: 'bg-blue-100 text-blue-800',
    encadrement: 'bg-green-100 text-green-800',
    demande_pfe: 'bg-purple-100 text-purple-800',
    pv_soutenance: 'bg-orange-100 text-orange-800',
    affectation: 'bg-pink-100 text-pink-800',
    autre: 'bg-gray-100 text-gray-800',
  }

  const typeLabels: Record<string, string> = {
    convention: 'Convention',
    encadrement: 'Encadrement',
    demande_pfe: 'Demande PFE',
    pv_soutenance: 'PV Soutenance',
    affectation: 'Affectation',
    autre: 'Autre',
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Rechercher par nom ou type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Nom du modèle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Champs</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Date création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((template) => (
              <TableRow key={template.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>
                  <Badge className={typeColors[template.type]}>
                    {typeLabels[template.type]}
                  </Badge>
                </TableCell>
                <TableCell>{template.fields.length}</TableCell>
                <TableCell>v{template.version}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(template.createdAt).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPreview(template)}
                      title="Aperçu"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(template)}
                      title="Modifier"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onClone(template.id)}
                      title="Cloner"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUse(template)}
                      title="Générer pour un étudiant"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(template.id)}
                      className="text-destructive hover:text-destructive"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Aucun modèle trouvé
        </div>
      )}
    </div>
  )
}


