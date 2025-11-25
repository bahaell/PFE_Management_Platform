import type { JuryMember } from '@/models/jury.model'
import type { Teacher } from '@/models/teacher.model'

interface JuryMemberInternal {
  id: string
  teacher: Teacher
  role: 'president' | 'rapporteur' | 'encadrant'
}

let MOCK_JURY_MEMBERS: JuryMemberInternal[] = [
  { 
    id: 'jury-1', 
    teacher: {
      id: 'TCH001',
      name: 'Prof. Ali Mohamed',
      email: 'ali@university.edu',
      phone: '+216 90 000 001',
      gender: 'Male',
      birthdate: '1970-01-01',
      avatar: 'AM',
      role: 'teacher',
      grade: 'Professor',
      speciality: 'Computer Networks',
      department: 'Computer Science',
      bio: 'Expert in networks',
      researchInterests: 'Networks, IoT',
      yearsOfExperience: 25,
      skills: []
    },
    role: 'president'
  },
  { 
    id: 'jury-2', 
    teacher: {
      id: 'TCH002',
      name: 'Dr. Ahmed Mansour',
      email: 'ahmed@university.edu',
      phone: '+216 90 000 002',
      gender: 'Male',
      birthdate: '1980-01-01',
      avatar: 'AM',
      role: 'teacher',
      grade: 'Associate Professor',
      speciality: 'Cybersecurity',
      department: 'Computer Science',
      bio: 'Security expert',
      researchInterests: 'Security, Encryption',
      yearsOfExperience: 15,
      skills: []
    },
    role: 'rapporteur'
  },
  { 
    id: 'jury-3', 
    teacher: {
      id: 'TCH003',
      name: 'Dr. Fatima Zahra',
      email: 'fatima@university.edu',
      phone: '+216 90 000 003',
      gender: 'Female',
      birthdate: '1982-01-01',
      avatar: 'FZ',
      role: 'teacher',
      grade: 'Assistant Professor',
      speciality: 'Human-Computer Interaction',
      department: 'Computer Science',
      bio: 'HCI specialist',
      researchInterests: 'UX, Accessibility',
      yearsOfExperience: 10,
      skills: []
    },
    role: 'encadrant'
  }
]

export const JuryService = {
  async createJuryMember(member: JuryMember): Promise<JuryMember> {
    const newMember: JuryMemberInternal = {
      id: `jury-${Date.now()}`,
      teacher: member.teacher,
      role: member.role
    }
    MOCK_JURY_MEMBERS.push(newMember)
    return Promise.resolve(member)
  },

  async getJuryMemberById(id: string): Promise<JuryMember | null> {
    return Promise.resolve((MOCK_JURY_MEMBERS.find(j => j.id === id) as JuryMember) || null)
  },

  async getAllJuryMembers(): Promise<JuryMember[]> {
    return Promise.resolve(MOCK_JURY_MEMBERS as JuryMember[])
  },

  async updateJuryMember(id: string, updates: Partial<JuryMember>): Promise<JuryMember | null> {
    const member = MOCK_JURY_MEMBERS.find(j => j.id === id)
    if (!member) return Promise.resolve(null)
    if (updates.teacher) member.teacher = updates.teacher
    if (updates.role) member.role = updates.role
    return Promise.resolve(member as JuryMember)
  },

  async deleteJuryMember(id: string): Promise<boolean> {
    const initialLength = MOCK_JURY_MEMBERS.length
    MOCK_JURY_MEMBERS = MOCK_JURY_MEMBERS.filter(j => j.id !== id)
    return Promise.resolve(MOCK_JURY_MEMBERS.length < initialLength)
  },

  async getJuryByRole(role: 'president' | 'rapporteur' | 'encadrant'): Promise<JuryMember[]> {
    return Promise.resolve((MOCK_JURY_MEMBERS.filter(j => j.role === role) as JuryMember[]))
  },

  async searchJury(query: string): Promise<JuryMember[]> {
    const lowerQuery = query.toLowerCase()
    return Promise.resolve((MOCK_JURY_MEMBERS.filter(j =>
      j.teacher.name.toLowerCase().includes(lowerQuery) ||
      j.teacher.speciality.toLowerCase().includes(lowerQuery)
    ) as JuryMember[]))
  },

  async getJuryBySpeciality(speciality: string): Promise<JuryMember[]> {
    return Promise.resolve((MOCK_JURY_MEMBERS.filter(j => j.teacher.speciality === speciality) as JuryMember[]))
  },

  async getJuryByDepartment(department: string): Promise<JuryMember[]> {
    return Promise.resolve((MOCK_JURY_MEMBERS.filter(j => j.teacher.department === department) as JuryMember[]))
  },
}
