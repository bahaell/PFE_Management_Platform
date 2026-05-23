'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Edit2, Trash2, Plus } from 'lucide-react'
import { TeacherAvailabilityService } from '@/services/service_teacherAvailability'
import type { TeacherAvailability } from '@/models/availability.model'
import { TimeSlotModal } from '@/components/availability/time-slot-modal'

export default function TeacherAvailabilityPage() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSlot, setEditingSlot] = useState<TeacherAvailability | null>(null)

  const { data: slots = [], isLoading } = useQuery({
    queryKey: ['teacher-availability'],
    queryFn: () => TeacherAvailabilityService.getAvailableSlots(),
  })

  const handleAddSlot = async (slotData: Omit<TeacherAvailability, 'id'>) => {
    try {
      await TeacherAvailabilityService.addSlot(slotData)
      queryClient.invalidateQueries({ queryKey: ['teacher-availability'] })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to add slot:', error)
    }
  }

  const handleUpdateSlot = async (slotData: Omit<TeacherAvailability, 'id'>) => {
    if (!editingSlot) return
    try {
      await TeacherAvailabilityService.updateSlot(editingSlot.id, slotData)
      queryClient.invalidateQueries({ queryKey: ['teacher-availability'] })
      setEditingSlot(null)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to update slot:', error)
    }
  }

  const handleDeleteSlot = async (id: string | number) => {
    try {
      await TeacherAvailabilityService.deleteSlot(id)
      queryClient.invalidateQueries({ queryKey: ['teacher-availability'] })
    } catch (error) {
      console.error('Failed to delete slot:', error)
    }
  }

  const handleEditSlot = (slot: TeacherAvailability) => {
    setEditingSlot(slot)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSlot(null)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Disponibilités de Jury"
          description="Définissez vos créneaux où vous êtes disponibles pour participer aux soutenances."
        />
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">Chargement des créneaux...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Disponibilités de Jury"
        description="Définissez vos créneaux où vous êtes disponibles pour participer aux soutenances."
        action={
          <Button onClick={() => setIsModalOpen(true)} size="default">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un créneau
          </Button>
        }
      />

      {slots.length === 0 ? (
        <Card className="p-8 text-center">
          <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">Aucun créneau défini</p>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un créneau
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {slots.map((slot) => (
            <Card key={slot.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg font-semibold">
                      {slot.start} – {slot.end}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Disponible</Badge>
                    {slot.isRecurrent && (
                      <Badge variant="outline">Récurrent</Badge>
                    )}
                    {slot.onlyDuringPFE && (
                      <Badge variant="outline">Période PFE</Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditSlot(slot)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSlot(slot.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <TimeSlotModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingSlot ? handleUpdateSlot : handleAddSlot}
        editingSlot={editingSlot || undefined}
        isTeacherMode
      />
    </div>
  )
}
