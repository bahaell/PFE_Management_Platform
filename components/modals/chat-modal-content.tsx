'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useChat } from '@/hooks/use-chat'
import { useAuth } from '@/providers/auth-provider'

interface ChatModalContentProps {
  projectId: number | string
  projectTitle: string
  onClose: () => void
}

export function ChatModalContent({ projectId, projectTitle, onClose }: ChatModalContentProps) {
  const { user } = useAuth()
  const { messages, loading, sendMsg, setTypingState } = useChat({ projectId: String(projectId) })

  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (newMessage.trim()) {
      await sendMsg(newMessage)
      setNewMessage('')
      setTypingState(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
    setTypingState(e.target.value.trim() !== '')
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-background border-l border-border shadow-2xl flex flex-col z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border bg-muted/30 flex-shrink-0">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-foreground truncate">{projectTitle}</h2>
          <p className="text-sm text-muted-foreground">Project Chat (Live)</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full gap-2 text-muted-foreground">
            <p className="text-sm">No messages yet.</p>
            <p className="text-xs">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === user?.id
            return (
              <div key={msg.id} className={`flex gap-2 sm:gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0 ${isMe ? 'bg-primary' : 'bg-muted-foreground'}`}>
                  {msg.senderAvatar}
                </div>
                <div className={`flex-1 min-w-0 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-medium text-foreground truncate">{msg.senderName}</p>
                    <p className="text-xs text-muted-foreground flex-shrink-0">
                      {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                  <div className={`px-3 py-2 rounded-lg max-w-[85%] shadow-sm ${isMe ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                    <p className="text-sm break-words">{msg.content}</p>
                  </div>
                </div>
              </div>
            )
          })
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 sm:p-6 bg-muted/10 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button size="sm" variant="ghost" className="p-2 hover:bg-secondary flex-shrink-0 hidden sm:flex">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={handleSend} className="gap-1 flex-shrink-0" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
