'use client'

import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Clock, Edit2, Trash2, Plus, AlertTriangle } from 'lucide-react'
import { RoomAvailabilityService } from '@/services/service_roomAvailability'
import type { RoomAvailability } from '@/models/availability.model'
import { TimeSlotModal } from './time-slot-modal'

interface RoomAvailabilitySectionProps {
  roomId: string
}

export function RoomAvailabilitySection({ roomId }: RoomAvailabilitySectionProps) {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSlot, setEditingSlot] = useState<RoomAvailability | null>(null)

  const { data: availabilityData, isLoading } = useQuery({
    queryKey: ['room-availability', roomId],
    queryFn: () => RoomAvailabilityService.getRoomAvailability(roomId),
  })

  const slots = availabilityData?.availability || []

  const handleAddSlot = async (slotData: Omit<RoomAvailability, 'id'>) => {
    try {
      await RoomAvailabilityService.addRoomSlot(roomId, slotData)
      queryClient.invalidateQueries({ queryKey: ['room-availability', roomId] })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to add slot:', error)
    }
  }

  const handleUpdateSlot = async (slotData: Omit<RoomAvailability, 'id'>) => {
    if (!editingSlot) return
    try {
      await RoomAvailabilityService.updateRoomSlot(roomId, editingSlot.id, slotData)
      queryClient.invalidateQueries({ queryKey: ['room-availability', roomId] })
      setEditingSlot(null)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to update slot:', error)
    }
  }

  const handleDeleteSlot = async (id: string | number) => {
    try {
      await RoomAvailabilityService.deleteRoomSlot(roomId, id)
      queryClient.invalidateQueries({ queryKey: ['room-availability', roomId] })
    } catch (error) {
      console.error('Failed to delete slot:', error)
    }
  }

  const handleEditSlot = (slot: RoomAvailability) => {
    setEditingSlot(slot)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingSlot(null)
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Disponibilités de la Salle</h2>
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </Card>
    )
  }

  const maintenanceSlots = slots.filter(s => s.isMaintenance)
  const availabilitySlots = slots.filter(s => !s.isMaintenance)

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Disponibilités de la Salle</h2>
          <Button onClick={() => setIsModalOpen(true)} size="sm" type="button">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
        </div>

        {slots.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            Aucune disponibilité définie
          </p>
        ) : (
          <div className="space-y-4">
            {maintenanceSlots.map((slot) => (
              <Alert key={slot.id} className="border-yellow-300 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <div className="ml-4 flex-1">
                  <AlertDescription className="text-yellow-900">
                    <div className="font-semibold mb-1">
                      ⚠️ Maintenance prévue
                    </div>
                    <div className="text-sm mb-2">
                      🕒 {slot.start} – {slot.end}
                    </div>
                    {slot.reason && (
                      <div className="text-sm">
                        🗂️ Raison: {slot.reason}
                      </div>
                    )}
                  </AlertDescription>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditSlot(slot)}
                  >
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSlot(slot.id)}
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
              </Alert>
            ))}

            {availabilitySlots.map((slot) => (
              <Card key={slot.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">
                      {slot.start} – {slot.end}
                    </span>
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
      </Card>

      <TimeSlotModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingSlot ? handleUpdateSlot : handleAddSlot}
        editingSlot={editingSlot || undefined}
        roomId={roomId}
      />
    </>
  )
}
