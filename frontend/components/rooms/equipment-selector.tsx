import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Projector, Monitor, Volume2, Mic, Video, Wind, Network, Wifi, ScreenShare, Presentation } from 'lucide-react'
import type { Equipment } from '@/lib/room-mock-data'

interface EquipmentSelectorProps {
  equipment: Equipment
  onChange: (equipment: Equipment) => void
  readOnly?: boolean
}

const EQUIPMENT_CONFIG = [
  { key: 'projector', label: 'Projector', icon: Projector },
  { key: 'smartBoard', label: 'Smart Board', icon: Presentation },
  { key: 'screen', label: 'Screen', icon: ScreenShare },
  { key: 'speakers', label: 'Speakers', icon: Volume2 },
  { key: 'microphone', label: 'Microphone', icon: Mic },
  { key: 'hdmiSystem', label: 'HDMI System', icon: Monitor },
  { key: 'recordingCamera', label: 'Recording Camera', icon: Video },
  { key: 'airConditioning', label: 'Air Conditioning', icon: Wind },
  { key: 'ethernet', label: 'Ethernet', icon: Network },
  { key: 'wifi', label: 'WiFi', icon: Wifi }
] as const

export function EquipmentSelector({ equipment, onChange, readOnly = false }: EquipmentSelectorProps) {
  const handleToggle = (key: keyof Equipment) => {
    if (readOnly) return
    
    onChange({
      ...equipment,
      [key]: {
        ...equipment[key],
        present: !equipment[key].present,
        status: equipment[key].present ? 'missing' : 'ok'
      }
    })
  }

  const handleStatusChange = (key: keyof Equipment, status: 'ok' | 'maintenance' | 'missing') => {
    if (readOnly) return
    
    onChange({
      ...equipment,
      [key]: {
        ...equipment[key],
        status,
        present: status !== 'missing'
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EQUIPMENT_CONFIG.map(({ key, label, icon: Icon }) => {
          const item = equipment[key]
          const statusColor = item.status === 'ok' 
            ? 'text-green-600' 
            : item.status === 'maintenance' 
            ? 'text-yellow-600' 
            : 'text-gray-400'

          return (
            <div key={key} className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
              <Checkbox
                id={key}
                checked={item.present}
                onCheckedChange={() => handleToggle(key)}
                disabled={readOnly}
                className="mt-1"
              />
              <div className="flex-1 space-y-2">
                <Label
                  htmlFor={key}
                  className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                >
                  <Icon className={`w-4 h-4 ${statusColor}`} />
                  {label}
                </Label>
                
                {item.present && !readOnly && (
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(key, e.target.value as any)}
                    className="w-full text-xs px-2 py-1 border rounded bg-background"
                  >
                    <option value="ok">Working</option>
                    <option value="maintenance">In Maintenance</option>
                  </select>
                )}
                
                {item.present && readOnly && (
                  <span className="text-xs text-muted-foreground">
                    {item.status === 'ok' ? 'Working' : 'In Maintenance'}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
