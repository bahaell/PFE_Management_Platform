'use client'

import { X } from 'lucide-react'

interface SkillTagProps {
  name: string
  category?: string
  onRemove?: () => void
  relevance?: number
  interactive?: boolean
}

export function SkillTag({ name, category, onRemove, relevance, interactive = false }: SkillTagProps) {
  const getCategoryColor = (cat?: string) => {
    const colors: Record<string, string> = {
      'Frontend': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      'Backend': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      'Database': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      'DevOps': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
      'ML Framework': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
      'Language': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
      'Soft Skills': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
      'Management': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100',
      'Academics': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100',
      'ML': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100',
    }
    return colors[cat || 'Language'] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${getCategoryColor(
        category
      )} ${interactive ? 'hover:shadow-md cursor-pointer' : ''}`}
    >
      <span>{name}</span>
      {relevance && <span className="text-xs font-semibold opacity-70">{relevance}%</span>}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 opacity-70 hover:opacity-100 transition-opacity"
          aria-label={`Remove ${name}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}
