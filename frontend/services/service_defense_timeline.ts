import type { DefenseEvent } from '@/models/defense.model'
import type { JuryMember } from '@/models/jury.model'
import type { TimelineAttachment, TimelineEntry, DefenseTimelineEvent } from '@/models/timeline.model'

let MOCK_DEFENSE_TIMELINE: DefenseEvent[] = [
  { 
    id: 'def-1', 
    date: '2025-06-25', 
    time: '10:30', 
    room: 'Salle B12', 
    status: 'scheduled', 
    student: { name: 'Ahmed Yassine', avatar: 'AY', email: 'ahmed.yassine@student.edu' }, 
    subject: { title: 'AI Traffic System Optimization', description: 'Real-time traffic prediction and optimization using machine learning and computer vision.', tags: ['AI', 'TensorFlow', 'Computer Vision', 'Python'] }, 
    jury: [], 
    attachments: [
      { id: 'att-1', name: 'Convocation Jury.pdf', type: 'pdf', url: '/docs/convocation.pdf' }, 
      { id: 'att-2', name: 'Rapport PFE.pdf', type: 'pdf', url: '/docs/rapport.pdf' }, 
      { id: 'att-3', name: "Fiche d'encadrement.pdf", type: 'pdf', url: '/docs/fiche.pdf' }
    ], 
    timeline: { arrival: '10:15', setup: '10:30', presentation: '10:35', qa: '10:55', deliberation: '11:10', result: '11:20' }, 
    progress: { thesisSubmitted: true, slidesUploaded: true, documentsComplete: true } 
  },
  { 
    id: 'def-2', 
    date: '2025-06-28', 
    time: '14:00', 
    room: 'Salle A05', 
    status: 'scheduled', 
    student: { name: 'Mariem Khaled', avatar: 'MK', email: 'mariem.khaled@student.edu' }, 
    subject: { title: 'Blockchain Voting Platform', description: 'Decentralized voting system with end-to-end encryption and anonymity guarantees.', tags: ['Blockchain', 'Solidity', 'Web3', 'Security'] }, 
    jury: [], 
    attachments: [
      { id: 'att-4', name: 'Convocation Jury.pdf', type: 'pdf', url: '/docs/convocation2.pdf' }, 
      { id: 'att-5', name: 'Rapport PFE.pdf', type: 'pdf', url: '/docs/rapport2.pdf' }
    ], 
    timeline: { arrival: '13:45', setup: '14:00', presentation: '14:05', qa: '14:25', deliberation: '14:40', result: '14:50' }, 
    progress: { thesisSubmitted: true, slidesUploaded: false, documentsComplete: true } 
  },
  { 
    id: 'def-3', 
    date: '2025-06-20', 
    time: '09:00', 
    room: 'Salle C22', 
    status: 'completed', 
    student: { name: 'Omar Hassan', avatar: 'OH', email: 'omar.hassan@student.edu' }, 
    subject: { title: 'IoT Healthcare Monitoring', description: 'Real-time patient monitoring system using IoT sensors and cloud infrastructure.', tags: ['IoT', 'AWS', 'React Native', 'Cloud'] }, 
    jury: [], 
    attachments: [
      { id: 'att-6', name: 'Convocation Jury.pdf', type: 'pdf', url: '/docs/convocation3.pdf' }, 
      { id: 'att-7', name: 'Rapport PFE.pdf', type: 'pdf', url: '/docs/rapport3.pdf' }, 
      { id: 'att-8', name: 'Résultat Soutenance.pdf', type: 'pdf', url: '/docs/result.pdf' }
    ], 
    timeline: { arrival: '08:45', setup: '09:00', presentation: '09:05', qa: '09:25', deliberation: '09:40', result: '09:50' }, 
    progress: { thesisSubmitted: true, slidesUploaded: true, documentsComplete: true } 
  }
]

