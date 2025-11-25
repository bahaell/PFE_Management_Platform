'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { PageHeader } from '@/components/page-header'
import { ProfileHeader } from '@/components/profile/profile-header'
import { SkillsPanel } from '@/components/profile/skills-panel'
import { InfoSection } from '@/components/profile/info-section'
import { ProfileCard } from '@/components/profile/profile-card'
import { SkillMatchBar } from '@/components/profile/skill-match-bar'
import { profileMockData } from '@/lib/profile-mock-data'
import { BookOpen, Sparkles } from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  relevance: number
}

export default function StudentProfilePage() {
  const { user } = useAuth()
  const profile = profileMockData.student
  const [skills] = useState<Skill[]>(profile.skills)

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="View and manage your personal information"
      />

      <ProfileHeader
        name={profile.name}
        email={profile.email}
        phone={profile.phone}
        role="student"
      />

      <InfoSection
        title="Academic Information"
        items={[
          { label: 'Level', value: profile.level },
          { label: 'Department', value: profile.department },
          { label: 'Student ID', value: profile.studentId },
          { label: 'Academic Year', value: profile.academicYear },
        ]}
      />

      <div className="mb-8">
        <ProfileCard title="Interests" icon={<BookOpen className="w-5 h-5 text-primary" />}>
          <p className="text-foreground leading-relaxed">{profile.interests}</p>
        </ProfileCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <SkillsPanel skills={skills} readOnly />
        </div>
        <div>
          <ProfileCard title="Skill Proficiency" icon={<Sparkles className="w-5 h-5 text-accent" />}>
            <SkillMatchBar skills={skills} />
          </ProfileCard>
        </div>
      </div>

      <InfoSection
        title="Account Settings"
        items={[
          { label: 'Email Address', value: profile.email },
          { label: 'Password', value: '••••••••' },
          { label: 'Two-Factor Auth', value: 'Disabled' },
          { label: 'Member Since', value: 'January 2024' },
        ]}
      />
    </div>
  )
}
