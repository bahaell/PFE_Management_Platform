import type { TeacherAvailability } from '@/models/availability.model'
import { apiClient } from '@/lib/api-client'

export const TeacherAvailabilityService = {
  async getAvailableSlots(): Promise<TeacherAvailability[]> {
    return apiClient.get<TeacherAvailability[]>('/api/users/me/availability')
  },

  async addSlot(slot: Omit<TeacherAvailability, 'id'>): Promise<TeacherAvailability> {
    return apiClient.post<TeacherAvailability>('/api/users/me/availability', slot)
  },

  async updateSlot(id: string | number, slot: Partial<TeacherAvailability>): Promise<TeacherAvailability> {
    return apiClient.put<TeacherAvailability>(`/api/users/me/availability/${id}`, slot)
  },

  async deleteSlot(id: string | number): Promise<void> {
    await apiClient.delete<void>(`/api/users/me/availability/${id}`)
  },

  async validateNoOverlap(start: string, end: string, excludeId?: string | number): Promise<boolean> {
    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number)
      return hours * 60 + minutes
    }

    const newStart = timeToMinutes(start)
    const newEnd = timeToMinutes(end)

    const slots = await TeacherAvailabilityService.getAvailableSlots()
    for (const slot of slots) {
      if (excludeId !== undefined && String(slot.id) === String(excludeId)) continue
      
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
