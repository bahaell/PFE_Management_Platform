import { Projector, Monitor, Volume2, Mic, Video, Wind, Network, Wifi, ScreenShare, Presentation } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Equipment } from '@/lib/room-mock-data'

interface EquipmentIconsProps {
  equipment: Equipment
  className?: string
}

const EQUIPMENT_ICONS = {
  projector: { icon: Projector, label: 'Projector' },
  smartBoard: { icon: Presentation, label: 'Smart Board' },
  screen: { icon: ScreenShare, label: 'Screen' },
  speakers: { icon: Volume2, label: 'Speakers' },
  microphone: { icon: Mic, label: 'Microphone' },
  hdmiSystem: { icon: Monitor, label: 'HDMI' },
  recordingCamera: { icon: Video, label: 'Camera' },
  airConditioning: { icon: Wind, label: 'AC' },
  ethernet: { icon: Network, label: 'Ethernet' },
  wifi: { icon: Wifi, label: 'WiFi' }
} as const

export function EquipmentIcons({ equipment, className = '' }: EquipmentIconsProps) {
  return (
    <TooltipProvider>
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {Object.entries(EQUIPMENT_ICONS).map(([key, { icon: Icon, label }]) => {
          const item = equipment[key as keyof Equipment]
          
          if (!item.present) return null

          const statusColor = item.status === 'ok'
            ? 'text-green-600 bg-green-50'
            : item.status === 'maintenance'
            ? 'text-yellow-600 bg-yellow-50'
            : 'text-gray-400 bg-gray-50'

          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <div className={`p-1.5 rounded-md ${statusColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">
                  {item.status === 'ok' ? 'Working' : 'In Maintenance'}
                </p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
