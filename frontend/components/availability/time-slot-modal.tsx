'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import type { TeacherAvailability, RoomAvailability } from '@/models/availability.model'
import { TeacherAvailabilityService } from '@/services/service_teacherAvailability'
import { RoomAvailabilityService } from '@/services/service_roomAvailability'

interface TimeSlotModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (slot: any) => Promise<void>
  editingSlot?: TeacherAvailability | RoomAvailability
  isTeacherMode?: boolean
  roomId?: string
  isMaintenance?: boolean
}

export function TimeSlotModal({
  isOpen,
  onClose,
  onSubmit,
  editingSlot,
  isTeacherMode,
  roomId,
  isMaintenance = false,
}: TimeSlotModalProps) {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [isRecurrent, setIsRecurrent] = useState(false)
  const [onlyDuringPFE, setOnlyDuringPFE] = useState(false)
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(isMaintenance)
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (editingSlot) {
      setStart(editingSlot.start)
      setEnd(editingSlot.end)
      if ('isRecurrent' in editingSlot) {
        setIsRecurrent(editingSlot.isRecurrent || false)
      }
      if ('onlyDuringPFE' in editingSlot) {
        setOnlyDuringPFE(editingSlot.onlyDuringPFE || false)
      }
      if ('isMaintenance' in editingSlot) {
        setIsMaintenanceMode(editingSlot.isMaintenance || false)
      }
      if ('reason' in editingSlot && editingSlot.reason) {
        setReason(editingSlot.reason)
      }
    } else {
      resetForm()
    }
  }, [editingSlot, isOpen])

  const resetForm = () => {
    setStart('')
    setEnd('')
    setIsRecurrent(false)
    setOnlyDuringPFE(false)
    setIsMaintenanceMode(isMaintenance)
    setReason('')
    setError('')
  }

  const validateForm = async () => {
    if (!start || !end) {
      setError('Veuillez remplir tous les champs')
      return false
    }

    if (start >= end) {
      setError('L\'heure de fin doit être après l\'heure de début')
      return false
    }

    const isValid = isTeacherMode
      ? await TeacherAvailabilityService.validateNoOverlap(start, end, editingSlot?.id)
      : roomId
      ? await RoomAvailabilityService.validateNoOverlap(roomId, start, end, editingSlot?.id)
      : true

    if (!isValid) {
      setError('Ce créneau chevauche un créneau existant')
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    setError('')

    if (!(await validateForm())) {
      return
    }

    setIsSubmitting(true)
    try {
      const slotData = isTeacherMode
        ? {
            start,
            end,
            isRecurrent,
            onlyDuringPFE,
          }
        : {
            start,
            end,
            isMaintenance: isMaintenanceMode,
            ...(isMaintenanceMode && reason && { reason }),
          }

      await onSubmit(slotData)
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingSlot ? 'Modifier le créneau' : 'Ajouter un créneau'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Heure de début</Label>
              <Input
                id="start"
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">Heure de fin</Label>
              <Input
                id="end"
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
          </div>

          {isTeacherMode ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="recurrent"
                  checked={isRecurrent}
                  onCheckedChange={(checked) => setIsRecurrent(checked as boolean)}
                />
                <Label htmlFor="recurrent" className="font-normal cursor-pointer">
                  Récurrent chaque semaine
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="pfe-only"
                  checked={onlyDuringPFE}
                  onCheckedChange={(checked) => setOnlyDuringPFE(checked as boolean)}
                />
                <Label htmlFor="pfe-only" className="font-normal cursor-pointer">
                  Disponible uniquement durant la période PFE
                </Label>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="maintenance"
                  checked={isMaintenanceMode}
                  onCheckedChange={(checked) => setIsMaintenanceMode(checked as boolean)}
                />
                <Label htmlFor="maintenance" className="font-normal cursor-pointer">
                  Indisponible (maintenance)
                </Label>
              </div>
              {isMaintenanceMode && (
                <div className="space-y-2">
                  <Label htmlFor="reason">Raison</Label>
                  <Input
                    id="reason"
                    placeholder="ex. Nettoyage, Réparation, Examen interne"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'En cours...' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
