import type { Commit } from '@/models/commit.model'
import { apiClient } from '@/lib/api-client'

interface BackendCommit {
  id: string
  projectId: string
  documentId: string
  teacherId: string
  comment: string
  previousProgress: number
  newProgress: number
  previousPhase?: string
  newPhase?: string
  attachments?: { id: string; name: string; url: string; type: string }[]
  createdAt: string
}

function initials(value: string) {
  return value
    .split(/[.\s@_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'T'
}

function mapCommit(commit: BackendCommit): Commit {
  return {
    ...commit,
    teacherName: commit.teacherId,
    teacherAvatar: initials(commit.teacherId),
    attachments: commit.attachments ?? [],
  }
}

export const CommitService = {
  async getCommits(projectId: string): Promise<Commit[]> {
    const commits = await apiClient.get<BackendCommit[]>(`/api/projects/${projectId}/commits`)
    return commits.map(mapCommit)
  },

  async addCommit(commit: {
    documentId: string
    teacherId: string
    comment: string
    newProgress: number
    newPhase?: string
    attachments?: { name: string; url: string; type: string }[]
  }): Promise<Commit> {
    const created = await apiClient.post<BackendCommit>(
      `/api/projects/documents/${commit.documentId}/commits`,
      {
        teacherId: commit.teacherId,
        comment: commit.comment,
        newProgress: commit.newProgress,
        newPhase: commit.newPhase,
        attachments: commit.attachments ?? [],
      },
      { headers: { 'X-User-Role': 'TEACHER' } },
    )
    return mapCommit(created)
  },

  async getOverallProgress(projectId: string): Promise<number> {
    const commits = await this.getCommits(projectId)
    return commits[0]?.newProgress ?? 0
  },

  async getCommitsByDocument(_projectId: string, documentId: string): Promise<Commit[]> {
    const commits = await apiClient.get<BackendCommit[]>(`/api/projects/documents/${documentId}/commits`)
    return commits.map(mapCommit)
  },
}
