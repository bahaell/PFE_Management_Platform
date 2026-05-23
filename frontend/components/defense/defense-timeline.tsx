import { Card } from '@/components/ui/card'
import { Clock, Users, MessageSquare, CheckCircle } from 'lucide-react'

export function DefenseTimeline() {
  const steps = [
    { icon: Clock, label: 'Start Time', time: '10:30', color: 'text-blue-600' },
    { icon: Users, label: 'Presentation', time: '20 min', color: 'text-purple-600' },
    { icon: MessageSquare, label: 'Questions', time: '15 min', color: 'text-yellow-600' },
    { icon: Users, label: 'Jury Deliberation', time: '10 min', color: 'text-orange-600' },
    { icon: CheckCircle, label: 'End', time: '11:15', color: 'text-green-600' }
  ]

  return (
    <Card className="p-6">
      <h4 className="text-sm font-semibold text-foreground mb-4">Defense Timeline</h4>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-accent/10 ${step.color}`}>
              <step.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{step.label}</p>
              <p className="text-xs text-muted-foreground">{step.time}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-[1.75rem] top-10 w-0.5 h-8 bg-border" />
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
