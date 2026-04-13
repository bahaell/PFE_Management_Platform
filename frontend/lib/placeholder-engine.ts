// Simple placeholder engine
// Replaces tokens like {{student.name}} by reading values from context

function getByPath(obj: any, path: string) {
  if (!obj) return undefined
  const parts = path.split('.')
  let cur = obj
  for (const p of parts) {
    if (cur == null) return undefined
    cur = cur[p]
  }
  return cur
}

export function renderTemplate(content: string, context: Record<string, any>, opts?: { missingPlaceholder?: string }) {
  const missing = opts?.missingPlaceholder ?? ''
  if (!content) return ''

  // Replace placeholders of form {{ path.to.value }}
  return content.replace(/\{\{\s*([a-zA-Z0-9_.$]+)\s*\}\}/g, (_, path) => {
    try {
      const value = getByPath(context, path)
      if (value === undefined || value === null) return missing
      if (Array.isArray(value)) return value.join(', ')
      if (value instanceof Date) return value.toLocaleString()
      return String(value)
    } catch (e) {
      return missing
    }
  })
}

export default renderTemplate
