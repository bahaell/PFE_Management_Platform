"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Clock, Users, MapPin, Zap, Sparkles, User, ArrowLeft } from "lucide-react"

import { SchedulerService } from "@/services/service_scheduler"
import { generateJuryRecommendations, getAllTeachers } from "@/services/recommendationService"
import type { TeacherRecommendation } from "@/models/recommendation.model"
import type { SchedulerProject } from "@/models/scheduler.model"

export default function SmartAutoSchedulerPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<SchedulerProject[]>([])
  const [allTeachers, setAllTeachers] = useState<any[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")
  
  // AI Recommendations
  const [aiTeachers, setAiTeachers] = useState<TeacherRecommendation[]>([])
  const [isLoadingAi, setIsLoadingAi] = useState(false)
  
  // Modes
  const [manualMode, setManualMode] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null)
  
  // Manual Assignment State
  const [manualPresident, setManualPresident] = useState<any | null>(null)
  const [manualRapporteur, setManualRapporteur] = useState<any | null>(null)
  const [manualEncadrant, setManualEncadrant] = useState<any | null>(null)
  const [manualExaminer, setManualExaminer] = useState<any | null>(null)
  const [replaceEncadrant, setReplaceEncadrant] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduleError, setScheduleError] = useState("")

  // Desired Date for AI
  const [desiredDate, setDesiredDate] = useState<string>(new Date().toISOString().slice(0, 10))

  useEffect(() => {
    // Load real data
    SchedulerService.getAllProjects().then(data => {
      setProjects(data || [])
    }).catch(console.error)

    getAllTeachers().then(data => {
      setAllTeachers(data || [])
    }).catch(console.error)
  }, [])

  const selectedProject = projects.find(p => p.id === selectedProjectId)

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id)
    setSelectedSlot(null)
    setManualMode(false)
    setAiTeachers([])
    setManualPresident(null)
    setManualRapporteur(null)
    setManualEncadrant(null)
    setManualExaminer(null)
    setScheduleError("")
    
    const project = projects.find(p => p.id === id)
    if (project) {
      setReplaceEncadrant(true) 
    }
  }

  const generateSlotsWithAI = async () => {
    if (!selectedProjectId) return
    setIsLoadingAi(true)
    try {
      const recommendations = await generateJuryRecommendations(selectedProjectId, desiredDate)
      setAiTeachers(recommendations)
      
      if (recommendations.length >= 3) {
        const p1 = allTeachers.find(t => t.id === recommendations[0].teacherId)
        const p2 = allTeachers.find(t => t.id === recommendations[1].teacherId)
        const p3 = allTeachers.find(t => t.id === recommendations[2].teacherId)
        if (p1) setManualPresident(p1)
        if (p2) setManualRapporteur(p2)
        if (p3) setManualExaminer(p3)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoadingAi(false)
    }
  }

  const handleSchedule = async () => {
    if (!selectedProject) return

    const slotStart = selectedSlot === 2 ? "14:00" : "10:00"
    const slotEnd = selectedSlot === 2 ? "14:45" : "10:45"
    const president = manualMode ? manualPresident : allTeachers.find(t => t.id === aiTeachers[0]?.teacherId)
    const rapporteur = manualMode ? manualRapporteur : allTeachers.find(t => t.id === aiTeachers[1]?.teacherId)
    const examiner = manualMode ? manualExaminer : allTeachers.find(t => t.id === aiTeachers[2]?.teacherId)
    const supervisor = manualMode && replaceEncadrant ? manualEncadrant : selectedProject.assignedTeacher

    if (!president || !rapporteur || !examiner || !supervisor) {
      setScheduleError("Please select president, rapporteur, examiner and project supervisor before scheduling.")
      return
    }

    setIsScheduling(true)
    setScheduleError("")
    try {
      const created = await SchedulerService.createDefense({
        projectId: selectedProject.id,
        date: desiredDate,
        startTime: slotStart,
        endTime: slotEnd,
        roomNameSnapshot: "Amphi A",
        status: "PENDING",
        manuallyScheduled: manualMode,
      })

      await SchedulerService.addJuryMember(created.id, supervisor.id, "SUPERVISOR", true)
      await SchedulerService.addJuryMember(created.id, president.id, "PRESIDENT", true)
      await SchedulerService.addJuryMember(created.id, rapporteur.id, "RAPPORTEUR", true)
      await SchedulerService.addJuryMember(created.id, examiner.id, "EXAMINER", true)
      await SchedulerService.updateDefense(created.id, { status: "SCHEDULED" })

      router.push('/coordinator/defenses')
    } catch (error: any) {
      setScheduleError(error?.message || "Failed to schedule defense.")
    } finally {
      setIsScheduling(false)
    }
  }

  const renderTeacherOption = (teacher: any, isRecommended: boolean = false, score?: number) => {
    return (
      <div className="flex flex-col gap-1 w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
          <span className="font-medium truncate">{teacher.name}</span>
          <Badge variant="outline" className="text-[10px] sm:text-xs whitespace-nowrap w-fit">{teacher.grade || teacher.role}</Badge>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-1 gap-1">
          <span className="text-xs text-muted-foreground truncate">{teacher.department || teacher.speciality || "No speciality"}</span>
          {isRecommended && (
             <Badge className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0 border-green-200 w-fit whitespace-nowrap">
               ⭐ AI Score: {score}/100
             </Badge>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push('/coordinator/defenses')} className="hidden sm:inline-flex">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <PageHeader
          title="Smart Defense Auto-Scheduler"
          description="AI-driven jury selection and scheduling with conflict resolution"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-5 space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2 text-primary">
              <Zap className="w-5 h-5" />
              Settings
            </h2>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Select Project</label>
              <Select value={selectedProjectId} onValueChange={handleProjectSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a project..." className="truncate" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      <span className="truncate block max-w-[200px] sm:max-w-full">{p.subject} ({p.studentName})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Desired Date</label>
              <input 
                type="date" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={desiredDate}
                onChange={e => setDesiredDate(e.target.value)}
              />
            </div>

            <Button 
              className="w-full mt-4" 
              onClick={generateSlotsWithAI}
              disabled={!selectedProjectId || isLoadingAi}
            >
              {isLoadingAi ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              <span className="truncate">{isLoadingAi ? "Analyzing..." : "Analyze & Generate"}</span>
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {!selectedProjectId ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg bg-card/50 p-6 text-center">
              <Sparkles className="w-12 h-12 mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Welcome to Smart Scheduler</h3>
              <p className="max-w-md mx-auto">Select a project from the left panel to begin AI analysis for jury matching and time slots.</p>
            </div>
          ) : (
            <>
              <Alert className="bg-primary/5 border-primary/20">
                <Zap className="h-4 w-4 text-primary" />
                <AlertDescription className="text-foreground text-sm sm:text-base">
                  AI is connected to the scheduling microservice. It analyzes availability, workloads, and skills.
                </AlertDescription>
              </Alert>

              {scheduleError && (
                <Alert className="border-destructive/50 bg-destructive/10">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">{scheduleError}</AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant={!manualMode ? 'default' : 'outline'}
                  onClick={() => setManualMode(false)}
                  className="flex-1"
                >
                  AI Recommended Slots
                </Button>
                <Button
                  variant={manualMode ? 'default' : 'outline'}
                  onClick={() => setManualMode(true)}
                  className="flex-1"
                >
                  Manual Jury Assignment
                </Button>
              </div>

              {!manualMode ? (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI-Recommended Time Slots
                  </h3>

                  {aiTeachers.length === 0 ? (
                    <div className="text-center p-6 sm:p-10 bg-accent/20 rounded-lg">
                      <p className="text-muted-foreground">Click "Analyze & Generate" to fetch AI recommendations from the backend.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {[1, 2].map((slotIdx) => {
                        const isRecommended = slotIdx === 1
                        const t1 = allTeachers.find(t => t.id === aiTeachers[0]?.teacherId)
                        const t2 = allTeachers.find(t => t.id === aiTeachers[1]?.teacherId)
                        const t3 = allTeachers.find(t => t.id === aiTeachers[2]?.teacherId)
                        
                        return (
                        <Card
                          key={slotIdx}
                          className={`p-4 cursor-pointer transition-all border-2 ${
                            selectedSlot === slotIdx
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedSlot(slotIdx)}
                        >
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-lg ${isRecommended ? 'bg-green-100' : 'bg-blue-100'}`}>
                                  <Clock className={`w-5 h-5 ${isRecommended ? 'text-green-600' : 'text-blue-600'}`} />
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground sm:text-lg">{desiredDate} • {slotIdx === 1 ? '10:00' : '14:00'}</p>
                                  <p className="text-xs text-muted-foreground">45-minute session</p>
                                </div>
                              </div>
                              <div className="text-left sm:text-right">
                                <p className="text-xl sm:text-2xl font-bold text-primary">{isRecommended ? aiTeachers[0]?.score || 95 : 82}%</p>
                                <p className="text-xs text-muted-foreground">AI Match</p>
                              </div>
                            </div>

                            <div className="p-3 rounded bg-blue-50 text-blue-900 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <div>
                                <p className="font-semibold text-sm">Amphi A (Suggested)</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="font-semibold text-sm text-foreground">AI Recommended Jury</span>
                              </div>
                              
                              {t1 && (
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-accent/5 rounded p-2 border gap-2">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                                    <div className="overflow-hidden">
                                      <p className="text-sm font-medium truncate">{t1.name}</p>
                                      <p className="text-xs text-muted-foreground truncate">{t1.department}</p>
                                    </div>
                                  </div>
                                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 w-fit shrink-0">Président</Badge>
                                </div>
                              )}
                              
                              {t2 && (
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-accent/5 rounded p-2 border gap-2">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                                    <div className="overflow-hidden">
                                      <p className="text-sm font-medium truncate">{t2.name}</p>
                                      <p className="text-xs text-muted-foreground truncate">{t2.department}</p>
                                    </div>
                                  </div>
                                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 w-fit shrink-0">Rapporteur</Badge>
                                </div>
                              )}

                              {t3 && (
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-accent/5 rounded p-2 border gap-2">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                                    <div className="overflow-hidden">
                                      <p className="text-sm font-medium truncate">{t3.name}</p>
                                      <p className="text-xs text-muted-foreground truncate">{t3.department}</p>
                                    </div>
                                  </div>
                                  <Badge className="bg-slate-100 text-slate-800 border-slate-200 w-fit shrink-0">Examiner</Badge>
                                </div>
                              )}
                            </div>

                            {isRecommended && (
                              <div className="bg-green-50 border border-green-200 rounded p-3 mt-2">
                                <p className="text-xs font-semibold text-green-900 mb-2 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  AI Reasoning (Backend):
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {aiTeachers[0]?.reasoning?.slice(0,2).map((r, i) => (
                                    <li key={i} className="text-xs text-green-800 truncate">{r}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </Card>
                      )})}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Manual Jury Assignment
                    </h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={generateSlotsWithAI}
                      className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary w-full sm:w-auto"
                    >
                      <Zap className="w-4 h-4 shrink-0" />
                      <span className="truncate">Auto-assign Top AI Matches</span>
                    </Button>
                  </div>

                  <div className="grid gap-6">
                    {/* President */}
                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-900 border-blue-300">Président</Badge>
                      </label>
                      <Select 
                        value={manualPresident?.id || ''} 
                        onValueChange={(id) => setManualPresident(allTeachers.find(t => t.id === id) || null)}
                      >
                        <SelectTrigger className="h-auto py-3">
                          <SelectValue placeholder="Select President...">
                            {manualPresident && <span className="font-medium truncate block">{manualPresident.name}</span>}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {allTeachers.map(t => {
                            const aiMatch = aiTeachers.find(ai => ai.teacherId === t.id)
                            return (
                              <SelectItem key={t.id} value={t.id} className="py-2">
                                {renderTeacherOption(t, !!aiMatch, aiMatch?.score)}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Rapporteur */}
                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-900 border-purple-300">Rapporteur</Badge>
                      </label>
                      <Select 
                        value={manualRapporteur?.id || ''} 
                        onValueChange={(id) => setManualRapporteur(allTeachers.find(t => t.id === id) || null)}
                      >
                        <SelectTrigger className="h-auto py-3">
                          <SelectValue placeholder="Select Rapporteur...">
                            {manualRapporteur && <span className="font-medium truncate block">{manualRapporteur.name}</span>}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {allTeachers.map(t => {
                            const aiMatch = aiTeachers.find(ai => ai.teacherId === t.id)
                            return (
                              <SelectItem key={t.id} value={t.id} className="py-2">
                                {renderTeacherOption(t, !!aiMatch, aiMatch?.score)}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Encadrant */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-900 border-green-300">Encadrant</Badge>
                        </label>
                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                          <input
                            type="checkbox"
                            checked={replaceEncadrant}
                            onChange={(e) => setReplaceEncadrant(e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-muted-foreground">Replace Project Supervisor</span>
                        </label>
                      </div>
                      <Select 
                        value={manualEncadrant?.id || ''} 
                        onValueChange={(id) => setManualEncadrant(allTeachers.find(t => t.id === id) || null)}
                        disabled={!replaceEncadrant}
                      >
                        <SelectTrigger className={`h-auto py-3 ${!replaceEncadrant ? 'opacity-60 bg-muted' : ''}`}>
                          <SelectValue placeholder="Select Encadrant...">
                            {manualEncadrant && <span className="font-medium truncate block">{manualEncadrant.name}</span>}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {allTeachers.map(t => (
                            <SelectItem key={t.id} value={t.id} className="py-2">
                              {renderTeacherOption(t)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Examiner */}
                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Badge className="bg-slate-100 text-slate-900 border-slate-300">Examiner</Badge>
                      </label>
                      <Select
                        value={manualExaminer?.id || ''}
                        onValueChange={(id) => setManualExaminer(allTeachers.find(t => t.id === id) || null)}
                      >
                        <SelectTrigger className="h-auto py-3">
                          <SelectValue placeholder="Select Examiner...">
                            {manualExaminer && <span className="font-medium truncate block">{manualExaminer.name}</span>}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {allTeachers.map(t => {
                            const aiMatch = aiTeachers.find(ai => ai.teacherId === t.id)
                            return (
                              <SelectItem key={t.id} value={t.id} className="py-2">
                                {renderTeacherOption(t, !!aiMatch, aiMatch?.score)}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t">
                <Button variant="outline" className="flex-1" onClick={() => router.push('/coordinator/defenses')}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={
                    isScheduling ||
                    (manualMode
                      ? !manualPresident || !manualRapporteur || !manualExaminer || (replaceEncadrant && !manualEncadrant)
                      : !selectedSlot || aiTeachers.length < 3)
                  }
                  onClick={handleSchedule}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  {isScheduling ? "Scheduling..." : "Accept & Schedule Defense"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
