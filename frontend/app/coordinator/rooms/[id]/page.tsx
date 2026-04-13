'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit2, MapPin, Users, AlertCircle } from 'lucide-react'
import { RoomStatusBadge } from '@/components/rooms/room-status-badge'
import { EquipmentSelector } from '@/components/rooms/equipment-selector'
import { RoomCalendar } from '@/components/rooms/room-calendar'
import { MOCK_ROOMS_WITH_EQUIPMENT, getRoomQualityScore, type Equipment } from '@/lib/room-mock-data'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RoomAvailabilitySection } from '@/components/availability/room-availability-section'

export default function RoomDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const roomId = parseInt(params.id)
  const [room] = useState(MOCK_ROOMS_WITH_EQUIPMENT.find(r => r.id === roomId))

  if (!room) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Room not found</p>
      </div>
    )
  }

  const qualityScore = getRoomQualityScore(room)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{room.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {room.location}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RoomStatusBadge status={room.status} />
          <Button onClick={() => router.push(`/coordinator/rooms/${room.id}/edit`)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Room
          </Button>
        </div>
      </div>

      {/* Maintenance Alert */}
      {room.status === 'maintenance' && room.maintenanceSchedule && room.maintenanceSchedule.length > 0 && (
        <Alert className="border-yellow-300 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-900">
            <strong>Under Maintenance:</strong> {room.maintenanceSchedule[0].reason}
          </AlertDescription>
        </Alert>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Room Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Room Information</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Description</div>
                <p className="text-sm">{room.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Building</div>
                  <p className="text-sm font-medium">{room.building}</p>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Floor</div>
                  <p className="text-sm font-medium">{room.floor}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Capacity</div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{room.capacity} people</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Equipment Quality</div>
                  <Badge variant="outline" className="text-sm">
                    {qualityScore}% Operational
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Equipment */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Equipment & Facilities</h2>
            <EquipmentSelector
              equipment={room.equipment}
              onChange={() => {}}
              readOnly={true}
            />
          </Card>

          {/* Room Availability Section */}
          <RoomAvailabilitySection roomId={`room-${room.id}`} />
        </div>

        {/* Right Column - Calendar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Booking Calendar</h2>
            <RoomCalendar
              bookings={room.bookings}
              maintenanceSchedule={room.maintenanceSchedule}
            />
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Upcoming Bookings</span>
                <Badge variant="secondary">{room.bookings.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <Badge variant="secondary">{room.bookings.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Utilization Rate</span>
                <Badge variant="secondary">
                  {Math.round((room.bookings.length / 20) * 100)}%
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
