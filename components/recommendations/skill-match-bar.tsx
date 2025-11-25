'use client'

import { TrendingUp } from 'lucide-react'

interface Skill {
  name: string
  studentLevel: number
  requiredLevel: number
}

export function SkillMatchBar({ skills }: { skills: Skill[] }) {
  const matchPercentage = Math.round(
    (skills.filter(s => s.studentLevel >= s.requiredLevel).length / skills.length) * 100
  )

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">Skills Match</h4>
        </div>
        <span className="text-lg font-bold text-primary">{matchPercentage}%</span>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => {
          const matched = skill.studentLevel >= skill.requiredLevel
          return (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <span className={`text-xs font-semibold ${matched ? 'text-green-600' : 'text-orange-600'}`}>
                  {matched ? '✓ Match' : 'Gap'}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Your Level</p>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(skill.studentLevel / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">Required</p>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full" 
                      style={{ width: `${(skill.requiredLevel / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
