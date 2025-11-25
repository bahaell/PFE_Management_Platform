// Complete Room Management System Mock Data

import type { Room } from '@/models/room.model'
import type { Equipment } from '@/models/equipment.model'
import type { RoomBooking } from '@/models/booking.model'

export interface RoomWithEquipment extends Room {
  bookings: RoomBooking[]
  maintenanceSchedule?: {
    date: string
    reason: string
  }[]
}

export const MOCK_ROOMS_WITH_EQUIPMENT: RoomWithEquipment[] = [
  {
    id: 1,
    name: 'Salle B12',
    capacity: 40,
    location: 'Bloc B – 1er étage',
    building: 'Bloc B',
    floor: '1er étage',
    status: 'available',
    description: 'Large amphitheater-style room with modern equipment, perfect for PFE defenses with audience.',
    equipment: {
      projector: { present: true, status: 'ok' },
      smartBoard: { present: false, status: 'missing' },
      speakers: { present: true, status: 'ok' },
      microphone: { present: true, status: 'ok' },
      hdmiSystem: { present: true, status: 'ok' },
      recordingCamera: { present: true, status: 'ok' },
      airConditioning: { present: true, status: 'ok' },
      ethernet: { present: true, status: 'ok' },
      wifi: { present: true, status: 'ok', code: 'ENSIB12@2024' },
      screen: { present: true, status: 'ok' }
    },
    bookings: [
      {
        id: 101,
        date: '2025-06-25',
        start: '10:00',
        end: '12:00',
        type: 'defense',
        project: 'AI Traffic System',
        studentName: 'Ahmed Youssef',
        status: 'confirmed'
      },
      {
        id: 102,
        date: '2025-06-26',
        start: '14:00',
        end: '16:00',
        type: 'defense',
        project: 'IoT Smart Home',
        studentName: 'Mariem Khaled',
        status: 'confirmed'
      }
    ]
  },
  {
    id: 2,
    name: 'Salle A05',
    capacity: 25,
    location: 'Bloc A – Rez-de-chaussée',
    building: 'Bloc A',
    floor: 'Rez-de-chaussée',
    status: 'occupied',
    description: 'Medium-sized conference room with excellent acoustics and recording capabilities.',
    equipment: {
      projector: { present: true, status: 'ok' },
      smartBoard: { present: true, status: 'ok' },
      speakers: { present: true, status: 'ok' },
      microphone: { present: true, status: 'ok' },
      hdmiSystem: { present: true, status: 'ok' },
      recordingCamera: { present: true, status: 'maintenance' },
      airConditioning: { present: true, status: 'ok' },
      ethernet: { present: true, status: 'ok' },
      wifi: { present: true, status: 'ok', code: 'ENSIA05@2024' },
      screen: { present: true, status: 'ok' }
    },
    bookings: [
      {
        id: 103,
        date: '2025-06-20',
        start: '09:00',
        end: '11:00',
        type: 'defense',
        project: 'Blockchain Voting',
        studentName: 'Omar Hassan',
        status: 'confirmed'
      },
      {
        id: 104,
        date: '2025-06-27',
        start: '10:00',
        end: '12:00',
        type: 'defense',
        project: 'Mobile Health App',
        studentName: 'Noor Mohamed',
        status: 'pending'
      }
    ]
  },
  {
    id: 3,
    name: 'Salle C21',
    capacity: 50,
    location: 'Bloc C – 2ème étage',
    building: 'Bloc C',
    floor: '2ème étage',
    status: 'maintenance',
    description: 'Large amphitheater with full equipment suite, currently undergoing scheduled maintenance.',
    equipment: {
      projector: { present: true, status: 'maintenance' },
      smartBoard: { present: true, status: 'ok' },
      speakers: { present: true, status: 'ok' },
      microphone: { present: true, status: 'ok' },
      hdmiSystem: { present: true, status: 'maintenance' },
      recordingCamera: { present: true, status: 'ok' },
      airConditioning: { present: true, status: 'maintenance' },
      ethernet: { present: true, status: 'ok' },
      wifi: { present: true, status: 'ok', code: 'ENSIC21@2024' },
      screen: { present: true, status: 'ok' }
    },
    bookings: [],
    maintenanceSchedule: [
      {
        date: '2025-06-15',
        reason: 'Projector replacement and AC system upgrade'
      }
    ]
  },
  {
    id: 4,
    name: 'Salle B08',
    capacity: 30,
    location: 'Bloc B – Rez-de-chaussée',
    building: 'Bloc B',
    floor: 'Rez-de-chaussée',
    status: 'available',
    description: 'Compact seminar room with basic presentation equipment.',
    equipment: {
      projector: { present: true, status: 'ok' },
      smartBoard: { present: false, status: 'missing' },
      speakers: { present: true, status: 'ok' },
      microphone: { present: false, status: 'missing' },
      hdmiSystem: { present: true, status: 'ok' },
      recordingCamera: { present: false, status: 'missing' },
      airConditioning: { present: true, status: 'ok' },
      ethernet: { present: true, status: 'ok' },
      wifi: { present: true, status: 'ok', code: 'ENSIB08@2024' },
      screen: { present: true, status: 'ok' }
    },
    bookings: [
      {
        id: 105,
        date: '2025-06-28',
        start: '15:00',
        end: '17:00',
        type: 'defense',
        project: 'E-Commerce Platform',
        studentName: 'Layla Ahmed',
        status: 'pending'
      }
    ]
  },
  {
    id: 5,
    name: 'Salle D15',
    capacity: 35,
    location: 'Bloc D – 1er étage',
    building: 'Bloc D',
    floor: '1er étage',
    status: 'available',
    description: 'Modern conference room with state-of-the-art recording and streaming capabilities.',
    equipment: {
      projector: { present: true, status: 'ok' },
      smartBoard: { present: true, status: 'ok' },
      speakers: { present: true, status: 'ok' },
      microphone: { present: true, status: 'ok' },
      hdmiSystem: { present: true, status: 'ok' },
      recordingCamera: { present: true, status: 'ok' },
      airConditioning: { present: true, status: 'ok' },
      ethernet: { present: true, status: 'ok' },
      wifi: { present: true, status: 'ok', code: 'ENSID15@2024' },
      screen: { present: true, status: 'ok' }
    },
    bookings: []
  }
]

export function isRoomAvailable(
  room: RoomWithEquipment,
  date: string,
  start: string,
  end: string
): boolean {
  if (room.status === 'maintenance' || room.status === 'unavailable') {
    return false
  }

  const bookingsOnDate = room.bookings.filter(b => b.date === date && b.status !== 'cancelled')
  
  for (const booking of bookingsOnDate) {
    const bookingStart = booking.start
    const bookingEnd = booking.end
    
    if (
      (start >= bookingStart && start < bookingEnd) ||
      (end > bookingStart && end <= bookingEnd) ||
      (start <= bookingStart && end >= bookingEnd)
    ) {
      return false
    }
  }
  
  return true
}

export function getRoomQualityScore(room: RoomWithEquipment): number {
  const equipment = room.equipment
  let score = 0
  let totalItems = 0

  Object.values(equipment).forEach(item => {
    totalItems++
    if (item.present && item.status === 'ok') {
      score += 10
    } else if (item.present && item.status === 'maintenance') {
      score += 5
    }
  })

  return Math.round((score / (totalItems * 10)) * 100)
}

export function getEquipmentStatusColor(status: 'ok' | 'maintenance' | 'missing'): string {
  switch (status) {
    case 'ok':
      return 'text-green-600'
    case 'maintenance':
      return 'text-yellow-600'
    case 'missing':
      return 'text-gray-400'
  }
}
