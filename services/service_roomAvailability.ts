import type { RoomAvailability, RoomAvailabilityData } from '@/models/availability.model'

let roomAvailabilityMockData: Record<string, RoomAvailabilityData> = {
  'room-a': {
    roomId: 'room-a',
    availability: [
      { id: 1, start: '09:00', end: '12:00', isMaintenance: false },
      { id: 2, start: '14:00', end: '17:00', isMaintenance: true, reason: 'Cleaning' },
    ],
  },
  'room-b': {
    roomId: 'room-b',
    availability: [
      { id: 3, start: '08:00', end: '11:00', isMaintenance: false },
      { id: 4, start: '13:00', end: '16:00', isMaintenance: false },
    ],
  },
}

export const RoomAvailabilityService = {
  async getRoomAvailability(roomId: string): Promise<RoomAvailabilityData> {
    const data = roomAvailabilityMockData[roomId]
    if (!data) {
      roomAvailabilityMockData[roomId] = { roomId, availability: [] }
      return Promise.resolve(roomAvailabilityMockData[roomId])
    }
    return Promise.resolve(data)
  },

  async addRoomSlot(roomId: string, slot: Omit<RoomAvailability, 'id'>): Promise<RoomAvailability> {
    if (!roomAvailabilityMockData[roomId]) {
      roomAvailabilityMockData[roomId] = { roomId, availability: [] }
    }

    const newSlot: RoomAvailability = {
      ...slot,
      id: Math.max(...roomAvailabilityMockData[roomId].availability.map(s => typeof s.id === 'number' ? s.id : 0), 0) + 1,
    }
    roomAvailabilityMockData[roomId].availability.push(newSlot)
    return Promise.resolve(newSlot)
  },

  async updateRoomSlot(roomId: string, id: string | number, slot: Partial<RoomAvailability>): Promise<RoomAvailability> {
    const data = roomAvailabilityMockData[roomId]
    if (!data) throw new Error('Room not found')

    const index = data.availability.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Slot not found')

    const updatedSlot = { ...data.availability[index], ...slot, id }
    data.availability[index] = updatedSlot
    return Promise.resolve(updatedSlot)
  },

  async deleteRoomSlot(roomId: string, id: string | number): Promise<void> {
    const data = roomAvailabilityMockData[roomId]
    if (!data) throw new Error('Room not found')

    data.availability = data.availability.filter(s => s.id !== id)
    return Promise.resolve()
  },

  async validateNoOverlap(roomId: string, start: string, end: string, excludeId?: string | number): Promise<boolean> {
    const data = roomAvailabilityMockData[roomId]
    if (!data) return Promise.resolve(true)

    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number)
      return hours * 60 + minutes
    }

    const newStart = timeToMinutes(start)
    const newEnd = timeToMinutes(end)

    for (const slot of data.availability) {
      if (excludeId && slot.id === excludeId) continue
      
      const slotStart = timeToMinutes(slot.start)
      const slotEnd = timeToMinutes(slot.end)
      
      if ((newStart < slotEnd && newEnd > slotStart)) {
        return Promise.resolve(false)
      }
    }
    return Promise.resolve(true)
  },
}

export default RoomAvailabilityService
