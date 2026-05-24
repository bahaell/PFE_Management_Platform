import { RoomsService, type RoomAvailabilitySlot } from './service_rooms'
import type { RoomAvailabilityData, RoomAvailability } from '@/models/availability.model'

export type { RoomAvailabilitySlot }

const DEFAULT_DAY_OF_WEEK: RoomAvailabilitySlot['dayOfWeek'] = 'MONDAY'

function currentAcademicYear(): string {
  const year = new Date().getFullYear()
  return `${year}-${year + 1}`
}

function parseRoomId(roomId: string): number {
  return parseInt(roomId.replace(/\D/g, ''), 10) || Number(roomId) || 1
}

function toUiAvailability(slot: RoomAvailabilitySlot): RoomAvailability {
  return {
    id: slot.id || `${slot.roomId}-${slot.dayOfWeek}-${slot.startTime}-${slot.endTime}`,
    start: slot.startTime,
    end: slot.endTime,
    isMaintenance: slot.available === false,
  }
}

export const RoomAvailabilityService = {
  async getRoomAvailability(roomId: string): Promise<RoomAvailabilityData> {
    const numId = parseRoomId(roomId)
    const slots = await RoomsService.getAvailabilitySlots(numId)
    return { roomId, availability: slots.map(toUiAvailability) }
  },

  async addRoomSlot(roomId: string, slot: Omit<RoomAvailability, 'id'>): Promise<RoomAvailability> {
    const numId = parseRoomId(roomId)
    const res = await RoomsService.addAvailabilitySlot(numId, {
      roomId: numId,
      dayOfWeek: DEFAULT_DAY_OF_WEEK,
      startTime: slot.start,
      endTime: slot.end,
      available: !slot.isMaintenance,
      academicYear: currentAcademicYear()
    })
    return toUiAvailability(res)
  },

  async updateRoomSlot(roomId: string, id: string | number, slot: Partial<RoomAvailability>): Promise<RoomAvailability> {
    const numId = parseRoomId(roomId)
    const availabilityId = Number(id)
    const res = await RoomsService.updateAvailabilitySlot(numId, availabilityId, {
      id: availabilityId,
      roomId: numId,
      dayOfWeek: DEFAULT_DAY_OF_WEEK,
      startTime: slot.start || '08:00',
      endTime: slot.end || '10:00',
      available: !slot.isMaintenance,
      academicYear: currentAcademicYear()
    })
    return toUiAvailability(res)
  },

  async deleteRoomSlot(roomId: string, id: string | number): Promise<void> {
    await RoomsService.deleteAvailabilitySlot(parseRoomId(roomId), Number(id))
  },

  async validateNoOverlap(roomId: string, start: string, end: string, excludeId?: string | number): Promise<boolean> {
    return RoomsService.validateAvailabilityOverlap(parseRoomId(roomId), start, end, excludeId)
  },
}

export default RoomAvailabilityService
