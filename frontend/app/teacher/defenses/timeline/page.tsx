'use client'

import { useState } from 'react'
import { DefenseTimeline } from '@/components/timeline/defense-timeline'
import { MOCK_DEFENSE_TIMELINE } from '@/lib/defense-timeline-mock-data'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function TeacherDefenseTimelinePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'my' | 'all'>('my')

  const teacherDefenses = viewMode === 'my' 
    ? MOCK_DEFENSE_TIMELINE.filter(event => event.teacherRole !== null)
    : MOCK_DEFENSE_TIMELINE

  const filteredEvents = teacherDefenses.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.student.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    const matchesRole = roleFilter === 'all' || event.teacherRole === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const myDefensesCount = MOCK_DEFENSE_TIMELINE.filter(e => e.teacherRole !== null).length

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header - Fixed */}
      <div className="shrink-0 border-b border-border bg-card shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Defense Timeline
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            View and manage defense schedules
          </p>
        </div>
      </div>

      {/* Filters - Fixed */}
      <div className="shrink-0 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="space-y-3">
            {/* View Mode Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={viewMode === 'my' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('my')}
                className="h-9"
              >
                My Defenses
                <Badge variant="secondary" className="ml-2 text-xs">
                  {myDefensesCount}
                </Badge>
              </Button>
              <Button
                variant={viewMode === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('all')}
                className="h-9"
              >
                All Defenses
                <Badge variant="secondary" className="ml-2 text-xs">
                  {MOCK_DEFENSE_TIMELINE.length}
                </Badge>
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="relative sm:col-span-2 lg:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
              {viewMode === 'my' && (
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="h-10">
                    <Filter className="w-4 h-4 mr-2 shrink-0" />
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="president">Président</SelectItem>
                    <SelectItem value="rapporteur">Rapporteur</SelectItem>
                    <SelectItem value="encadrant">Encadrant</SelectItem>
                  </SelectContent>
                </Select>
              )}
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
            </div>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <DefenseTimeline events={filteredEvents} showTeacherRole={viewMode === 'my'} />
        </div>
      </div>
    </div>
  )
}
