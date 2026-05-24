'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, Eye } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { SubjectsService } from '@/services/service_subjects'
import type { SubjectApplication } from '@/services/service_subjects'

export default function ApplicationsPage() {
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: () => SubjectsService.getApplicationsByStudent(),
  })

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [viewingId, setViewingId] = useState<string | null>(null)

  const queryClient = useQueryClient()

  const cancelMutation = useMutation({
    mutationFn: (id: string) => SubjectsService.cancelApplication(id),
    onSuccess: () => {
      // refresh applications list
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      queryClient.invalidateQueries({ queryKey: ['subject-applications'] })
      setDeleteId(null)
    },
  })

  const handleDelete = (id: string) => {
    // call cancel API
    cancelMutation.mutate(id)
  }

  const viewingApplication: SubjectApplication | undefined = viewingId ? (applications as SubjectApplication[]).find((a) => String(a.id) === String(viewingId)) : undefined

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="My Applications" description="Loading..." />
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Applications"
        description="Track your project subject applications"
      />

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Subject</th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Area</th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Status</th>
                <th className="text-left px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Date</th>
                <th className="text-right px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(applications as SubjectApplication[]).map((application) => (
                <tr key={application.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-medium">{application.subjectTitle}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground">{/* area not available on application, leave blank or show subjectTitle */}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <StatusBadge status={String(application.status).toLowerCase() as any} />
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{application.createdAt ?? application.updatedAt}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                    <div className="flex gap-2 justify-end flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setViewingId(String(application.id))}
                        className="gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      {application.status === 'PENDING' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive gap-1"
                          onClick={() => setDeleteId(String(application.id))}
                        >
                          <Trash2 className="w-3 h-3" />
                          <span className="hidden sm:inline">Cancel</span>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {applications.length === 0 && (
        <div className="text-center py-12 bg-card rounded-lg border border-border">
          <p className="text-sm sm:text-base text-muted-foreground">No applications yet. Browse subjects to get started!</p>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 w-full max-w-sm">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Cancel Application?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button variant="outline" onClick={() => setDeleteId(null)} className="w-full sm:w-auto">
                Keep
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(deleteId)} className="w-full sm:w-auto">
                Cancel Application
              </Button>
            </div>
          </div>
        </div>
      )}

      {viewingId && viewingApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 w-full max-w-md">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Application Details</h3>
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-muted-foreground">Subject</p>
                <p className="text-sm sm:text-base font-medium text-foreground">{viewingApplication.subjectTitle}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Area</p>
                <p className="text-sm sm:text-base font-medium text-foreground">{viewingApplication.subjectId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <div className="mt-1">
                  <StatusBadge status={String(viewingApplication.status).toLowerCase() as any} />
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Application Date</p>
                <p className="text-sm sm:text-base font-medium text-foreground">{viewingApplication.createdAt ?? viewingApplication.updatedAt}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setViewingId(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
      
    </div>
  )
}
