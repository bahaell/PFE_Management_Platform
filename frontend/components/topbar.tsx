"use client"

import { Bell, User, ChevronDown, LogOut, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/providers/auth-provider"
import { useTheme } from "next-themes"
import { MobileSidebar } from "./mobile-sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { AcademicYearSelect } from "@/components/common/academic-year-select"

interface TopbarProps {
  title: string
  role?: "student" | "teacher" | "coordinator"
}

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    title: "New Project Feedback",
    message: "Dr. Ahmed Hassan left feedback on your project",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Deadline Reminder",
    message: "Project submission deadline is in 3 days",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Defense Schedule",
    message: "Your defense has been scheduled for March 25",
    time: "2 hours ago",
    unread: false,
  },
]

export function Topbar({ title, role }: TopbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const { logout } = useAuth()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const unreadCount = mockNotifications.filter((n) => n.unread).length

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

        <div className="relative" ref={notificationsRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Bell className="w-5 h-5 text-foreground" />
            {unreadCount > 0 && (
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"
              />
            )}
          </motion.button>

          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-screen max-w-[calc(100vw-2rem)] sm:w-80 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
              >
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full"
                      >
                        {unreadCount} new
                      </motion.span>
                    )}
                  </div>
                </div>

                <div className="divide-y divide-border">
                  {mockNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                      className={`p-4 transition-colors cursor-pointer ${notification.unread ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-foreground">{notification.title}</p>
                            {notification.unread && <span className="w-2 h-2 bg-primary rounded-full" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-3 border-t border-border">
                  <Link
                    href="/student/notifications"
                    className="block text-center text-sm text-primary hover:text-primary/80 transition-colors"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
