export interface ActivityItem {
  id: string;
  type: 'message' | 'upload' | 'task' | 'status' | 'member';
  authorId: string;
  action: string;
  timestamp: string;
  projectId: string;
}
