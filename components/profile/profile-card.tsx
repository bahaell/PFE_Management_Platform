import { ReactNode } from 'react'

interface ProfileCardProps {
  title: string
  children: ReactNode
  icon?: ReactNode
}

export function ProfileCard({ title, children, icon }: ProfileCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  )
}
