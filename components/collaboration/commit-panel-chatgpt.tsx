'use client'

import { useState, useRef, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { CommitService } from '@/services/service_commits'
import { AcademicDocumentsService } from '@/services/service_academic_documents'
import { ProjectsService } from '@/services/service_projects'
import { CommitSidebar } from './CommitSidebar'
import { ChatLikeCommitList } from './ChatLikeCommitList'
import { CommitInputBox } from './CommitInputBox'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import type { Commit } from '@/models/commit.model'

interface CommitPanelChatGPTProps {
  projectId: string
  userRole?: 'student' | 'teacher' | 'coordinator'
}

export function CommitPanelChatGPT({
  projectId,
  userRole = 'student'
}: CommitPanelChatGPTProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const commitsEndRef = useRef<HTMLDivElement>(null)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)

  const isReadOnly = userRole === 'student'

  const { data: documents = [], isLoading: docsLoading } = useQuery({
    queryKey: ['documents', projectId],
    queryFn: () => AcademicDocumentsService.getAllDocuments(),
    retry: 1,
    staleTime: 1000 * 60 * 5
  })

  const { data: allCommits = [], isLoading: commitsLoading } = useQuery({
    queryKey: ['commits', projectId],
    queryFn: () => CommitService.getCommits(projectId),
    retry: 1,
    staleTime: 1000 * 60
  })

  const { data: overallProgress = 0 } = useQuery({
    queryKey: ['overall-progress', projectId],
    queryFn: () => CommitService.getOverallProgress(projectId),
    retry: 1,
    staleTime: 1000 * 60
  })

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => ProjectsService.getProjectById(Number(projectId)),
    retry: 1,
    staleTime: 1000 * 60 * 5
  })

  const filteredCommits = useMemo(() => {
    if (selectedDocumentId === null) {
      return [...allCommits].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }
    return allCommits
      .filter(c => c.documentId === selectedDocumentId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [allCommits, selectedDocumentId])

  const addCommitMutation = useMutation({
    mutationFn: async (commitData: any) => {
      return CommitService.addCommit(commitData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commits', projectId] })
      queryClient.invalidateQueries({ queryKey: ['overall-progress', projectId] })
      toast({
        title: 'Success',
        description: 'Feedback added successfully'
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add feedback',
        variant: 'destructive'
      })
    }
  })

  const deleteCommitMutation = useMutation({
    mutationFn: (commitId: string) => CommitService.deleteCommit(commitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commits', projectId] })
      queryClient.invalidateQueries({ queryKey: ['overall-progress', projectId] })
      toast({
        title: 'Success',
        description: 'Feedback deleted'
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete feedback',
        variant: 'destructive'
      })
    }
  })

  return (
    <div className="flex h-full bg-background flex-col lg:flex-row">
      <div className="hidden lg:block">
        <CommitSidebar
          documents={documents}
          commits={allCommits}
          isLoading={docsLoading}
          selectedDocumentId={selectedDocumentId}
          onSelectDocument={setSelectedDocumentId}
          onNewCommit={() => { }}
          isReadOnly={isReadOnly}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-border bg-card p-3 md:p-4 space-y-3"
        >
          <div className="space-y-1">
            <h2 className="text-sm md:text-base font-semibold text-foreground truncate">
              {selectedDocumentId
                ? documents.find(d => d.id === selectedDocumentId)?.name
                : 'All Feedback'}
            </h2>
            {project && (
              <p className="text-xs text-muted-foreground line-clamp-1">{project.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Overall Progress</span>
              <span className="text-base md:text-lg font-bold text-primary">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </motion.div>

        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4">
          <ChatLikeCommitList
            commits={filteredCommits}
            isLoading={commitsLoading}
            isReadOnly={isReadOnly}
            canDelete={() => userRole === 'teacher'}
            onDelete={(commitId) => deleteCommitMutation.mutate(commitId)}
            isDeleting={deleteCommitMutation.isPending}
            userRole={userRole}
          />
          <div ref={commitsEndRef} />
        </div>

        {!isReadOnly && (
          <div className="border-t border-border bg-background p-3 md:p-4">
            <CommitInputBox
              onSubmit={(data) => addCommitMutation.mutate(data)}
              isLoading={addCommitMutation.isPending}
              previousProgress={filteredCommits.length > 0 ? filteredCommits[0].newProgress : overallProgress}
              currentProgress={overallProgress}
              projectId={projectId}
              documentId={selectedDocumentId}
            />
          </div>
        )}
      </div>
    </div>
  )
}
