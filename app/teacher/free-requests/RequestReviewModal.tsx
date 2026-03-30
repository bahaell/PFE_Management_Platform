"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { FreeSubjectRequest } from "@/models/freeSubject.model"
import { updateRequestStatus } from "@/services/freeSubjectService"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, AlertCircle, CheckCircle2, TrendingUp, Briefcase, User, Target } from "lucide-react"

interface RequestReviewModalProps {
  request: FreeSubjectRequest | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: () => void
}

export function RequestReviewModal({ request, open, onOpenChange, onStatusChange }: RequestReviewModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  if (!request) return null

  const currentLoad = 3
  const maxCapacity = 5
  const loadPercentage = (currentLoad / maxCapacity) * 100

  const handleAccept = async () => {
    setIsLoading(true)
    setError("")
    try {
      await updateRequestStatus(request.id, "accepted", "t1", "Prof. Fatima Benali")
      onStatusChange()
      setShowAcceptDialog(false)
    } catch (err) {
      setError("Failed to accept request")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    setIsLoading(true)
    setError("")
    try {
      await updateRequestStatus(request.id, "rejected")
      onStatusChange()
      setShowRejectDialog(false)
    } catch (err) {
      setError("Failed to reject request")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Review Request</DialogTitle>
            <DialogDescription>Review and respond to student request</DialogDescription>
          </DialogHeader>

          {error && (
            <Alert className="border-rose-500/50 bg-rose-50 dark:bg-rose-950">
              <AlertCircle className="h-4 w-4 text-rose-600" />
              <AlertDescription className="text-rose-700 dark:text-rose-400">{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-6 overflow-y-auto flex-1 pr-2">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Student Info */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Student Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="font-semibold">{request.studentName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Student ID</p>
                      <p className="font-medium text-sm">{request.studentId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Academic Year</p>
                      <p className="font-medium text-sm">2024-2025</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Motivation */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Motivation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{request.motivation}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Supervision Load */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Supervision Load
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-end justify-between mb-2">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {currentLoad}/{maxCapacity}
                        </p>
                        <p className="text-xs text-muted-foreground">current students</p>
                      </div>
                      <Badge variant={loadPercentage >= 80 ? "destructive" : "secondary"}>
                        {loadPercentage.toFixed(0)}%
                      </Badge>
                    </div>
                    <Progress value={loadPercentage} className="h-2" />
                    {loadPercentage >= 80 && (
                      <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-xs text-amber-700 dark:text-amber-400">
                          You are approaching maximum capacity
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Company Info */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Company
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-lg mb-1">{request.company.name}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{request.company.description}</p>
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="truncate">{request.companyEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span>{request.companyPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span>
                          {request.company.city}, {request.company.country}
                        </span>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Company Supervisor</p>
                      <div className="space-y-1">
                        <p className="font-semibold text-sm">{request.companySupervisorName}</p>
                        <p className="text-xs text-muted-foreground">{request.companySupervisorEmail}</p>
                      </div>
                    </div>

                    {/* Company Warning if flagged */}
                    {request.company.status === "blacklisted" && (
                      <Alert className="border-rose-500/50 bg-rose-50 dark:bg-rose-950">
                        <AlertCircle className="h-4 w-4 text-rose-600" />
                        <AlertDescription className="text-xs text-rose-700 dark:text-rose-400">
                          ⚠️ This company is flagged in the system
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Subject Description */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Subject Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Title</p>
                      <p className="font-semibold">{request.subjectTitle}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Description</p>
                      <p className="text-sm leading-relaxed">{request.subjectDescription}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Recommendation */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border-blue-500/20 bg-blue-50 dark:bg-blue-950/30">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      AI Recommendation
                    </CardTitle>
                    <CardDescription>You have been recommended for this request</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Match Score</span>
                      <span className="text-2xl font-bold text-blue-600">85/100</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Matching Skills</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Cloud Computing
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Web Development
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Artificial Intelligence
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Reason: Excellent match with your expertise in distributed systems and recent experience with
                      similar projects.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3 pt-4 border-t flex-shrink-0"
          >
            <Button variant="outline" onClick={() => setShowRejectDialog(true)} disabled={isLoading} className="flex-1">
              Reject
            </Button>
            <Button
              onClick={() => setShowAcceptDialog(true)}
              disabled={isLoading || loadPercentage >= 100}
              className="flex-1"
            >
              {isLoading ? "Processing..." : "Accept Request"}
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept Request?</AlertDialogTitle>
            <AlertDialogDescription>
              You are accepting to supervise <strong>{request.studentName}</strong> for the project "
              <strong>{request.subjectTitle}</strong>" with company <strong>{request.company.name}</strong>.
              <br />
              <br />
              This action will add the student to your supervision list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAccept}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Request?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to reject the request from <strong>{request.studentName}</strong>.
              <br />
              <br />
              The student will be notified and will need to submit a new request or choose another supervisor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-rose-600 hover:bg-rose-700">
              Confirm Rejection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
