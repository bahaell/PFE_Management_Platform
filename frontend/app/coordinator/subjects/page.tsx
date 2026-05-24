'use client'

import { useState, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Filter, CheckCircle, XCircle, Clock, Zap, AlertCircle } from 'lucide-react'
import SubjectsService, { type SubjectStatus } from '@/services/service_subjects'
import ProposalsService, { type FreeSubjectProposalStatus } from '@/services/service_proposals'
import { useToast } from '@/hooks/use-toast'

type UiSubjectStatus = 'pending' | 'accepted' | 'rejected' | 'archived'

function mapSubjectStatus(status: SubjectStatus): UiSubjectStatus {
  switch (status) {
    case 'ACCEPTED':
    case 'APPROVED':
      return 'accepted'
    case 'REJECTED':
      return 'rejected'
    case 'ARCHIVED':
      return 'archived'
    default:
      return 'pending'
  }
}

interface Subject {
  id: string
  title: string
  description: string
  domain: string
  technologies: string[]
  status: UiSubjectStatus
  type: string
  academicYear: string
  companyName?: string
}

export default function CoordinatorSubjectsPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Queries
  const { data: apiSubjects = [], isLoading: isLoadingSubjects } = useQuery({
    queryKey: ['coordinator-subjects'],
    queryFn: () => SubjectsService.getAllSubjects(),
  })

  const { data: proposals = [], isLoading: isLoadingProposals } = useQuery({
    queryKey: ['coordinator-proposals'],
    queryFn: () => ProposalsService.getAllProposals(),
  })

  // Mutations
  const updateSubjectStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: SubjectStatus }) =>
      SubjectsService.updateSubjectStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coordinator-subjects'] })
    },
  })

  const acceptProposalMutation = useMutation({
    mutationFn: (id: string) => ProposalsService.acceptProposal(id),
    onSuccess: () => {
      toast({ title: 'Proposal Approved', description: 'The external subject is now validated.' })
      queryClient.invalidateQueries({ queryKey: ['coordinator-proposals'] })
    },
    onError: (error: any) => {
      toast({ title: 'Validation Failed', description: error.response?.data?.message || 'Error', variant: 'destructive' })
    }
  })

  const rejectProposalMutation = useMutation({
    mutationFn: (id: string) => ProposalsService.rejectProposal(id),
    onSuccess: () => {
      toast({ title: 'Proposal Rejected', description: 'The external subject has been rejected.' })
      queryClient.invalidateQueries({ queryKey: ['coordinator-proposals'] })
    },
    onError: (error: any) => {
      toast({ title: 'Rejection Failed', description: error.response?.data?.message || 'Error', variant: 'destructive' })
    }
  })

  // Subjects processing
  const subjects: Subject[] = useMemo(() => {
    return apiSubjects.map((subject) => ({
      id: String(subject.id),
      title: subject.title,
      description: subject.description,
      domain: subject.type === 'EXTERNAL' ? subject.companyName ?? 'External' : 'Internal',
      technologies: subject.technologies,
      status: mapSubjectStatus(subject.status),
      type: subject.type,
      academicYear: subject.academicYear,
      companyName: subject.companyName,
    }))
  }, [apiSubjects])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  
  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           s.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = !selectedStatus || s.status === selectedStatus
      return matchesSearch && matchesStatus
    })
  }, [subjects, searchQuery, selectedStatus])

  const filteredProposals = useMemo(() => {
    return proposals.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = !selectedStatus || p.status.toLowerCase() === selectedStatus.toLowerCase()
      return matchesSearch && matchesStatus
    })
  }, [proposals, searchQuery, selectedStatus])

  const handleAcceptInternal = (id: string) => {
    updateSubjectStatusMutation.mutate({ id, status: 'ACCEPTED' }, {
      onSuccess: () => toast({ title: 'Subject Accepted', description: 'The internal subject is now visible to students and teachers.' }),
    })
  }

  const handleRejectInternal = (id: string) => {
    updateSubjectStatusMutation.mutate({ id, status: 'REJECTED' }, {
      onSuccess: () => toast({ title: 'Subject Rejected', description: 'The internal subject has been rejected.', variant: 'destructive' }),
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected':
      case 'auto_rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'under_review':
        return <AlertCircle className="w-4 h-4 text-purple-500" />
      case 'archived':
        return <CheckCircle className="w-4 h-4 text-slate-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'accepted':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'rejected':
      case 'auto_rejected':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      case 'under_review':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
      case 'archived':
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800'
      default:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subject Validation"
        description="Review and validate both internal subjects and external proposals"
      />

      {/* Filter Bar */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, description or company..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <Tabs defaultValue="internal" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="internal">Internal Subjects ({subjects.length})</TabsTrigger>
          <TabsTrigger value="external">External Proposals ({proposals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="internal">
          {isLoadingSubjects ? (
            <div className="text-center py-12"><p className="text-sm text-muted-foreground">Loading...</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map((subject, idx) => (
                <motion.div key={subject.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <Card className={`h-full flex flex-col p-6 hover:shadow-lg transition-shadow border ${getStatusColor(subject.status)}`}>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="capitalize">{subject.status}</Badge>
                      {getStatusIcon(subject.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{subject.title}</h3>
                      <p className="text-sm text-muted-foreground">{subject.domain}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mt-4">{subject.description}</p>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {subject.technologies.slice(0, 3).map(tech => (
                        <Badge key={tech} variant="secondary" className="text-[10px]">{tech}</Badge>
                      ))}
                    </div>
                    {subject.status === 'pending' && (
                      <div className="flex gap-2 pt-4 border-t mt-4">
                        <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700" onClick={() => handleRejectInternal(subject.id)} disabled={updateSubjectStatusMutation.isPending}>
                          <XCircle className="w-4 h-4 mr-1" /> Reject
                        </Button>
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleAcceptInternal(subject.id)} disabled={updateSubjectStatusMutation.isPending}>
                          <CheckCircle className="w-4 h-4 mr-1" /> Accept
                        </Button>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="external">
          {isLoadingProposals ? (
            <div className="text-center py-12"><p className="text-sm text-muted-foreground">Loading...</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProposals.map((proposal, idx) => (
                <motion.div key={proposal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                  <Card className={`h-full flex flex-col p-6 hover:shadow-lg transition-shadow border ${getStatusColor(proposal.status)}`}>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="capitalize">
                        {proposal.status === 'AUTO_REJECTED' ? 'Blacklisted (Auto Reject)' : proposal.status.replace('_', ' ')}
                      </Badge>
                      {getStatusIcon(proposal.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground line-clamp-2 mb-1">{proposal.title}</h3>
                      <p className="text-sm font-medium text-primary flex items-center gap-1">
                        🏢 {proposal.companyName}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1 mt-4">{proposal.description}</p>
                    
                    <div className="bg-background/50 rounded p-2 text-xs text-muted-foreground mt-4">
                      <p><strong>Student ID:</strong> {proposal.studentId}</p>
                      <p><strong>Academic Year:</strong> {proposal.academicYear}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-4 mb-4">
                      {proposal.technologies.slice(0, 3).map(tech => (
                        <Badge key={tech} variant="secondary" className="text-[10px]">{tech}</Badge>
                      ))}
                    </div>
                    
                    {proposal.status === 'PENDING' && (
                      <div className="pt-4 border-t text-xs text-muted-foreground italic text-center">
                        Waiting for teacher review before coordinator validation.
                      </div>
                    )}

                    {proposal.status === 'UNDER_REVIEW' && (
                      <div className="flex flex-col gap-2 pt-4 border-t">
                        <div className="text-xs text-center text-purple-600 bg-purple-100 rounded py-1 mb-1">
                          Teacher approved. Ready for final validation.
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700" onClick={() => rejectProposalMutation.mutate(proposal.id)} disabled={rejectProposalMutation.isPending}>
                            <XCircle className="w-4 h-4 mr-1" /> Reject
                          </Button>
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => acceptProposalMutation.mutate(proposal.id)} disabled={acceptProposalMutation.isPending}>
                            <CheckCircle className="w-4 h-4 mr-1" /> Accept (Final)
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
              
              {filteredProposals.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No external proposals found.</p>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
