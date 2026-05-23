'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface RequestDocumentModalProps {
  open: boolean
  documentType?: string | null
  onClose: () => void
  onSubmit: (message: string) => void
}

export function RequestDocumentModal({
  open,
  documentType,
  onClose,
  onSubmit,
}: RequestDocumentModalProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    onSubmit(message)
    setMessage('')
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demander un document</DialogTitle>
          <DialogDescription>
            Demandez la génération de: {documentType?.replace('_', ' ')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              Votre demande sera envoyée au coordinateur pour examen et génération du document.
            </AlertDescription>
          </Alert>

          <Textarea
            placeholder="Commentaires ou informations supplémentaires (optionnel)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              Soumettre la demande
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
