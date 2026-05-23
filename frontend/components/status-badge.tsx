import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'pending' | 'validated' | 'rejected' | 'completed' | 'assigned'
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    validated: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    assigned: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  }

  return (
    <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full capitalize', statusStyles[status], className)}>
      {status}
    </span>
  )
}
