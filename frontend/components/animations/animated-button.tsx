"use client"

import { motion } from "framer-motion"
import { buttonVariants } from "@/lib/animations/variants"
import { Button, ButtonProps } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode
}

export function AnimatedButton({ children, ...props }: AnimatedButtonProps) {
  return (
    <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
      <Button {...props}>{children}</Button>
    </motion.div>
  )
}
