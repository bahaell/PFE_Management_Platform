import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react'

interface RoomStatusBadgeProps {
  status: 'available' | 'occupied' | 'maintenance' | 'unavailable'
  className?: string
}

export function RoomStatusBadge({ status, className = '' }: RoomStatusBadgeProps) {
  const config = {
    available: {
      label: 'Available',
      className: 'bg-green-100 text-green-800 border-green-300',
      icon: CheckCircle2
    },
    occupied: {
      label: 'In Use',
      className: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: Clock
    },
    maintenance: {
      label: 'Maintenance',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: AlertTriangle
    },
    unavailable: {
      label: 'Unavailable',
      className: 'bg-red-100 text-red-800 border-red-300',
      icon: XCircle
    }
  }

  const { label, className: badgeClass, icon: Icon } = config[status]

  return (
    <Badge variant="outline" className={`${badgeClass} ${className} flex items-center gap-1.5`}>
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  )
}
