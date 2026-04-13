import type { AdministrativeDocument, AcademicDocumentType } from '@/models/academic-document.model'
import type { StudentProfile } from '@/models/student.model'
import type { Teacher } from '@/models/teacher.model'
import type { Project } from '@/models/project.model'

// Mock data for students and teachers
const MOCK_STUDENTS = [
  { id: 'STU001', name: 'Ali Hassan Mohamed', department: 'Computer Science', level: '3' },
  { id: 'STU002', name: 'Noor Ahmed Fatima', department: 'Information Technology', level: '3' },
  { id: 'STU003', name: 'Layla Ibrahim Zahra', department: 'Software Engineering', level: '3' },
  { id: 'STU004', name: 'Mohammed Karim Hassan', department: 'Computer Science', level: '3' },
  { id: 'STU005', name: 'Sara Abdelaziz Ahmed', department: 'Information Technology', level: '3' },
]

const MOCK_TEACHERS = [
  { id: 'TEACH001', name: 'Dr. Ahmed Hassan', speciality: 'Machine Learning' },
  { id: 'TEACH002', name: 'Eng. Fatima Zahra', speciality: 'Web Development' },
  { id: 'TEACH003', name: 'Prof. Mohammed Ali', speciality: 'Database Systems' },
]

const MOCK_PROJECTS = [
  { id: 'PROJ001', title: 'AI Healthcare Diagnosis System' },
  { id: 'PROJ002', title: 'Blockchain Voting Platform' },
  { id: 'PROJ003', title: 'IoT Smart City Management' },
  { id: 'PROJ004', title: 'Cloud-Based Analytics Engine' },
]

let MOCK_DOCUMENTS: AdministrativeDocument[] = [
  {
    id: 'DOC001',
    type: 'convention',
    studentId: 'STU001',
    studentName: 'Ali Hassan Mohamed',
    teacherId: 'TEACH001',
    teacherName: 'Dr. Ahmed Hassan',
    projectId: 'PROJ001',
    projectTitle: 'AI Healthcare Diagnosis System',
    generatedAt: '2024-01-15',
    fileUrl: '/documents/convention-stu001.pdf',
    status: 'ready',
  },
  {
    id: 'DOC002',
    type: 'encadrement',
    studentId: 'STU001',
    studentName: 'Ali Hassan Mohamed',
    teacherId: 'TEACH001',
    teacherName: 'Dr. Ahmed Hassan',
    projectId: 'PROJ001',
    projectTitle: 'AI Healthcare Diagnosis System',
    generatedAt: '2024-01-20',
    fileUrl: '/documents/encadrement-stu001.pdf',
    status: 'ready',
  },
  {
    id: 'DOC003',
    type: 'demande_pfe',
    studentId: 'STU002',
    studentName: 'Noor Ahmed Fatima',
    teacherId: 'TEACH002',
    teacherName: 'Eng. Fatima Zahra',
    projectId: 'PROJ002',
    projectTitle: 'Blockchain Voting Platform',
    generatedAt: '2024-01-18',
    fileUrl: '/documents/demande-pfe-stu002.pdf',
    status: 'ready',
  },
  {
    id: 'DOC004',
    type: 'pv_soutenance',
    studentId: 'STU002',
    studentName: 'Noor Ahmed Fatima',
    teacherId: 'TEACH002',
    teacherName: 'Eng. Fatima Zahra',
    projectId: 'PROJ002',
    projectTitle: 'Blockchain Voting Platform',
    generatedAt: '2024-02-10',
    fileUrl: '/documents/pv-soutenance-stu002.pdf',
    status: 'ready',
  },
  {
    id: 'DOC005',
    type: 'affectation',
    studentId: 'STU003',
    studentName: 'Layla Ibrahim Zahra',
    teacherId: 'TEACH003',
    teacherName: 'Prof. Mohammed Ali',
    projectId: 'PROJ003',
    projectTitle: 'IoT Smart City Management',
    generatedAt: '2024-01-22',
    fileUrl: '/documents/affectation-stu003.pdf',
    status: 'pending',
  },
  {
    id: 'DOC006',
    type: 'convention',
    studentId: 'STU004',
    studentName: 'Mohammed Karim Hassan',
    teacherId: 'TEACH001',
    teacherName: 'Dr. Ahmed Hassan',
    projectId: 'PROJ004',
    projectTitle: 'Cloud-Based Analytics Engine',
    generatedAt: '2024-02-01',
    fileUrl: '/documents/convention-stu004.pdf',
    status: 'ready',
  },
  {
    id: 'DOC007',
    type: 'demande_pfe',
    studentId: 'STU005',
    studentName: 'Sara Abdelaziz Ahmed',
    projectId: 'PROJ001',
    projectTitle: 'AI Healthcare Diagnosis System',
    generatedAt: '2024-02-05',
    fileUrl: '/documents/demande-pfe-stu005.pdf',
    status: 'ready',
  },
  {
    id: 'DOC008',
    type: 'autre',
    studentId: 'STU003',
    studentName: 'Layla Ibrahim Zahra',
    teacherId: 'TEACH003',
    teacherName: 'Prof. Mohammed Ali',
    generatedAt: '2024-02-08',
    fileUrl: '/documents/autre-stu003.pdf',
    status: 'ready',
  },
]

const documentTypeLabels: Record<AcademicDocumentType, string> = {
  convention: 'Convention de Stage',
  encadrement: 'Fiche d\'Encadrement',
  demande_pfe: 'Demande de PFE',
  pv_soutenance: 'PV de Soutenance',
  affectation: 'Affectation Encadrant',
  autre: 'Autre Document',
}

