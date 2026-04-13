"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FreeSubjectForm } from "./FreeSubjectForm"
import { RecommendationPanel } from "./RecommendationPanel"
import { generateTeacherRecommendations } from "@/services/recommendationService"
import { submitFreeSubjectRequest, getStudentRequests } from "@/services/freeSubjectService"
import type { TeacherRecommendation } from "@/models/recommendation.model"
import type { FreeSubjectRequest } from "@/models/freeSubject.model"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function FreeSubjectPage() {
  const [recommendations, setRecommendations] = useState<TeacherRecommendation[]>([])
  const [selectedTeacher, setSelectedTeacher] = useState<{ id: string; name: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [studentRequests, setStudentRequests] = useState<FreeSubjectRequest[]>([])

  const handleGenerateRecommendations = async (formData: any) => {
    setIsLoading(true)
    setErrorMessage("")
    try {
      const recs = await generateTeacherRecommendations(formData.subjectDescription, formData.companyDescription)
      setRecommendations(recs)
    } catch (error) {
      setErrorMessage("Failed to generate recommendations. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitRequest = async (formData: any) => {
    if (!selectedTeacher && recommendations.length === 0) {
      setErrorMessage("Please generate recommendations and select a teacher first")
      return
    }

    setIsLoading(true)
    setErrorMessage("")
    try {
      const newRequest = await submitFreeSubjectRequest({
        studentId: "s1",
        studentName: "Current Student",
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
      setRecommendations([])
      setSelectedTeacher(null)

      const requests = await getStudentRequests("s1")
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
        onGenerateRecommendations={handleGenerateRecommendations}
        isLoading={isLoading}
      />

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <>
          <RecommendationPanel
            recommendations={recommendations}
            onSelectTeacher={(teacherId, teacherName) => {
              setSelectedTeacher({ id: teacherId, name: teacherName })
            }}
            isLoading={isLoading}
          />

          {selectedTeacher && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Alert className="border-blue-500/50 bg-blue-50 dark:bg-blue-950">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700 dark:text-blue-400">
                  Selected supervisor: <span className="font-semibold">{selectedTeacher.name}</span>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </>
      )}

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
