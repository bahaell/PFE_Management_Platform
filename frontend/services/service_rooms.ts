import type { Room } from '@/models/room.model'
import type { Equipment } from '@/models/equipment.model'
import type { RoomBooking } from '@/models/booking.model'
import { apiClient } from '@/lib/api-client'

export interface RoomWithEquipment extends Room {
  bookings: RoomBooking[]
  maintenanceSchedule?: {
    date: string
    reason: string
  }[]
}

// Types correspondants au Backend (Resource Service)
export type BackendRoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'UNAVAILABLE' | 'DISABLED'
export type BackendRoomType = 'CLASSROOM' | 'AMPHITHEATER' | 'LAB' | 'CONFERENCE'
export type BackendDayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

export interface BackendRoom {
  id: number
  name: string
  code?: string
  capacity: number
  location?: string
  building?: string
  floor?: string
  type?: BackendRoomType
  status: BackendRoomStatus
  hasProjector: boolean
  hasComputers: boolean
  hasInternet: boolean
  description?: string
}

export interface RoomReservation {
  id?: number
  roomId: number
  defenseId: string
  date: string          // ISO date : "2025-06-20"
  startTime: string     // "HH:mm"
  endTime: string       // "HH:mm"
  status?: string
  academicYear: string
}

interface BackendDefenseSession {
  id: number
  projectId: string
  roomId?: number
  roomNameSnapshot?: string
  date?: string
  startTime?: string
  endTime?: string
  status?: string
}

export interface RoomAvailabilitySlot {
  id?: number
  roomId: number
  dayOfWeek: BackendDayOfWeek
  startTime: string
  endTime: string
  available?: boolean
  academicYear: string
}

// ── Helpers HTTP ──────────────────────────────────────────────────────────────

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  return apiClient.request<T>(path, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  })
}

function currentAcademicYear(): string {
  const year = new Date().getFullYear()
  return `${year}-${year + 1}`
}

// ── Mappers ───────────────────────────────────────────────────────────────────

function mapBackendToFrontendRoom(backendRoom: BackendRoom): RoomWithEquipment {
  const status = backendRoom.status === 'DISABLED'
    ? 'unavailable'
    : backendRoom.status.toLowerCase() as RoomWithEquipment['status']

  const equipment: Equipment = {
    projector: { present: backendRoom.hasProjector, status: 'ok' },
    smartBoard: { present: false, status: 'missing' },
    speakers: { present: false, status: 'missing' },
    microphone: { present: false, status: 'missing' },
    hdmiSystem: { present: true, status: 'ok' },
    recordingCamera: { present: false, status: 'missing' },
    airConditioning: { present: true, status: 'ok' },
    ethernet: { present: backendRoom.hasComputers, status: 'ok' },
    wifi: { present: backendRoom.hasInternet, status: 'ok' },
    screen: { present: backendRoom.hasProjector, status: 'ok' }
  }

  return {
    id: backendRoom.id,
    name: backendRoom.name,
    capacity: backendRoom.capacity,
    location: backendRoom.location || 'Unknown',
    building: backendRoom.building,
    floor: backendRoom.floor,
    status,
    description: backendRoom.description || '',
    equipment,
    bookings: [] // TODO: map real bookings if backend supports returning them with room
  }
}

function mapReservationToBooking(reservation: RoomReservation): RoomBooking {
  return {
    id: reservation.id ?? reservation.defenseId,
    roomId: reservation.roomId,
    date: reservation.date,
    start: reservation.startTime,
    end: reservation.endTime,
    type: 'defense',
    project: reservation.defenseId,
    status: reservation.status === 'CANCELLED' ? 'cancelled' : 'confirmed',
  }
}

function mapDefenseToBooking(session: BackendDefenseSession): RoomBooking | null {
  if (!session.roomId || !session.date || !session.startTime || !session.endTime) {
    return null
  }

  return {
    id: session.id,
    roomId: session.roomId,
    date: session.date,
    start: session.startTime,
    end: session.endTime,
    type: 'defense',
    project: session.projectId,
    status: session.status === 'CANCELLED' ? 'cancelled' : 'confirmed',
  }
}

