export type AcademicTemplateType = 
  | 'convention' 
  | 'encadrement' 
  | 'demande_pfe' 
  | 'pv_soutenance' 
  | 'affectation' 
  | 'autre'

export interface TemplateField {
  key: string
  label: string
  required: boolean
  type?: 'text' | 'email' | 'date' | 'select' | 'textarea'
  placeholder?: string
}

export interface AcademicTemplate {
  id: string
  name: string
  type: AcademicTemplateType
  description: string
  fields: TemplateField[]
  createdAt: string
  updatedAt: string
  createdBy: string
  version: number
}
