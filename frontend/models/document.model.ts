export interface ProjectDocument {
  id: string | number;
  name: string;
  title?: string;
  description?: string;
  version?: number;
  uploadedBy?: string;
  uploadedAt?: string;
  createdAt?: string;
  status?: string;
  size?: any;
  contentType?: string;
  type?: string;
  fileType?: string;
  fileUrl?: string;
  projectId?: string | number;
}
