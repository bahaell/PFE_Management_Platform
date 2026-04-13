'use client'

import { useState } from 'react'
import { DefenseTimeline } from '@/components/timeline/defense-timeline'
import { MOCK_DEFENSE_TIMELINE } from '@/lib/defense-timeline-mock-data'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'

export default function StudentDefenseTimelinePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const studentDefenses = MOCK_DEFENSE_TIMELINE.filter(event => 
    event.student.name === 'Ahmed Yassine'
  )

  const filteredEvents = studentDefenses.filter(event => {
    const matchesSearch = searchQuery === '' || 
      event.subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.student.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header - Fixed */}
      <div className="shrink-0 border-b border-border bg-card shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Defense Timeline
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            Track your PFE defense progress and history
          </p>
        </div>
      </div>

      {/* Filters - Fixed */}
      <div className="shrink-0 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search defense..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-10">
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

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <DefenseTimeline events={filteredEvents} />
        </div>
      </div>
    </div>
  )
}
