"use client"

import { redirect } from 'next/navigation'
import { useAuth } from "@/providers/auth-provider"
import { useEffect } from "react"

export default function ProfileEditPage() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      redirect('/auth/login')
      return
    }

    // Redirect to role-specific profile edit page
    switch (user.role) {
      case 'student':
        redirect('/student/profile/edit')
        break
      case 'teacher':
        redirect('/teacher/profile/edit')
        break
      case 'coordinator':
        redirect('/coordinator/profile/edit')
        break
      default:
        redirect('/auth/login')
    }
  }, [user])

  return null
}