// ── Service API exportée pour le composant UI ───────────────────────────────

export const RoomsService = {
  async getAllRooms(): Promise<RoomWithEquipment[]> {
    const backendRooms = await request<BackendRoom[]>('GET', '/api/rooms')
    return backendRooms.map(mapBackendToFrontendRoom)
  },

  async getRoomById(id: number): Promise<RoomWithEquipment | null> {
    try {
      const backendRoom = await request<BackendRoom>('GET', `/api/rooms/${id}`)
      const room = mapBackendToFrontendRoom(backendRoom)
      room.bookings = (await this.getAllBookings()).filter((booking) => booking.roomId === id)
      return room
    } catch {
      return null
    }
  },

  async createRoom(room: RoomWithEquipment): Promise<RoomWithEquipment> {
    const backendRoom: Omit<BackendRoom, 'id'> = {
      name: room.name,
      capacity: room.capacity,
      location: room.location,
      building: room.building,
      floor: room.floor,
      status: room.status.toUpperCase() as BackendRoomStatus,
      hasProjector: room.equipment.projector.present,
      hasComputers: room.equipment.ethernet.present,
      hasInternet: room.equipment.wifi.present,
      description: room.description
    }
    const created = await request<BackendRoom>('POST', '/api/rooms', backendRoom)
    return mapBackendToFrontendRoom(created)
  },

  async updateRoom(id: number, updates: Partial<RoomWithEquipment>): Promise<RoomWithEquipment | null> {
    const existing = await this.getRoomById(id)
    if (!existing) return null

    const merged: RoomWithEquipment = {
      ...existing,
      ...updates,
      equipment: updates.equipment ?? existing.equipment,
    }

    const backendRoomUpdates: Omit<BackendRoom, 'id'> = {
      name: merged.name,
      capacity: merged.capacity,
      location: merged.location,
      building: merged.building,
      floor: merged.floor,
      status: merged.status.toUpperCase() as BackendRoomStatus,
      hasProjector: merged.equipment.projector.present,
      hasComputers: merged.equipment.ethernet.present,
      hasInternet: merged.equipment.wifi.present,
      description: merged.description,
    }
    const updated = await request<BackendRoom>('PUT', `/api/rooms/${id}`, backendRoomUpdates)
    return mapBackendToFrontendRoom(updated)
  },

  async deleteRoom(id: number): Promise<boolean> {
    await request<void>('DELETE', `/api/rooms/${id}`)
    return true
  },

  async searchRooms(query: string): Promise<RoomWithEquipment[]> {
    const rooms = await this.getAllRooms()
    const lowerQuery = query.toLowerCase()
    return rooms.filter(r =>
      r.name.toLowerCase().includes(lowerQuery) ||
      r.location.toLowerCase().includes(lowerQuery)
    )
  },

  async filterRooms(filters: { status?: string; minCapacity?: number; maxCapacity?: number }): Promise<RoomWithEquipment[]> {
    const rooms = await this.getAllRooms()
    return rooms.filter(r => {
      if (filters.status && r.status !== filters.status) return false
      if (filters.minCapacity && r.capacity < filters.minCapacity) return false
      if (filters.maxCapacity && r.capacity > filters.maxCapacity) return false
      return true
    })
  },

  async checkAvailability(roomId: number, date: string, start: string, end: string): Promise<boolean> {
    // Uses the API to find available rooms
    const q = new URLSearchParams({
      date,
      startTime: start,
      endTime: end,
      capacity: '0',
      academicYear: new Date(date).getFullYear().toString()
    })
    const availableBackendRooms = await request<BackendRoom[]>('GET', `/api/rooms/available?${q}`)
    return availableBackendRooms.some(r => r.id === roomId)
  },

  async getRoomQuality(roomId: number): Promise<number> {
    const room = await this.getRoomById(roomId)
    if (!room) return 0
    let score = 0
    let totalItems = 0
    Object.values(room.equipment).forEach((item: any) => {
      totalItems++
      if (item.present && item.status === 'ok') score += 10
      else if (item.present && item.status === 'maintenance') score += 5
    })
    return totalItems ? Math.round((score / (totalItems * 10)) * 100) : 0
  },

  // Mock functions for bookings temporarily to satisfy the interface type
  async bookRoom(roomId: number, booking: RoomBooking): Promise<RoomBooking | null> {
    const reservation: RoomReservation = {
      roomId,
      defenseId: booking.project || "unknown",
      date: booking.date,
      startTime: booking.start,
      endTime: booking.end,
      academicYear: "2024-2025"
    }
    const created = await request<RoomReservation>('POST', '/api/rooms/book', reservation)
    return mapReservationToBooking(created)
  },

  async addAvailabilitySlot(roomId: number, slot: RoomAvailabilitySlot): Promise<RoomAvailabilitySlot> {
    return request<RoomAvailabilitySlot>('POST', `/api/rooms/${roomId}/availabilities`, {
      ...slot,
      roomId,
      available: slot.available ?? true,
      academicYear: slot.academicYear || currentAcademicYear(),
    })
  },

  async getAvailabilitySlots(roomId: number, academicYear = currentAcademicYear()): Promise<RoomAvailabilitySlot[]> {
    const q = new URLSearchParams({ academicYear })
    return request<RoomAvailabilitySlot[]>('GET', `/api/rooms/${roomId}/availabilities?${q}`)
  },

  async updateAvailabilitySlot(roomId: number, availabilityId: number, slot: RoomAvailabilitySlot): Promise<RoomAvailabilitySlot> {
    return request<RoomAvailabilitySlot>('PUT', `/api/rooms/${roomId}/availabilities/${availabilityId}`, {
      ...slot,
      roomId,
      available: slot.available ?? true,
      academicYear: slot.academicYear || currentAcademicYear(),
    })
  },

  async deleteAvailabilitySlot(roomId: number, availabilityId: number): Promise<void> {
    await request<void>('DELETE', `/api/rooms/${roomId}/availabilities/${availabilityId}`)
  },

  async validateAvailabilityOverlap(
    roomId: number,
    startTime: string,
    endTime: string,
    excludeId?: string | number,
    academicYear = currentAcademicYear()
  ): Promise<boolean> {
    const q = new URLSearchParams({ startTime, endTime, academicYear })
    if (excludeId !== undefined) q.set('excludeId', String(excludeId))
    return request<boolean>('GET', `/api/rooms/${roomId}/availabilities/validate-overlap?${q}`)
  },

  async getBookingById(bookingId: number): Promise<RoomBooking | null> {
    const bookings = await this.getAllBookings()
    return bookings.find((booking) => Number(booking.id) === bookingId) || null
  },
  async updateBooking(roomId: number, bookingId: number, updates: Partial<RoomBooking>): Promise<RoomBooking | null> {
    const body: Partial<BackendDefenseSession> = {
      roomId,
      date: updates.date,
      startTime: updates.start,
      endTime: updates.end,
      status: updates.status === 'cancelled' ? 'CANCELLED' : undefined,
    }
    const updated = await apiClient.put<BackendDefenseSession>(`/api/schedule/defenses/${bookingId}?forceOverride=true`, body)
    return mapDefenseToBooking(updated)
  },
  async deleteBooking(roomId: number, bookingId: number): Promise<boolean> {
    await apiClient.delete<void>(`/api/schedule/defenses/${bookingId}`)
    return true
  },
  async getAllBookings(): Promise<RoomBooking[]> {
    const sessions = await apiClient.get<BackendDefenseSession[]>('/api/schedule/defenses')
    return sessions
      .map(mapDefenseToBooking)
      .filter((booking): booking is RoomBooking => booking !== null)
  },
}

export default RoomsService
