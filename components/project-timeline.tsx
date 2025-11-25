'use client'

import { useState } from 'react'
import { ChevronRight, Calendar, Users, BookOpen, CheckCircle2 } from 'lucide-react'

interface Phase {
  id: string
  name: string
  status: 'completed' | 'in-progress' | 'pending'
  progress: number
  startDate: string
  endDate: string
  icon: React.ReactNode
  description: string
}

export function ProjectTimeline() {
  const [activePhase, setActivePhase] = useState<string>('phase-2')

  const phases: Phase[] = [
    {
      id: 'phase-1',
      name: 'Planning & Research',
      status: 'completed',
      progress: 100,
      startDate: 'Jan 15',
      endDate: 'Feb 10',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Literature review and project scope definition'
    },
    {
      id: 'phase-2',
      name: 'Development',
      status: 'in-progress',
      progress: 65,
      startDate: 'Feb 11',
      endDate: 'Apr 30',
      icon: <Users className="w-5 h-5" />,
      description: 'Implementation and prototype development'
    },
    {
      id: 'phase-3',
      name: 'Testing & Refinement',
      status: 'pending',
      progress: 0,
      startDate: 'May 1',
      endDate: 'May 31',
      icon: <CheckCircle2 className="w-5 h-5" />,
      description: 'QA and final adjustments'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Project Journey</h3>
        
        {/* Interactive Timeline */}
        <div className="space-y-4">
          {phases.map((phase, index) => (
            <div key={phase.id}>
              <button
                onClick={() => setActivePhase(phase.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  activePhase === phase.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                    : 'border-border bg-secondary hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      phase.status === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                      phase.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900' :
                      'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <div className={
                        phase.status === 'completed' ? 'text-green-600 dark:text-green-400' :
                        phase.status === 'in-progress' ? 'text-blue-600 dark:text-blue-400' :
                        'text-gray-400'
                      }>
                        {phase.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{phase.name}</h4>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${activePhase === phase.id ? 'rotate-90' : ''}`} />
                </div>

                {/* Progress Arc */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`}
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground w-12 text-right">{phase.progress}%</span>
                </div>
              </button>

              {/* Phase Details */}
              {activePhase === phase.id && (
                <div className="mt-3 ml-4 p-4 bg-secondary rounded-lg space-y-3 animate-in fade-in duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Start Date</p>
                      <p className="text-sm font-semibold text-foreground">{phase.startDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">End Date</p>
                      <p className="text-sm font-semibold text-foreground">{phase.endDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      phase.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' :
                      phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {phase.status === 'completed' && 'Completed'}
                      {phase.status === 'in-progress' && 'In Progress'}
                      {phase.status === 'pending' && 'Pending'}
                    </span>
                  </div>
                </div>
              )}

              {/* Connecting line */}
              {index < phases.length - 1 && (
                <div className="h-2 ml-6 bg-gradient-to-b from-border to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
