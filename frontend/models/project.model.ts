export enum ProjectStatus {
  PROPOSED = 'PROPOSED',
  APPROVED = 'APPROVED',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  supervisorId?: string;
  studentIds?: string[];
  companyId?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
