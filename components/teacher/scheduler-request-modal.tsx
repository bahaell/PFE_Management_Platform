'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { SchedulerService } from '@/services/service_scheduler'

interface SchedulerRequestModalProps {
  isOpen: boolean
  onClose: () => void
  student: {
    id: number
    name: string
    projectTitle: string
    subject: string
    supervisorName: string
  }
}

const PRIORITY_COLORS = {
  low: { bg: 'bg-blue-100 dark:bg-blue-900/30', circle: 'bg-blue-500', label: 'text-blue-700 dark:text-blue-300' },
  medium: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', circle: 'bg-yellow-500', label: 'text-yellow-700 dark:text-yellow-300' },
  high: { bg: 'bg-red-100 dark:bg-red-900/30', circle: 'bg-red-500', label: 'text-red-700 dark:text-red-300' },
}

export function SchedulerRequestModal({ isOpen, onClose, student }: SchedulerRequestModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    dateFrom: '',
    dateTo: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    comment: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.dateFrom) {
      newErrors.dateFrom = 'Start date is required'
    }
    if (!formData.dateTo) {
      newErrors.dateTo = 'End date is required'
    }
    if (formData.dateFrom && formData.dateTo && formData.dateFrom > formData.dateTo) {
      newErrors.dateTo = 'End date must be after start date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isFormValid = formData.dateFrom && formData.dateTo && formData.dateFrom <= formData.dateTo

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await SchedulerService.createPendingRequest({
        id: 0,
        project: {
          id: `proj-${student.id}`,
          studentName: student.name,
          subject: student.projectTitle,
          assignedTeacher: {
            id: 'current-teacher',
            name: student.supervisorName,
            email: 'teacher@university.edu',
            phone: '',
            gender: 'Male',
            birthdate: '',
            avatar: '',
            role: 'teacher',
            grade: 'Professor',
            speciality: '',
            department: '',
            bio: '',
            researchInterests: '',
            yearsOfExperience: 0,
            skills: [],
          },
          skills: [],
          status: 'pending',
        },
        requestedDateRange: {
          from: formData.dateFrom,
          to: formData.dateTo,
        },
        priority: formData.priority,
      })

      toast({
        title: 'Success',
        description: 'Defense scheduling request sent to the coordinator.',
        variant: 'default',
      })

      setFormData({
        dateFrom: '',
        dateTo: '',
        priority: 'medium',
        comment: '',
      })
      setErrors({})
      onClose()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send request. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const priorityColor = PRIORITY_COLORS[formData.priority]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg p-4 md:p-6">
        <DialogHeader>
          <DialogTitle>Request Defense Scheduling</DialogTitle>
          <DialogDescription>
            Schedule a defense for the student project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-sm font-semibold mb-3 text-foreground">Project Overview</h3>
            <Card className="p-3 md:p-4 bg-muted/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">Student Name</p>
                  <p className="font-medium text-foreground mt-1">{student.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">Supervisor</p>
                  <p className="font-medium text-foreground mt-1">{student.supervisorName}</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Project Title</p>
                  <p className="font-medium text-foreground mt-1 line-clamp-2">{student.projectTitle}</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Subject</p>
                  <p className="font-medium text-foreground mt-1 line-clamp-2">{student.subject}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Request Details</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Start Date</label>
              <Input
                type="date"
                value={formData.dateFrom}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, dateFrom: e.target.value }))
                  setErrors(prev => ({ ...prev, dateFrom: '' }))
                }}
                className={errors.dateFrom ? 'border-destructive' : ''}
              />
              {errors.dateFrom && (
                <p className="text-xs text-destructive">{errors.dateFrom}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">End Date</label>
              <Input
                type="date"
                value={formData.dateTo}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, dateTo: e.target.value }))
                  setErrors(prev => ({ ...prev, dateTo: '' }))
                }}
                className={errors.dateTo ? 'border-destructive' : ''}
              />
              {errors.dateTo && (
                <p className="text-xs text-destructive">{errors.dateTo}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Priority</label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as 'low' | 'medium' | 'high' }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      High
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className={`p-2 rounded-md flex items-center gap-2 ${priorityColor.bg}`}>
                <div className={`w-3 h-3 rounded-full ${priorityColor.circle}`}></div>
                <span className={`text-xs font-medium uppercase ${priorityColor.label}`}>
                  {formData.priority} Priority
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Comment (Optional)</label>
              <Textarea
                placeholder="Add a note for the coordinator..."
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                className="resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 flex flex-col md:flex-row md:justify-end">
          <Button variant="outline" onClick={onClose} disabled={isLoading} className="w-full md:w-auto">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid || isLoading} className="w-full md:w-auto">
            {isLoading ? 'Sending...' : 'Submit Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
