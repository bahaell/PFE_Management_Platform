export { Equipment, type EquipmentItem, type EquipmentStatus } from './equipment.model'
export { RoomBooking, type BookingType, type BookingStatus } from './booking.model'

import type { Equipment } from './equipment.model'
import type { RoomBooking } from './booking.model'

export type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'unavailable'

export interface MaintenanceScheduleItem {
  date: string
  reason: string
}

export interface Room {
  id: number
  name: string
  capacity: number
  location: string
  building?: string
  floor?: string
  status: RoomStatus
  description: string
  equipment: Equipment
  bookings: RoomBooking[]
  maintenanceSchedule?: MaintenanceScheduleItem[]
}
