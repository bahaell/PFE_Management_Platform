'use client'

import { useState } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Upload, Eye, EyeOff } from 'lucide-react'
import { profileMockData } from '@/lib/profile-mock-data'
import { SkillsPanel } from '@/components/profile/skills-panel'

interface Skill {
  id: string
  name: string
  category: string
  relevance: number
}

export default function EditCoordinatorProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [skills, setSkills] = useState<Skill[]>(profileMockData.coordinator?.skills || [])

  const profile = profileMockData.coordinator

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    gender: 'Male',
    birthdate: '1970-08-10',
    department: profile?.department || '',
    office: profile?.office || '',
    responsibilities: profile?.responsibilities || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleAddSkill = (skill: Skill) => {
    setSkills([...skills, skill])
  }

  const handleRemoveSkill = (skillId: string) => {
    setSkills(skills.filter((s) => s.id !== skillId))
  }

  const handleSave = () => {
    alert('Profile changes saved successfully!')
    router.push('/coordinator/profile')
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Profile</h1>
          <p className="text-muted-foreground">Update your personal and account information</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Personal Information Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <label className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload Photo
                  <input type="file" className="hidden" accept="image/*" />
                </label>
                <p className="text-xs text-muted-foreground mt-2">JPG, PNG up to 5MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email (Read-only)
                </label>
                <Input
                  name="email"
                  value={formData.email}
                  disabled
                  className="bg-secondary border-border opacity-60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Birthdate</label>
                <Input
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coordinator Information Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Coordinator Information</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                <Input
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Office Location</label>
                <Input
                  name="office"
                  value={formData.office}
                  onChange={handleInputChange}
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Responsibilities</label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleInputChange}
                placeholder="List your key responsibilities..."
                rows={3}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* Skills Editor Section */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Skills & Technologies</h2>
          <SkillsPanel
            skills={skills}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
        </div>

        {/* Account Security Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Account Security</h2>

          <div className="space-y-4 mb-6">
            <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-sm text-yellow-800 dark:text-yellow-200">
              Keep your password secure and never share it with anyone.
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
              <div className="relative">
                <Input
                  name="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your current password"
                  className="bg-secondary border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
              <div className="relative">
                <Input
                  name="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  className="bg-secondary border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
                className="bg-secondary border-border"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
              <input
                type="checkbox"
                name="twoFactor"
                checked={formData.twoFactor}
                onChange={handleInputChange}
                className="w-5 h-5 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 flex gap-4 justify-end px-6 py-4 bg-background/80 backdrop-blur-sm border-t border-border z-10">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
