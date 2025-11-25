// Mock data for the Intelligent Auto-Scheduler with Complete Jury Management

import type { Teacher } from '@/models/teacher.model'
import type { Jury, ScheduledDefense } from '@/models/scheduler.model'
export type { Jury, ScheduledDefense }
import type { Room } from '@/models/room.model'

export interface JuryMember {
  teacher: Teacher
  role: 'president' | 'rapporteur' | 'encadrant'
}

export interface Project {
  id: string
  studentName: string
  subject: string
  assignedTeacher: Teacher
  skills: string[]
  status: 'pending' | 'scheduled' | 'completed'
}

export interface RecommendedSlot {
  id: number
  time: string
  startTime: string
  endTime: string
  room: Room
  jury: JuryMember[]
  confidence: number
  conflicts: string[]
  isRecommended: boolean
  aiReasoning: string[]
}

export interface PendingRequest {
  id: number
  project: Project
  requestedDateRange: { from: string; to: string }
  priority: 'low' | 'medium' | 'high'
}

// Mock Rooms Data
export const MOCK_ROOMS: any[] = [
  {
    id: 'room-a',
    name: 'Room A - Amphitheater',
    capacity: 50,
    availability: [
      { start: '09:00', end: '12:00' },
      { start: '14:00', end: '17:00' }
    ],
    color: 'bg-blue-100 border-blue-300 text-blue-900'
  },
  {
    id: 'room-b',
    name: 'Room B - Conference Hall',
    capacity: 40,
    availability: [
      { start: '10:00', end: '13:00' },
      { start: '15:00', end: '18:00' }
    ],
    color: 'bg-purple-100 border-purple-300 text-purple-900'
  },
  {
    id: 'room-c',
    name: 'Room C - Seminar Room',
    capacity: 30,
    availability: [
      { start: '08:00', end: '12:00' },
      { start: '13:00', end: '17:00' }
    ],
    color: 'bg-green-100 border-green-300 text-green-900'
  }
]

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: 'dr-sami',
    name: 'Dr. Sami Ahmed',
    title: 'Professor',
    grade: 'Professor',
    speciality: 'Artificial Intelligence',
    skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP'],
    availableSlots: [
      { start: '09:00', end: '12:00' },
      { start: '14:00', end: '16:00' }
    ],
    currentLoad: 3,
    email: 'sami.ahmed@university.edu',
    department: 'CS',
    bio: '',
    researchInterests: '',
    yearsOfExperience: 10,
    phone: '12345678',
    gender: 'male',
    birthdate: '1980-01-01',
    avatar: '',
    role: 'teacher'
  },
  {
    id: 'dr-hatem',
    name: 'Dr. Hatem Hassan',
    title: 'Associate Professor',
    grade: 'Associate Professor',
    speciality: 'Data Science',
    skills: ['Data Mining', 'Big Data', 'Machine Learning', 'Statistics'],
    availableSlots: [
      { start: '10:00', end: '13:00' },
      { start: '15:00', end: '17:00' }
    ],
    currentLoad: 2,
    email: 'hatem.hassan@university.edu',
    department: 'CS',
    bio: '',
    researchInterests: '',
    yearsOfExperience: 8,
    phone: '12345678',
    gender: 'male',
    birthdate: '1982-01-01',
    avatar: '',
    role: 'teacher'
  },
  {
    id: 'dr-mariem',
    name: 'Dr. Mariem Ben Ali',
    title: 'Maitre Assistant',
    grade: 'Maitre Assistant',
    speciality: 'Software Engineering',
    skills: ['Web Development', 'Mobile Apps', 'Software Architecture', 'DevOps'],
    availableSlots: [
      { start: '08:00', end: '11:00' },
      { start: '14:00', end: '18:00' }
    ],
    currentLoad: 4,
    email: 'mariem.benali@university.edu',
    department: 'SE',
    bio: '',
    researchInterests: '',
    yearsOfExperience: 5,
    phone: '12345678',
    gender: 'female',
    birthdate: '1985-01-01',
    avatar: '',
    role: 'teacher'
  },
  {
    id: 'prof-ali',
    name: 'Prof. Ali Mohamed',
    title: 'Dean',
    grade: 'Dean',
    speciality: 'Computer Networks',
    skills: ['Network Security', 'IoT', 'Cloud Computing', 'Distributed Systems'],
    availableSlots: [
      { start: '09:00', end: '10:30' },
      { start: '14:00', end: '15:30' }
    ],
    currentLoad: 1,
    email: 'ali.mohamed@university.edu',
    department: 'Networks',
    bio: '',
    researchInterests: '',
    yearsOfExperience: 20,
    phone: '12345678',
    gender: 'male',
    birthdate: '1970-01-01',
    avatar: '',
    role: 'teacher'
  },
  {
    id: 'dr-ahmed',
    name: 'Dr. Ahmed Mansour',
    title: 'Assistant Professor',
    grade: 'Assistant',
    speciality: 'Cybersecurity',
    skills: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Blockchain'],
    availableSlots: [
      { start: '09:00', end: '12:00' },
      { start: '13:00', end: '16:00' }
    ],
    currentLoad: 2,
    email: 'ahmed.mansour@university.edu',
    department: 'Security',
    bio: '',
    researchInterests: '',
    yearsOfExperience: 3,
    phone: '12345678',
    gender: 'male',
    birthdate: '1990-01-01',
    avatar: '',
    role: 'teacher'
  },
  {
    id: 'dr-fatima',
    name: 'Dr. Fatima Zahra',
    title: 'Associate Professor',
    grade: 'Associate Professor',
    speciality: 'Human-Computer Interaction',
    skills: ['UX Design', 'UI Development', 'Usability Testing', 'Accessibility'],
    availableSlots: [
      { start: '10:00', end: '13:00' },
      { start: '15:00', end: '17:00' }
    ],
    currentLoad: 3,
    email: 'fatima.zahra@university.edu',
    department: 'HCI',
    bio: '',
    researchInterests: '',
    yearsOfExperience: 7,
    phone: '12345678',
    gender: 'female',
    birthdate: '1983-01-01',
    avatar: '',
    role: 'teacher'
  }
]

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    studentName: 'Ahmed Youssef',
    subject: 'AI Traffic System Optimization',
    assignedTeacher: MOCK_TEACHERS[0], // Dr. Sami (AI specialist)
    skills: ['Machine Learning', 'Computer Vision', 'Deep Learning'],
    status: 'pending'
  },
  {
    id: 'proj-2',
    studentName: 'Mariem Khaled',
    subject: 'Blockchain Voting Platform',
    assignedTeacher: MOCK_TEACHERS[4], // Dr. Ahmed (Blockchain)
    skills: ['Blockchain', 'Cryptography', 'Web Development'],
    status: 'pending'
  },
  {
    id: 'proj-3',
    studentName: 'Omar Hassan',
    subject: 'IoT Healthcare Monitoring',
    assignedTeacher: MOCK_TEACHERS[3], // Prof. Ali (IoT)
    skills: ['IoT', 'Cloud Computing', 'Mobile Apps'],
    status: 'pending'
  },
  {
    id: 'proj-4',
    studentName: 'Noor Mohamed',
    subject: 'E-Commerce Platform with AI Recommendations',
    assignedTeacher: MOCK_TEACHERS[2], // Dr. Mariem (Web Dev)
    skills: ['Web Development', 'Machine Learning', 'Software Architecture'],
    status: 'pending'
  }
]

