'use client'

interface SkillMatchBarProps {
  skills: Array<{
    name: string
    relevance: number
  }>
}

export function SkillMatchBar({ skills }: SkillMatchBarProps) {
  const topSkills = skills
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5)

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground mb-3">Skill Proficiency</h4>
      {topSkills.map((skill) => (
        <div key={skill.name} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">{skill.name}</span>
            <span className="text-muted-foreground text-xs">{skill.relevance}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${skill.relevance}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
