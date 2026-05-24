'use client'

import { useState, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Search, Filter, BookOpen, Users, Trash2, Edit } from 'lucide-react'
import { SubjectsService } from '@/services/service_subjects'
import { StudentsService } from '@/services/service_students'
import { getAuthState } from '@/lib/auth'

interface Subject {
  id: any
  title: string
  description: string
  domain: string
  technologies: string[]
  level: string
  maxStudents: number
  progress: number
  status: 'validated' | 'pending' | 'rejected'
}

export default function TeacherSubjectsPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const currentUser = getAuthState()
  const { data: apiSubjects = [] } = useQuery({
    queryKey: ['teacher-subjects', currentUser?.id],
    queryFn: () => SubjectsService.getAllSubjects({
      teacherId: currentUser?.id,
      role: currentUser?.id ? 'TEACHER' : undefined,
    }),
  })

  const { data: allStudents = [] } = useQuery({
    queryKey: ['all-students'],
    queryFn: () => StudentsService.getAllStudents(),
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isApplicantsOpen, setIsApplicantsOpen] = useState(false)
  const [editFormData, setEditFormData] = useState<Subject | null>(null)
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set())

  const { data: subjectApplications = [], isLoading: isLoadingApplications } = useQuery({
    queryKey: ['subject-applications', selectedSubject?.id],
    queryFn: () => SubjectsService.getApplicationsBySubject(String(selectedSubject?.id)),
    enabled: isApplicantsOpen && !!selectedSubject?.id,
  })

  const reviewApplicationMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'ACCEPTED' | 'REJECTED' }) =>
      SubjectsService.updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subject-applications', selectedSubject?.id] })
      queryClient.invalidateQueries({ queryKey: ['teacher-subjects', currentUser?.id] })
    },
  })

  const subjects: Subject[] = useMemo(() => {
    return apiSubjects.map((subject, idx) => ({
      id: subject.id,
      title: subject.title,
      description: subject.description,
      domain: subject.type === 'EXTERNAL' ? subject.companyName || 'External' : 'Internal',
      technologies: subject.technologies,
      level: ['L3', 'M1', 'M2'][idx % 3] || 'M2',
      maxStudents: 2 + (idx % 3),
      progress: 0,
      status: subject.status === 'ACCEPTED' || subject.status === 'APPROVED' ? 'validated' as const : subject.status === 'REJECTED' ? 'rejected' as const : 'pending' as const,
    }))
  }, [apiSubjects])

  const domains = useMemo(() => [...new Set(subjects.map(s => s.domain))], [subjects])
  const technologies = useMemo(() => [...new Set(subjects.flatMap(s => s.technologies))], [subjects])
  const levels = ['L3', 'M1', 'M2']

  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           s.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDomain = !selectedDomain || s.domain === selectedDomain
      const matchesTech = !selectedTech || s.technologies.includes(selectedTech)
      const matchesLevel = !selectedLevel || s.level === selectedLevel
      return matchesSearch && matchesDomain && matchesTech && matchesLevel
    })
  }, [subjects, searchQuery, selectedDomain, selectedTech, selectedLevel])

  const handleViewDetails = (subject: Subject) => {
    setSelectedSubject(subject)
    setEditFormData({ ...subject })
    setIsDetailsOpen(true)
  }

  const handleViewApplicants = (subject: Subject) => {
    setSelectedSubject(subject)
    setSelectedApplicants(new Set())
    setIsApplicantsOpen(true)
  }

  const handleSaveChanges = () => {
    if (editFormData) {
      console.log('Saving subject:', editFormData)
      setIsDetailsOpen(false)
    }
  }

  const handleFormChange = (field: keyof Subject, value: any) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value })
    }
  }

  const handleToggleApplicant = (studentId: string) => {
    const newSet = new Set(selectedApplicants)
    if (newSet.has(studentId)) {
      newSet.delete(studentId)
    } else {
      newSet.add(studentId)
    }
    setSelectedApplicants(newSet)
  }

  const handleSaveApplicants = () => {
    selectedApplicants.forEach((applicationId) => {
      reviewApplicationMutation.mutate({ id: applicationId, status: 'ACCEPTED' })
    })
    setSelectedApplicants(new Set())
  }

  const applicantRows = subjectApplications.map((application) => {
    const student = allStudents.find((item) => String(item.id) === application.studentId)
    return { application, student }
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Subjects"
        description="Manage your validated PFE subjects"
        action={
          <Button onClick={() => router.push('/teacher/subjects/new')}>
            <Plus className="w-4 h-4 mr-2" />
            New Subject
          </Button>
        }
      />

      {/* Filter Bar */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            {/* Domain Filter */}
            <div className="flex gap-2 flex-wrap">
              {domains.map(domain => (
                <Badge
                  key={domain}
                  variant={selectedDomain === domain ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedDomain(selectedDomain === domain ? null : domain)}
                >
                  {domain}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tech & Level Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-1 flex-wrap">
              {technologies.map(tech => (
                <Badge
                  key={tech}
                  variant={selectedTech === tech ? 'secondary' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-1 flex-wrap">
              {levels.map(level => (
                <Badge
                  key={level}
                  variant={selectedLevel === level ? 'secondary' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                >
                  {level}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subject, idx) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6 space-y-4 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                      {subject.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{subject.domain}</p>
                  </div>
                  <Badge variant="outline" className="whitespace-nowrap">
                    {subject.level}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                  {subject.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1">
                  {subject.technologies.slice(0, 2).map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {subject.technologies.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{subject.technologies.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Max Students Info */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                  <Users className="w-3 h-3" />
                  <span>Max {subject.maxStudents} students</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="flex-1"
                    onClick={() => handleViewDetails(subject)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewApplicants(subject)}
                    disabled={subject.status !== 'validated'}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Students
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-muted-foreground">No subjects found matching your filters</p>
        </motion.div>
      )}

      {/* Edit Subject Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription>
              Modify your subject information below
            </DialogDescription>
          </DialogHeader>

          {editFormData && (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={editFormData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md text-sm"
                  rows={4}
                />
              </div>

              {/* Domain & Level */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Domain</label>
                  <Input
                    value={editFormData.domain}
                    onChange={(e) => handleFormChange('domain', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Level</label>
                  <Select value={editFormData.level} onValueChange={(value) => handleFormChange('level', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L3">L3</SelectItem>
                      <SelectItem value="M1">M1</SelectItem>
                      <SelectItem value="M2">M2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="text-sm font-medium">Technologies (comma-separated)</label>
                <Input
                  value={editFormData.technologies.join(', ')}
                  onChange={(e) => handleFormChange('technologies', e.target.value.split(',').map(t => t.trim()))}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Maximum Students</label>
                <Input
                  type="number"
                  min="1"
                  value={editFormData.maxStudents}
                  onChange={(e) => handleFormChange('maxStudents', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Applicants Selection Dialog */}
      <Dialog open={isApplicantsOpen} onOpenChange={setIsApplicantsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assign Students to {selectedSubject?.title}</DialogTitle>
            <DialogDescription>
              Review the students who applied after this subject was accepted
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Selected Count */}
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <p className="text-sm font-medium text-blue-900">
                Selected: {selectedApplicants.size} / {selectedSubject?.maxStudents}
              </p>
            </div>

            {/* Students List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {isLoadingApplications && (
                <p className="text-sm text-muted-foreground text-center py-6">Loading applicants...</p>
              )}
              {!isLoadingApplications && applicantRows.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No students have applied yet.</p>
              )}
              {applicantRows.map(({ application, student }) => (
                <div key={application.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <input
                    type="checkbox"
                    id={application.id}
                    checked={selectedApplicants.has(application.id)}
                    onChange={() => handleToggleApplicant(application.id)}
                    disabled={
                      application.status !== 'PENDING' ||
                      (selectedApplicants.size >= (selectedSubject?.maxStudents || 0) && !selectedApplicants.has(application.id))
                    }
                    className="w-4 h-4"
                  />
                  <label htmlFor={application.id} className="flex-1 cursor-pointer">
                    <p className="font-medium text-sm">{student?.name ?? application.studentId}</p>
                    <p className="text-xs text-muted-foreground">{student?.email ?? application.studentId}</p>
                  </label>
                  <Badge variant="outline" className="text-xs">{application.status.toLowerCase()}</Badge>
                  {application.status === 'PENDING' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => reviewApplicationMutation.mutate({ id: application.id, status: 'REJECTED' })}
                      disabled={reviewApplicationMutation.isPending}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplicantsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveApplicants} disabled={selectedApplicants.size === 0 || reviewApplicationMutation.isPending}>
              Assign {selectedApplicants.size} Student{selectedApplicants.size !== 1 ? 's' : ''}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
