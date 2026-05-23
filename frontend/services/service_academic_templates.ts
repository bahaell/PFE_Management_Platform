import type { AcademicTemplate, AcademicTemplateType, TemplateField } from '@/models/academic-template.model'

const TEMPLATE_FIELDS: Record<AcademicTemplateType, TemplateField[]> = {
  convention: [
    { key: 'student_name', label: 'Nom de l\'étudiant', required: true, type: 'text' },
    { key: 'student_email', label: 'Email étudiant', required: true, type: 'email' },
    { key: 'student_id', label: 'Numéro étudiant', required: true, type: 'text' },
    { key: 'company_name', label: 'Nom de l\'entreprise', required: true, type: 'text' },
    { key: 'supervisor_name', label: 'Nom du superviseur', required: true, type: 'text' },
    { key: 'start_date', label: 'Date de début', required: true, type: 'date' },
    { key: 'end_date', label: 'Date de fin', required: true, type: 'date' },
    { key: 'project_title', label: 'Titre du projet', required: true, type: 'text' },
  ],
  encadrement: [
    { key: 'teacher_name', label: 'Nom de l\'encadrant', required: true, type: 'text' },
    { key: 'teacher_email', label: 'Email encadrant', required: true, type: 'email' },
    { key: 'student_name', label: 'Nom de l\'étudiant', required: true, type: 'text' },
    { key: 'project_title', label: 'Titre du projet', required: true, type: 'text' },
    { key: 'department', label: 'Département', required: true, type: 'text' },
    { key: 'year', label: 'Année académique', required: true, type: 'text' },
  ],
  demande_pfe: [
    { key: 'student_name', label: 'Nom de l\'étudiant', required: true, type: 'text' },
    { key: 'student_id', label: 'Numéro étudiant', required: true, type: 'text' },
    { key: 'project_title', label: 'Titre du projet', required: true, type: 'text' },
    { key: 'project_description', label: 'Description du projet', required: true, type: 'textarea' },
    { key: 'teacher_name', label: 'Encadrant proposé', required: true, type: 'text' },
  ],
  pv_soutenance: [
    { key: 'student_name', label: 'Nom de l\'étudiant', required: true, type: 'text' },
    { key: 'project_title', label: 'Titre du projet', required: true, type: 'text' },
    { key: 'defense_date', label: 'Date de soutenance', required: true, type: 'date' },
    { key: 'grade', label: 'Note', required: true, type: 'text' },
    { key: 'remarks', label: 'Remarques', required: false, type: 'textarea' },
    { key: 'jury_members', label: 'Membres du jury', required: true, type: 'text' },
  ],
  affectation: [
    { key: 'student_name', label: 'Nom de l\'étudiant', required: true, type: 'text' },
    { key: 'teacher_name', label: 'Nom de l\'encadrant', required: true, type: 'text' },
    { key: 'project_title', label: 'Titre du projet', required: true, type: 'text' },
    { key: 'assignment_date', label: 'Date d\'affectation', required: true, type: 'date' },
  ],
  autre: [
    { key: 'document_title', label: 'Titre du document', required: true, type: 'text' },
    { key: 'content', label: 'Contenu', required: true, type: 'textarea' },
    { key: 'author', label: 'Auteur', required: false, type: 'text' },
  ],
}

let MOCK_TEMPLATES: AcademicTemplate[] = [
  {
    id: 'TPL001',
    name: 'Convention de Stage Standard',
    type: 'convention',
    description: 'Modèle standard pour les conventions de stage',
    fields: TEMPLATE_FIELDS.convention,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    createdBy: 'COORD001',
    version: 1,
  },
  {
    id: 'TPL002',
    name: 'Fiche d\'Encadrement',
    type: 'encadrement',
    description: 'Modèle pour les fiches d\'encadrement',
    fields: TEMPLATE_FIELDS.encadrement,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    createdBy: 'COORD001',
    version: 1,
  },
  {
    id: 'TPL003',
    name: 'Demande de PFE Officielle',
    type: 'demande_pfe',
    description: 'Modèle pour les demandes de PFE',
    fields: TEMPLATE_FIELDS.demande_pfe,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    createdBy: 'COORD001',
    version: 1,
  },
  {
    id: 'TPL004',
    name: 'PV de Soutenance',
    type: 'pv_soutenance',
    description: 'Modèle pour les procès-verbaux de soutenance',
    fields: TEMPLATE_FIELDS.pv_soutenance,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    createdBy: 'COORD001',
    version: 1,
  },
  {
    id: 'TPL005',
    name: 'Fiche d\'Affectation Encadrant',
    type: 'affectation',
    description: 'Modèle pour l\'affectation des encadrants',
    fields: TEMPLATE_FIELDS.affectation,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    createdBy: 'COORD001',
    version: 1,
  },
  {
    id: 'TPL006',
    name: 'Document Personnalisé',
    type: 'autre',
    description: 'Modèle pour documents personnalisés',
    fields: TEMPLATE_FIELDS.autre,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    createdBy: 'COORD001',
    version: 1,
  },
]

export const AcademicTemplatesService = {
  async getAllTemplates(): Promise<AcademicTemplate[]> {
    return Promise.resolve([...MOCK_TEMPLATES])
  },

  async getTemplateById(id: string): Promise<AcademicTemplate | null> {
    return Promise.resolve(
      MOCK_TEMPLATES.find(t => t.id === id) || null
    )
  },

  async getTemplatesByType(type: AcademicTemplateType): Promise<AcademicTemplate[]> {
    return Promise.resolve(
      MOCK_TEMPLATES.filter(t => t.type === type)
    )
  },

  async createTemplate(template: Omit<AcademicTemplate, 'id' | 'createdAt' | 'updatedAt' | 'version'>): Promise<AcademicTemplate> {
    const id = `TPL${String(MOCK_TEMPLATES.length + 1).padStart(3, '0')}`
    const newTemplate: AcademicTemplate = {
      ...template,
      id,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      version: 1,
    }
    MOCK_TEMPLATES.push(newTemplate)
    return Promise.resolve(newTemplate)
  },

  async updateTemplate(id: string, updates: Partial<AcademicTemplate>): Promise<AcademicTemplate | null> {
    const template = MOCK_TEMPLATES.find(t => t.id === id)
    if (!template) return Promise.resolve(null)
    Object.assign(template, updates, { updatedAt: new Date().toISOString().split('T')[0] })
    return Promise.resolve(template)
  },

  async deleteTemplate(id: string): Promise<boolean> {
    const initialLength = MOCK_TEMPLATES.length
    MOCK_TEMPLATES = MOCK_TEMPLATES.filter(t => t.id !== id)
    return Promise.resolve(MOCK_TEMPLATES.length < initialLength)
  },

  async cloneTemplate(id: string, newName: string): Promise<AcademicTemplate | null> {
    const template = MOCK_TEMPLATES.find(t => t.id === id)
    if (!template) return Promise.resolve(null)
    const cloned = await this.createTemplate({
      ...template,
      name: newName,
    })
    return Promise.resolve(cloned)
  },

  async searchTemplates(query: string): Promise<AcademicTemplate[]> {
    const lowerQuery = query.toLowerCase()
    return Promise.resolve(
      MOCK_TEMPLATES.filter(
        t =>
          t.name.toLowerCase().includes(lowerQuery) ||
          t.description.toLowerCase().includes(lowerQuery)
      )
    )
  },
}
