'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, User, AlertCircle } from 'lucide-react'
import type { RoomBooking } from '@/lib/room-mock-data'

interface RoomCalendarProps {
  bookings: RoomBooking[]
  maintenanceSchedule?: { date: string; reason: string }[]
}

export function RoomCalendar({ bookings, maintenanceSchedule = [] }: RoomCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Get bookings for selected date
  const selectedDateStr = selectedDate?.toISOString().split('T')[0]
  const dayBookings = bookings.filter(b => b.date === selectedDateStr)
  const dayMaintenance = maintenanceSchedule.filter(m => m.date === selectedDateStr)

  // Mark dates with bookings or maintenance
  const markedDates = [
    ...bookings.map(b => new Date(b.date)),
    ...maintenanceSchedule.map(m => new Date(m.date))
  ]

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-lg border"
        modifiers={{
          booked: markedDates
        }}
        modifiersClassNames={{
          booked: 'bg-blue-100 text-blue-900 font-semibold'
        }}
      />

      {selectedDate && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">
            Events on {selectedDate.toLocaleDateString()}
          </h4>

          {dayMaintenance.length > 0 && (
            <Card className="p-4 border-yellow-300 bg-yellow-50">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-yellow-900">Maintenance Scheduled</p>
                  <p className="text-xs text-yellow-700 mt-1">{dayMaintenance[0].reason}</p>
                </div>
              </div>
            </Card>
          )}

          {dayBookings.length === 0 && dayMaintenance.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No events scheduled
            </p>
          )}

          {dayBookings.map(booking => (
            <Card key={booking.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.type}
                    </Badge>
                    <Badge variant="outline">{booking.status}</Badge>
                  </div>
                  
                  {booking.project && (
                    <p className="font-medium text-sm">{booking.project}</p>
                  )}
                  
                  {booking.studentName && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-3 h-3" />
                      {booking.studentName}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {booking.start} - {booking.end}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
