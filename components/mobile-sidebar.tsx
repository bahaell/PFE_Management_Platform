'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Sidebar } from './sidebar'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface MobileSidebarProps {
  role: 'student' | 'teacher' | 'coordinator'
}

export function MobileSidebar({ role }: MobileSidebarProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </motion.button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 h-full">
        <div onClick={() => setOpen(false)} className="h-full">
          <Sidebar role={role} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
