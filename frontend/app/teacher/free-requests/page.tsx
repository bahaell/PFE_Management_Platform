"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"
import { getTeacherRequests } from "@/services/freeSubjectService"
import type { FreeSubjectRequest } from "@/models/freeSubject.model"
import { RequestReviewModal } from "./RequestReviewModal"
import { format } from "date-fns"
import { Eye, FileText } from "lucide-react"

export default function TeacherFreeRequestsPage() {
  const [requests, setRequests] = useState<FreeSubjectRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<FreeSubjectRequest | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    setIsLoading(true)
    try {
      const data = await getTeacherRequests("t1")
      setRequests(data)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenRequest = (request: FreeSubjectRequest) => {
    setSelectedRequest(request)
    setModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800"
          >
            Pending
          </Badge>
        )
      case "accepted":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
          >
            Accepted
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800"
          >
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold">External Subject Requests</h1>
        <p className="text-muted-foreground mt-2">External project applications from students</p>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardContent className="p-0">
            {requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No requests yet</h3>
                <p className="text-sm text-muted-foreground text-center">
                  External subject requests submitted by students will appear here.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request, index) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="group"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                              {getInitials(request.studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{request.studentName}</p>
                            <p className="text-xs text-muted-foreground">{request.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-sm line-clamp-2 max-w-xs">{request.subjectTitle}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{request.company.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {request.company.city}, {request.company.country}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{format(new Date(request.createdAt), "dd/MM/yyyy")}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(request.createdAt), "HH:mm")}</p>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleOpenRequest(request)} size="sm" variant="ghost" className="gap-2">
                          <Eye className="h-4 w-4" />
                          Review
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal */}
      <RequestReviewModal
        request={selectedRequest}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onStatusChange={() => {
          loadRequests()
          setModalOpen(false)
        }}
      />
    </div>
  )
}
