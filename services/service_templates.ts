// lightweight id generator to avoid adding uuid as a dependency
function makeId(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9)
}
import renderTemplate from '../lib/placeholder-engine'
import type { AcademicTemplate } from '../models/academic-template.model'

// In-memory mock templates store
const templates: AcademicTemplate[] = [
  {
    id: 'tpl-convention-1',
    name: 'Convention de stage (exemple)',
    type: 'convention',
    description: 'Template de convention de stage - exemple',
    fields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'system',
    version: 1,
  },
]

export async function getTemplates(): Promise<AcademicTemplate[]> {
  // return shallow copy
  return [...templates]
}

export async function getTemplate(id: string): Promise<AcademicTemplate | null> {
  return templates.find((t) => t.id === id) ?? null
}

export async function createTemplate(input: Partial<AcademicTemplate>): Promise<AcademicTemplate> {
  const t: AcademicTemplate = {
      id: input.id ?? makeId('tpl-'),
    name: input.name ?? 'Untitled template',
    type: (input.type as any) ?? 'autre',
    description: input.description ?? '',
    fields: input.fields ?? [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: input.createdBy ?? 'coordinator',
    version: input.version ?? 1,
  }
  templates.unshift(t)
  return t
}

export async function updateTemplate(id: string, updates: Partial<AcademicTemplate>): Promise<AcademicTemplate | null> {
  const idx = templates.findIndex((t) => t.id === id)
  if (idx === -1) return null
  const existing = templates[idx]
  const updated: AcademicTemplate = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
    version: (existing.version || 1) + 1,
  }
  templates[idx] = updated
  return updated
}

export async function deleteTemplate(id: string): Promise<boolean> {
  const idx = templates.findIndex((t) => t.id === id)
  if (idx === -1) return false
  templates.splice(idx, 1)
  return true
}

// For mock generation in the browser environment we return a static sample HTML file
import { createDocument } from './service_academic_documents'

export async function generateDocumentFromTemplate(templateId: string, context: Record<string, any>): Promise<{ fileUrl: string; generatedAt: string } | null> {
  const tpl = templates.find((t) => t.id === templateId)
  if (!tpl) return null

  // Build a simple HTML output using available fields or fallback content
  const rawContent = (tpl as any).content ?? `
    <h1>${tpl.name}</h1>
    <p>Document généré pour: {{student.name}}</p>
    <p>Projet: {{project.title}}</p>
  `

  const html = renderTemplate(rawContent, context, { missingPlaceholder: '' })

  // NOTE: writing files using `fs` is not available in the browser/client bundle.
  // For this mock implementation we return a static sample HTML which lives in `public/mock-docs/sample.html`.
  // In production replace this with a server-side PDF generator (Puppeteer) that persists the generated PDF and returns its URL.
  const filename = 'sample.html'
  const fileUrl = `/mock-docs/${filename}?t=${Date.now()}`

  // create an AdministrativeDocument record in the mock documents service
  try {
    await createDocument({
      type: tpl.type,
      studentId: context?.student?.id ?? (context?.studentId as string) ?? 'unknown',
      teacherId: context?.teacher?.id,
      projectId: context?.project?.id,
      generatedAt: new Date().toISOString(),
      fileUrl,
      templateId: tpl.id,
      requestedBy: context?.requestedBy ?? 'system',
    })
  } catch (e) {
    // ignore in mock
  }

  return { fileUrl, generatedAt: new Date().toISOString() }
}

export default {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  generateDocumentFromTemplate,
}
