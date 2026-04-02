"use client"

import { User, ChevronDown, LogOut, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/providers/auth-provider"
import { useTheme } from "next-themes"
import { MobileSidebar } from "./mobile-sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { AcademicYearSelect } from "@/components/common/academic-year-select"
import { NotificationPanel } from "@/components/notifications/NotificationPanel"

interface TopbarProps {
  title: string
  role?: "student" | "teacher" | "coordinator"
}

export function Topbar({ title, role }: TopbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { logout, user } = useAuth()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="bg-card border-b border-border h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        {role && <MobileSidebar role={role} />}
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-base sm:text-lg font-semibold text-foreground truncate"
        >
          {title}
        </motion.h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <AcademicYearSelect />

        {/* 🔔 Real Notification Panel — calls notification-service on port 8085 */}
        <NotificationPanel userId={user?.id ?? ""} />

        <div className="relative" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="hidden sm:block w-4 h-4 text-muted-foreground" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50"
              >
                <motion.div whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}>
                  <Link
                    href={`/${role}/profile`}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-foreground transition-colors border-b border-border"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark")
                    setDropdownOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground transition-colors border-b border-border text-left"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" />
                      Dark Mode
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                  onClick={() => {
                    logout()
                    setDropdownOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-destructive transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
