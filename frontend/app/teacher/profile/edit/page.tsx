'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/providers/auth-provider'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Upload, Eye, EyeOff } from 'lucide-react'
import { ProfileService } from '@/services/service_profile'
import { SkillsPanel } from '@/components/profile/skills-panel'
import { uploadImageToCloudinary } from '@/lib/cloudinary'

interface Skill {
  id: string
  name: string
  category: string
  relevance: number
}

export default function EditTeacherProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    gender: 'Male',
    birthdate: '1975-03-20',
    grade: '',
    speciality: '',
    department: '',
    bio: '',
    researchInterests: '',
    yearsOfService: 0,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
  })

  useEffect(() => {
    if (user) {
      Promise.all([
        ProfileService.getProfile('teacher'),
        ProfileService.getAllSkills('teacher')
      ]).then(([profileData, skillsData]) => {
        if (profileData) {
          setProfile(profileData)
          setFormData({
            fullName: user.name || '',
            email: user.email || '',
            phone: (user as any).phone || (profileData as any).phone || '',
            gender: (user as any).gender || (profileData as any).gender || 'Male',
            birthdate: (user as any).birthdate || (profileData as any).birthdate || '1975-03-20',
            grade: (profileData as any).grade || '',
            speciality: (profileData as any).speciality || '',
            department: (profileData as any).department || '',
            bio: (profileData as any).bio || '',
            researchInterests: (profileData as any).researchInterests || '',
            yearsOfService: Number((profileData as any).yearsOfService || 0),
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            twoFactor: false,
          })
        }
        if (skillsData) {
          setSkills(skillsData)
        }
      })
    }
  }, [user])

  if (!profile) {
    return <div className="p-8 text-center text-muted-foreground">Loading profile...</div>
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setIsUploadingAvatar(true)
      const uploadedUrl = await uploadImageToCloudinary(file)
      setAvatarUrl(uploadedUrl)
      alert('Photo uploaded successfully.')
    } catch {
      alert('Avatar upload failed. Check Cloudinary configuration.')
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleAddSkill = async (skill: Skill) => {
    const newSkill = await ProfileService.addSkill('teacher', {
      name: skill.name,
      category: skill.category,
      relevance: skill.relevance
    } as any)
    if (newSkill) {
      setSkills([...skills, newSkill])
    } else {
      setSkills([...skills, skill])
    }
  }

  const handleRemoveSkill = async (skillId: string) => {
    const success = await ProfileService.removeSkill('teacher', skillId)
    if (success) {
      setSkills(skills.filter((s) => s.id !== skillId))
    } else {
      setSkills(skills.filter((s) => s.id !== skillId))
    }
  }

  const handleSave = async () => {
    const profileUpdates = {
      grade: formData.grade,
      speciality: formData.speciality,
      department: formData.department,
      bio: formData.bio,
      researchInterests: formData.researchInterests,
      yearsOfService: Number(formData.yearsOfService || 0),
      name: formData.fullName,
      phone: formData.phone,
      gender: formData.gender,
      birthdate: formData.birthdate,
      avatar: avatarUrl || (profile as any)?.avatar || ''
    }
    await ProfileService.updateProfile('teacher', profileUpdates)
    alert('Profile changes saved successfully!')
    router.push('/teacher/profile')
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
          <p className="text-xs text-muted-foreground mt-2">Update your personal and account information</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Personal Information Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center overflow-hidden">
                {avatarUrl || (profile as any)?.avatar ? (
                  <img
                    src={avatarUrl || (profile as any)?.avatar}
                    alt="Profile avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-primary-foreground">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload Photo
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploadingAvatar}
                  />
                </label>
                <p className="text-xs text-muted-foreground mt-2">
                  {isUploadingAvatar ? 'Uploading...' : 'JPG, PNG up to 5MB'}
                </p>
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

        {/* Professional Information Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Professional Information</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Grade</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Assistant</option>
                  <option>Associate</option>
                  <option>Professor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Speciality</label>
                <Input
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleInputChange}
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                <Input
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={3}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Research Interests
              </label>
              <textarea
                name="researchInterests"
                value={formData.researchInterests}
                onChange={handleInputChange}
                placeholder="Describe your research interests..."
                rows={2}
                className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Years of Service</label>
              <Input
                name="yearsOfService"
                type="number"
                min={0}
                value={formData.yearsOfService}
                onChange={handleInputChange}
                className="bg-secondary border-border"
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