export const DefenseTimelineService = {
  async createDefense(defense: DefenseEvent): Promise<DefenseEvent> {
    const newDefense: DefenseEvent = {
      ...defense,
      id: `def-${Date.now()}`
    }
    MOCK_DEFENSE_TIMELINE.push(newDefense)
    return Promise.resolve(newDefense)
  },

  async getDefenseById(id: string): Promise<DefenseEvent | null> {
    return Promise.resolve(MOCK_DEFENSE_TIMELINE.find(d => d.id === id) || null)
  },

  async getAllDefenses(): Promise<DefenseEvent[]> {
    return Promise.resolve(MOCK_DEFENSE_TIMELINE)
  },

  async updateDefense(id: string, updates: Partial<DefenseEvent>): Promise<DefenseEvent | null> {
    const defense = MOCK_DEFENSE_TIMELINE.find(d => d.id === id)
    if (!defense) return Promise.resolve(null)
    Object.assign(defense, updates, { id })
    return Promise.resolve(defense)
  },

  async deleteDefense(id: string): Promise<boolean> {
    const initialLength = MOCK_DEFENSE_TIMELINE.length
    MOCK_DEFENSE_TIMELINE = MOCK_DEFENSE_TIMELINE.filter(d => d.id !== id)
    return Promise.resolve(MOCK_DEFENSE_TIMELINE.length < initialLength)
  },

  async getDefensesByStatus(status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress'): Promise<DefenseEvent[]> {
    return Promise.resolve(MOCK_DEFENSE_TIMELINE.filter(d => d.status === status))
  },

  async getDefensesByDateRange(startDate: string, endDate: string): Promise<DefenseEvent[]> {
    return Promise.resolve(MOCK_DEFENSE_TIMELINE.filter(d => d.date >= startDate && d.date <= endDate))
  },

  async getDefensesByRoom(room: string): Promise<DefenseEvent[]> {
    return Promise.resolve(MOCK_DEFENSE_TIMELINE.filter(d => d.room === room))
  },

  async getDefensesByStudent(studentName: string): Promise<DefenseEvent[]> {
    const lowerName = studentName.toLowerCase()
    return Promise.resolve(MOCK_DEFENSE_TIMELINE.filter(d => d.student.name.toLowerCase().includes(lowerName)))
  },

  async updateDefenseStatus(id: string, status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress'): Promise<DefenseEvent | null> {
    const defense = MOCK_DEFENSE_TIMELINE.find(d => d.id === id)
    if (!defense) return Promise.resolve(null)
    defense.status = status
    return Promise.resolve(defense)
  },

  async addAttachment(id: string, attachment: TimelineAttachment): Promise<DefenseEvent | null> {
    const defense = MOCK_DEFENSE_TIMELINE.find(d => d.id === id)
    if (!defense) return Promise.resolve(null)
    defense.attachments.push(attachment)
    return Promise.resolve(defense)
  },

  async removeAttachment(id: string, attachmentId: string): Promise<boolean> {
    const defense = MOCK_DEFENSE_TIMELINE.find(d => d.id === id)
    if (!defense) return Promise.resolve(false)
    const initialLength = defense.attachments.length
    defense.attachments = defense.attachments.filter(a => a.id !== attachmentId)
    return Promise.resolve(defense.attachments.length < initialLength)
  },

  async updateTimeline(id: string, timeline: TimelineEntry): Promise<DefenseEvent | null> {
    const defense = MOCK_DEFENSE_TIMELINE.find(d => d.id === id)
    if (!defense) return Promise.resolve(null)
    defense.timeline = timeline
    return Promise.resolve(defense)
  },

  async updateProgress(id: string, progress: DefenseEvent['progress']): Promise<DefenseEvent | null> {
    const defense = MOCK_DEFENSE_TIMELINE.find(d => d.id === id)
    if (!defense) return Promise.resolve(null)
    defense.progress = progress
    return Promise.resolve(defense)
  },
}
