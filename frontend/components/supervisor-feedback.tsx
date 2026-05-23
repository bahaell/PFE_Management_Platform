'use client'

import { MessageCircle, ThumbsUp, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

interface Feedback {
  id: string
  date: string
  supervisor: string
  type: 'positive' | 'improvement' | 'critical'
  title: string
  message: string
  phase: string
}

export function SupervisorFeedback() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const feedbacks: Feedback[] = [
    {
      id: '1',
      date: 'Dec 10, 2024',
      supervisor: 'Dr. Ahmed Hassan',
      type: 'positive',
      title: 'Excellent Architecture Design',
      message: 'Your system architecture demonstrates strong understanding of design patterns. The separation of concerns is well implemented.',
      phase: 'Phase 2'
    },
    {
      id: '2',
      date: 'Dec 5, 2024',
      supervisor: 'Dr. Ahmed Hassan',
      type: 'improvement',
      title: 'Documentation Needed',
      message: 'Please add more detailed comments to complex functions and update the API documentation with examples.',
      phase: 'Phase 2'
    },
    {
      id: '3',
      date: 'Nov 28, 2024',
      supervisor: 'Dr. Ahmed Hassan',
      type: 'critical',
      title: 'Performance Optimization Required',
      message: 'The current implementation has query optimization issues. Consider implementing caching strategies.',
      phase: 'Phase 2'
    }
  ]

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Supervisor Feedback</h3>
        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full font-semibold">
          {feedbacks.length} feedback
        </span>
      </div>

      <div className="space-y-3">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            onClick={() => setExpandedId(expandedId === feedback.id ? null : feedback.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              feedback.type === 'positive' 
                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950' 
                : feedback.type === 'improvement' 
                ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950'
                : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950'
            }`}
          >
            <div className="flex items-start gap-3 mb-2">
              <div className={`p-2 rounded-lg mt-0.5 ${
                feedback.type === 'positive' 
                  ? 'bg-green-200 dark:bg-green-800' 
                  : feedback.type === 'improvement' 
                  ? 'bg-yellow-200 dark:bg-yellow-800'
                  : 'bg-red-200 dark:bg-red-800'
              }`}>
                {feedback.type === 'positive' && <CheckCircle2 className="w-4 h-4 text-green-700 dark:text-green-200" />}
                {feedback.type === 'improvement' && <AlertCircle className="w-4 h-4 text-yellow-700 dark:text-yellow-200" />}
                {feedback.type === 'critical' && <AlertCircle className="w-4 h-4 text-red-700 dark:text-red-200" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold text-sm ${
                    feedback.type === 'positive' ? 'text-green-900 dark:text-green-100' :
                    feedback.type === 'improvement' ? 'text-yellow-900 dark:text-yellow-100' :
                    'text-red-900 dark:text-red-100'
                  }`}>
                    {feedback.title}
                  </h4>
                  <span className="text-xs font-medium text-muted-foreground">{feedback.phase}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{feedback.supervisor} • {feedback.date}</p>
              </div>
            </div>

            {expandedId === feedback.id && (
              <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                <p className={`text-sm leading-relaxed ${
                  feedback.type === 'positive' ? 'text-green-800 dark:text-green-200' :
                  feedback.type === 'improvement' ? 'text-yellow-800 dark:text-yellow-200' :
                  'text-red-800 dark:text-red-200'
                }`}>
                  {feedback.message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
