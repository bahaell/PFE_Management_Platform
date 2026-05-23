'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Paperclip, Smile, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChat } from '@/hooks/use-chat'
import { useAuth } from '@/providers/auth-provider'
import { usePresence } from '@/hooks/use-presence'

interface ProjectChatPanelProps {
  projectId: string
  participantsIds: string[] // List of user IDs in the project to track typing status
}

export function ProjectChatPanel({ projectId, participantsIds }: ProjectChatPanelProps) {
  const { user } = useAuth()
  const { messages, loading, sendMsg, setTypingState } = useChat({ projectId })
  const { presenceMap } = usePresence(participantsIds)

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
    if (e.target.value.trim() !== '') {
      setTypingState(true)
    } else {
      setTypingState(false)
    }
  }

  // Find if anyone else is typing
  const typingUsers = Object.values(presenceMap).filter(
    (p) => p.typing && p.userId !== user?.id
  )
  const isTyping = typingUsers.length > 0
  const typingUserName = typingUsers.length === 1 ? typingUsers[0].userId : 'Someone' // We don't have their name in presence map, usually you'd lookup

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 flex-shrink-0">Project Chat</h3>
      
      {/* Messages Container */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-3 sm:space-y-4 pr-2">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-muted-foreground text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === user?.id
            return (
              <div key={msg.id} className={`flex gap-2 sm:gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0 ${isMe ? 'bg-primary' : 'bg-muted-foreground'}`}>
                  {msg.senderAvatar}
                </div>
                <div className={`flex-1 min-w-0 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-medium text-foreground truncate">{msg.senderName}</p>
                    <p className="text-xs text-muted-foreground flex-shrink-0">
                      {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                    </p>
                  </div>
                  <div className={`px-3 py-2 rounded-lg max-w-[85%] shadow-sm ${isMe ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'}`}>
                    <p className="text-xs sm:text-sm break-words">{msg.content}</p>
                  </div>
                </div>
              </div>
            )
          })
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold flex-shrink-0">
              ...
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
      <div className="flex-shrink-0 border-t border-border pt-3 sm:pt-4 mt-3 sm:mt-4">
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
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