const AUTOFILL_MAPPINGS: Record<string, (data: any) => string> = {
  'student.fullName': (data) => data?.student?.fullName || 'Student Name',
  'student.email': (data) => data?.student?.email || 'student@example.com',
  'student.id': (data) => data?.student?.studentId || 'STU000',
  'teacher.fullName': (data) => data?.teacher?.fullName || 'Teacher Name',
  'teacher.email': (data) => data?.teacher?.email || 'teacher@example.com',
  'teacher.speciality': (data) => data?.teacher?.speciality || 'Speciality',
  'project.title': (data) => data?.project?.title || 'Project Title',
  'project.startDate': (data) => data?.project?.startDate || new Date().toISOString().split('T')[0],
  'project.description': (data) => data?.project?.description || 'Project Description',
  'coordinator.name': (data) => data?.coordinator?.fullName || 'Coordinator',
}

const autoFillDocumentData = (
  template: any,
  student: StudentProfile,
  teacher?: Teacher,
  project?: Project
): Record<string, any> => {
  const filledData: Record<string, any> = {}
  
  template.fields?.forEach((field: any) => {
    const mappingKey = Object.keys(AUTOFILL_MAPPINGS).find(
      key => field.key === key.split('.')[1]?.toLowerCase()
    )
    
    if (mappingKey) {
      filledData[field.key] = AUTOFILL_MAPPINGS[mappingKey]({
        student,
        teacher,
        project,
      })
    }
  })
  
  return filledData
}

export const AcademicDocumentsService = {
  async getAllDocuments(): Promise<AdministrativeDocument[]> {
    return Promise.resolve([...MOCK_DOCUMENTS])
  },

  async getDocumentsForStudent(studentId: string): Promise<AdministrativeDocument[]> {
    return Promise.resolve(
      MOCK_DOCUMENTS.filter(doc => doc.studentId === studentId)
    )
  },

  async getDocumentsForTeacher(teacherId: string): Promise<AdministrativeDocument[]> {
    return Promise.resolve(
      MOCK_DOCUMENTS.filter(doc => doc.teacherId === teacherId)
    )
  },

  async getDocumentById(id: string): Promise<AdministrativeDocument | null> {
    return Promise.resolve(
      MOCK_DOCUMENTS.find(doc => doc.id === id) || null
    )
  },

  async createDocument(newDoc: Omit<AdministrativeDocument, 'id'>): Promise<AdministrativeDocument> {
    const id = `DOC${String(MOCK_DOCUMENTS.length + 1).padStart(3, '0')}`
    const document: AdministrativeDocument = {
      ...newDoc,
      id,
      status: 'ready',
    }
    MOCK_DOCUMENTS.push(document)
    return Promise.resolve(document)
  },

  async updateDocument(
    id: string,
    updates: Partial<AdministrativeDocument>
  ): Promise<AdministrativeDocument | null> {
    const doc = MOCK_DOCUMENTS.find(d => d.id === id)
    if (!doc) return Promise.resolve(null)
    Object.assign(doc, updates)
    return Promise.resolve(doc)
  },

  async deleteDocument(id: string): Promise<boolean> {
    const initialLength = MOCK_DOCUMENTS.length
    MOCK_DOCUMENTS = MOCK_DOCUMENTS.filter(d => d.id !== id)
    return Promise.resolve(MOCK_DOCUMENTS.length < initialLength)
  },

  async searchDocuments(query: string): Promise<AdministrativeDocument[]> {
    const lowerQuery = query.toLowerCase()
    return Promise.resolve(
      MOCK_DOCUMENTS.filter(
        doc =>
          doc.studentName.toLowerCase().includes(lowerQuery) ||
          doc.type.toLowerCase().includes(lowerQuery) ||
          doc.projectTitle?.toLowerCase().includes(lowerQuery)
      )
    )
  },

  async getDocumentsByType(type: AcademicDocumentType): Promise<AdministrativeDocument[]> {
    return Promise.resolve(MOCK_DOCUMENTS.filter(doc => doc.type === type))
  },

  async generatePDF(data: any): Promise<string> {
    // Mock PDF generation - returns a file URL
    return Promise.resolve(`/documents/generated-${Date.now()}.pdf`)
  },

  getDocumentTypeLabel(type: AcademicDocumentType): string {
    return documentTypeLabels[type] || type
  },

  getMockStudents() {
    return MOCK_STUDENTS
  },

  getMockTeachers() {
    return MOCK_TEACHERS
  },

  getMockProjects() {
    return MOCK_PROJECTS
  },

  async generateDocumentFromRequest(
    requestId: string,
    templateId: string,
    studentId: string,
    teacherId?: string,
    projectId?: string
  ): Promise<AdministrativeDocument> {
    const id = `DOC${String(Math.random()).substring(2, 8)}`
    const now = new Date().toISOString().split('T')[0]
    
    const document: AdministrativeDocument = {
      id,
      type: 'convention',
      studentId,
      studentName: 'Student Name',
      teacherId,
      teacherName: 'Teacher Name',
      projectId,
      projectTitle: 'Project Title',
      templateId,
      generatedAt: now,
      fileUrl: `/documents/generated-${id}.pdf`,
      status: 'generated',
      filledData: {},
      deliveredTo: ['student'],
    }
    
    MOCK_DOCUMENTS.push(document)
    return Promise.resolve(document)
  },

  async getDocumentsByRequestId(requestId: string): Promise<AdministrativeDocument[]> {
    return Promise.resolve(
      MOCK_DOCUMENTS.filter(doc => doc.id.startsWith('DOC'))
    )
  },
}

export async function getAllAcademicDocuments(): Promise<AdministrativeDocument[]> {
  return AcademicDocumentsService.getAllDocuments()
}
