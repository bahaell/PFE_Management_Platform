'use client'

import { Sparkles, BookOpen, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RecommendedSubject {
  id: number
  title: string
  teacher: string
  matchScore: number
  matchedSkills: string[]
  availability: boolean
  similarityScore: number
}

export function RecommendedSubjectsPanel() {
  const subjects: RecommendedSubject[] = [
    {
      id: 1,
      title: 'Machine Learning Applications',
      teacher: 'Dr. Ahmed Hassan',
      matchScore: 92,
      matchedSkills: ['Python', 'Data Science', 'TensorFlow'],
      availability: true,
      similarityScore: 87
    },
    {
      id: 2,
      title: 'Full-Stack Web Development',
      teacher: 'Eng. Fatima Ahmed',
      matchScore: 88,
      matchedSkills: ['React', 'Node.js', 'Database Design'],
      availability: true,
      similarityScore: 85
    },
    {
      id: 3,
      title: 'Cloud Computing & DevOps',
      teacher: 'Dr. Mohamed Samir',
      matchScore: 84,
      matchedSkills: ['AWS', 'Docker', 'CI/CD'],
      availability: false,
      similarityScore: 81
    }
  ]

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Recommended For You</h3>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-gradient-to-r from-primary/5 to-accent/5 border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm">{subject.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{subject.teacher}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">{subject.matchScore}%</div>
                <p className="text-xs text-muted-foreground">Match</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {subject.matchedSkills.map((skill) => (
                <span key={skill} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3 h-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Similarity Score: <span className="font-semibold text-foreground">{subject.similarityScore}%</span></p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Teacher {subject.availability ? <span className="text-green-600 font-semibold">Available</span> : <span className="text-red-600 font-semibold">Not Available</span>}
                </p>
              </div>
            </div>

            <Button className="w-full" size="sm">
              <BookOpen className="w-4 h-4 mr-1" />
              Apply Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
