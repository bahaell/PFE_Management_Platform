import type { CollaborationData } from '@/models/collaboration.model'
import type { Task } from '@/models/task.model'
import type { ProjectDocument } from '@/models/document.model'
import type { ProjectMessage } from '@/models/message.model'
import type { ActivityItem } from '@/models/activity.model'
import type { NestedComment } from '@/models/comment.model'

let projectMockData: CollaborationData = {
  project: {
    id: 1,
    title: 'AI in Healthcare',
    subject: 'Artificial Intelligence Applications',
    description: 'Building an intelligent system for early disease detection using machine learning',
    startDate: '2024-01-15',
    deadline: '2024-06-30',
    progress: 65,
    status: 'In Progress',
  },
  teacher: {
    id: 1,
    name: 'Dr. Ahmed Hassan',
    avatar: 'AH',
    role: 'Supervisor',
    email: 'ahmed.hassan@university.edu',
    online: true,
  },
  student: {
    id: 2,
    name: 'Ahmed Mohamed',
    avatar: 'AM',
    role: 'Student',
    email: 'ahmed.mohamed@student.edu',
    online: true,
  },
  jury: [],
  defense: {
    date: '2024-06-25',
    time: '10:00',
    room: 'Room A - Amphitheater',
    duration: '45 min',
  },
  messages: [
    {
      id: 1,
      author: 'Dr. Ahmed Hassan',
      avatar: 'AH',
      content: 'Great progress on the data preprocessing module. The accuracy improvements look promising.',
      timestamp: '10:30 AM',
      createdAt: new Date(Date.now() - 2 * 3600000),
    },
    {
      id: 2,
      author: 'Ahmed Mohamed',
      avatar: 'AM',
      content: 'Thanks! I implemented the optimization techniques we discussed last meeting. Should I proceed with the model training?',
      timestamp: '10:35 AM',
      createdAt: new Date(Date.now() - 2 * 3600000),
    },
  ],
  tasks: [
    { id: 1, title: 'Data preprocessing', description: 'Clean and normalize dataset', priority: 'high', assignee: 'Ahmed Mohamed', dueDate: '2024-02-08', status: 'inProgress', completed: false },
    { id: 2, title: 'ML algorithm implementation', description: 'Build the core prediction model', priority: 'high', assignee: 'Ahmed Mohamed', dueDate: '2024-02-15', status: 'todo', completed: false },
  ],
  documents: [
    { id: 1, name: 'Project Proposal v3', version: 3, uploadedBy: 'Ahmed Mohamed', uploadedAt: '3 hours ago', size: '1.2 MB', type: 'PDF' },
    { id: 2, name: 'Project Proposal v2', version: 2, uploadedBy: 'Ahmed Mohamed', uploadedAt: '2 days ago', size: '1.1 MB', type: 'PDF' },
  ],
  comments: [
    {
      id: 1,
      author: 'Dr. Ahmed Hassan',
      avatar: 'AH',
      content: 'The methodology section needs more clarity on data collection. Can you add more details about the sample size and collection period?',
      timestamp: '2024-02-05',
      replies: [
        {
          id: 2,
          author: 'Ahmed Mohamed',
          avatar: 'AM',
          content: 'Great point. I will expand the methodology section with comprehensive details on data collection methods and timelines.',
          timestamp: '2024-02-05',
          replies: [],
        },
      ],
    },
  ],
  activities: [
    { id: 1, type: 'message', author: 'Dr. Ahmed Hassan', action: 'Added feedback on methodology section', timestamp: '2 hours ago', icon: 'MessageSquare' },
    { id: 2, type: 'upload', author: 'Ahmed Mohamed', action: 'Uploaded new version of Project Proposal', timestamp: '3 hours ago', icon: 'FileUp' },
  ],
}

