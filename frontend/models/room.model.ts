export type { Equipment, EquipmentItem, EquipmentStatus } from './equipment.model'
export type { RoomBooking, BookingType, BookingStatus } from './booking.model'

import type { Equipment } from './equipment.model'
import type { RoomBooking } from './booking.model'

export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'unavailable' | 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'UNAVAILABLE'

export interface MaintenanceScheduleItem {
  date: string
  reason: string
}

export interface Room {
  [key: string]: any
  id: any
  name: string
  capacity: number
  location?: string
  building?: string
  floor?: string
  status?: any
  description?: string
  equipment?: Equipment
  bookings?: RoomBooking[]
  maintenanceSchedule?: MaintenanceScheduleItem[]
  color?: string
}
