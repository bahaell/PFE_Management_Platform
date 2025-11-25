'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock, Download, Eye } from 'lucide-react'
import type { AcademicDocumentRequest } from '@/models/academic-document-request.model'

interface RequestTableProps {
  requests: AcademicDocumentRequest[]
  onAccept: (id: string) => void
  onReject: (id: string) => void
  onGenerate: (id: string) => void
  onDeliver: (id: string) => void
  onPreview: (request: AcademicDocumentRequest) => void
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'En attente',
  accepted: 'Acceptée',
  rejected: 'Rejetée',
  generated: 'Générée',
  delivered: 'Livrée',
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-blue-100 text-blue-800',
  rejected: 'bg-red-100 text-red-800',
  generated: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
}

const DOC_TYPE_LABELS: Record<string, string> = {
  convention: 'Convention',
  encadrement: 'Encadrement',
  demande_pfe: 'Demande PFE',
  pv_soutenance: 'PV Soutenance',
  affectation: 'Affectation',
  autre: 'Autre',
}

export function RequestTable({
  requests,
  onAccept,
  onReject,
  onGenerate,
  onDeliver,
  onPreview,
}: RequestTableProps) {
  const [search, setSearch] = useState('')

  const filtered = requests.filter(
    r =>
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.documentType.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Rechercher par étudiant ou type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Étudiant</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date demande</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((request) => (
              <TableRow key={request.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{request.studentName}</TableCell>
                <TableCell>{DOC_TYPE_LABELS[request.documentType]}</TableCell>
                <TableCell>
                  <Badge className={STATUS_COLORS[request.status]}>
                    {STATUS_LABELS[request.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(request.requestedAt).toLocaleDateString('fr-FR')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onPreview(request)}
                      title="Aperçu"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {request.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600"
                          onClick={() => onAccept(request.id)}
                          title="Accepter"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => onReject(request.id)}
                          title="Rejeter"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    {request.status === 'accepted' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600"
                        onClick={() => onGenerate(request.id)}
                        title="Générer"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}

                    {request.status === 'generated' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600"
                        onClick={() => onDeliver(request.id)}
                        title="Livrer"
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Aucune demande trouvée
        </div>
      )}
    </div>
  )
}
