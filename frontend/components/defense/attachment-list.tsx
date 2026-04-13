import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'

interface Attachment {
  id: string
  name: string
  url: string
  type: string
}

interface AttachmentListProps {
  attachments: Attachment[]
}

export function AttachmentList({ attachments }: AttachmentListProps) {
  if (!attachments || attachments.length === 0) return null

  return (
    <Card className="p-6">
      <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <FileText className="w-4 h-4 text-muted-foreground" />
        Attachments
      </h4>
      <div className="space-y-2">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-foreground">{attachment.name}</span>
            </div>
            <Button size="sm" variant="ghost">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
