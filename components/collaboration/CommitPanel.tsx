'use client'

import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { CommitService } from '@/services/service_commits'
import { ProjectsService } from '@/services/service_projects'
import { CommitForm } from './CommitForm'
import { CommitItem } from './CommitItem'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/providers/auth-provider'
import type { Commit } from '@/models/commit.model'

interface CommitPanelProps {
  projectId: string
  isReadOnly?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  exit: { opacity: 0, y: -20 }
}

export function CommitPanel({ projectId, isReadOnly = false }: CommitPanelProps) {
  const { toast } = useToast()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const commitsEndRef = useRef<HTMLDivElement>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Fetch commits for this project
  const { data: commits = [], isLoading } = useQuery({
    queryKey: ['commits', projectId],
    queryFn: () => CommitService.getCommits(projectId),
    refetchInterval: 5000
  })

  // Fetch overall progress
  const { data: overallProgress = 0 } = useQuery({
    queryKey: ['overall-progress', projectId],
    queryFn: () => CommitService.getOverallProgress(projectId),
    refetchInterval: 5000
  })

  // Fetch project details for progress validation
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => ProjectsService.getProjectById(Number(projectId))
  })

  const addCommitMutation = useMutation({
    mutationFn: async (commitData: Omit<Commit, 'id' | 'createdAt'>) => {
      return CommitService.addCommit(commitData)
    },
    onSuccess: (commit) => {
      queryClient.invalidateQueries({ queryKey: ['commits', projectId] })
      queryClient.invalidateQueries({ queryKey: ['overall-progress', projectId] })
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      
      setIsFormOpen(false)
      toast({
        title: 'Success',
        description: `Commit added — progression mise à jour à ${commit.newProgress}%.`
      })
      
      setTimeout(() => commitsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
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
        description: 'Commit deleted successfully!'
      })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete commit',
        variant: 'destructive'
      })
    }
  })

  // Auto-scroll to bottom
  useEffect(() => {
    if (!isLoading && commits.length > 0) {
      setTimeout(() => commitsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
    }
  }, [commits.length, isLoading])

  const canEditDelete = user?.role === 'teacher'

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-card rounded-lg border border-border p-4"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Overall Progress</span>
            <span className="text-lg font-bold text-primary">{overallProgress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Commits List */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2">
        {isLoading ? (
          <Card className="p-8 text-center">
            <p className="text-sm text-muted-foreground">Loading commits...</p>
          </Card>
        ) : commits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center h-40"
          >
            <Card className="p-8 text-center border-dashed">
              <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground mb-1">No commits yet</p>
              <p className="text-xs text-muted-foreground">
                {isReadOnly ? 'Waiting for teacher feedback...' : 'Add your first feedback commit'}
              </p>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {commits.map((commit) => (
                <CommitItem
                  key={commit.id}
                  commit={commit}
                  itemVariants={itemVariants}
                  canDelete={canEditDelete && user?.id === commit.teacherId}
                  onDelete={() => deleteCommitMutation.mutate(commit.id)}
                  isDeleting={deleteCommitMutation.isPending}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        <div ref={commitsEndRef} />
      </div>

      {/* Add Commit Button (Teacher Only) */}
      {!isReadOnly && user?.role === 'teacher' && (
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Feedback
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Commit</DialogTitle>
            </DialogHeader>
            <CommitForm
              projectId={projectId}
              previousProgress={commits.length > 0 ? commits[0].newProgress : 0}
              onSubmit={(data) => addCommitMutation.mutate(data)}
              isLoading={addCommitMutation.isPending}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
