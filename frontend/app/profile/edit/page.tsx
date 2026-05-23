"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from "@/providers/auth-provider"
import { useEffect } from "react"

export default function ProfileEditPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login')
      return
    }

    // Redirect to role-specific profile edit page
    switch (user.role) {
      case 'student':
        router.replace('/student/profile/edit')
        break
      case 'teacher':
        router.replace('/teacher/profile/edit')
        break
      case 'coordinator':
        router.replace('/coordinator/profile/edit')
        break
      default:
        router.replace('/auth/login')
    }
  }, [user, router])

  return null
}
