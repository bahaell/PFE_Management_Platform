import type { Commit } from '@/models/commit.model'
import { ProjectsService } from './service_projects'

// Event listeners for commit changes
type CommitListener = (commit: Commit) => void
let commitListeners: CommitListener[] = []

let MOCK_COMMITS: Commit[] = [
  {
    id: 'commit-1',
    projectId: '1',
    documentId: 'doc-1',
    teacherId: 'teacher-1',
    teacherName: 'Dr. Ahmed Hassan',
    teacherAvatar: 'AH',
    comment: 'Good start on the Report Draft. The structure is clear, but I would like to see more detailed analysis in section 2. Consider adding more citations and research findings.',
    previousProgress: 0,
    newProgress: 15,
    attachments: [],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'commit-2',
    projectId: '1',
    documentId: 'doc-1',
    teacherId: 'teacher-1',
    teacherName: 'Dr. Ahmed Hassan',
    teacherAvatar: 'AH',
    comment: 'Excellent improvements on the Report Draft. The analysis is now more comprehensive and well-documented. Great use of citations and research backing.',
    previousProgress: 15,
    newProgress: 35,
    attachments: [
      { id: 'att-1', name: 'feedback_report.pdf', url: '/attachments/feedback.pdf', type: 'pdf' }
    ],
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'commit-3',
    projectId: '1',
    documentId: 'doc-2',
    teacherId: 'teacher-1',
    teacherName: 'Dr. Ahmed Hassan',
    teacherAvatar: 'AH',
    comment: 'Great progress on Architecture.pdf! The system design is well thought out. The microservices approach is solid. Consider adding a deployment diagram and scaling considerations.',
    previousProgress: 35,
    newProgress: 50,
    attachments: [],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'commit-4',
    projectId: '1',
    documentId: 'doc-2',
    teacherId: 'teacher-1',
    teacherName: 'Dr. Ahmed Hassan',
    teacherAvatar: 'AH',
    comment: 'Outstanding work on adding deployment diagrams and security considerations. The Architecture document is comprehensive and production-ready. Excellent documentation!',
    previousProgress: 50,
    newProgress: 75,
    attachments: [
      { id: 'att-2', name: 'deployment_guide.pdf', url: '/attachments/deployment.pdf', type: 'pdf' },
      { id: 'att-3', name: 'security_analysis.docx', url: '/attachments/security.docx', type: 'docx' }
    ],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'commit-5',
    projectId: '1',
    documentId: 'doc-3',
    teacherId: 'teacher-1',
    teacherName: 'Dr. Ahmed Hassan',
    teacherAvatar: 'AH',
    comment: 'Implementation document looks solid. Code quality is high. Please add more comments to complex functions and include performance benchmarks.',
    previousProgress: 75,
    newProgress: 85,
    attachments: [],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'commit-6',
    projectId: '1',
    documentId: 'doc-1',
    teacherId: 'teacher-1',
    teacherName: 'Dr. Ahmed Hassan',
    teacherAvatar: 'AH',
    comment: 'Minor revisions needed in conclusion section. The overall flow is much better now. Ready for final proofreading.',
    previousProgress: 85,
    newProgress: 90,
    attachments: [
      { id: 'att-4', name: 'proofreading_notes.docx', url: '/attachments/proofreading.docx', type: 'docx' }
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'commit-7',
    projectId: '1',
    documentId: null,
    teacherId: 'teacher-1',
    teacherName: 'Dr. Ahmed Hassan',
    teacherAvatar: 'AH',
    comment: 'Final review complete! All components are well integrated and polished. Minor formatting adjustments needed before submission. Excellent project overall!',
    previousProgress: 90,
    newProgress: 100,
    attachments: [],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'commit-8',
    projectId: '1',
    documentId: 'doc-2',
    teacherId: 'teacher-1',
    teacherName: 'Prof. Fatima Zahra',
    teacherAvatar: 'FZ',
    comment: 'Additional security review completed. All OWASP guidelines are now implemented. Database optimization looks great.',
    previousProgress: 100,
    newProgress: 100,
    attachments: [
      { id: 'att-5', name: 'security_audit_report.pdf', url: '/attachments/audit.pdf', type: 'pdf' }
    ],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  }
]

export const CommitService = {
  async getCommits(projectId: string): Promise<Commit[]> {
    return Promise.resolve(
      [...MOCK_COMMITS]
        .filter(c => c.projectId === projectId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    )
  },

  async addCommit(commit: Omit<Commit, 'id' | 'createdAt'>): Promise<Commit> {
    const newCommit: Commit = {
      ...commit,
      id: `commit-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    MOCK_COMMITS.push(newCommit)
    
    // Update project progress via ProjectsService
    await ProjectsService.updateProgress(commit.projectId, commit.newProgress, commit.teacherId)
    
    // Notify listeners
    commitListeners.forEach(listener => listener(newCommit))
    
    return Promise.resolve(newCommit)
  },

  async updateCommit(id: string, updates: Partial<Commit>): Promise<Commit | null> {
    const commit = MOCK_COMMITS.find(c => c.id === id)
    if (!commit) return Promise.resolve(null)
    
    Object.assign(commit, updates)
    
    // If progress changed, update project
    if (updates.newProgress && updates.newProgress !== commit.newProgress) {
      await ProjectsService.updateProgress(commit.projectId, updates.newProgress, commit.teacherId)
    }
    
    commitListeners.forEach(listener => listener(commit))
    return Promise.resolve(commit)
  },

  async deleteCommit(id: string): Promise<{ success: boolean }> {
    const initialLength = MOCK_COMMITS.length
    MOCK_COMMITS = MOCK_COMMITS.filter(c => c.id !== id)
    return Promise.resolve({ success: MOCK_COMMITS.length < initialLength })
  },

  async getOverallProgress(projectId: string): Promise<number> {
    const commits = MOCK_COMMITS.filter(c => c.projectId === projectId)
    if (commits.length === 0) return Promise.resolve(0)
    
    const lastCommit = [...commits].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0]
    return Promise.resolve(lastCommit.newProgress)
  },

  async getCommitsByDocument(projectId: string, documentId: string): Promise<Commit[]> {
    return Promise.resolve(
      [...MOCK_COMMITS]
        .filter(c => c.projectId === projectId && c.documentId === documentId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    )
  },

  // Event emitter methods
  onCommitAdded(listener: CommitListener): () => void {
    commitListeners.push(listener)
    return () => {
      commitListeners = commitListeners.filter(l => l !== listener)
    }
  }
}