export const generateRecommendedSlots = (project?: Project): RecommendedSlot[] => {
  if (!project) {
    return []
  }

  const encadrant = project.assignedTeacher

  // Find best président (highest grade, available, not encadrant)
  const presidentCandidates = MOCK_TEACHERS.filter(
    t => t.id !== encadrant.id &&
      (t.grade === 'Professor' || t.grade === 'Associate Professor' || t.grade === 'Dean')
  ).sort((a, b) => {
    const gradeOrder: Record<string, number> = { 'Dean': 4, 'Professor': 3, 'Associate Professor': 2, 'Maitre Assistant': 1, 'Assistant': 0 }
    return (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0)
  })

  // Find best rapporteur (skill match, available, not encadrant, not président)
  const findBestRapporteur = (president: Teacher) => {
    return MOCK_TEACHERS.filter(
      t => t.id !== encadrant.id && t.id !== president.id
    ).sort((a, b) => {
      const aSkills = a.skills as string[]
      const bSkills = b.skills as string[]
      const aSkillMatch = aSkills.filter(s => project.skills.includes(s)).length
      const bSkillMatch = bSkills.filter(s => project.skills.includes(s)).length
      if (bSkillMatch !== aSkillMatch) return bSkillMatch - aSkillMatch
      return (a.currentLoad || 0) - (b.currentLoad || 0)
    })[0]
  }

  const slot1President = presidentCandidates[0]
  const slot1Rapporteur = findBestRapporteur(slot1President)

  const slot2President = presidentCandidates[1] || presidentCandidates[0]
  const slot2Rapporteur = findBestRapporteur(slot2President)

  const slot3President = presidentCandidates[2] || presidentCandidates[0]
  const slot3Rapporteur = findBestRapporteur(slot3President)

  return [
    {
      id: 1,
      time: '14:00 – 14:45',
      startTime: '14:00',
      endTime: '14:45',
      room: MOCK_ROOMS[0],
      jury: [
        { teacher: slot1President, role: 'president' },
        { teacher: slot1Rapporteur, role: 'rapporteur' },
        { teacher: encadrant, role: 'encadrant' }
      ],
      confidence: 95,
      conflicts: [],
      isRecommended: true,
      aiReasoning: [
        `High expertise in ${project.skills[0]}`,
        'All teachers available',
        'Balanced load distribution',
        'No scheduling conflicts',
        'Optimal room capacity match'
      ]
    },
    {
      id: 2,
      time: '15:00 – 15:45',
      startTime: '15:00',
      endTime: '15:45',
      room: MOCK_ROOMS[1],
      jury: [
        { teacher: slot2President, role: 'president' },
        { teacher: slot2Rapporteur, role: 'rapporteur' },
        { teacher: encadrant, role: 'encadrant' }
      ],
      confidence: 87,
      conflicts: [],
      isRecommended: false,
      aiReasoning: [
        'Good skill alignment',
        'Slightly higher load for some members',
        'Alternative room available'
      ]
    },
    {
      id: 3,
      time: '10:00 – 10:45',
      startTime: '10:00',
      endTime: '10:45',
      room: MOCK_ROOMS[2],
      jury: [
        { teacher: slot3President, role: 'president' },
        { teacher: slot3Rapporteur, role: 'rapporteur' },
        { teacher: encadrant, role: 'encadrant' }
      ],
      confidence: 78,
      conflicts: [],
      isRecommended: false,
      aiReasoning: [
        'Early time slot',
        'Adequate expertise coverage',
        'Some members at higher load'
      ]
    }
  ]
}

