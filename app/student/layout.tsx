import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar role="student" />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Topbar title="Dashboard" role="student" />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
