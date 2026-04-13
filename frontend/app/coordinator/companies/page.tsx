"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getCompanies, approveCompany, blacklistCompany, rejectCompany } from "@/services/companyService"
import type { ExternalCompany } from "@/models/company.model"
import {
  Building2,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Eye,
  Mail,
  MapPin,
  Phone,
  FileText,
  AlertCircle,
  Ban,
  CheckCircle,
  Trash2,
} from "lucide-react"

export default function CoordinatorCompaniesPage() {
  const [companies, setCompanies] = useState<ExternalCompany[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCompany, setSelectedCompany] = useState<ExternalCompany | null>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [actionModalOpen, setActionModalOpen] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "blacklist" | "remove" | null>(null)
  const [blacklistReason, setBlacklistReason] = useState("")
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    setIsLoading(true)
    try {
      const data = await getCompanies()
      setCompanies(data)
    } finally {
      setIsLoading(false)
    }
  }

  const stats = [
    {
      label: "Total Companies",
      value: companies.length,
      icon: Building2,
      bgColor: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Approved",
      value: companies.filter((c) => c.status === "approved").length,
      icon: CheckCircle2,
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Blacklisted",
      value: companies.filter((c) => c.status === "blacklisted").length,
      icon: XCircle,
      bgColor: "bg-rose-50 dark:bg-rose-950",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
  ]

  const statusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800">
            Pending
          </Badge>
        )
      case "blacklisted":
        return (
          <Badge className="bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400 border-rose-200 dark:border-rose-800">
            Blacklisted
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleViewDetails = (company: ExternalCompany) => {
    setSelectedCompany(company)
    setDetailsModalOpen(true)
  }

  const handleAction = (company: ExternalCompany, type: "approve" | "blacklist" | "remove") => {
    setSelectedCompany(company)
    setActionType(type)
    setBlacklistReason("")
    setActionModalOpen(true)
  }

  const confirmAction = async () => {
    if (!selectedCompany || !actionType) return

    setActionLoading(true)
    try {
      switch (actionType) {
        case "approve":
          await approveCompany(selectedCompany.id)
          break
        case "blacklist":
          if (!blacklistReason.trim()) {
            alert("Please provide a reason")
            setActionLoading(false)
            return
          }
          await blacklistCompany(selectedCompany.id, blacklistReason)
          break
        case "remove":
          await rejectCompany(selectedCompany.id)
          break
      }
      await loadCompanies()
      setActionModalOpen(false)
      setSelectedCompany(null)
      setActionType(null)
      setBlacklistReason("")
    } finally {
      setActionLoading(false)
    }
  }

  const mockRelatedRequests = [
    { id: "1", studentName: "Ahmed Benali", subjectTitle: "AI-Powered Customer Analytics Platform", status: "pending" },
    {
      id: "2",
      studentName: "Fatima Zohra",
      subjectTitle: "Cloud-Based Inventory Management System",
      status: "approved",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="text-sm text-muted-foreground">Loading companies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold">External Companies</h1>
        <p className="text-muted-foreground mt-2">Management, validation, and blacklist of partner companies</p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Companies Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>All Companies</CardTitle>
            <CardDescription>View and manage all external companies in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {companies.length === 0 ? (
              <div className="text-center py-12">
                <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground font-medium">No companies registered yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Companies will appear here once students submit external subject requests
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead className="text-center">Requests</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {company.city}, {company.country}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">{company.email}</div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary">2</Badge>
                        </TableCell>
                        <TableCell className="text-center">{statusBadge(company.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewDetails(company)}>
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {company.status === "pending" && (
                                  <DropdownMenuItem onClick={() => handleAction(company, "approve")}>
                                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                                    Approve company
                                  </DropdownMenuItem>
                                )}
                                {company.status !== "blacklisted" && (
                                  <DropdownMenuItem
                                    onClick={() => handleAction(company, "blacklist")}
                                    className="text-rose-600"
                                  >
                                    <Ban className="mr-2 h-4 w-4" />
                                    Blacklist company
                                  </DropdownMenuItem>
                                )}
                                {company.status === "blacklisted" && (
                                  <DropdownMenuItem onClick={() => handleAction(company, "approve")}>
                                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
                                    Remove from blacklist
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() => handleAction(company, "remove")}
                                  className="text-rose-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete company
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Blacklist Management Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Blacklist Management</CardTitle>
            <CardDescription>
              Blacklisted companies cannot be proposed by students for external subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {companies.filter((c) => c.status === "blacklisted").length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Ban className="mx-auto h-10 w-10 mb-3 text-muted-foreground/50" />
                <p>No companies are currently blacklisted</p>
              </div>
            ) : (
              <div className="space-y-3">
                {companies
                  .filter((c) => c.status === "blacklisted")
                  .map((company) => (
                    <div
                      key={company.id}
                      className="flex items-start justify-between p-4 border rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{company.name}</p>
                        {company.blacklistReason && (
                          <p className="text-sm text-muted-foreground mt-1">
                            <span className="font-medium">Reason:</span> {company.blacklistReason}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAction(company, "approve")}
                        className="ml-4"
                      >
                        Remove from blacklist
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Company Details Modal */}
      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
            <DialogDescription>Complete information about this company and related requests</DialogDescription>
          </DialogHeader>

          {selectedCompany && (
            <div className="grid md:grid-cols-2 gap-6 overflow-y-auto flex-1 pr-2">
              {/* Left Column - Company Information */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Company Name</Label>
                      <p className="font-medium mt-1">{selectedCompany.name}</p>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Description</Label>
                      <p className="text-sm mt-1">{selectedCompany.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Country</Label>
                        <p className="text-sm mt-1">{selectedCompany.country}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">City</Label>
                        <p className="text-sm mt-1">{selectedCompany.city}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        Email
                      </Label>
                      <p className="text-sm mt-1">{selectedCompany.email}</p>
                    </div>

                    {selectedCompany.phone && (
                      <div>
                        <Label className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          Phone
                        </Label>
                        <p className="text-sm mt-1">{selectedCompany.phone}</p>
                      </div>
                    )}

                    <div>
                      <Label className="text-xs text-muted-foreground">Status</Label>
                      <div className="mt-1">{statusBadge(selectedCompany.status)}</div>
                    </div>

                    {selectedCompany.status === "blacklisted" && selectedCompany.blacklistReason && (
                      <Alert className="border-rose-500/50 bg-rose-500/10">
                        <AlertCircle className="h-4 w-4 text-rose-500" />
                        <AlertDescription className="text-rose-700 dark:text-rose-400 text-sm">
                          <span className="font-semibold">Blacklist Reason: </span>
                          {selectedCompany.blacklistReason}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Supporting Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded hover:bg-accent">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Company_Registration.pdf</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded hover:bg-accent">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Tax_Certificate.pdf</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Related Requests */}
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Free Subject Requests</CardTitle>
                    <CardDescription>All external subject requests from this company</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockRelatedRequests.map((request) => (
                        <div key={request.id} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-medium text-sm">{request.subjectTitle}</p>
                            <Badge variant="outline" className="ml-2 flex-shrink-0">
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Student: {request.studentName}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Modal */}
      <Dialog open={actionModalOpen} onOpenChange={setActionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "approve" && "Approve Company"}
              {actionType === "blacklist" && "Blacklist Company"}
              {actionType === "remove" && "Delete Company"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve" && "This will approve the company for external PFE projects."}
              {actionType === "blacklist" &&
                "This will prevent students from selecting this company for external subjects."}
              {actionType === "remove" && "This will permanently delete the company from the system."}
            </DialogDescription>
          </DialogHeader>

          {actionType === "blacklist" && (
            <div className="space-y-2">
              <Label htmlFor="reason">Blacklist Reason *</Label>
              <Textarea
                id="reason"
                value={blacklistReason}
                onChange={(e) => setBlacklistReason(e.target.value)}
                placeholder="Explain why this company is being blacklisted..."
                rows={4}
              />
            </div>
          )}

          {selectedCompany && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This action affects: <strong>{selectedCompany.name}</strong>
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModalOpen(false)} disabled={actionLoading}>
              Cancel
            </Button>
            <Button onClick={confirmAction} disabled={actionLoading}>
              {actionLoading ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
