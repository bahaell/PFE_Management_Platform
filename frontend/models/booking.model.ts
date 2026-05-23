export type BookingType = 'defense' | 'maintenance' | 'reserved'
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled'

export interface RoomBooking {
  id: number
  date: string            // ISO date or 'YYYY-MM-DD' string as in mocks
  start: string           // 'HH:mm' string as in mocks
  end: string             // 'HH:mm' string as in mocks
  type: BookingType
  project?: string        // optional project title
  studentName?: string    // optional student name
  status: BookingStatus
}
