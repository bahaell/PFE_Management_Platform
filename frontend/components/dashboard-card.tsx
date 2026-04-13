'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface DashboardCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
  delay?: number
}

export function DashboardCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className,
  delay = 0
}: DashboardCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      className={cn('bg-card rounded-lg border border-border p-4 sm:p-6 shadow-sm', className)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">{title}</p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 }}
            className="text-xl sm:text-2xl font-bold text-foreground mt-1 sm:mt-2"
          >
            {value}
          </motion.p>
          {description && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.2 }}
              className="text-xs text-muted-foreground mt-1 sm:mt-2"
            >
              {description}
            </motion.p>
          )}
        </div>
        {icon && (
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: delay + 0.15
            }}
            className="text-primary flex-shrink-0"
          >
            {icon}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
