import { BaseModal } from './base-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SchedulerService } from '@/services/service_scheduler'
import { RoomsService, type RoomWithEquipment } from '@/services/service_rooms'
import type { SchedulerProject } from '@/models/scheduler.model'
import { useEffect, useState } from 'react'

interface DefenseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: DefenseData) => Promise<void> | void
  initialData?: Partial<DefenseData>
}

export interface DefenseData {
  projectId: string
  roomId?: number
  roomNameSnapshot?: string
  date: string
  startTime: string
  endTime: string
}

const EMPTY_DEFENSE: DefenseData = {
  projectId: '',
  roomId: undefined,
  roomNameSnapshot: '',
  date: '',
  startTime: '09:00',
  endTime: '09:45',
}

export function DefenseModal({ isOpen, onClose, onSubmit, initialData }: DefenseModalProps) {
  const [formData, setFormData] = useState<DefenseData>(EMPTY_DEFENSE)
  const [projects, setProjects] = useState<SchedulerProject[]>([])
  const [rooms, setRooms] = useState<RoomWithEquipment[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    SchedulerService.getAllProjects().then(setProjects).catch(() => setProjects([]))
    RoomsService.getAllRooms().then(setRooms).catch(() => setRooms([]))
  }, [isOpen])

  useEffect(() => {
    setFormData({
      ...EMPTY_DEFENSE,
      ...initialData,
    })
  }, [initialData, isOpen])

  const selectedRoom = rooms.find((room) => room.id === formData.roomId)

  const handleSubmit = async () => {
    if (!formData.projectId || !formData.date || !formData.startTime || !formData.endTime) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        ...formData,
        roomNameSnapshot: selectedRoom?.name ?? formData.roomNameSnapshot,
      })
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Defense' : 'Create Defense Request'}
      onConfirm={handleSubmit}
      confirmText={isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Create'}
      isLoading={isSubmitting}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="project">Project</Label>
          <Select
            value={formData.projectId}
            onValueChange={(projectId) => setFormData({ ...formData, projectId })}
            disabled={Boolean(initialData?.projectId)}
          >
            <SelectTrigger id="project" className="mt-1">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.subject} - {project.studentName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="room">Room</Label>
          <Select
            value={formData.roomId ? String(formData.roomId) : ''}
            onValueChange={(roomId) => {
              const room = rooms.find((item) => String(item.id) === roomId)
              setFormData({
                ...formData,
                roomId: Number(roomId),
                roomNameSnapshot: room?.name,
              })
            }}
          >
            <SelectTrigger id="room" className="mt-1">
              <SelectValue placeholder="Select room" />
            </SelectTrigger>
            <SelectContent>
              {rooms.map((room) => (
                <SelectItem key={room.id} value={String(room.id)}>
                  {room.name} {room.location ? `(${room.location})` : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </BaseModal>
  )
}
