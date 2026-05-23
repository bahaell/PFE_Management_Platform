'use client'

import { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { CommitService } from '@/services/service_commits'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, Send, Trash2, FileIcon, Download, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import type { Commit } from '@/models/commit.model'

interface CommitPanelProps {
  projectId?: string
  isReadOnly?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  exit: { opacity: 0, y: -20 }
}

export function CommitPanel({ projectId = '1', isReadOnly = false }: CommitPanelProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const commitsEndRef = useRef<HTMLDivElement>(null)

  const [comment, setComment] = useState('')
  const [newProgress, setNewProgress] = useState(70)
  const [attachmentFiles, setAttachmentFiles] = useState<{ id: string; name: string; url: string; type: string }[]>([])

  const { data: commits = [], isLoading } = useQuery({
    queryKey: ['commits', projectId],
    queryFn: () => CommitService.getCommits()
  })

  const { data: overallProgress = 0 } = useQuery({
    queryKey: ['commits-progress', projectId],
    queryFn: () => CommitService.getOverallProgress()
  })

  const addCommitMutation = useMutation({
    mutationFn: async () => {
      if (!comment.trim()) {
        throw new Error('Comment is required')
      }
      if (newProgress < 0 || newProgress > 100) {
        throw new Error('Progress must be between 0 and 100')
      }

      const previousProgress = commits.length > 0 ? commits[0].newProgress : 0
      return CommitService.addCommit({
        teacherId: 'teacher-1',
        teacherName: 'Dr. Ahmed Hassan',
        teacherAvatar: 'AH',
        comment: comment.trim(),
        previousProgress,
        newProgress,
        attachments: attachmentFiles
      })
    },
    onSuccess: () => {
      setComment('')
      setNewProgress(overallProgress + 10)
      setAttachmentFiles([])
      queryClient.invalidateQueries({ queryKey: ['commits', projectId] })
      queryClient.invalidateQueries({ queryKey: ['commits-progress', projectId] })
      toast({
        title: 'Success',
        description: 'Commit added successfully!',
        variant: 'default'
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
      queryClient.invalidateQueries({ queryKey: ['commits-progress', projectId] })
      toast({
        title: 'Success',
        description: 'Commit deleted successfully!'
      })
    }
  })

  const scrollToBottom = () => {
    commitsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (!isLoading) {
      scrollToBottom()
    }
  }, [commits, isLoading])

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isSubmitDisabled = !comment.trim() || newProgress < 0 || newProgress > 100 || addCommitMutation.isPending

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Overall Progress Bar */}
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
            {commits.map((commit) => (
              <motion.div
                key={commit.id}
                variants={itemVariants}
                layout
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4 sm:p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {commit.teacherAvatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-foreground text-sm truncate">
                            {commit.teacherName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(commit.createdAt)}
                          </p>
                        </div>
                      </div>
                      {!isReadOnly && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCommitMutation.mutate(commit.id)}
                          disabled={deleteCommitMutation.isPending}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>

                    {/* Comment */}
                    <p className="text-sm text-foreground leading-relaxed">
                      {commit.comment}
                    </p>

                    {/* Progress Evolution */}
                    <div className="bg-background rounded-lg p-4 space-y-3 border border-border">
                      <div className="text-xs font-semibold text-muted-foreground uppercase">Progress Evolution</div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">Previous</div>
                          <div className="text-lg font-bold text-foreground">{commit.previousProgress}%</div>
                        </div>
                        <div className="text-2xl text-muted-foreground">→</div>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">New</div>
                          <div className="text-lg font-bold text-primary">{commit.newProgress}%</div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-border">
                        <div className="text-xs font-semibold text-green-600 dark:text-green-400">
                          +{commit.newProgress - commit.previousProgress}% improvement
                        </div>
                      </div>
                    </div>

                    {/* Attachments */}
                    {commit.attachments.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Attachments</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {commit.attachments.map((att) => (
                            <a
                              key={att.id}
                              href={att.url}
                              download
                              className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-secondary transition-colors group"
                            >
                              <FileIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground flex-shrink-0" />
                              <span className="text-xs text-foreground truncate font-medium flex-1">
                                {att.name}
                              </span>
                              <Download className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 flex-shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
        <div ref={commitsEndRef} />
      </div>

      {/* Add Commit Section (Teacher Only) */}
      {!isReadOnly && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-0 bg-card rounded-lg border border-border p-4 sm:p-6 space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Plus className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Add Feedback</h3>
          </div>

          <div className="space-y-4">
            {/* Comment Input */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">
                Feedback Comment
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your feedback and observations..."
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Progress Input */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">
                New Progress: <span className="text-primary font-bold">{newProgress}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={newProgress}
                onChange={(e) => setNewProgress(Number(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">
                Attachments (Optional)
              </label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    const newAttachments = files.map(f => ({
                      id: `att-${Date.now()}-${Math.random()}`,
                      name: f.name,
                      url: URL.createObjectURL(f),
                      type: f.type.split('/')[0]
                    }))
                    setAttachmentFiles([...attachmentFiles, ...newAttachments])
                  }}
                  className="flex-1"
                />
              </div>
              {attachmentFiles.length > 0 && (
                <div className="mt-2 space-y-2">
                  {attachmentFiles.map((att) => (
                    <div
                      key={att.id}
                      className="flex items-center justify-between p-2 rounded bg-secondary text-sm"
                    >
                      <span className="truncate text-foreground">{att.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAttachmentFiles(attachmentFiles.filter(a => a.id !== att.id))}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              onClick={() => addCommitMutation.mutate()}
              disabled={isSubmitDisabled}
              className="w-full"
              size="lg"
            >
              <Send className="w-4 h-4 mr-2" />
              {addCommitMutation.isPending ? 'Sending...' : 'Send Feedback'}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
