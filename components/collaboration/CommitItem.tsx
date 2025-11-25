'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Download, FileIcon } from 'lucide-react'
import type { Commit } from '@/models/commit.model'

interface CommitItemProps {
  commit: Commit
  itemVariants: any
  canDelete: boolean
  onDelete: () => void
  isDeleting: boolean
}

export function CommitItem({
  commit,
  itemVariants,
  canDelete,
  onDelete,
  isDeleting
}: CommitItemProps) {
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

  return (
    <motion.div variants={itemVariants} layout>
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
            {canDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                disabled={isDeleting}
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
  )
}
