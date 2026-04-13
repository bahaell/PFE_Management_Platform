'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CalendarEvent {
  date: number
  title: string
  type: 'confirmed' | 'recommended' | 'available'
  time?: string
}

interface EnhancedSmartCalendarProps {
  onDateSelect?: (date: number) => void
}

export function EnhancedSmartCalendar({ onDateSelect }: EnhancedSmartCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 1))

  const events: CalendarEvent[] = [
    { date: 5, title: 'Defense - Ahmed Mohamed', type: 'confirmed', time: '14:00' },
    { date: 8, title: 'Recommended slot', type: 'recommended' },
    { date: 12, title: 'Recommended slot', type: 'recommended' },
    { date: 15, title: 'Defense - Fatima Hassan', type: 'confirmed', time: '10:00' },
    { date: 20, title: 'Available slot', type: 'available' }
  ]

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, () => null)

  const getEventForDate = (date: number) => events.find(e => e.date === date)
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'confirmed':
        return 'bg-green-100 border-green-300 text-green-900'
      case 'recommended':
        return 'bg-blue-100 border-blue-300 text-blue-900'
      case 'available':
        return 'bg-yellow-100 border-yellow-300 text-yellow-900'
      default:
        return 'bg-secondary border-border text-foreground hover:border-primary'
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          {monthName}
        </h3>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(date => {
          const event = getEventForDate(date)
          return (
            <button
              key={date}
              onClick={() => onDateSelect?.(date)}
              className={`p-2 rounded-lg border text-center cursor-pointer transition-all text-sm font-medium ${getTypeStyles(event?.type || 'default')}`}
            >
              {date}
              {event && <div className="text-xs mt-0.5 font-semibold">{event.type === 'confirmed' ? '✓' : '○'}</div>}
            </button>
          )
        })}
      </div>

      <div className="mt-6 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div>
          <span className="text-foreground">Confirmed defenses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-100 border border-blue-300"></div>
          <span className="text-foreground">AI recommended slots</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300"></div>
          <span className="text-foreground">Available slots</span>
        </div>
      </div>
    </Card>
  )
}
