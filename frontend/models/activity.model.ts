export interface ActivityItem {
  [key: string]: any;
  id: string | number;
  type: 'message' | 'upload' | 'task' | 'status' | 'member';
  authorId?: string;
  author?: string;
  action: string;
  timestamp: string;
  projectId?: string | number;
}
