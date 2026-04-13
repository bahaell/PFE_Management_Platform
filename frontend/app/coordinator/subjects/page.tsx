'use client'

import { useState, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Search, Filter, CheckCircle, XCircle, Clock, Zap } from 'lucide-react'
import { ProjectsService } from '@/services/service_projects'
import { useToast } from '@/hooks/use-toast'

interface Subject {
  id: number
  title: string
  description: string
  teacher: string
  teacherAvatar: string
  domain: string
  technologies: string[]
  status: 'pending' | 'accepted' | 'rejected'
}

export default function CoordinatorSubjectsPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const { data: projects = [] } = useQuery({
    queryKey: ['coordinator-subjects'],
    queryFn: () => ProjectsService.getAllProjects(),
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)

  const subjects: Subject[] = useMemo(() => {
    const teachers = ['Dr. Ahmed Hassan', 'Eng. Fatima Zahra', 'Prof. Mohammed Ali']
    const avatars = ['AH', 'FZ', 'MA']
    return projects.map((p, idx) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      teacher: teachers[idx % teachers.length],
      teacherAvatar: avatars[idx % avatars.length],
      domain: p.subject,
      technologies: ['Python', 'React', 'Node.js'],
      status: ['pending', 'accepted', 'rejected'][idx % 3] as const,
    }))
  }, [projects])

  const domains = useMemo(() => [...new Set(subjects.map(s => s.domain))], [subjects])
  const statuses = ['pending', 'accepted', 'rejected']

  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           s.teacher.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = !selectedStatus || s.status === selectedStatus
      const matchesDomain = !selectedDomain || s.domain === selectedDomain
      return matchesSearch && matchesStatus && matchesDomain
    })
  }, [subjects, searchQuery, selectedStatus, selectedDomain])

  const handleAccept = (id: number) => {
    toast({
      title: 'Subject Accepted',
      description: 'The subject has been validated.',
    })
    queryClient.invalidateQueries({ queryKey: ['coordinator-subjects'] })
  }

  const handleReject = (id: number) => {
    toast({
      title: 'Subject Rejected',
      description: 'The subject has been rejected.',
      variant: 'destructive',
    })
    queryClient.invalidateQueries({ queryKey: ['coordinator-subjects'] })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'rejected':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subject Validation"
        description="Review and approve/reject pending subjects from teachers"
      />

      {/* Filter Bar */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects or teachers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Status:</span>
            </div>
            {statuses.map(status => (
              <Badge
                key={status}
                variant={selectedStatus === status ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
              >
                {status}
              </Badge>
            ))}
          </div>

          {/* Domain Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Domain:</span>
            {domains.map(domain => (
              <Badge
                key={domain}
                variant={selectedDomain === domain ? 'secondary' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedDomain(selectedDomain === domain ? null : domain)}
              >
                {domain}
              </Badge>
            ))}
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
            <Card className={`h-full overflow-hidden hover:shadow-lg transition-shadow border ${getStatusColor(subject.status)}`}>
              <div className="p-6 space-y-4 flex flex-col h-full">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {subject.status}
                  </Badge>
                  {getStatusIcon(subject.status)}
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                    {subject.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{subject.domain}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                  {subject.description}
                </p>

                {/* Teacher Info */}
                <div className="flex items-center gap-2 py-2 border-t">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white text-xs font-semibold">
                      {subject.teacherAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{subject.teacher}</p>
                    <p className="text-xs text-muted-foreground">Teacher</p>
                  </div>
                </div>

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

                {/* Actions */}
                {subject.status === 'pending' && (
                  <div className="flex gap-2 pt-4 border-t mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-red-600 hover:text-red-700"
                      onClick={() => handleReject(subject.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleAccept(subject.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                  </div>
                )}
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
          <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-muted-foreground">No subjects found matching your filters</p>
        </motion.div>
      )}
    </div>
  )
}
