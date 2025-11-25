'use client'

import { Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SkillTag } from './skill-tag'
import { AddSkillModal } from './add-skill-modal'
import { SuggestedSkillsSection } from './suggested-skills-section'

interface Skill {
  id: string
  name: string
  category: string
  relevance: number
}

interface SkillsPanelProps {
  skills: Skill[]
  onAddSkill?: (skill: Skill) => void
  onRemoveSkill?: (skillId: string) => void
  readOnly?: boolean
}

export function SkillsPanel({ skills, onAddSkill, onRemoveSkill, readOnly = false }: SkillsPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Skills & Technologies</h3>
        </div>
        {!readOnly && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        )}
      </div>

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((skill) => (
            <SkillTag
              key={skill.id}
              name={skill.name}
              category={skill.category}
              relevance={skill.relevance}
              onRemove={!readOnly ? () => onRemoveSkill?.(skill.id) : undefined}
              interactive
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground mb-6">No skills added yet.</p>
      )}

      {!readOnly && (
        <button
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="text-sm text-primary hover:underline transition-colors"
        >
          {showSuggestions ? 'Hide Suggestions' : 'View Suggested Skills'}
        </button>
      )}

      {showSuggestions && !readOnly && <SuggestedSkillsSection onSelectSkill={() => setIsModalOpen(true)} />}

      <AddSkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSkill={(skill) => {
          onAddSkill?.(skill)
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}
