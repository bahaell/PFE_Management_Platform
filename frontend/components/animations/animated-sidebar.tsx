"use client"

import { motion } from "framer-motion"
import { sidebarVariants } from "@/lib/animations/variants"

interface AnimatedSidebarProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedSidebar({ children, className }: AnimatedSidebarProps) {
  return (
    <motion.aside
      initial="initial"
      animate="animate"
      variants={sidebarVariants}
      className={className}
    >
      {children}
    </motion.aside>
  )
}
