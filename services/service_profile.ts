import type { StudentProfile } from '@/models/student.model'
import type { Teacher } from '@/models/teacher.model'
import type { CoordinatorProfile } from '@/models/coordinator.model'
import type { Skill } from '@/models/skill.model'
import type { ProfileData, ProfileSkillMeta } from '@/models/profile.model'

let profileMockData: Record<string, StudentProfile | Teacher | CoordinatorProfile> = {
  student: {
    id: 'STU001',
    name: 'Baha Ellouze',
    email: 'bahaaellouze@gmail.com',
    phone: '+216 22 222 222',
    gender: 'Male',
    birthdate: '2002-05-15',
    avatar: null,
    role: 'student',
    level: 'M1',
    department: 'Software Engineering',
    studentId: 'ST12345',
    academicYear: '2024-2025',
    interests: 'AI, Web Development, Cloud Computing',
    skills: [
      { id: 'skill-1', name: 'React', category: 'Frontend', relevance: 85 },
      { id: 'skill-2', name: 'TypeScript', category: 'Language', relevance: 80 },
      { id: 'skill-3', name: 'Node.js', category: 'Backend', relevance: 75 },
      { id: 'skill-4', name: 'Docker', category: 'DevOps', relevance: 70 },
      { id: 'skill-5', name: 'SQL', category: 'Database', relevance: 80 },
    ],
  },
  teacher: {
    id: 'TCH001',
    name: 'Dr. Sami H.',
    email: 'sami.h@university.tn',
    phone: '+216 98 765 4321',
    gender: 'Male',
    birthdate: '1975-03-20',
    avatar: null,
    role: 'teacher',
    grade: 'Assistant Professor',
    speciality: 'AI & Machine Learning',
    department: 'Computer Science',
    bio: 'Passionate about AI research and teaching. Published 15+ research papers.',
    researchInterests: 'Deep Learning, NLP, Computer Vision',
    yearsOfExperience: 8,
    skills: [
      { id: 'skill-1', name: 'Python', category: 'Language', relevance: 95 },
      { id: 'skill-2', name: 'TensorFlow', category: 'ML Framework', relevance: 90 },
      { id: 'skill-3', name: 'Deep Learning', category: 'ML', relevance: 90 },
      { id: 'skill-4', name: 'Research', category: 'Academics', relevance: 85 },
      { id: 'skill-5', name: 'Teaching', category: 'Academics', relevance: 85 },
    ],
  },
  coordinator: {
    id: 'COR001',
    name: 'Mme Mariem K.',
    email: 'mariem.k@university.tn',
    phone: '+216 71 123 456',
    gender: 'Female',
    birthdate: '1980-11-10',
    avatar: null,
    role: 'coordinator',
    department: 'Computer Science',
    office: 'B12',
    responsibilities: 'Oversee all PFE projects, schedule defenses, manage resources',
    yearsOfService: 5,
    skills: [
      { id: 'skill-1', name: 'Administration', category: 'Management', relevance: 95 },
      { id: 'skill-2', name: 'Planning', category: 'Management', relevance: 90 },
      { id: 'skill-3', name: 'Communication', category: 'Soft Skills', relevance: 90 },
      { id: 'skill-4', name: 'Problem Solving', category: 'Soft Skills', relevance: 85 },
      { id: 'skill-5', name: 'Organization', category: 'Management', relevance: 90 },
    ],
  },
}

const suggestedSkills = {
  frontend: ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Tailwind CSS'],
  backend: ['Node.js', 'Python', 'Java', 'C#', 'Go', 'Rust'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'Jenkins'],
  ml: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NLTK'],
  general: ['Git', 'REST API', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Redis'],
}

const skillCategories = [
  { id: 'frontend', name: 'Frontend', color: '#3B82F6' },
  { id: 'backend', name: 'Backend', color: '#10B981' },
  { id: 'database', name: 'Database', color: '#F59E0B' },
  { id: 'devops', name: 'DevOps', color: '#8B5CF6' },
  { id: 'ml', name: 'Machine Learning', color: '#EC4899' },
  { id: 'language', name: 'Programming Language', color: '#06B6D4' },
  { id: 'soft-skills', name: 'Soft Skills', color: '#6366F1' },
  { id: 'management', name: 'Management', color: '#14B8A6' },
]

export const ProfileService = {
  async getProfile(role: string): Promise<StudentProfile | Teacher | CoordinatorProfile | null> {
    return Promise.resolve(profileMockData[role] || null)
  },

  async createProfile(role: string, data: StudentProfile | Teacher | CoordinatorProfile): Promise<StudentProfile | Teacher | CoordinatorProfile> {
    profileMockData[role] = { ...data, role: role as 'student' | 'teacher' | 'coordinator' }
    return Promise.resolve(profileMockData[role])
  },

  async updateProfile(role: string, data: Partial<StudentProfile | Teacher | CoordinatorProfile>): Promise<StudentProfile | Teacher | CoordinatorProfile | null> {
    const profile = profileMockData[role]
    if (!profile) return Promise.resolve(null)
    const updated = { ...profile, ...data, id: profile.id, role: profile.role }
    profileMockData[role] = updated
    return Promise.resolve(updated)
  },

  async deleteProfile(role: string): Promise<boolean> {
    if (profileMockData[role]) {
      delete profileMockData[role]
      return Promise.resolve(true)
    }
    return Promise.resolve(false)
  },

  async getAllProfiles(): Promise<(StudentProfile | Teacher | CoordinatorProfile)[]> {
    return Promise.resolve(Object.values(profileMockData))
  },

  async getSuggestedSkills() {
    return Promise.resolve(suggestedSkills)
  },

  async getSkillCategories() {
    return Promise.resolve(skillCategories)
  },

  async addSkill(role: string, skill: Skill): Promise<Skill | null> {
    const profile = profileMockData[role]
    if (profile && 'skills' in profile) {
      profile.skills.push(skill)
      return Promise.resolve(skill)
    }
    return Promise.resolve(null)
  },

  async removeSkill(role: string, skillId: string): Promise<boolean> {
    const profile = profileMockData[role]
    if (profile && 'skills' in profile) {
      const initialLength = profile.skills.length
      profile.skills = profile.skills.filter(s => s.id !== skillId)
      return Promise.resolve(profile.skills.length < initialLength)
    }
    return Promise.resolve(false)
  },

  async updateSkill(role: string, skillId: string, updates: Partial<Skill>): Promise<Skill | null> {
    const profile = profileMockData[role]
    if (profile && 'skills' in profile) {
      const skill = profile.skills.find(s => s.id === skillId)
      if (skill) {
        Object.assign(skill, updates)
        return Promise.resolve(skill)
      }
    }
    return Promise.resolve(null)
  },

  async getSkill(role: string, skillId: string): Promise<Skill | null> {
    const profile = profileMockData[role]
    if (profile && 'skills' in profile) {
      return Promise.resolve(profile.skills.find(s => s.id === skillId) || null)
    }
    return Promise.resolve(null)
  },

  async getAllSkills(role: string): Promise<Skill[]> {
    const profile = profileMockData[role]
    if (profile && 'skills' in profile) {
      return Promise.resolve(profile.skills)
    }
    return Promise.resolve([])
  },
}
