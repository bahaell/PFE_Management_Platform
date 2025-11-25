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
import { FileText, Sparkles } from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  relevance: number
}

export default function TeacherProfilePage() {
  const { user } = useAuth()
  const profile = profileMockData.teacher
  const [skills] = useState<Skill[]>(profile.skills)

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="View and manage your professional information"
      />

      <ProfileHeader
        name={profile.name}
        email={profile.email}
        phone={profile.phone}
        role="teacher"
      />

      <InfoSection
        title="Professional Information"
        items={[
          { label: 'Grade', value: profile.grade },
          { label: 'Speciality', value: profile.speciality },
          { label: 'Department', value: profile.department },
          { label: 'Years of Experience', value: `${profile.yearsOfExperience} years` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProfileCard title="Bio" icon={<FileText className="w-5 h-5 text-primary" />}>
          <p className="text-foreground leading-relaxed">{profile.bio}</p>
        </ProfileCard>
        <ProfileCard title="Research Interests" icon={<FileText className="w-5 h-5 text-accent" />}>
          <p className="text-foreground leading-relaxed">{profile.researchInterests}</p>
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
