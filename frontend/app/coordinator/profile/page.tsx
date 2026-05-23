'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { PageHeader } from '@/components/page-header'
import { ProfileHeader } from '@/components/profile/profile-header'
import { SkillsPanel } from '@/components/profile/skills-panel'
import { InfoSection } from '@/components/profile/info-section'
import { ProfileCard } from '@/components/profile/profile-card'
import { SkillMatchBar } from '@/components/profile/skill-match-bar'
import { ProfileService } from '@/services/service_profile'
import { ClipboardList, Sparkles } from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  relevance: number
}

export default function CoordinatorProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    Promise.all([
      ProfileService.getProfile('coordinator'),
      ProfileService.getAllSkills('coordinator')
    ]).then(([profileData, skillsData]) => {
      if (profileData) setProfile(profileData)
      if (skillsData) setSkills(skillsData)
    })
  }, [])

  if (!profile) {
    return <div className="p-8 text-center text-muted-foreground">Loading profile...</div>
  }

  return (
    <div>
      <PageHeader
        title="My Profile"
        description="View and manage your coordinator information"
      />

      <ProfileHeader
        name={user?.name || profile?.name || ''}
        email={user?.email || profile?.email || ''}
        phone={(user as any)?.phone || profile?.phone || ''}
        role="coordinator"
        avatar={profile?.avatar}
      />

      <InfoSection
        title="Coordinator Information"
        items={[
          { label: 'Department', value: profile.department },
          { label: 'Office Location', value: profile.office },
          { label: 'Years of Service', value: `${profile.yearsOfService} years` },
        ]}
      />

      <div className="mb-8">
        <ProfileCard title="Responsibilities" icon={<ClipboardList className="w-5 h-5 text-primary" />}>
          <p className="text-foreground leading-relaxed">{profile.responsibilities}</p>
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
