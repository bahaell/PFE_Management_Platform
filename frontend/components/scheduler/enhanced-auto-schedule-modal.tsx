'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, AlertCircle, Clock, Users, MapPin, Zap, Sparkles, User } from 'lucide-react'
import { 
  MOCK_PROJECTS, 
  MOCK_TEACHERS,
  generateRecommendedSlots, 
  getJuryRoleBadgeColor,
  getJuryRoleLabel,
  type RecommendedSlot,
  type Teacher,
  type Project,
  type JuryMember
} from '@/lib/scheduler-mock-data'

interface EnhancedAutoScheduleModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EnhancedAutoScheduleModal({ isOpen, onClose }: EnhancedAutoScheduleModalProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<RecommendedSlot | null>(null)
  const [recommendedSlots, setRecommendedSlots] = useState<RecommendedSlot[]>([])
  
  const [manualMode, setManualMode] = useState(false)
  const [manualPresident, setManualPresident] = useState<Teacher | null>(null)
  const [manualRapporteur, setManualRapporteur] = useState<Teacher | null>(null)
  const [manualEncadrant, setManualEncadrant] = useState<Teacher | null>(null)
  const [replaceEncadrant, setReplaceEncadrant] = useState(false)

  const handleProjectSelect = (projectId: string) => {
    const project = MOCK_PROJECTS.find(p => p.id === projectId)
    if (project) {
      setSelectedProject(project)
      const slots = generateRecommendedSlots(project)
      setRecommendedSlots(slots)
      setManualEncadrant(project.assignedTeacher)
      setSelectedSlot(null)
      setManualMode(false)
    }
  }

  const handleAutoAssignJury = () => {
    if (!selectedProject) return
    
    const encadrant = selectedProject.assignedTeacher
    
    // Find best président
    const presidentCandidates = MOCK_TEACHERS.filter(
      t => t.id !== encadrant.id && 
      (t.grade === 'Professor' || t.grade === 'Associate Professor' || t.grade === 'Dean')
    ).sort((a, b) => {
      const gradeOrder = { 'Dean': 4, 'Professor': 3, 'Associate Professor': 2, 'Maitre Assistant': 1, 'Assistant': 0 }
      return gradeOrder[b.grade] - gradeOrder[a.grade]
    })
    
    const president = presidentCandidates[0]
    
    // Find best rapporteur
    const rapporteur = MOCK_TEACHERS.filter(
      t => t.id !== (replaceEncadrant ? null : selectedProject.assignedTeacher.id) &&
      t.id !== president.id
    ).sort((a, b) => {
      const aSkillMatch = a.skills.filter(s => selectedProject.skills.includes(s)).length
      const bSkillMatch = b.skills.filter(s => selectedProject.skills.includes(s)).length
      if (bSkillMatch !== aSkillMatch) return bSkillMatch - aSkillMatch
      return a.currentLoad - b.currentLoad
    })[0]
    
    setManualPresident(president)
    setManualRapporteur(rapporteur)
    setManualEncadrant(encadrant)
    setManualMode(true)
  }

  const getAvailablePresidents = () => {
    if (!selectedProject) return []
    return MOCK_TEACHERS.filter(
      t => t.id !== selectedProject.assignedTeacher.id &&
      t.id !== manualRapporteur?.id &&
      (t.grade === 'Professor' || t.grade === 'Associate Professor' || t.grade === 'Maitre Assistant' || t.grade === 'Assistant')
    )
  }

  const getAvailableRapporteurs = () => {
    if (!selectedProject) return []
    return MOCK_TEACHERS.filter(
      t => t.id !== (replaceEncadrant ? null : selectedProject.assignedTeacher.id) &&
      t.id !== manualPresident?.id &&
      t.id !== (replaceEncadrant ? null : manualEncadrant?.id)
    )
  }

  const getAvailableEncadrants = () => {
    if (!replaceEncadrant || !selectedProject) return [selectedProject?.assignedTeacher].filter(Boolean) as Teacher[]
    return MOCK_TEACHERS.filter(
      t => t.id !== manualPresident?.id &&
      t.id !== manualRapporteur?.id
    )
  }

  const handleSchedule = () => {
    if (manualMode && manualPresident && manualRapporteur && manualEncadrant) {
      alert(`Defense for ${selectedProject?.studentName} scheduled with manual jury:\nPrésident: ${manualPresident.name}\nRapporteur: ${manualRapporteur.name}\nEncadrant: ${manualEncadrant.name}`)
      onClose()
    } else if (selectedSlot && selectedProject) {
      alert(`Defense for ${selectedProject.studentName} scheduled at ${selectedSlot.time}`)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Smart Defense Auto-Scheduler with Jury Management
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Selection */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Select Project</label>
            <Select value={selectedProject?.id || ''} onValueChange={handleProjectSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a project to schedule" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_PROJECTS.filter(p => p.status === 'pending').map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{project.studentName}</span>
                      <span className="text-xs text-muted-foreground">{project.subject}</span>
                      <span className="text-xs text-muted-foreground">Encadrant: {project.assignedTeacher.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProject && (
            <>
              {/* System Status */}
              <Alert className="bg-primary/5 border-primary/20">
                <Zap className="h-4 w-4 text-primary" />
                <AlertDescription className="text-foreground">
                  AI analyzing 150+ scheduling constraints including jury availability, expertise match, and load balance
                </AlertDescription>
              </Alert>

              {/* Mode Toggle */}
              <div className="flex gap-2">
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
                <>
                  {/* AI Recommended Slots */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      AI-Recommended Time Slots with Jury Teams
                    </h3>
                    <div className="space-y-3">
                      {recommendedSlots.map((slot) => (
                        <Card
                          key={slot.id}
                          className={`p-4 cursor-pointer transition-all border-2 ${
                            selectedSlot?.id === slot.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <div className="space-y-3">
                            {/* Time and Confidence */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-3 rounded-lg ${slot.isRecommended ? 'bg-green-100' : 'bg-blue-100'}`}>
                                  <Clock className={`w-5 h-5 ${slot.isRecommended ? 'text-green-600' : 'text-blue-600'}`} />
                                </div>
                                <div>
                                  <p className="font-semibold text-foreground text-lg">{slot.time}</p>
                                  <p className="text-xs text-muted-foreground">45-minute session</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-primary">{slot.confidence}%</p>
                                <p className="text-xs text-muted-foreground">Confidence</p>
                              </div>
                            </div>

                            {/* Room Info */}
                            <div className={`p-3 rounded ${slot.room.color} flex items-center gap-2`}>
                              <MapPin className="w-4 h-4" />
                              <div>
                                <p className="font-semibold text-sm">{slot.room.name}</p>
                                <p className="text-xs">Capacity: {slot.room.capacity} people</p>
                              </div>
                            </div>

                            {/* Jury Team */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="font-semibold text-sm text-foreground">Jury Team</span>
                              </div>
                              {slot.jury.map((member) => (
                                <div key={member.teacher.id} className="flex items-center justify-between bg-accent/5 rounded p-2">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                      <p className="text-sm font-medium text-foreground">{member.teacher.name}</p>
                                      <p className="text-xs text-muted-foreground">{member.teacher.title} • {member.teacher.speciality}</p>
                                    </div>
                                  </div>
                                  <Badge className={`${getJuryRoleBadgeColor(member.role)} border`}>
                                    {getJuryRoleLabel(member.role)}
                                  </Badge>
                                </div>
                              ))}
                            </div>

                            {/* AI Reasoning */}
                            <div className="bg-blue-50 border border-blue-200 rounded p-3">
                              <p className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                AI Reasoning:
                              </p>
                              <div className="space-y-1">
                                {slot.aiReasoning.map((reason, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-800">{reason}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Conflicts or Success */}
                            {slot.conflicts.length > 0 ? (
                              <div className="bg-yellow-50 border border-yellow-200 rounded p-2 flex gap-2">
                                <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-yellow-800">
                                  {slot.conflicts.map(conflict => <p key={conflict}>{conflict}</p>)}
                                </div>
                              </div>
                            ) : (
                              <div className="bg-green-50 border border-green-200 rounded p-2 flex gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-green-800 font-medium">No conflicts detected • All jury members available</p>
                              </div>
                            )}

                            {slot.isRecommended && (
                              <Badge className="w-fit bg-green-600 hover:bg-green-700">
                                <Zap className="w-3 h-3 mr-1" />
                                AI Recommended
                              </Badge>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Manual Jury Assignment */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Manual Jury Assignment
                      </h3>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAutoAssignJury}
                        className="flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Auto-assign Jury (AI)
                      </Button>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-900 border-blue-300 border text-xs">Président</Badge>
                        <span className="text-muted-foreground text-xs">(Grade élevé requis)</span>
                      </label>
                      <Select 
                        value={manualPresident?.id || ''} 
                        onValueChange={(id) => setManualPresident(MOCK_TEACHERS.find(t => t.id === id) || null)}
                      >
                        <SelectTrigger className="h-auto py-2">
                          <SelectValue placeholder="Sélectionner le président du jury...">
                            {manualPresident && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{manualPresident.name}</span>
                                <Badge variant="outline" className="text-xs">{manualPresident.grade}</Badge>
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailablePresidents().map(teacher => {
                            const skillMatch = teacher.skills.filter(s => selectedProject.skills.includes(s)).length
                            return (
                              <SelectItem key={teacher.id} value={teacher.id} className="py-3">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{teacher.name}</span>
                                    <Badge variant="outline" className="text-xs">{teacher.grade}</Badge>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{teacher.speciality}</span>
                                    {skillMatch > 0 && (
                                      <Badge className="bg-green-100 text-green-800 text-[10px] px-1.5 py-0">
                                        ✓ {skillMatch} compétence{skillMatch > 1 ? 's' : ''}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className="text-muted-foreground">Charge:</span>
                                    <div className="flex items-center gap-1">
                                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full ${
                                            teacher.currentLoad > 7 ? 'bg-red-500' : 
                                            teacher.currentLoad > 5 ? 'bg-yellow-500' : 
                                            'bg-green-500'
                                          }`}
                                          style={{ width: `${(teacher.currentLoad / 10) * 100}%` }}
                                        />
                                      </div>
                                      <span className="text-xs text-muted-foreground">{teacher.currentLoad}/10</span>
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-900 border-purple-300 border text-xs">Rapporteur</Badge>
                        <span className="text-muted-foreground text-xs">(Expertise technique)</span>
                      </label>
                      <Select 
                        value={manualRapporteur?.id || ''} 
                        onValueChange={(id) => setManualRapporteur(MOCK_TEACHERS.find(t => t.id === id) || null)}
                      >
                        <SelectTrigger className="h-auto py-2">
                          <SelectValue placeholder="Sélectionner le rapporteur...">
                            {manualRapporteur && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{manualRapporteur.name}</span>
                                {manualRapporteur.skills.filter(s => selectedProject.skills.includes(s)).length > 0 && (
                                  <Badge className="bg-purple-100 text-purple-800 text-xs">
                                    ⭐ Expert match
                                  </Badge>
                                )}
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableRapporteurs().map(teacher => {
                            const skillMatch = teacher.skills.filter(s => selectedProject.skills.includes(s)).length
                            return (
                              <SelectItem key={teacher.id} value={teacher.id} className="py-3">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{teacher.name}</span>
                                    {skillMatch > 0 && (
                                      <Badge className="bg-purple-100 text-purple-800 text-xs">
                                        ⭐ {skillMatch} expertise match
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span>{teacher.title}</span>
                                    <span>•</span>
                                    <span>{teacher.speciality}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {teacher.skills.slice(0, 3).map(skill => (
                                      <Badge 
                                        key={skill} 
                                        variant="secondary" 
                                        className={`text-[10px] px-1.5 py-0 ${
                                          selectedProject.skills.includes(skill) 
                                            ? 'bg-purple-100 text-purple-800' 
                                            : ''
                                        }`}
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className="text-muted-foreground">Charge:</span>
                                    <div className="flex items-center gap-1">
                                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full ${
                                            teacher.currentLoad > 7 ? 'bg-red-500' : 
                                            teacher.currentLoad > 5 ? 'bg-yellow-500' : 
                                            'bg-green-500'
                                          }`}
                                          style={{ width: `${(teacher.currentLoad / 10) * 100}%` }}
                                        />
                                      </div>
                                      <span className="text-xs text-muted-foreground">{teacher.currentLoad}/10</span>
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-900 border-green-300 border text-xs">Encadrant</Badge>
                          <span className="text-muted-foreground text-xs">(Superviseur du projet)</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                          <input
                            type="checkbox"
                            checked={replaceEncadrant}
                            onChange={(e) => {
                              setReplaceEncadrant(e.target.checked)
                              if (!e.target.checked) {
                                setManualEncadrant(selectedProject.assignedTeacher)
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-muted-foreground">Remplacer l'encadrant</span>
                        </label>
                      </div>
                      <Select 
                        value={manualEncadrant?.id || ''} 
                        onValueChange={(id) => setManualEncadrant(MOCK_TEACHERS.find(t => t.id === id) || null)}
                        disabled={!replaceEncadrant}
                      >
                        <SelectTrigger className={`h-auto py-2 ${!replaceEncadrant ? 'opacity-60' : ''}`}>
                          <SelectValue placeholder="Encadrant...">
                            {manualEncadrant && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{manualEncadrant.name}</span>
                                {!replaceEncadrant && <Badge variant="outline" className="text-xs">🔒 Auto</Badge>}
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableEncadrants().map(teacher => (
                            <SelectItem key={teacher.id} value={teacher.id} className="py-3">
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">{teacher.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {teacher.title} • {teacher.speciality}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {!replaceEncadrant && (
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <span>🔒</span>
                          <span>Le superviseur du projet est automatiquement assigné comme encadrant</span>
                        </p>
                      )}
                    </div>

                    {/* Selected Jury Summary */}
                    {manualPresident && manualRapporteur && manualEncadrant && (
                      <Card className="p-4 bg-green-50 border-green-200">
                        <h4 className="font-semibold text-sm text-green-900 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Équipe de jury sélectionnée
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-white rounded p-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">{manualPresident.name}</span>
                            </div>
                            <Badge className="bg-blue-100 text-blue-900 border-blue-300 border text-xs">
                              Président
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between bg-white rounded p-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">{manualRapporteur.name}</span>
                            </div>
                            <Badge className="bg-purple-100 text-purple-900 border-purple-300 border text-xs">
                              Rapporteur
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between bg-white rounded p-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-foreground">{manualEncadrant.name}</span>
                            </div>
                            <Badge className="bg-green-100 text-green-900 border-green-300 border text-xs">
                              Encadrant
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  disabled={
                    manualMode 
                      ? !manualPresident || !manualRapporteur || !manualEncadrant
                      : !selectedSlot
                  }
                  onClick={handleSchedule}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Accept & Schedule Defense
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
