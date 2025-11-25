'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/page-header'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { EquipmentSelector } from '@/components/rooms/equipment-selector'
import { RoomAvailabilitySection } from '@/components/availability/room-availability-section'
import type { Equipment } from '@/lib/room-mock-data'

const DEFAULT_EQUIPMENT: Equipment = {
  projector: { present: false, status: 'missing' },
  smartBoard: { present: false, status: 'missing' },
  screen: { present: false, status: 'missing' },
  speakers: { present: false, status: 'missing' },
  microphone: { present: false, status: 'missing' },
  hdmiSystem: { present: false, status: 'missing' },
  recordingCamera: { present: false, status: 'missing' },
  airConditioning: { present: false, status: 'missing' },
  ethernet: { present: false, status: 'missing' },
  wifi: { present: false, status: 'missing' }
}

export default function NewRoomPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: 30,
    description: '',
    status: 'available' as const
  })
  const [equipment, setEquipment] = useState<Equipment>(DEFAULT_EQUIPMENT)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Creating new room:', { ...formData, equipment })
    router.push('/coordinator/rooms')
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <PageHeader
        title="Add New Room"
        description="Create a new defense room with equipment"
        action={
          <Button variant="outline" onClick={() => router.back()} size="sm" className="sm:size-default">
            <span className="hidden sm:inline">Back</span>
          </Button>
        }
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Basic Information</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm">Room Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Conference Room A"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Building A, Floor 2"
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="capacity" className="text-sm">Capacity *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                    required
                    className="mt-1.5"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Maximum number of people the room can accommodate
                  </p>
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the room..."
                    rows={3}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="status" className="text-sm">Status *</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground mt-1.5 text-sm"
                  >
                    <option value="available">Available</option>
                    <option value="occupied">In Use</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Equipment</h3>
              <EquipmentSelector 
                equipment={equipment} 
                onChange={setEquipment}
              />
            </Card>

            <RoomAvailabilitySection roomId="new" />
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Actions</h3>
              <div className="space-y-2 sm:space-3">
                <Button type="submit" className="w-full">
                  Create Room
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <h4 className="font-medium text-sm mb-2">Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Choose a clear, descriptive room name</li>
                <li>• Include building and floor in location</li>
                <li>• Set capacity based on comfort, not maximum</li>
                <li>• Check all available equipment</li>
              </ul>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
