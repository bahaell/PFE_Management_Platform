"use client"

import { motion } from "framer-motion"
import { slideUp } from "@/lib/animations/variants"

interface AnimatedTabsContentProps {
  children: React.ReactNode
  className?: string
  value: string
  activeValue: string
}

export function AnimatedTabsContent({ 
  children, 
  className, 
  value, 
  activeValue 
}: AnimatedTabsContentProps) {
  if (value !== activeValue) return null
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={slideUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}
