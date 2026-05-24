'use client'

import { useModalManager } from '@/hooks/use-modal-manager'
import { getZIndex, MODAL_Z_INDEX } from '@/lib/modal-system/modal-manager'
import { motion, AnimatePresence } from 'framer-motion'
import { TasksExpansionModalContent } from './tasks-expansion-modal-content'
import { AddTaskModalContent } from './add-task-modal-content'
import { EditTaskModalContent } from './edit-task-modal-content'
import { ChatModalContent } from './chat-modal-content'
import { CommitsModalContent } from './commits-modal-content'

const AnyTasksExpansionModalContent = TasksExpansionModalContent as any
const AnyAddTaskModalContent = AddTaskModalContent as any
const AnyEditTaskModalContent = EditTaskModalContent as any
const AnyChatModalContent = ChatModalContent as any
const AnyCommitsModalContent = CommitsModalContent as any

export function ModalRenderer() {
  const { stack, close } = useModalManager()
  
  const hasModals = stack.length > 0
  
  // Get all modals sorted by level
  const sortedModals = [...stack].sort((a, b) => a.level - b.level)
  
  return (
    <AnimatePresence>
      {hasModals && (
        <>
          {/* SINGLE BACKDROP for all modals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            style={{ zIndex: MODAL_Z_INDEX.BACKDROP }}
            onClick={() => {
              // Close top modal on backdrop click
              const topModal = sortedModals[sortedModals.length - 1]
              if (topModal) close(topModal.id)
            }}
          />
          
          {/* Render all modals in stack */}
          {sortedModals.map((modal, index) => {
            const zIndex = getZIndex(modal.level)
            const isTopModal = index === sortedModals.length - 1
            
            return (
              <div
                key={modal.id}
                style={{
                  zIndex,
                  pointerEvents: isTopModal ? 'auto' : 'none',
                  opacity: 1,
                }}
                className="fixed inset-0"
              >
                {modal.type === 'expand-tasks' && (
                  <AnyTasksExpansionModalContent
                    {...modal.props}
                    onClose={() => close(modal.id)}
                  />
                )}
                
                {modal.type === 'add-task' && (
                  <AnyAddTaskModalContent
                    {...modal.props}
                    onClose={() => close(modal.id)}
                  />
                )}
                
                {modal.type === 'edit-task' && (
                  <AnyEditTaskModalContent
                    {...modal.props}
                    onClose={() => close(modal.id)}
                  />
                )}

                {modal.type === 'chat' && (
                  <AnyChatModalContent
                    {...modal.props}
                    onClose={() => close(modal.id)}
                  />
                )}

                {modal.type === 'commits' && (
                  <AnyCommitsModalContent
                    {...modal.props}
                    onClose={() => close(modal.id)}
                  />
                )}
              </div>
            )
          })}
        </>
      )}
    </AnimatePresence>
  )
}
