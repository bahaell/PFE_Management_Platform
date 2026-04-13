'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Paperclip, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface Message {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  attachments?: { name: string; type: string }[]
}

interface ChatModalContentProps {
  projectId: number
  projectTitle: string
  onClose: () => void
}

export function ChatModalContent({ projectId, projectTitle, onClose }: ChatModalContentProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      author: 'Dr. Ahmed Hassan',
      avatar: 'AH',
      content: 'Great progress on the data preprocessing module. The accuracy improvements look promising.',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      author: 'Ahmed Mohamed',
      avatar: 'AM',
      content: 'Thanks! I implemented the optimization techniques we discussed last meeting. Should I proceed with the model training?',
      timestamp: '10:35 AM'
    },
    {
      id: 3,
      author: 'Dr. Ahmed Hassan',
      avatar: 'AH',
      content: 'Perfect. Before training, let\'s ensure the validation set has proper stratification.',
      timestamp: '10:40 AM'
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (messages.length > 0 && messages[messages.length - 1].author === 'Ahmed Mohamed') {
        setIsTyping(true)
        const responseTimer = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(responseTimer)
      }
    }, 1500)
    return () => clearTimeout(typingTimer)
  }, [messages])

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        author: 'Ahmed Mohamed',
        avatar: 'AM',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      }])
      setNewMessage('')
    }
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-background border-l border-border shadow-2xl flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-foreground truncate">{projectTitle}</h2>
          <p className="text-sm text-muted-foreground">Project Chat</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 sm:gap-3 ${msg.author === 'Ahmed Mohamed' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
              {msg.avatar}
            </div>
            <div className={`flex-1 min-w-0 ${msg.author === 'Ahmed Mohamed' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-medium text-foreground truncate">{msg.author}</p>
                <p className="text-xs text-muted-foreground flex-shrink-0">{msg.timestamp}</p>
              </div>
              <div className={`px-3 py-2 rounded-lg max-w-[85%] shadow-sm ${msg.author === 'Ahmed Mohamed' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                <p className="text-sm break-words">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold flex-shrink-0">
              AH
            </div>
            <div className="flex items-center gap-1 px-3 py-2 bg-secondary rounded-lg">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 sm:p-6 bg-muted/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button size="sm" variant="ghost" className="p-2 hover:bg-secondary flex-shrink-0 hidden sm:flex">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={handleSend} className="gap-1 flex-shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
