import type { StudentProfile } from '@/models/student.model'

let MOCK_STUDENTS: StudentProfile[] = [
  {
    id: 'STU001',
    name: 'Ahmed Youssef',
    email: 'ahmed.youssef@student.edu',
    phone: '+216 20 123 456',
    gender: 'Male',
    birthdate: '2002-03-15',
    avatar: 'AY',
    role: 'student',
    level: 'M2',
    department: 'Software Engineering',
    studentId: 'ST20001',
    academicYear: '2024-2025',
    interests: 'AI, Machine Learning, Computer Vision',
    skills: [
      { id: 'skill-1', name: 'Python', category: 'Language', relevance: 90 },
      { id: 'skill-2', name: 'TensorFlow', category: 'ML Framework', relevance: 85 },
      { id: 'skill-3', name: 'OpenCV', category: 'Computer Vision', relevance: 80 }
    ]
  },
  {
    id: 'STU002',
    name: 'Mariem Khaled',
    email: 'mariem.khaled@student.edu',
    phone: '+216 21 234 567',
    gender: 'Female',
    birthdate: '2002-07-22',
    avatar: 'MK',
    role: 'student',
    level: 'M2',
    department: 'Software Engineering',
    studentId: 'ST20002',
    academicYear: '2024-2025',
    interests: 'Blockchain, Web3, Security',
    skills: [
      { id: 'skill-1', name: 'Solidity', category: 'Language', relevance: 85 },
      { id: 'skill-2', name: 'Blockchain', category: 'Crypto', relevance: 88 },
      { id: 'skill-3', name: 'Web3.js', category: 'Framework', relevance: 80 }
    ]
  }
]

export const StudentsService = {
  async createStudent(student: StudentProfile): Promise<StudentProfile> {
    const newStudent = { 
      ...student, 
      id: `STU${String(Math.max(...MOCK_STUDENTS.map(s => parseInt(s.id.replace('STU', ''))), 0) + 1).padStart(3, '0')}`,
      role: 'student' as const
    }
    MOCK_STUDENTS.push(newStudent)
    return Promise.resolve(newStudent)
  },

  async getStudentById(id: string): Promise<StudentProfile | null> {
    return Promise.resolve(MOCK_STUDENTS.find(s => s.id === id) || null)
  },

  async getAllStudents(): Promise<StudentProfile[]> {
    return Promise.resolve(MOCK_STUDENTS)
  },

  async updateStudent(id: string, updates: Partial<StudentProfile>): Promise<StudentProfile | null> {
    const student = MOCK_STUDENTS.find(s => s.id === id)
    if (!student) return Promise.resolve(null)
    Object.assign(student, updates, { id, role: 'student' })
    return Promise.resolve(student)
  },

  async deleteStudent(id: string): Promise<boolean> {
    const initialLength = MOCK_STUDENTS.length
    MOCK_STUDENTS = MOCK_STUDENTS.filter(s => s.id !== id)
    return Promise.resolve(MOCK_STUDENTS.length < initialLength)
  },

  async searchStudents(query: string): Promise<StudentProfile[]> {
    const lowerQuery = query.toLowerCase()
    return Promise.resolve(MOCK_STUDENTS.filter(s => 
      s.name.toLowerCase().includes(lowerQuery) || 
      s.email.toLowerCase().includes(lowerQuery) ||
      s.studentId.toLowerCase().includes(lowerQuery)
    ))
  },

  async getStudentsByLevel(level: string): Promise<StudentProfile[]> {
    return Promise.resolve(MOCK_STUDENTS.filter(s => s.level === level))
  },

  async getStudentsByDepartment(department: string): Promise<StudentProfile[]> {
    return Promise.resolve(MOCK_STUDENTS.filter(s => s.department === department))
  },

  async getStudentsByAcademicYear(academicYear: string): Promise<StudentProfile[]> {
    return Promise.resolve(MOCK_STUDENTS.filter(s => s.academicYear === academicYear))
  },
}
