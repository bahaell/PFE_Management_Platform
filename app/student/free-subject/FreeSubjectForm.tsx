"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { X, Upload, FileText, Sparkles, Save } from "lucide-react"

interface FreeSubjectFormProps {
  onSubmit: (data: any) => Promise<void>
  onGenerateRecommendations: (data: any) => Promise<void>
  isLoading?: boolean
}

export function FreeSubjectForm({ onSubmit, onGenerateRecommendations, isLoading = false }: FreeSubjectFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    companyEmail: "",
    companyPhone: "",
    companyCountry: "",
    companyCity: "",
    companySupervisorName: "",
    companySupervisorEmail: "",
    companySupervisorPosition: "",
    subjectTitle: "",
    subjectDescription: "",
    keywords: [] as string[],
    duration: "",
    motivation: "",
    learningOutcomes: "",
    documents: [] as File[],
  })

  const [keywordInput, setKeywordInput] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({ ...prev, documents: files }))
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData((prev) => ({ ...prev, keywords: [...prev.keywords, keywordInput.trim()] }))
      setKeywordInput("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({ ...prev, keywords: prev.keywords.filter((k) => k !== keyword) }))
  }

  const handleKeywordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  const handleGenerateRecommendations = async () => {
    await onGenerateRecommendations(formData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmDialog(true)
  }

  const confirmSubmit = async () => {
    setShowConfirmDialog(false)
    await onSubmit(formData)
  }

  const handleSaveAsDraft = () => {
    console.log("Saving as draft:", formData)
    // Mock implementation - would save to local storage or backend
  }

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company</CardTitle>
            <CardDescription>External company information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="companyEmail">Company Email *</Label>
                <Input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  placeholder="contact@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="companyDescription">Company Description *</Label>
              <Textarea
                id="companyDescription"
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleChange}
                placeholder="Describe the company and its activities"
                rows={3}
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="companyCountry">Country *</Label>
                <Input
                  id="companyCountry"
                  name="companyCountry"
                  value={formData.companyCountry}
                  onChange={handleChange}
                  placeholder="Algeria"
                  required
                />
              </div>
              <div>
                <Label htmlFor="companyCity">City *</Label>
                <Input
                  id="companyCity"
                  name="companyCity"
                  value={formData.companyCity}
                  onChange={handleChange}
                  placeholder="Algiers"
                  required
                />
              </div>
              <div>
                <Label htmlFor="companyPhone">Phone</Label>
                <Input
                  id="companyPhone"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleChange}
                  placeholder="+213 XXX XXX XXX"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="documents">Supporting Document (PDF)</Label>
              <div className="mt-2">
                <label
                  htmlFor="documents"
                  className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formData.documents.length > 0
                      ? `${formData.documents.length} file(s) selected`
                      : "Click to upload"}
                  </span>
                </label>
                <Input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {formData.documents.length > 0 && (
                <div className="mt-3 space-y-1">
                  {formData.documents.map((file) => (
                    <div key={file.name} className="flex items-center gap-2 text-sm p-2 bg-muted/50 rounded">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Subject Details */}
        <Card>
          <CardHeader>
            <CardTitle>Proposed Subject</CardTitle>
            <CardDescription>Final year project details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subjectTitle">Subject Title *</Label>
              <Input
                id="subjectTitle"
                name="subjectTitle"
                value={formData.subjectTitle}
                onChange={handleChange}
                placeholder="e.g., AI-based Recommendation System"
                required
              />
            </div>

            <div>
              <Label htmlFor="subjectDescription">Subject Description *</Label>
              <Textarea
                id="subjectDescription"
                name="subjectDescription"
                value={formData.subjectDescription}
                onChange={handleChange}
                placeholder="Describe your project in detail"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="keywords">Keywords / Domain</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="keywords"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                  placeholder="Add a keyword (press Enter)"
                  className="flex-1"
                />
                <Button type="button" onClick={addKeyword} variant="outline" size="sm">
                  Add
                </Button>
              </div>
              {formData.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="pl-3 pr-1">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="duration">Estimated Duration *</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleSelectChange("duration", value)}
                required
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-6">3 to 6 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Company Supervisor */}
        <Card>
          <CardHeader>
            <CardTitle>Company Supervisor</CardTitle>
            <CardDescription>Contact person at the company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companySupervisorName">Supervisor Name *</Label>
                <Input
                  id="companySupervisorName"
                  name="companySupervisorName"
                  value={formData.companySupervisorName}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="companySupervisorEmail">Supervisor Email *</Label>
                <Input
                  id="companySupervisorEmail"
                  name="companySupervisorEmail"
                  type="email"
                  value={formData.companySupervisorEmail}
                  onChange={handleChange}
                  placeholder="supervisor@company.com"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="companySupervisorPosition">Position</Label>
              <Input
                id="companySupervisorPosition"
                name="companySupervisorPosition"
                value={formData.companySupervisorPosition}
                onChange={handleChange}
                placeholder="e.g., Project Manager, Technical Director"
              />
            </div>
          </CardContent>
        </Card>

        {/* Motivation */}
        <Card>
          <CardHeader>
            <CardTitle>Motivation</CardTitle>
            <CardDescription>Your commitment to this project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="motivation">Motivation *</Label>
              <Textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                placeholder="Why do you want to work on this project?"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="learningOutcomes">Expected Learning Outcomes</Label>
              <Textarea
                id="learningOutcomes"
                name="learningOutcomes"
                value={formData.learningOutcomes}
                onChange={handleChange}
                placeholder="What skills and knowledge do you hope to gain?"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              Academic Supervisor Recommendation (AI)
            </CardTitle>
            <CardDescription>Generate intelligent recommendation based on your subject</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateRecommendations}
              disabled={isLoading || !formData.subjectDescription || !formData.companyDescription}
              className="w-full bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isLoading ? "Generating..." : "Generate AI Recommendation"}
            </Button>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveAsDraft}
            disabled={isLoading}
            className="flex-1 bg-transparent"
          >
            <Save className="h-4 w-4 mr-2" />
            Save as Draft
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1">
            Submit Request
          </Button>
        </div>
      </motion.form>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this external subject request? Please verify that all information is
              correct before proceeding.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2 text-sm">
            <p>
              <span className="font-semibold">Subject:</span> {formData.subjectTitle}
            </p>
            <p>
              <span className="font-semibold">Company:</span> {formData.companyName}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>{" "}
              {formData.duration === "3-6" ? "3 to 6 months" : "6 months"}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSubmit}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
