import { cn } from '@/lib/utils'
import { GraduationCap, BookOpen, Shield } from 'lucide-react'

interface RoleBadgeProps {
  role: 'student' | 'teacher' | 'coordinator'
  size?: 'sm' | 'md' | 'lg'
}

export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  }

  const roleConfig = {
    student: {
      label: 'Student',
      icon: GraduationCap,
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    },
    teacher: {
      label: 'Teacher',
      icon: BookOpen,
      className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
    },
    coordinator: {
      label: 'Coordinator',
      icon: Shield,
      className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    },
  }

  const config = roleConfig[role]
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold rounded-full',
        config.className,
        sizeClasses[size]
      )}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      {config.label}
    </span>
  )
}
