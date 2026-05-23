'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronLeft, ChevronRight, Plus, MessageSquare, FileText, Folder } from 'lucide-react'
import type { Commit } from '@/models/commit.model'
import type { ProjectDocument } from '@/models/document.model'
import { cn } from '@/lib/utils'

interface CommitSidebarProps {
  documents: ProjectDocument[]
  commits: Commit[]
  isLoading: boolean
  selectedDocumentId: string | null
  onSelectDocument: (docId: string | null) => void
  onNewCommit: () => void
  isReadOnly?: boolean
}

export function CommitSidebar({
  documents,
  commits,
  isLoading,
  selectedDocumentId,
  onSelectDocument,
  onNewCommit,
  isReadOnly = false
}: CommitSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  const commitsGroupedByDoc = useMemo(() => {
    const groups: Record<string, Commit[]> = {
      'global': []
    }
    
    documents.forEach(doc => {
      groups[doc.id] = []
    })

    commits.forEach(commit => {
      if (commit.documentId) {
        groups[commit.documentId]?.push(commit)
      } else {
        groups['global'].push(commit)
      }
    })

    return groups
  }, [commits, documents])

  return (
    <motion.div
      initial={{ width: isOpen ? 280 : 70 }}
      animate={{ width: isOpen ? 280 : 70 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="border-r border-border bg-card h-full flex flex-col overflow-hidden relative"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xs font-bold uppercase tracking-widest text-foreground"
            >
              Commits
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="h-8 w-8 p-0"
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* New Commit Button */}
      {!isReadOnly && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-3 py-2 border-b border-border"
        >
          <Button
            onClick={onNewCommit}
            size="sm"
            className="w-full gap-2 text-xs"
            variant="secondary"
          >
            <Plus className="w-3.5 h-3.5" />
            New Commit
          </Button>
        </motion.div>
      )}

      {/* Scroll Area */}
      <ScrollArea className="flex-1">
        <div className="px-2 py-3 space-y-2">
          {/* Global Commits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={() => onSelectDocument(null)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2',
                selectedDocumentId === null
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Folder className="w-4 h-4 flex-shrink-0" />
              {isOpen && (
                <>
                  <span className="flex-1 truncate">All Commits</span>
                  <span className="text-xs bg-background/50 px-1.5 rounded">
                    {commitsGroupedByDoc['global'].length}
                  </span>
                </>
              )}
            </button>
          </motion.div>

          {/* Documents with Commits */}
          {documents.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <button
                onClick={() => onSelectDocument(doc.id)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 group',
                  selectedDocumentId === doc.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                {isOpen && (
                  <>
                    <span className="flex-1 truncate">{doc.name}</span>
                    {commitsGroupedByDoc[doc.id]?.length > 0 && (
                      <span className="text-xs bg-background/50 px-1.5 rounded">
                        {commitsGroupedByDoc[doc.id].length}
                      </span>
                    )}
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Info */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-3 py-3 border-t border-border text-xs text-muted-foreground bg-secondary/20"
        >
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{commits.length} total commits</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
