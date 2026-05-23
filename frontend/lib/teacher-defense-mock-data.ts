import { MOCK_TEACHERS } from './scheduler-mock-data'
import type { Teacher } from '@/models/teacher.model'
import type { JuryMember } from '@/models/jury.model'

export interface TeacherDefense {
  id: string
  student: {
    name: string
    avatar: string
    email: string
  }
  subject: {
    title: string
    description: string
    technologies: string[]
  }
  defense: {
    date: string
    time: string
    room: string
    duration: string
    status: 'scheduled' | 'completed' | 'in-progress'
  }
  jury: JuryMember[]
  teacherRole: 'president' | 'rapporteur' | 'encadrant'
  attachments?: {
    id: string
    name: string
    url: string
    type: string
  }[]
  comments?: {
    id: string
    author: string
    content: string
    timestamp: string
  }[]
}

export const MOCK_TEACHER_DEFENSES: TeacherDefense[] = [
  {
    id: '1',
    student: {
      name: 'Ahmed Yassine',
      avatar: 'AY',
      email: 'ahmed.yassine@student.edu'
    },
    subject: {
      title: 'AI Traffic System Optimization',
      description: 'Real-time traffic prediction and optimization using machine learning and computer vision. The system analyzes live camera feeds to detect congestion patterns and provides intelligent routing suggestions.',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'React', 'FastAPI']
    },
    defense: {
      date: '2025-06-25',
      time: '10:30',
      room: 'Salle B12',
      duration: '45 min',
      status: 'scheduled'
    },
    jury: [
      { teacher: MOCK_TEACHERS[3], role: 'president' },
      { teacher: MOCK_TEACHERS[0], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[1], role: 'encadrant' }
    ],
    teacherRole: 'rapporteur',
    attachments: [
      {
        id: 'att1',
        name: 'Convocation Jury.pdf',
        url: '/attachments/convocation.pdf',
        type: 'pdf'
      },
      {
        id: 'att2',
        name: "Fiche d'encadrement.pdf",
        url: '/attachments/fiche.pdf',
        type: 'pdf'
      },
      {
        id: 'att3',
        name: 'Guide soutenance.pdf',
        url: '/attachments/guide.pdf',
        type: 'pdf'
      }
    ],
    comments: [
      {
        id: 'c1',
        author: 'Prof. Ali Mohamed',
        content: 'Please review the technical report before the defense.',
        timestamp: '2025-06-15T14:30:00'
      },
      {
        id: 'c2',
        author: 'Dr. Sami Ahmed',
        content: 'Student presentation slides look comprehensive.',
        timestamp: '2025-06-20T09:15:00'
      }
    ]
  },
  {
    id: '2',
    student: {
      name: 'Mariem Khaled',
      avatar: 'MK',
      email: 'mariem.khaled@student.edu'
    },
    subject: {
      title: 'Blockchain Voting Platform',
      description: 'Decentralized voting system with end-to-end encryption and anonymity guarantees.',
      technologies: ['Solidity', 'Ethereum', 'React', 'Node.js', 'IPFS']
    },
    defense: {
      date: '2025-06-28',
      time: '14:00',
      room: 'Salle A05',
      duration: '45 min',
      status: 'scheduled'
    },
    jury: [
      { teacher: MOCK_TEACHERS[0], role: 'president' },
      { teacher: MOCK_TEACHERS[4], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[2], role: 'encadrant' }
    ],
    teacherRole: 'president',
    attachments: [
      {
        id: 'att4',
        name: 'Convocation Jury.pdf',
        url: '/attachments/convocation.pdf',
        type: 'pdf'
      }
    ]
  },
  {
    id: '3',
    student: {
      name: 'Omar Hassan',
      avatar: 'OH',
      email: 'omar.hassan@student.edu'
    },
    subject: {
      title: 'IoT Healthcare Monitoring',
      description: 'Real-time patient monitoring system using IoT sensors and cloud infrastructure.',
      technologies: ['IoT', 'AWS', 'Node.js', 'React Native', 'MQTT']
    },
    defense: {
      date: '2025-06-20',
      time: '09:00',
      room: 'Salle C22',
      duration: '45 min',
      status: 'completed'
    },
    jury: [
      { teacher: MOCK_TEACHERS[1], role: 'president' },
      { teacher: MOCK_TEACHERS[3], role: 'rapporteur' },
      { teacher: MOCK_TEACHERS[0], role: 'encadrant' }
    ],
    teacherRole: 'encadrant'
  }
]
