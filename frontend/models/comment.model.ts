export interface ProjectComment {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  projectId: string;
  parentId?: string;
  replies: ProjectComment[];
}

export interface NestedComment extends ProjectComment {
  // Keeping this for compatibility with components using this name
  author: string; // This might need to be resolved from authorId in frontend
  avatar?: string;
  timestamp: string; // Mapping from createdAt
}
