'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { CommitPanelChatGPT } from '@/components/collaboration/commit-panel-chatgpt'
import { Button } from '@/components/ui/button'

interface CommitsModalContentProps {
  projectId: string
  onClose: () => void
}

export function CommitsModalContent({ projectId, onClose }: CommitsModalContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 flex items-center justify-center p-4"
    >
      <div className="bg-card rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Project Feedback</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content - Updated to use CommitPanelChatGPT instead of CommitPanel */}
        <div className="flex-1 overflow-hidden">
          <CommitPanelChatGPT projectId={projectId} userRole="teacher" />
        </div>
      </div>
    </motion.div>
  )
}
