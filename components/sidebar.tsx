"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Bell,
  Users,
  Plus,
  ClipboardList,
  Calendar,
  Settings,
  LogOut,
  Building2,
  Briefcase,
} from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { motion } from "framer-motion"

interface SidebarProps {
  role: "student" | "teacher" | "coordinator"
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const getMenuItems = () => {
    const baseItems = [
      {
        label: "Dashboard",
        href: `/${role}`,
        icon: LayoutDashboard,
      },
    ]

    if (role === "student") {
      return [
        ...baseItems,
        { label: "Subjects", href: `/${role}/subjects`, icon: BookOpen },
        { label: "Applications", href: `/${role}/applications`, icon: FileText },
        { label: "My Project", href: `/${role}/project`, icon: ClipboardList },
        { label: "External Subject", href: `/${role}/free-subject`, icon: Briefcase },
        { label: "Documents", href: `/${role}/documents`, icon: FileText },
        { label: "Defense Timeline", href: `/${role}/defenses/timeline`, icon: Calendar },
        { label: "Notifications", href: `/${role}/notifications`, icon: Bell },
      ]
    } else if (role === "teacher") {
      return [
        ...baseItems,
        { label: "Subjects", href: `/${role}/subjects`, icon: BookOpen },
        { label: "New Subject", href: `/${role}/new-subject`, icon: Plus },
        { label: "Students", href: `/${role}/students`, icon: Users },
        { label: "Projects", href: `/${role}/projects`, icon: ClipboardList },
        { label: "External Requests", href: `/${role}/free-requests`, icon: Briefcase },
        { label: "Documents", href: `/${role}/documents`, icon: FileText },
        { label: "Defenses", href: `/${role}/defenses`, icon: Calendar },
        { label: "Defense Timeline", href: `/${role}/defenses/timeline`, icon: Calendar },
        { label: "Notifications", href: `/${role}/notifications`, icon: Bell },
      ]
    } else {
      return [
        ...baseItems,
        { label: "Subjects", href: `/${role}/subjects`, icon: BookOpen },
        { label: "Projects", href: `/${role}/projects`, icon: ClipboardList },
        { label: "Companies", href: `/${role}/companies`, icon: Building2 },
        { label: "Documents", href: `/${role}/documents`, icon: FileText },
        { label: "Defenses", href: `/${role}/defenses`, icon: Calendar },
        { label: "Defense Timeline", href: `/${role}/defenses/timeline`, icon: Calendar },
        { label: "Rooms", href: `/${role}/rooms`, icon: Settings },
        { label: "Statistics", href: `/${role}/statistics`, icon: LayoutDashboard },
        { label: "Notifications", href: `/${role}/notifications`, icon: Bell },
      ]
    }
  }

  const menuItems = getMenuItems()

  return (
    <motion.aside
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex w-64 bg-card text-foreground border-r border-border h-screen flex-col"
    >
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">PFE Platform</h1>
        <p className="text-xs text-muted-foreground mt-1 capitalize">{role} Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors relative overflow-hidden",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <motion.div whileHover={{ scale: 1.1, rotate: isActive ? 0 : 5 }} transition={{ duration: 0.2 }}>
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-lg -z-10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  )
}
