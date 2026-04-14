export interface ProjectDocument {
  id: string;
  name: string;
  version: number;
  uploadedBy: string;
  uploadedAt: string;
  size: number;
  contentType: string;
  fileUrl?: string;
  projectId: string;
}
