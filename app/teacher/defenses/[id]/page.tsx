'use client'

import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { MOCK_TEACHER_DEFENSES } from '@/lib/teacher-defense-mock-data'
import { ProjectInfoCard } from '@/components/defense/project-info-card'
import { DefenseCard } from '@/components/defense/defense-card'
import { JuryList } from '@/components/defense/jury-list'
import { DefenseTimeline } from '@/components/defense/defense-timeline'
import { AttachmentList } from '@/components/defense/attachment-list'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function DefenseDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params
  const defense = MOCK_TEACHER_DEFENSES.find(d => d.id === id)

  if (!defense) {
    return (
      <div className="space-y-6">
        <PageHeader title="Defense Not Found" description="The requested defense could not be found" />
        <Link href="/teacher/defenses">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Defenses
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/teacher/defenses">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <PageHeader
          title="Defense Details"
          description={`${defense.student.name} • ${defense.subject.title}`}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Project Info */}
        <div className="lg:col-span-1 space-y-6">
          <ProjectInfoCard defense={defense} />
        </div>

        {/* Right Column - Defense Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Defense Header Card */}
          <DefenseCard defense={defense} />

          {/* Jury Composition */}
          <JuryList jury={defense.jury} />

          {/* Timeline */}
          <DefenseTimeline />

          {/* Attachments */}
          {defense.attachments && defense.attachments.length > 0 && (
            <AttachmentList attachments={defense.attachments} />
          )}

          {/* Comments */}
          {defense.comments && defense.comments.length > 0 && (
            <Card className="p-6">
              <h4 className="text-sm font-semibold text-foreground mb-4">Comments & Notes</h4>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {defense.comments.map((comment) => (
                    <div key={comment.id} className="p-3 rounded-lg bg-accent/5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">{comment.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(comment.timestamp).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
