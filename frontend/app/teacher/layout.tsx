import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AcademicYearBanner } from "@/components/common/academic-year-banner"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Added hidden class to hide desktop sidebar on mobile */}
      <div className="hidden lg:block">
        <Sidebar role="teacher" />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Topbar title="Dashboard" role="teacher" />
        <AcademicYearBanner />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