export const MOCK_SCHEDULED_DEFENSES: ScheduledDefense[] = [
  {
    id: 1,
    projectName: 'AI in Healthcare - Group 1',
    student: 'Ali Hassan, Noor Mohamed',
    date: '2024-02-20',
    time: '10:00',
    room: 'Room 101',
    jury: [
      { teacher: MOCK_TEACHERS[0], role: 'president' },
      { teacher: MOCK_TEACHERS[1], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[2], role: 'encadrant' }
    ],
    status: 'scheduled'
  },
  {
    id: 2,
    projectName: 'Web3 E-Commerce - Group 2',
    student: 'Layla Ahmed',
    date: '2024-02-21',
    time: '14:00',
    room: 'Room 102',
    jury: [
      { teacher: MOCK_TEACHERS[3], role: 'president' },
      { teacher: MOCK_TEACHERS[4], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[5], role: 'encadrant' }
    ],
    status: 'scheduled'
  }
]

export const MOCK_PENDING_REQUESTS: PendingRequest[] = [
  {
    id: 1,
    project: MOCK_PROJECTS[0],
    requestedDateRange: { from: '2024-03-01', to: '2024-03-15' },
    priority: 'high'
  },
  {
    id: 2,
    project: MOCK_PROJECTS[1],
    requestedDateRange: { from: '2024-03-05', to: '2024-03-20' },
    priority: 'medium'
  },
  {
    id: 3,
    project: MOCK_PROJECTS[2],
    requestedDateRange: { from: '2024-03-10', to: '2024-03-25' },
    priority: 'low'
  }
]

// Mock Statistics
export const MOCK_STATISTICS = {
  totalScheduledDefenses: MOCK_SCHEDULED_DEFENSES.length,
  pendingRequests: MOCK_PENDING_REQUESTS.length,
  roomUtilization: {
    'Room A': 65,
    'Room B': 48,
    'Room C': 72
  },
  teacherLoad: MOCK_TEACHERS.reduce((acc, teacher) => {
    acc[teacher.name] = teacher.currentLoad || 0
    return acc
  }, {} as Record<string, number>)
}

export const getJuryRoleBadgeColor = (role: 'president' | 'rapporteur' | 'encadrant') => {
  switch (role) {
    case 'president':
      return 'bg-blue-100 text-blue-900 border-blue-300'
    case 'rapporteur':
      return 'bg-purple-100 text-purple-900 border-purple-300'
    case 'encadrant':
      return 'bg-green-100 text-green-900 border-green-300'
  }
}

export const getJuryRoleLabel = (role: 'president' | 'rapporteur' | 'encadrant') => {
  switch (role) {
    case 'president':
      return 'Président'
    case 'rapporteur':
      return 'Rapporteur'
    case 'encadrant':
      return 'Encadrant'
  }
}
