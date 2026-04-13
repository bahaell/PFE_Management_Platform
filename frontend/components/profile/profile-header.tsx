'use client'

import { User, Mail, Phone, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface ProfileHeaderProps {
  name: string
  email: string
  phone: string
  role: 'student' | 'teacher' | 'coordinator'
  avatar?: string
}

export function ProfileHeader({ name, email, phone, role, avatar }: ProfileHeaderProps) {
  const router = useRouter()

  const getRoleColor = () => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      case 'teacher':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
      case 'coordinator':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleEditClick = () => {
    router.push(`/${role}/profile/edit`)
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-bold text-primary-foreground">{name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">{name}</h1>
            <Badge className={`mb-3 ${getRoleColor()}`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {phone}
              </div>
            </div>
          </div>
        </div>
        <Button onClick={handleEditClick} className="gap-2 w-full md:w-auto">
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>
    </div>
  )
}
