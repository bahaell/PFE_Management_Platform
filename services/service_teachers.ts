import type { Teacher } from '@/models/teacher.model'

let MOCK_TEACHERS_PROFILES: Teacher[] = [
  {
    id: 'TCH001',
    name: 'Dr. Sami Ahmed',
    email: 'sami.ahmed@university.edu',
    phone: '+216 98 123 456',
    gender: 'Male',
    birthdate: '1975-03-20',
    avatar: 'SA',
    role: 'teacher',
    grade: 'Professor',
    speciality: 'Artificial Intelligence',
    department: 'Computer Science',
    bio: 'Passionate about AI research and teaching.',
    researchInterests: 'Deep Learning, NLP, Computer Vision',
    yearsOfExperience: 20,
    skills: [
      { id: 'skill-1', name: 'Python', category: 'Language', relevance: 95 },
      { id: 'skill-2', name: 'TensorFlow', category: 'ML Framework', relevance: 90 }
    ]
  },
  {
    id: 'TCH002',
    name: 'Dr. Mariem Ben Ali',
    email: 'mariem.benali@university.edu',
    phone: '+216 97 234 567',
    gender: 'Female',
    birthdate: '1985-06-10',
    avatar: 'MB',
    role: 'teacher',
    grade: 'Associate Professor',
    speciality: 'Software Engineering',
    department: 'Computer Science',
    bio: 'Expert in software architecture and web development.',
    researchInterests: 'DevOps, Microservices, Cloud Computing',
    yearsOfExperience: 12,
    skills: [
      { id: 'skill-1', name: 'JavaScript', category: 'Language', relevance: 90 },
      { id: 'skill-2', name: 'Node.js', category: 'Backend', relevance: 88 }
    ]
  }
]

export const TeachersService = {
  async createTeacher(teacher: Teacher): Promise<Teacher> {
    const newTeacher = { 
      ...teacher, 
      id: `TCH${String(Math.max(...MOCK_TEACHERS_PROFILES.map(t => parseInt(t.id.replace('TCH', ''))), 0) + 1).padStart(3, '0')}`,
      role: 'teacher' as const
    }
    MOCK_TEACHERS_PROFILES.push(newTeacher)
    return Promise.resolve(newTeacher)
  },

  async getTeacherById(id: string): Promise<Teacher | null> {
    return Promise.resolve(MOCK_TEACHERS_PROFILES.find(t => t.id === id) || null)
  },

  async getAllTeachers(): Promise<Teacher[]> {
    return Promise.resolve(MOCK_TEACHERS_PROFILES)
  },

  async updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher | null> {
    const teacher = MOCK_TEACHERS_PROFILES.find(t => t.id === id)
    if (!teacher) return Promise.resolve(null)
    Object.assign(teacher, updates, { id, role: 'teacher' })
    return Promise.resolve(teacher)
  },

  async deleteTeacher(id: string): Promise<boolean> {
    const initialLength = MOCK_TEACHERS_PROFILES.length
    MOCK_TEACHERS_PROFILES = MOCK_TEACHERS_PROFILES.filter(t => t.id !== id)
    return Promise.resolve(MOCK_TEACHERS_PROFILES.length < initialLength)
  },

  async searchTeachers(query: string): Promise<Teacher[]> {
    const lowerQuery = query.toLowerCase()
    return Promise.resolve(MOCK_TEACHERS_PROFILES.filter(t => 
      t.name.toLowerCase().includes(lowerQuery) || 
      t.speciality.toLowerCase().includes(lowerQuery) ||
      t.email.toLowerCase().includes(lowerQuery)
    ))
  },

  async getTeachersByGrade(grade: string): Promise<Teacher[]> {
    return Promise.resolve(MOCK_TEACHERS_PROFILES.filter(t => t.grade === grade))
  },

  async getTeachersBySpeciality(speciality: string): Promise<Teacher[]> {
    return Promise.resolve(MOCK_TEACHERS_PROFILES.filter(t => t.speciality === speciality))
  },

  async getTeachersByDepartment(department: string): Promise<Teacher[]> {
    return Promise.resolve(MOCK_TEACHERS_PROFILES.filter(t => t.department === department))
  },

  async getTeachersByExperience(minYears: number): Promise<Teacher[]> {
    return Promise.resolve(MOCK_TEACHERS_PROFILES.filter(t => t.yearsOfExperience >= minYears))
  },
}
