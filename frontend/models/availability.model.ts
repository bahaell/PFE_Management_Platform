export interface TimeSlot {
  id: string | number
  start: string
  end: string
}

export interface TeacherAvailability extends TimeSlot {
  isRecurrent?: boolean
  onlyDuringPFE?: boolean
}

export interface RoomAvailability extends TimeSlot {
  isMaintenance?: boolean
  reason?: string
}

export interface RoomAvailabilityData {
  roomId: string
  availability: RoomAvailability[]
}
