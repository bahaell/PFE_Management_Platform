'use client'

import { useState } from 'react'
import { Award, TrendingUp, Zap } from 'lucide-react'

interface ProjectMetric {
  label: string
  current: number
  target: number
  color: string
  icon: React.ReactNode
}

export function ProjectFlow() {
  const metrics: ProjectMetric[] = [
    {
      label: 'Deliverables Completed',
      current: 3,
      target: 5,
      color: 'from-blue-500 to-blue-600',
      icon: <Award className="w-5 h-5" />
    },
    {
      label: 'Code Quality Score',
      current: 82,
      target: 100,
      color: 'from-green-500 to-green-600',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      label: 'Documentation %',
      current: 65,
      target: 100,
      color: 'from-purple-500 to-purple-600',
      icon: <Zap className="w-5 h-5" />
    }
  ]

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Project Flow & Metrics</h3>
      
      <div className="space-y-8">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color} text-white`}>
                  {metric.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{metric.label}</p>
                  <p className="text-xs text-muted-foreground">Progress Overview</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{metric.current}</p>
                <p className="text-xs text-muted-foreground">of {metric.target}</p>
              </div>
            </div>

            {/* Circular Flow Progress */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1">
                <svg width="100%" height="8" className="min-h-2">
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={metric.color.includes('blue') ? '#3b82f6' : metric.color.includes('green') ? '#10b981' : '#a855f7'} />
                      <stop offset="100%" stopColor={metric.color.includes('blue') ? '#1e40af' : metric.color.includes('green') ? '#047857' : '#7e22ce'} />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="100%" height="8" rx="4" fill="#e5e7eb" opacity="0.3" />
                  <rect 
                    x="0" y="0" 
                    width={`${(metric.current / metric.target) * 100}%`} 
                    height="8" rx="4" 
                    fill={`url(#gradient-${index})`}
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-foreground w-14 text-right">
                {Math.round((metric.current / metric.target) * 100)}%
              </span>
            </div>

            {/* Mini Timeline Dots */}
            <div className="flex gap-1">
              {Array.from({ length: metric.target }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    i < metric.current 
                      ? `bg-gradient-to-r ${metric.color}` 
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
