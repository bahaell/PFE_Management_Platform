import { BaseModal } from './base-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

interface RoomModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: RoomData) => void
  initialData?: RoomData
}

export interface RoomData {
  name: string
  capacity: number
  location: string
  status: 'available' | 'unavailable'
}

export function RoomModal({ isOpen, onClose, onSubmit, initialData }: RoomModalProps) {
  const [formData, setFormData] = useState<RoomData>({
    name: '',
    capacity: 20,
    location: '',
    status: 'available',
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({ name: '', capacity: 20, location: '', status: 'available' })
    }
  }, [isOpen, initialData])

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Room' : 'Add New Room'}
      onConfirm={handleSubmit}
      confirmText={initialData ? 'Update' : 'Add'}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="room-name">Room Name</Label>
          <Input
            id="room-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Room 101"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            placeholder="20"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., Building A, Floor 1"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'unavailable' })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground mt-1"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>
    </BaseModal>
  )
}
