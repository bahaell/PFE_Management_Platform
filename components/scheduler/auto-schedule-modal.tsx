'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

interface ScheduleSlot {
  id: number
  time: string
  duration: string
  room: string
  availability: 'available' | 'conflict' | 'recommended'
  confidence: number
  jury: string[]
}

export function AutoScheduleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(null)

  const recommendedSlots: ScheduleSlot[] = [
    {
      id: 1,
      time: '14:00 - 14:45',
      duration: '45 minutes',
      room: 'Room B - Amphitheater',
      availability: 'recommended',
      confidence: 95,
      jury: ['Dr. Ahmed Hassan', 'Eng. Fatima Ahmed', 'Dr. Mohamed Samir']
    },
    {
      id: 2,
      time: '15:00 - 15:45',
      duration: '45 minutes',
      room: 'Room A - Conference Hall',
      availability: 'available',
      confidence: 87,
      jury: ['Dr. Ahmed Hassan', 'Eng. Fatima Ahmed']
    },
    {
      id: 3,
      time: '10:00 - 10:45',
      duration: '45 minutes',
      room: 'Room C - Seminar',
      availability: 'available',
      confidence: 78,
      jury: ['Dr. Ahmed Hassan', 'Dr. Mohamed Samir']
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Smart Defense Scheduling</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground">
              AI-powered system analyzing 150+ scheduling constraints to find optimal defense times
            </p>
          </div>

          <div className="space-y-3">
            {recommendedSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedSlot?.id === slot.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      slot.availability === 'recommended' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <Clock className={`w-6 h-6 ${
                        slot.availability === 'recommended' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{slot.time}</p>
                      <p className="text-sm text-muted-foreground">{slot.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{slot.confidence}%</div>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Room</p>
                    <p className="font-medium text-foreground">{slot.room}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Available Jury</p>
                    <p className="font-medium text-foreground">{slot.jury.length} members</p>
                  </div>
                </div>

                <div className="space-y-1">
                  {slot.jury.map((member) => (
                    <p key={member} className="text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                      {member}
                    </p>
                  ))}
                </div>

                {slot.availability === 'recommended' && (
                  <div className="mt-3 flex items-center gap-1 text-green-600 text-xs font-semibold">
                    <CheckCircle className="w-4 h-4" />
                    Recommended by AI
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              No direct conflicts detected. All jury members are available at recommended times.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="flex-1"
              disabled={!selectedSlot}
              onClick={() => {
                alert(`Defense scheduled for ${selectedSlot?.time}`)
                onClose()
              }}
            >
              Accept & Schedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
