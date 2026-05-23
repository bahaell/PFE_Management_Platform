'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Search, MapPin, Users, Eye, Edit2, Clock } from 'lucide-react'
import { RoomStatusBadge } from '@/components/rooms/room-status-badge'
import { EquipmentIcons } from '@/components/rooms/equipment-icons'
import { MOCK_ROOMS_WITH_EQUIPMENT, getRoomQualityScore, type RoomWithEquipment } from '@/lib/room-mock-data'
import { RoomAvailabilityService } from '@/services/service_roomAvailability'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RoomsPage() {
  const router = useRouter()
  const [rooms] = useState<RoomWithEquipment[]>(MOCK_ROOMS_WITH_EQUIPMENT)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [capacityFilter, setCapacityFilter] = useState<string>('all')

  const { data: availabilityMap = {} } = useQuery({
    queryKey: ['all-room-availability'],
    queryFn: async () => {
      const map: Record<string, number> = {}
      for (const room of rooms) {
        try {
          const data = await RoomAvailabilityService.getRoomAvailability(String(room.id))
          map[room.id] = data?.availability?.length || 0
        } catch (error) {
          map[room.id] = 0
        }
      }
      return map
    }
  })

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter
    const matchesCapacity = 
      capacityFilter === 'all' ||
      (capacityFilter === 'small' && room.capacity <= 25) ||
      (capacityFilter === 'medium' && room.capacity > 25 && room.capacity <= 40) ||
      (capacityFilter === 'large' && room.capacity > 40)
    
    return matchesSearch && matchesStatus && matchesCapacity
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Room Management"
        description="Manage defense rooms, equipment, and availability"
        action={
          <Button onClick={() => router.push('/coordinator/rooms/new')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Room
          </Button>
        }
      />

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">In Use</option>
              <option value="maintenance">Maintenance</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
            >
              <option value="all">All Capacities</option>
              <option value="small">Small (≤25)</option>
              <option value="medium">Medium (26-40)</option>
              <option value="large">Large (40+)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold">{rooms.length}</div>
          <div className="text-sm text-muted-foreground">Total Rooms</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-green-600">
            {rooms.filter(r => r.status === 'available').length}
          </div>
          <div className="text-sm text-muted-foreground">Available</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-blue-600">
            {rooms.filter(r => r.status === 'occupied').length}
          </div>
          <div className="text-sm text-muted-foreground">In Use</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {rooms.filter(r => r.status === 'maintenance').length}
          </div>
          <div className="text-sm text-muted-foreground">Maintenance</div>
        </Card>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRooms.map(room => {
          const qualityScore = getRoomQualityScore(room)
          const availabilityCount = availabilityMap[room.id] || 0
          
          return (
            <Card key={room.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{room.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {room.location}
                    </div>
                  </div>
                  <RoomStatusBadge status={room.status} />
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {room.description}
                </p>

                {/* Capacity & Quality */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{room.capacity} people</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">Equipment:</div>
                    <Badge variant="outline" className="text-xs">
                      {qualityScore}% Ready
                    </Badge>
                  </div>
                </div>

                {/* Equipment Icons */}
                <EquipmentIcons equipment={room.equipment} />

                <div className="pt-2 border-t flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {availabilityCount} time slots configured
                  </span>
                </div>

                {/* Bookings Info */}
                {room.bookings.length > 0 && (
                  <div className="pb-2 text-xs text-muted-foreground">
                    {room.bookings.length} upcoming booking{room.bookings.length > 1 ? 's' : ''}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push(`/coordinator/rooms/${room.id}`)}
                  >
                    <Eye className="w-3 h-3 mr-2" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push(`/coordinator/rooms/${room.id}/edit`)}
                  >
                    <Edit2 className="w-3 h-3 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredRooms.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No rooms found matching your filters</p>
        </Card>
      )}
    </div>
  )
}
