"use client"

import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAcademicYear } from "@/providers/academic-year-provider"
import { Calendar } from "lucide-react"

export function AcademicYearSelect() {
  const { academicYear, setAcademicYear, availableYears, canChangeYear } = useAcademicYear()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="hidden md:flex items-center gap-2"
    >
      <Calendar className="w-4 h-4 text-muted-foreground" />
      <Select
        value={academicYear.id}
        onValueChange={(value) => {
          const selected = availableYears.find((y) => y.id === value)
          if (selected) {
            setAcademicYear(selected)
          }
        }}
        disabled={!canChangeYear}
      >
        <SelectTrigger className="w-[160px] bg-secondary border-0 focus:ring-0 focus:ring-offset-0 h-9">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {availableYears.map((year) => (
            <SelectItem key={year.id} value={year.id}>
              {year.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  )
}
