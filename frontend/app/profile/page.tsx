'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Redirect based on user role
    switch (user.role) {
      case 'student':
        router.push('/student/profile')
        break
      case 'teacher':
        router.push('/teacher/profile')
        break
      case 'coordinator':
        router.push('/coordinator/profile')
        break
      default:
        router.push('/auth/login')
    }
  }, [user, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-muted-foreground">Redirecting to profile...</div>
    </div>
  )
}
