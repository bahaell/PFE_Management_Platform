'use client'

import { useState, useEffect } from 'react'
import { Lightbulb } from 'lucide-react'
import { ProfileService } from '@/services/service_profile'
import { Button } from '@/components/ui/button'

interface SuggestedSkillsSectionProps {
  onSelectSkill: () => void
}

export function SuggestedSkillsSection({ onSelectSkill }: SuggestedSkillsSectionProps) {
  const [suggestedSkills, setSuggestedSkills] = useState<Record<string, string[]>>({})

  useEffect(() => {
    ProfileService.getSuggestedSkills().then(setSuggestedSkills)
  }, [])

  const categories = Object.entries(suggestedSkills).slice(0, 3)

  return (
    <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-accent" />
        <h4 className="font-semibold text-foreground">Suggested Skills</h4>
      </div>

      <div className="space-y-3">
        {categories.map(([category, skills]) => (
          <div key={category}>
            <p className="text-xs font-medium text-muted-foreground uppercase mb-2 capitalize">
              {category === 'ml' ? 'Machine Learning' : category}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={onSelectSkill}
                  className="text-xs"
                >
                  + {skill}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
