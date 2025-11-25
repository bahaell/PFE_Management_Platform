'use client'

import { useState } from 'react'
import { DefenseTimeline } from '@/components/timeline/defense-timeline'
import { MOCK_DEFENSE_TIMELINE } from '@/lib/defense-timeline-mock-data'
import { MOCK_ROOMS } from '@/lib/scheduler-mock-data'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, Download } from 'lucide-react'

export default function CoordinatorDefenseTimelinePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [roomFilter, setRoomFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  const filteredEvents = MOCK_DEFENSE_TIMELINE.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.student.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    const matchesRoom = roomFilter === 'all' || event.room.includes(roomFilter)
    const matchesRole = roleFilter === 'all' || event.jury.some(j => j.role === roleFilter)

    return matchesSearch && matchesStatus && matchesRoom && matchesRole
  })

  const stats = {
    total: MOCK_DEFENSE_TIMELINE.length,
    scheduled: MOCK_DEFENSE_TIMELINE.filter(e => e.status === 'scheduled').length,
    completed: MOCK_DEFENSE_TIMELINE.filter(e => e.status === 'completed').length,
    cancelled: MOCK_DEFENSE_TIMELINE.filter(e => e.status === 'cancelled').length
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="shrink-0 border-b border-border bg-card shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Defense Timeline
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
                Complete history of scheduled and completed defenses
              </p>
            </div>
            <Button className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
              <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">{stats.total}</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">Scheduled</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.scheduled}</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">Completed</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{stats.completed}</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-xs sm:text-sm text-red-600 dark:text-red-400">Cancelled</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.cancelled}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search by student or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-10">
                  <Filter className="w-4 h-4 mr-2 shrink-0" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={roomFilter} onValueChange={setRoomFilter}>
                <SelectTrigger className="h-10">
                  <Filter className="w-4 h-4 mr-2 shrink-0" />
                  <SelectValue placeholder="Room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  {MOCK_ROOMS.map(room => (
                    <SelectItem key={room.id} value={room.name.split(' ')[1]}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="h-10">
                  <Filter className="w-4 h-4 mr-2 shrink-0" />
                  <SelectValue placeholder="Jury Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="president">Président</SelectItem>
                  <SelectItem value="rapporteur">Rapporteur</SelectItem>
                  <SelectItem value="encadrant">Encadrant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <DefenseTimeline events={filteredEvents} />
        </div>
      </div>
    </div>
  )
}
