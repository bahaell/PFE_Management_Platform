'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProfileService } from '@/services/service_profile'

interface Skill {
  id: string
  name: string
  category: string
  relevance: number
}

interface AddSkillModalProps {
  isOpen: boolean
  onClose: () => void
  onAddSkill: (skill: Skill) => void
}

export function AddSkillModal({ isOpen, onClose, onAddSkill }: AddSkillModalProps) {
  const [skillName, setSkillName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [relevance, setRelevance] = useState(70)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [skillCategories, setSkillCategories] = useState<any[]>([])
  const [suggestedSkills, setSuggestedSkills] = useState<Record<string, string[]>>({})

  useEffect(() => {
    if (isOpen) {
      ProfileService.getSkillCategories().then(cats => {
        setSkillCategories(cats)
        if (cats.length > 0) setSelectedCategory(cats[0].id || cats[0].name)
      })
      ProfileService.getSuggestedSkills().then(setSuggestedSkills)
    }
  }, [isOpen])

  const handleInputChange = (value: string) => {
    setSkillName(value)
    if (value.length > 0) {
      const allSkills = Object.values(suggestedSkills).flat()
      setSuggestions(
        allSkills.filter((s: string) => s.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
      )
    } else {
      setSuggestions([])
    }
  }

  const handleAdd = () => {
    if (skillName.trim()) {
      const category = skillCategories.find((c) => (c.id === selectedCategory || c.name === selectedCategory))?.name || 'General'
      onAddSkill({
        id: `skill-${Date.now()}`,
        name: skillName.trim(),
        category,
        relevance,
      })
      setSkillName('')
      setRelevance(70)
      setSuggestions([])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Skill</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Skill Name</label>
            <Input
              placeholder="e.g., React, Python, Docker..."
              value={skillName}
              onChange={(e) => handleInputChange(e.target.value)}
              className="bg-secondary border-border"
            />
            {suggestions.length > 0 && (
              <div className="mt-2 space-y-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSkillName(s)
                      setSuggestions([])
                    }}
                    className="w-full text-left px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {skillCategories.map((cat) => (
                <option key={cat.id || cat.name} value={cat.id || cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Proficiency Level</label>
              <span className="text-sm font-semibold text-primary">{relevance}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={relevance}
              onChange={(e) => setRelevance(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={!skillName.trim()}>
              Add Skill
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
