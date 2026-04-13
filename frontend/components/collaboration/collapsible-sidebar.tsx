'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CollapsibleSidebarProps {
  children: React.ReactNode
  side: 'left' | 'right'
  onCollapsedChange?: (collapsed: boolean) => void
  icon?: React.ReactNode
}

export function CollapsibleSidebar({
  children,
  side,
  onCollapsedChange,
  icon,
}: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleToggle = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    onCollapsedChange?.(newState)
  }

  return (
    <div className="relative h-full flex">
      <div
        className={cn(
          'transition-all duration-300 ease-out overflow-hidden flex flex-col border-r border-border',
          isCollapsed ? 'w-0' : 'w-full'
        )}
      >
        <div className="flex items-center justify-between mb-4 px-4 pt-3 pb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="ml-auto h-8 w-8 hover:bg-accent"
            title="Collapse sidebar"
          >
            {side === 'left' ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>

      {isCollapsed && (
        <div className="w-14 bg-card border-r border-border flex flex-col items-center justify-start pt-3 gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent"
            title={side === 'left' ? 'Expand project info' : 'Expand participants'}
          >
            {side === 'left' ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
          {icon && (
            <div className="text-xs text-muted-foreground mt-2">
              {icon}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
