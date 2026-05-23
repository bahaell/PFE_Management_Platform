import { Sidebar } from '@/components/sidebar'
import { ProtectedRoute } from '@/components/protected-route'

interface RoleLayoutProps {
  children: React.ReactNode
  params: Promise<{ role: string }>
}

export default async function RoleLayout({ children, params }: RoleLayoutProps) {
  const { role } = await params
  const validRoles = ['student', 'teacher', 'coordinator']

  if (!validRoles.includes(role)) {
    return <div>Invalid role</div>
  }

  return (
    <ProtectedRoute allowedRoles={[role]}>
      <div className="flex h-screen bg-background">
        <Sidebar role={role as any} />
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </ProtectedRoute>
  )
}
