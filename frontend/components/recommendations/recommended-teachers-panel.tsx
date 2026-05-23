'use client'

import { Star, MapPin, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RecommendedTeacher {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  matchSkills: string[]
  studentCapacity: number
  studentCount: number
  yearsExperience: number
}

export function RecommendedTeachersPanel() {
  const teachers: RecommendedTeacher[] = [
    {
      id: 1,
      name: 'Dr. Ahmed Hassan',
      specialty: 'Machine Learning & AI',
      rating: 4.8,
      reviews: 24,
      matchSkills: ['Python', 'Data Science', 'TensorFlow'],
      studentCapacity: 5,
      studentCount: 3,
      yearsExperience: 8
    },
    {
      id: 2,
      name: 'Eng. Fatima Ahmed',
      specialty: 'Web Development',
      rating: 4.6,
      reviews: 18,
      matchSkills: ['React', 'Node.js', 'Full Stack'],
      studentCapacity: 4,
      studentCount: 2,
      yearsExperience: 6
    }
  ]

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Top Teachers for You</h3>

      <div className="space-y-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-secondary border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{teacher.name}</h4>
                <p className="text-sm text-muted-foreground">{teacher.specialty}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm text-foreground">{teacher.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">{teacher.reviews} reviews</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {teacher.matchSkills.map((skill) => (
                <span key={skill} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Capacity</p>
                <p className="font-semibold text-foreground">{teacher.studentCount}/{teacher.studentCapacity}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="font-semibold text-foreground">{teacher.yearsExperience} years</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Availability</p>
                <p className="font-semibold text-green-600">{teacher.studentCapacity - teacher.studentCount} slots</p>
              </div>
            </div>

            <Button className="w-full" size="sm">
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
