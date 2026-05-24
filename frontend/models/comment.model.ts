export interface ProjectComment {
  id: string | number;
  content: string;
  authorId?: string;
  author?: string;
  avatar?: string;
  timestamp?: string;
  createdAt?: string;
  projectId?: string | number;
  parentId?: string | number;
  replies: ProjectComment[];
}

export interface NestedComment extends ProjectComment {
  // Keeping this for compatibility with components using this name
  author?: string; // This might need to be resolved from authorId in frontend
  avatar?: string;
  timestamp?: string; // Mapping from createdAt
}
