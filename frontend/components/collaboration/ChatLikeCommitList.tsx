'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Download, FileIcon, AlertCircle } from 'lucide-react'
import type { Commit } from '@/models/commit.model'

interface ChatLikeCommitListProps {
  commits: Commit[]
  isLoading: boolean
  isReadOnly: boolean
  canDelete: (commit: Commit) => boolean
  onDelete: (commitId: string) => void
  isDeleting: boolean
  userRole?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
}

export function ChatLikeCommitList({
  commits,
  isLoading,
  isReadOnly,
  canDelete,
  onDelete,
  isDeleting,
  userRole
}: ChatLikeCommitListProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Card className="p-8 text-center">
          <p className="text-sm text-muted-foreground">Loading commits...</p>
        </Card>
      </div>
    )
  }

  if (commits.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-32 md:min-h-40"
      >
        <Card className="p-6 md:p-8 text-center border-dashed max-w-sm w-full">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">No commits yet</p>
          <p className="text-xs text-muted-foreground">
            {isReadOnly ? 'Waiting for teacher feedback...' : 'Start a conversation by adding your first feedback'}
          </p>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3 md:space-y-4"
    >
      <AnimatePresence mode="popLayout">
        {commits.map((commit) => (
          <motion.div
            key={commit.id}
            variants={itemVariants}
            layout
            className="flex gap-2 md:gap-3 group"
          >
            {/* Avatar */}
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs flex-shrink-0 mt-1">
              {commit.teacherAvatar}
            </div>

            {/* Message Bubble */}
            <div className="flex-1 space-y-2 min-w-0">
              {/* Header */}
              <div className="flex flex-col xs:flex-row xs:items-baseline gap-1 xs:gap-2">
                <span className="font-semibold text-sm md:text-base text-foreground truncate">
                  {commit.teacherName}
                </span>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatDate(commit.createdAt)}
                </span>
              </div>

              {/* Bubble Content */}
              <div className="bg-secondary/50 rounded-xl rounded-tl-sm p-3 md:p-4 border border-border/50 space-y-3">
                {/* Comment */}
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                  {commit.comment}
                </p>

                {/* Progress Badge */}
                <div className="flex flex-wrap gap-2 items-center pt-2 md:pt-3 border-t border-border/50">
                  <Badge variant="secondary" className="text-xs">
                    {commit.previousProgress}% → {commit.newProgress}%
                  </Badge>
                  <Badge variant="outline" className="text-xs text-green-600 dark:text-green-400">
                    +{commit.newProgress - commit.previousProgress}%
                  </Badge>
                </div>

                {/* Attachments */}
                {commit.attachments.length > 0 && (
                  <div className="pt-2 md:pt-3 border-t border-border/50 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Attachments</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {commit.attachments.map((att) => (
                        <a
                          key={att.id}
                          href={att.url}
                          download
                          className="flex items-center gap-2 p-2 rounded-lg bg-background hover:bg-foreground/5 transition-colors group/att border border-border/30"
                        >
                          <FileIcon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="text-xs text-foreground truncate font-medium flex-1">
                            {att.name}
                          </span>
                          <Download className="w-3 h-3 text-muted-foreground opacity-0 group-hover/att:opacity-100 flex-shrink-0 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delete Button (on hover) */}
            {!isReadOnly && canDelete(commit) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(commit.id)}
                disabled={isDeleting}
                className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1 h-8 w-8 p-0"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
