"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FreeSubjectForm } from "./FreeSubjectForm"
import { submitFreeSubjectRequest, getStudentRequests } from "@/services/freeSubjectService"
import { TeachersService } from '@/services/service_teachers'
import type { TeacherRecommendation } from "@/models/recommendation.model"
import type { FreeSubjectRequest } from "@/models/freeSubject.model"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"

export default function FreeSubjectPage() {
  const { user } = useAuth()
  const [teachers, setTeachers] = useState<{ id: string; name: string }[]>([])
  const [selectedTeacher, setSelectedTeacher] = useState<{ id: string; name: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [studentRequests, setStudentRequests] = useState<FreeSubjectRequest[]>([])
  const studentId = user?.id ?? ""

  useEffect(() => {
    if (!studentId) return
    getStudentRequests(studentId)
      .then(setStudentRequests)
      .catch(() => setErrorMessage("Failed to load your existing requests."))

    // load teachers for selection
    TeachersService.getAllTeachers()
      .then((list) => setTeachers(list.map(t => ({ id: t.id, name: `${t.firstName ?? t.name ?? t.id}` }))))
      .catch(() => {
        // non-blocking
      })
  }, [studentId])

  const handleSubmitRequest = async (formData: any) => {
    if (!studentId) {
      setErrorMessage("Unable to submit request without an authenticated student.")
      return
    }

    if (!selectedTeacher) {
      setErrorMessage("Please select a teacher from the list before submitting.")
      return
    }

    setIsLoading(true)
    setErrorMessage("")
    try {
      const newRequest = await submitFreeSubjectRequest({
        studentId,
        studentName: user?.name ?? "Current Student",
        teacherId: selectedTeacher?.id,
        teacherName: selectedTeacher?.name,
        status: "pending",
        subjectTitle: formData.subjectTitle,
        subjectDescription: formData.subjectDescription,
        motivation: formData.motivation,
        company: {
          id: `c${Date.now()}`,
          name: formData.companyName,
          description: formData.companyDescription,
          email: formData.companyEmail,
          phone: formData.companyPhone,
          country: formData.companyCountry,
          city: formData.companyCity,
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        companyPhone: formData.companyPhone,
        companyEmail: formData.companyEmail,
        companySupervisorName: formData.companySupervisorName,
        companySupervisorEmail: formData.companySupervisorEmail,
      })

      setSuccessMessage(`Request submitted successfully! ID: ${newRequest.id}`)
      setSelectedTeacher(null)

      const requests = await getStudentRequests(studentId)
      setStudentRequests(requests)

      // Clear form after submission
      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (error) {
      setErrorMessage("Failed to submit request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold">Propose External Subject</h1>
        <p className="text-muted-foreground mt-2">Final year project with external company</p>
      </motion.div>

      {/* Messages */}
      {successMessage && (
        <Alert className="border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="text-emerald-700 dark:text-emerald-400">{successMessage}</AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert className="border-rose-500/50 bg-rose-50 dark:bg-rose-950">
          <AlertCircle className="h-4 w-4 text-rose-600" />
          <AlertDescription className="text-rose-700 dark:text-rose-400">{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Main Form */}
      <FreeSubjectForm
        onSubmit={handleSubmitRequest}
        isLoading={isLoading}
        teachers={teachers}
        selectedTeacher={selectedTeacher}
        onSelectTeacher={(id, name) => setSelectedTeacher({ id, name })}
      />

      {/* Recommendations */}
      {/* teacher selection handled inside the form */}

      {/* Previous Requests */}
      {studentRequests.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Your Requests</CardTitle>
              <CardDescription>History of your external subject requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {studentRequests.map((req) => (
                <div key={req.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{req.subjectTitle}</h4>
                      <p className="text-xs text-muted-foreground">{req.company.name}</p>
                    </div>
                    <Badge variant={req.status === "accepted" ? "default" : "secondary"}>{req.status}</Badge>
                  </div>
                  {req.teacherName && <p className="text-xs text-muted-foreground">Supervisor: {req.teacherName}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
