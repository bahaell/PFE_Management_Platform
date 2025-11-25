'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CalendarEvent {
  date: number
  title: string
  color?: string
}

interface CalendarWidgetProps {
  events?: CalendarEvent[]
  onDateSelect?: (date: Date) => void
}

export function CalendarWidget({ events = [], onDateSelect }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    if (onDateSelect) {
      onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    }
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const eventsByDate = events.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = []
    acc[event.date].push(event)
    return acc
  }, {} as Record<number, CalendarEvent[]>)

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{monthName}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth} className="h-8 w-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square"></div>
        ))}
        {days.map((day) => {
          const dayEvents = eventsByDate[day] || []
          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className="aspect-square p-1 rounded border border-border hover:bg-secondary transition-colors flex flex-col items-center justify-center text-sm font-medium text-foreground relative"
            >
              <span>{day}</span>
              {dayEvents.length > 0 && (
                <span className="absolute bottom-1 left-1 right-1 h-1 bg-primary rounded-full"></span>
              )}
            </button>
          )
        })}
      </div>

      {events.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          <p className="text-xs font-semibold text-muted-foreground">Upcoming Events</p>
          {events.slice(0, 3).map((event, i) => (
            <div key={i} className="text-xs p-2 bg-secondary rounded text-foreground">
              <p className="font-medium">Day {event.date}</p>
              <p className="text-muted-foreground truncate">{event.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
