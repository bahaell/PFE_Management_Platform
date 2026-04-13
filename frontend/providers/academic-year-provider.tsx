"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useAuth } from "@/providers/auth-provider"

export interface AcademicYear {
  id: string
  label: string
  startYear: number
  endYear: number
}

interface AcademicYearContextType {
  academicYear: AcademicYear
  setAcademicYear: (year: AcademicYear) => void
  availableYears: AcademicYear[]
  isCurrentYear: boolean
  canChangeYear: boolean
}

const AcademicYearContext = createContext<AcademicYearContextType | undefined>(undefined)

function generateAcademicYears(): AcademicYear[] {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1 // 1-12
  const currentYear = currentDate.getFullYear()

  // Determine the current academic year
  const currentAcademicStartYear = currentMonth >= 9 ? currentYear : currentYear - 1

  // Generate 5 years: 2 past, current, 2 future
  const years: AcademicYear[] = []
  for (let i = -2; i <= 2; i++) {
    const startYear = currentAcademicStartYear + i
    const endYear = startYear + 1
    years.push({
      id: `${startYear}-${endYear}`,
      label: `${startYear} / ${endYear}`,
      startYear,
      endYear,
    })
  }

  return years
}

function getCurrentAcademicYear(): AcademicYear {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const startYear = currentMonth >= 9 ? currentYear : currentYear - 1
  const endYear = startYear + 1

  return {
    id: `${startYear}-${endYear}`,
    label: `${startYear} / ${endYear}`,
    startYear,
    endYear,
  }
}

export function AcademicYearProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [academicYear, setAcademicYearState] = useState<AcademicYear>(getCurrentAcademicYear())
  const [availableYears] = useState<AcademicYear[]>(generateAcademicYears())

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selected_academic_year")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setAcademicYearState(parsed)
        } catch (e) {
          console.error("Failed to parse saved academic year:", e)
        }
      }
    }
  }, [])

  const setAcademicYear = (year: AcademicYear) => {
    setAcademicYearState(year)
    if (typeof window !== "undefined") {
      localStorage.setItem("selected_academic_year", JSON.stringify(year))
    }
  }

  const currentYear = getCurrentAcademicYear()
  const isCurrentYear = academicYear.id === currentYear.id

  const canChangeYear = user?.role !== "student"

  return (
    <AcademicYearContext.Provider
      value={{
        academicYear,
        setAcademicYear,
        availableYears,
        isCurrentYear,
        canChangeYear,
      }}
    >
      {children}
    </AcademicYearContext.Provider>
  )
}

export function useAcademicYear() {
  const context = useContext(AcademicYearContext)
  if (context === undefined) {
    throw new Error("useAcademicYear must be used within an AcademicYearProvider")
  }
  return context
}