export const CollaborationService = {
  async getProject() {
    return Promise.resolve(projectMockData)
  },

  async updateProject(updates: Partial<typeof projectMockData.project>) {
    Object.assign(projectMockData.project, updates)
    return Promise.resolve(projectMockData.project)
  },

  async createMessage(message: ProjectMessage): Promise<ProjectMessage> {
    const newMessage = { ...message, id: Math.max(...projectMockData.messages.map(m => m.id), 0) + 1 }
    projectMockData.messages.push(newMessage)
    return Promise.resolve(newMessage)
  },

  async getMessageById(id: number): Promise<ProjectMessage | null> {
    return Promise.resolve(projectMockData.messages.find(m => m.id === id) || null)
  },

  async getMessages(): Promise<ProjectMessage[]> {
    return Promise.resolve(projectMockData.messages)
  },

  async updateMessage(id: number, updates: Partial<ProjectMessage>): Promise<ProjectMessage | null> {
    const message = projectMockData.messages.find(m => m.id === id)
    if (!message) return Promise.resolve(null)
    Object.assign(message, updates, { id })
    return Promise.resolve(message)
  },

  async deleteMessage(id: number): Promise<boolean> {
    const initialLength = projectMockData.messages.length
    projectMockData.messages = projectMockData.messages.filter(m => m.id !== id)
    return Promise.resolve(projectMockData.messages.length < initialLength)
  },

  async createTask(task: Task): Promise<Task> {
    const newTask = { ...task, id: Math.max(...projectMockData.tasks.map(t => t.id), 0) + 1 }
    projectMockData.tasks.push(newTask)
    return Promise.resolve(newTask)
  },

  async getTaskById(id: number): Promise<Task | null> {
    return Promise.resolve(projectMockData.tasks.find(t => t.id === id) || null)
  },

  async getTasks(): Promise<Task[]> {
    return Promise.resolve(projectMockData.tasks)
  },

  async updateTask(taskId: number, updates: Partial<Task>): Promise<Task | null> {
    const task = projectMockData.tasks.find(t => t.id === taskId)
    if (!task) return Promise.resolve(null)
    Object.assign(task, updates, { id: taskId })
    return Promise.resolve(task)
  },

  async deleteTask(taskId: number): Promise<boolean> {
    const initialLength = projectMockData.tasks.length
    projectMockData.tasks = projectMockData.tasks.filter(t => t.id !== taskId)
    return Promise.resolve(projectMockData.tasks.length < initialLength)
  },

  async createDocument(doc: ProjectDocument): Promise<ProjectDocument> {
    const newDoc = { ...doc, id: Math.max(...projectMockData.documents.map(d => d.id), 0) + 1 }
    projectMockData.documents.push(newDoc)
    return Promise.resolve(newDoc)
  },

  async getDocumentById(id: number): Promise<ProjectDocument | null> {
    return Promise.resolve(projectMockData.documents.find(d => d.id === id) || null)
  },

  async getDocuments(): Promise<ProjectDocument[]> {
    return Promise.resolve(projectMockData.documents)
  },

  async updateDocument(id: number, updates: Partial<ProjectDocument>): Promise<ProjectDocument | null> {
    const doc = projectMockData.documents.find(d => d.id === id)
    if (!doc) return Promise.resolve(null)
    Object.assign(doc, updates, { id })
    return Promise.resolve(doc)
  },

  async deleteDocument(id: number): Promise<boolean> {
    const initialLength = projectMockData.documents.length
    projectMockData.documents = projectMockData.documents.filter(d => d.id !== id)
    return Promise.resolve(projectMockData.documents.length < initialLength)
  },

  async createComment(comment: NestedComment): Promise<NestedComment> {
    const newComment = { ...comment, id: Math.max(...projectMockData.comments.map(c => c.id), 0) + 1, replies: [] }
    projectMockData.comments.push(newComment)
    return Promise.resolve(newComment)
  },

  async getCommentById(id: number): Promise<NestedComment | null> {
    const findComment = (comments: NestedComment[]): NestedComment | null => {
      for (const comment of comments) {
        if (comment.id === id) return comment
        const found = findComment(comment.replies)
        if (found) return found
      }
      return null
    }
    return Promise.resolve(findComment(projectMockData.comments))
  },

  async getComments(): Promise<NestedComment[]> {
    return Promise.resolve(projectMockData.comments)
  },

  async updateComment(id: number, updates: Partial<NestedComment>): Promise<NestedComment | null> {
    const findAndUpdate = (comments: NestedComment[]): NestedComment | null => {
      for (const comment of comments) {
        if (comment.id === id) {
          Object.assign(comment, updates, { id })
          return comment
        }
        const result = findAndUpdate(comment.replies)
        if (result) return result
      }
      return null
    }
    return Promise.resolve(findAndUpdate(projectMockData.comments))
  },

  async addReply(parentId: number, reply: NestedComment): Promise<NestedComment | null> {
    const findAndAddReply = (comments: NestedComment[]): NestedComment | null => {
      for (const comment of comments) {
        if (comment.id === parentId) {
          const newReply = { ...reply, id: Math.max(...projectMockData.comments.map(c => c.id), 0) + 1, replies: [] }
          comment.replies.push(newReply)
          return newReply
        }
        const result = findAndAddReply(comment.replies)
        if (result) return result
      }
      return null
    }
    return Promise.resolve(findAndAddReply(projectMockData.comments))
  },

  async deleteComment(id: number): Promise<boolean> {
    const deleteCommentRecursive = (comments: NestedComment[]): boolean => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === id) {
          comments.splice(i, 1)
          return true
        }
        if (deleteCommentRecursive(comments[i].replies)) {
          return true
        }
      }
      return false
    }
    return Promise.resolve(deleteCommentRecursive(projectMockData.comments))
  },
}

export const ActivityService = {
  async createActivity(activity: ActivityItem): Promise<ActivityItem> {
    const newActivity = { ...activity, id: Math.max(...projectMockData.activities.map(a => a.id), 0) + 1 }
    projectMockData.activities.push(newActivity)
    return Promise.resolve(newActivity)
  },

  async getActivityById(id: number): Promise<ActivityItem | null> {
    return Promise.resolve(projectMockData.activities.find(a => a.id === id) || null)
  },

  async getAllActivities(): Promise<ActivityItem[]> {
    return Promise.resolve(projectMockData.activities)
  },

  async updateActivity(id: number, updates: Partial<ActivityItem>): Promise<ActivityItem | null> {
    const activity = projectMockData.activities.find(a => a.id === id)
    if (!activity) return Promise.resolve(null)
    Object.assign(activity, updates, { id })
    return Promise.resolve(activity)
  },

  async deleteActivity(id: number): Promise<boolean> {
    const initialLength = projectMockData.activities.length
    projectMockData.activities = projectMockData.activities.filter(a => a.id !== id)
    return Promise.resolve(projectMockData.activities.length < initialLength)
  },
}
