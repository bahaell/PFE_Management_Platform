"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAcademicYear } from "@/providers/academic-year-provider"
import { Info } from "lucide-react"

export function AcademicYearBanner() {
  const { isCurrentYear, academicYear } = useAcademicYear()

  return (
    <AnimatePresence>
      {!isCurrentYear && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900 px-4 sm:px-6 py-2"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-amber-800 dark:text-amber-200">
            <Info className="w-4 h-4" />
            <span>
              Viewing previous year: <strong>{academicYear.label}</strong> — Read-only mode
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
