'use client'

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Search, Filter, Users, Mail, Award, Eye, Calendar } from 'lucide-react'
import { StudentsService } from '@/services/service_students'
import { SchedulerRequestModal } from '@/components/teacher/scheduler-request-modal'
import type { StudentProfile } from '@/models/student.model'

interface StudentWithProgress extends StudentProfile {
  projectTitle?: string
  projectProgress?: number
}

export default function TeacherStudentsPage() {
  const { data: students = [] } = useQuery({
    queryKey: ['teacher-students'],
    queryFn: () => StudentsService.getAllStudents(),
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<StudentWithProgress | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isRequestDefenseOpen, setIsRequestDefenseOpen] = useState(false)

  const studentsList: StudentWithProgress[] = useMemo(() => {
    const projects = ['AI in Healthcare', 'Blockchain Voting', 'IoT Smart City']
    const progressList = [65, 80, 45]
    return students.map((s, idx) => ({
      ...s,
      projectTitle: projects[idx % projects.length],
      projectProgress: progressList[idx % progressList.length],
    }))
  }, [students])

  const levels = useMemo(() => [...new Set(studentsList.map(s => s.level))], [studentsList])
  const statuses = ['In Progress', 'Completed', 'On Hold']

  const filteredStudents = useMemo(() => {
    return studentsList.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           s.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLevel = !selectedLevel || s.level === selectedLevel
      const matchesStatus = !selectedStatus || 'In Progress' === selectedStatus
      return matchesSearch && matchesLevel && matchesStatus
    })
  }, [studentsList, searchQuery, selectedLevel, selectedStatus])

  const handleViewDetails = (student: StudentWithProgress) => {
    setSelectedStudent(student)
    setIsDetailsOpen(true)
  }

  const handleRequestDefense = (student: StudentWithProgress) => {
    setSelectedStudent(student)
    setIsRequestDefenseOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students Under Supervision"
        description="Monitor and manage your assigned students"
      />

      {/* Filter Bar */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students by name or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Level:</span>
            </div>
            {levels.map(level => (
              <Badge
                key={level}
                variant={selectedLevel === level ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
              >
                {level}
              </Badge>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Status:</span>
            {statuses.map(status => (
              <Badge
                key={status}
                variant={selectedStatus === status ? 'secondary' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6 space-y-4 flex flex-col h-full">
              {/* Header with Avatar */}
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                    {student.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {student.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {student.department}
                  </p>
                </div>
                <Badge variant="outline">{student.level}</Badge>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${student.email}`} className="hover:text-foreground truncate">
                  {student.email}
                </a>
              </div>

              {/* Project Info */}
              {student.projectTitle && (
                <div className="space-y-2 py-2 border-y">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {student.projectTitle}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{student.projectProgress}%</span>
                    </div>
                    <Progress value={student.projectProgress} className="h-2" />
                  </div>
                </div>
              )}

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {student.skills?.slice(0, 2).map(skill => (
                  <Badge key={skill.id} variant="secondary" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
                {student.skills && student.skills.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{student.skills.length - 2}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 mt-auto">
                <Button 
                  size="sm" 
                  variant="default" 
                  className="flex-1"
                  onClick={() => handleViewDetails(student)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleRequestDefense(student)}
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Request Defense
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-muted-foreground">No students found matching your filters</p>
        </div>
      )}

      {/* Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Complete information about the student
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Header */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white text-lg">
                    {selectedStudent.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-muted-foreground">{selectedStudent.department}</p>
                  <Badge className="mt-2">{selectedStudent.level}</Badge>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2 border-t pt-4">
                <h3 className="font-semibold">Contact Information</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Email:</strong> {selectedStudent.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Phone:</strong> {selectedStudent.phone || 'N/A'}
                </p>
              </div>

              {/* Project Information */}
              {selectedStudent.projectTitle && (
                <div className="space-y-3 border-t pt-4">
                  <h3 className="font-semibold">Project</h3>
                  <p className="text-sm font-medium">{selectedStudent.projectTitle}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">{selectedStudent.projectProgress}%</span>
                    </div>
                    <Progress value={selectedStudent.projectProgress} />
                  </div>
                </div>
              )}

              {/* Skills */}
              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.skills?.map(skill => (
                    <Badge key={skill.id} variant="secondary">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedStudent && (
        <SchedulerRequestModal
          isOpen={isRequestDefenseOpen}
          onClose={() => setIsRequestDefenseOpen(false)}
          student={{
            id: selectedStudent.id,
            name: selectedStudent.name,
            projectTitle: selectedStudent.projectTitle || 'Unknown Project',
            subject: selectedStudent.department || 'Unknown Subject',
            supervisorName: 'Your Name', // Replace with actual supervisor
          }}
        />
      )}
    </div>
  )
}
