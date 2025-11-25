"use client"

import { motion } from "framer-motion"
import { cardVariants } from "@/lib/animations/variants"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  disableHover?: boolean
}

export function AnimatedCard({ 
  children, 
  className, 
  delay = 0,
  disableHover = false 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover={disableHover ? undefined : "hover"}
      whileTap={disableHover ? undefined : "tap"}
      variants={cardVariants}
      transition={{ delay, duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
