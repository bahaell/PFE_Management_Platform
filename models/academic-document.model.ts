export type AcademicDocumentType = 
  | 'convention' 
  | 'encadrement' 
  | 'demande_pfe' 
  | 'pv_soutenance' 
  | 'affectation' 
  | 'autre'

export interface AdministrativeDocument {
  id: string
  type: AcademicDocumentType
  studentId: string
  studentName: string
  teacherId?: string
  teacherName?: string
  projectId?: string
  projectTitle?: string
  templateId: string
  generatedAt: string
  deliveredAt?: string
  fileUrl: string
  status: 'requested' | 'generated' | 'delivered'
  filledData?: Record<string, any>
  deliveredTo: ('student' | 'teacher' | 'coordinator')[]
}
