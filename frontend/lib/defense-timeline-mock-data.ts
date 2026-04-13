import { MOCK_TEACHERS } from './scheduler-mock-data'
import type { JuryMember } from '@/models/jury.model'

export interface DefenseTimelineEvent {
  id: string
  date: string
  time: string
  room: string
  status: 'scheduled' | 'completed' | 'cancelled'
  student: {
    name: string
    avatar: string
    email: string
  }
  subject: {
    title: string
    description: string
    tags: string[]
  }
  jury: JuryMember[]
  teacherRole?: 'president' | 'rapporteur' | 'encadrant' | null
  attachments: {
    id: string
    name: string
    type: string
    url: string
  }[]
  timeline: {
    arrival: string
    setup: string
    presentation: string
    qa: string
    deliberation: string
    result: string
  }
  progress?: {
    thesisSubmitted: boolean
    slidesUploaded: boolean
    documentsComplete: boolean
  }
}

export const MOCK_DEFENSE_TIMELINE: DefenseTimelineEvent[] = [
  {
    id: 'def-1',
    date: '2025-06-25',
    time: '10:30',
    room: 'Salle B12',
    status: 'scheduled',
    student: {
      name: 'Ahmed Yassine',
      avatar: 'AY',
      email: 'ahmed.yassine@student.edu'
    },
    subject: {
      title: 'AI Traffic System Optimization',
      description: 'Real-time traffic prediction and optimization using machine learning and computer vision.',
      tags: ['AI', 'TensorFlow', 'Computer Vision', 'Python']
    },
    jury: [
      { teacher: MOCK_TEACHERS[3], role: 'president' },
      { teacher: MOCK_TEACHERS[0], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[1], role: 'encadrant' }
    ],
    teacherRole: 'rapporteur',
    attachments: [
      { id: 'att-1', name: 'Convocation Jury.pdf', type: 'pdf', url: '/docs/convocation.pdf' },
      { id: 'att-2', name: 'Rapport PFE.pdf', type: 'pdf', url: '/docs/rapport.pdf' },
      { id: 'att-3', name: "Fiche d'encadrement.pdf", type: 'pdf', url: '/docs/fiche.pdf' }
    ],
    timeline: {
      arrival: '10:15',
      setup: '10:30',
      presentation: '10:35',
      qa: '10:55',
      deliberation: '11:10',
      result: '11:20'
    },
    progress: {
      thesisSubmitted: true,
      slidesUploaded: true,
      documentsComplete: true
    }
  },
  {
    id: 'def-2',
    date: '2025-06-28',
    time: '14:00',
    room: 'Salle A05',
    status: 'scheduled',
    student: {
      name: 'Mariem Khaled',
      avatar: 'MK',
      email: 'mariem.khaled@student.edu'
    },
    subject: {
      title: 'Blockchain Voting Platform',
      description: 'Decentralized voting system with end-to-end encryption and anonymity guarantees.',
      tags: ['Blockchain', 'Solidity', 'Web3', 'Security']
    },
    jury: [
      { teacher: MOCK_TEACHERS[0], role: 'president' },
      { teacher: MOCK_TEACHERS[4], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[2], role: 'encadrant' }
    ],
    teacherRole: 'president',
    attachments: [
      { id: 'att-4', name: 'Convocation Jury.pdf', type: 'pdf', url: '/docs/convocation2.pdf' },
      { id: 'att-5', name: 'Rapport PFE.pdf', type: 'pdf', url: '/docs/rapport2.pdf' }
    ],
    timeline: {
      arrival: '13:45',
      setup: '14:00',
      presentation: '14:05',
      qa: '14:25',
      deliberation: '14:40',
      result: '14:50'
    },
    progress: {
      thesisSubmitted: true,
      slidesUploaded: false,
      documentsComplete: true
    }
  },
  {
    id: 'def-3',
    date: '2025-06-20',
    time: '09:00',
    room: 'Salle C22',
    status: 'completed',
    student: {
      name: 'Omar Hassan',
      avatar: 'OH',
      email: 'omar.hassan@student.edu'
    },
    subject: {
      title: 'IoT Healthcare Monitoring',
      description: 'Real-time patient monitoring system using IoT sensors and cloud infrastructure.',
      tags: ['IoT', 'AWS', 'React Native', 'Cloud']
    },
    jury: [
      { teacher: MOCK_TEACHERS[1], role: 'president' },
      { teacher: MOCK_TEACHERS[3], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[0], role: 'encadrant' }
    ],
    teacherRole: 'encadrant',
    attachments: [
      { id: 'att-6', name: 'Convocation Jury.pdf', type: 'pdf', url: '/docs/convocation3.pdf' },
      { id: 'att-7', name: 'Rapport PFE.pdf', type: 'pdf', url: '/docs/rapport3.pdf' },
      { id: 'att-8', name: 'Résultat Soutenance.pdf', type: 'pdf', url: '/docs/result.pdf' }
    ],
    timeline: {
      arrival: '08:45',
      setup: '09:00',
      presentation: '09:05',
      qa: '09:25',
      deliberation: '09:40',
      result: '09:50'
    },
    progress: {
      thesisSubmitted: true,
      slidesUploaded: true,
      documentsComplete: true
    }
  },
  {
    id: 'def-4',
    date: '2025-07-02',
    time: '11:00',
    room: 'Salle B15',
    status: 'scheduled',
    student: {
      name: 'Noor Mohamed',
      avatar: 'NM',
      email: 'noor.mohamed@student.edu'
    },
    subject: {
      title: 'E-Commerce Platform with AI Recommendations',
      description: 'Full-stack e-commerce platform with ML-powered recommendation engine.',
      tags: ['E-Commerce', 'ML', 'React', 'Node.js']
    },
    jury: [
      { teacher: MOCK_TEACHERS[2], role: 'president' },
      { teacher: MOCK_TEACHERS[5], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[0], role: 'encadrant' }
    ],
    teacherRole: null,
    attachments: [
      { id: 'att-9', name: 'Convocation Jury.pdf', type: 'pdf', url: '/docs/convocation4.pdf' }
    ],
    timeline: {
      arrival: '10:45',
      setup: '11:00',
      presentation: '11:05',
      qa: '11:25',
      deliberation: '11:40',
      result: '11:50'
    },
    progress: {
      thesisSubmitted: false,
      slidesUploaded: false,
      documentsComplete: false
    }
  },
  {
    id: 'def-5',
    date: '2025-06-15',
    time: '15:30',
    room: 'Salle A10',
    status: 'cancelled',
    student: {
      name: 'Sara Ali',
      avatar: 'SA',
      email: 'sara.ali@student.edu'
    },
    subject: {
      title: 'Mobile Health Tracker',
      description: 'Cross-platform mobile app for tracking health metrics and fitness goals.',
      tags: ['Mobile', 'Flutter', 'Health', 'Firebase']
    },
    jury: [
      { teacher: MOCK_TEACHERS[4], role: 'president' },
      { teacher: MOCK_TEACHERS[2], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[5], role: 'encadrant' }
    ],
    teacherRole: 'rapporteur',
    attachments: [],
    timeline: {
      arrival: '15:15',
      setup: '15:30',
      presentation: '15:35',
      qa: '15:55',
      deliberation: '16:10',
      result: '16:20'
    },
    progress: {
      thesisSubmitted: false,
      slidesUploaded: false,
      documentsComplete: false
    }
  }
]
