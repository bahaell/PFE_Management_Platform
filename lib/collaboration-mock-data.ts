// Mock data for the collaboration space module
import type { CollaborationData } from '@/models/collaboration.model'
import type { ProjectMessage } from '@/models/message.model'
import type { Task } from '@/models/task.model'
import type { ProjectDocument } from '@/models/document.model'
import type { ActivityItem } from '@/models/activity.model'

export const projectMockData: CollaborationData = {
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
  jury: [
    {
      id: 3,
      name: 'Dr. Fatima Al-Mansouri',
      avatar: 'FM',
      role: 'Jury Member',
      online: false,
    },
    {
      id: 4,
      name: 'Prof. Mohammed Al-Zarouni',
      avatar: 'MZ',
      role: 'Jury Member',
      online: true,
    },
  ],
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
    {
      id: 3,
      author: 'Dr. Ahmed Hassan',
      avatar: 'AH',
      content: 'Perfect. Before training, let\'s ensure the validation set has proper stratification. Also, prepare a baseline model for comparison.',
      timestamp: '10:40 AM',
      createdAt: new Date(Date.now() - 110 * 60000),
    },
    {
      id: 4,
      author: 'Ahmed Mohamed',
      avatar: 'AM',
      content: 'Understood. I\'ll implement stratified k-fold validation and set up a baseline model using logistic regression.',
      timestamp: '10:45 AM',
      createdAt: new Date(Date.now() - 100 * 60000),
    },
  ],
  tasks: [
    { id: 1, title: 'Data preprocessing', description: 'Clean and normalize dataset', priority: 'high', assignee: 'Ahmed Mohamed', dueDate: '2024-02-08', status: 'inProgress', completed: false },
    { id: 2, title: 'ML algorithm implementation', description: 'Build the core prediction model', priority: 'high', assignee: 'Ahmed Mohamed', dueDate: '2024-02-15', status: 'todo', completed: false },
    { id: 3, title: 'Model validation & testing', description: 'Comprehensive testing with metrics', priority: 'medium', assignee: 'Ahmed Mohamed', dueDate: '2024-02-25', status: 'todo', completed: false },
    { id: 4, title: 'API development', description: 'RESTful API for model serving', priority: 'medium', assignee: 'Ahmed Mohamed', dueDate: '2024-03-05', status: 'todo', completed: false },
    { id: 5, title: 'Documentation', description: 'Project documentation and usage guide', priority: 'medium', assignee: 'Ahmed Mohamed', dueDate: '2024-03-15', status: 'todo', completed: false },
    { id: 6, title: 'Presentation slides', description: 'Create final presentation', priority: 'low', assignee: 'Ahmed Mohamed', dueDate: '2024-06-15', status: 'todo', completed: false },
  ],
  documents: [
    { id: 1, name: 'Project Proposal v3', version: 3, uploadedBy: 'Ahmed Mohamed', uploadedAt: '3 hours ago', size: '1.2 MB', type: 'PDF' },
    { id: 2, name: 'Project Proposal v2', version: 2, uploadedBy: 'Ahmed Mohamed', uploadedAt: '2 days ago', size: '1.1 MB', type: 'PDF' },
    { id: 3, name: 'Project Proposal v1', version: 1, uploadedBy: 'Ahmed Mohamed', uploadedAt: '1 week ago', size: '0.9 MB', type: 'PDF' },
    { id: 4, name: 'Design Document v2', version: 2, uploadedBy: 'Ahmed Mohamed', uploadedAt: '3 days ago', size: '2.5 MB', type: 'DOCX' },
    { id: 5, name: 'Research Paper Summary', version: 1, uploadedBy: 'Ahmed Mohamed', uploadedAt: '1 week ago', size: '1.8 MB', type: 'PDF' },
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
    {
      id: 3,
      author: 'Dr. Ahmed Hassan',
      avatar: 'AH',
      content: 'Also, consider discussing potential limitations and how they might impact the results.',
      timestamp: '2024-02-04',
      replies: [],
    },
  ],
  activities: [
    { id: 1, type: 'message', author: 'Dr. Ahmed Hassan', action: 'Added feedback on methodology section', timestamp: '2 hours ago', icon: 'MessageSquare' },
    { id: 2, type: 'upload', author: 'Ahmed Mohamed', action: 'Uploaded new version of Project Proposal', timestamp: '3 hours ago', icon: 'FileUp' },
    { id: 3, type: 'task', author: 'Dr. Ahmed Hassan', action: 'Created task: Model validation & testing', timestamp: '1 day ago', icon: 'CheckCircle' },
    { id: 4, type: 'status', author: 'System', action: 'Project status changed to In Progress', timestamp: '3 days ago', icon: 'RefreshCw' },
    { id: 5, type: 'member', author: 'Dr. Ahmed Hassan', action: 'Added as project supervisor', timestamp: '1 week ago', icon: 'UserPlus' },
  ],
}
