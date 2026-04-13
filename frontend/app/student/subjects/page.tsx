'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter, Trash2, CheckCircle2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SkillMatchBar } from '@/components/recommendations/skill-match-bar'
import { RecommendedSubjectsPanel } from '@/components/recommendations/recommended-subjects-panel'
import { ProjectsService } from '@/services/service_projects'
import type { ProjectBasic } from '@/models/project.model'

export default function SubjectsPage() {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTeacher, setFilterTeacher] = useState('all')
  const [filterDomain, setFilterDomain] = useState('all')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectsService.getAllProjects(),
  })

  const [appliedIds, setAppliedIds] = useState<number[]>([])

  const handleApply = (id: number) => {
    setAppliedIds([...appliedIds, id])
    queryClient.invalidateQueries({ queryKey: ['projects'] })
  }

  const handleWithdraw = (id: number) => {
    setAppliedIds(appliedIds.filter(aid => aid !== id))
    setDeleteId(null)
    queryClient.invalidateQueries({ queryKey: ['projects'] })
  }

  const filteredSubjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTeacher = filterTeacher === 'all' || p.subject === filterTeacher
    const matchesDomain = filterDomain === 'all' || p.subject === filterDomain

    return matchesSearch && matchesTeacher && matchesDomain
  })

  const uniqueTeachers = Array.from(new Set(projects.map((p) => p.subject)))
  const uniqueDomains = Array.from(new Set(projects.map((p) => p.subject)))

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Available Subjects"
          description="Choose from validated subjects"
        />
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">Loading subjects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Available Subjects"
        description="Choose from validated subjects"
      />

      <div className="mb-6 sm:mb-8">
        <RecommendedSubjectsPanel />
      </div>

      <div className="mb-6">
        <SkillMatchBar skills={[
          { name: 'Python', studentLevel: 8, requiredLevel: 7 },
          { name: 'Machine Learning', studentLevel: 6, requiredLevel: 7 },
          { name: 'Data Analysis', studentLevel: 7, requiredLevel: 6 },
          { name: 'React', studentLevel: 5, requiredLevel: 8 },
        ]} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          <Input
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 sm:pl-10"
          />
        </div>

        <Select value={filterTeacher} onValueChange={setFilterTeacher}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by teacher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teachers</SelectItem>
            {uniqueTeachers.map((teacher) => (
              <SelectItem key={teacher} value={teacher}>
                {teacher}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterDomain} onValueChange={setFilterDomain}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            {uniqueDomains.map((domain) => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-card rounded-lg border border-border p-4 sm:p-6 hover:border-primary/50 hover:shadow-md transition-all flex flex-col"
          >
            <div className="mb-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-foreground flex-1">{subject.title}</h3>
                {appliedIds.includes(subject.id) && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mb-3 flex-1">{subject.description}</p>

            <div className="mb-4 space-y-1">
              <p className="text-xs sm:text-sm font-medium text-foreground">Subject: {subject.subject}</p>
              <p className="text-xs text-muted-foreground">Status: {subject.status}</p>
            </div>

            <div className="flex gap-2 mb-4 flex-wrap">
              {['Research', 'Development', 'Testing'].map((tech) => (
                <span key={tech} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-auto">
              {appliedIds.includes(subject.id) ? (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setDeleteId(subject.id)}
                  size="sm"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Withdraw
                </Button>
              ) : (
                <Button className="w-full" onClick={() => handleApply(subject.id)} size="sm">
                  Apply Now
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-sm sm:text-base text-muted-foreground">No subjects match your filters</p>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 w-full max-w-sm">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Withdraw Application?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              You can reapply for this subject later.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button variant="outline" onClick={() => setDeleteId(null)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleWithdraw(deleteId)} className="w-full sm:w-auto">
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
