import type { TeacherAvailability } from '@/models/availability.model'

let teacherAvailabilityMockData: TeacherAvailability[] = [
  {
    id: 1,
    start: '09:00',
    end: '12:00',
    isRecurrent: true,
    onlyDuringPFE: false,
  },
  {
    id: 2,
    start: '14:00',
    end: '16:00',
    isRecurrent: false,
    onlyDuringPFE: true,
  },
]

export const TeacherAvailabilityService = {
  async getAvailableSlots(): Promise<TeacherAvailability[]> {
    return Promise.resolve(teacherAvailabilityMockData)
  },

  async addSlot(slot: Omit<TeacherAvailability, 'id'>): Promise<TeacherAvailability> {
    const newSlot: TeacherAvailability = {
      ...slot,
      id: Math.max(...teacherAvailabilityMockData.map(s => typeof s.id === 'number' ? s.id : 0), 0) + 1,
    }
    teacherAvailabilityMockData.push(newSlot)
    return Promise.resolve(newSlot)
  },

  async updateSlot(id: string | number, slot: Partial<TeacherAvailability>): Promise<TeacherAvailability> {
    const index = teacherAvailabilityMockData.findIndex(s => s.id === id)
    if (index === -1) throw new Error('Slot not found')
    
    const updatedSlot = { ...teacherAvailabilityMockData[index], ...slot, id }
    teacherAvailabilityMockData[index] = updatedSlot
    return Promise.resolve(updatedSlot)
  },

  async deleteSlot(id: string | number): Promise<void> {
    teacherAvailabilityMockData = teacherAvailabilityMockData.filter(s => s.id !== id)
    return Promise.resolve()
  },

  async validateNoOverlap(start: string, end: string, excludeId?: string | number): Promise<boolean> {
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number)
      return hours * 60 + minutes
    }

    const newStart = timeToMinutes(start)
    const newEnd = timeToMinutes(end)

    for (const slot of teacherAvailabilityMockData) {
      if (excludeId && slot.id === excludeId) continue
      
      const slotStart = timeToMinutes(slot.start)
      const slotEnd = timeToMinutes(slot.end)
      
      if ((newStart < slotEnd && newEnd > slotStart)) {
        return false
      }
    }
    return true
  },
}

export default TeacherAvailabilityService
