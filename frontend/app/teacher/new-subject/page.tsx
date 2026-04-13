'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewSubjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    technologies: '',
    level: 'L3',
    difficulty: 'Medium',
    maxStudents: '1',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>
      <Link href="/teacher/subjects">
        <button className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Subjects
        </button>
      </Link>

      <PageHeader
        title="Create New Subject"
        description="Propose a new PFE subject for students"
      />

      {submitted && (
        <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
          Subject submitted successfully! Your coordinator will review it shortly.
        </div>
      )}

      <div className="bg-card rounded-lg border border-border p-8 max-w-2xl shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Subject Title *</label>
            <Input
              name="title"
              placeholder="e.g., AI in Healthcare"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Describe your project subject, goals, and learning outcomes..."
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Domain and Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Domain *</label>
              <select
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a domain</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="Web">Web Development</option>
                <option value="Networks">Networks</option>
                <option value="Security">Cybersecurity</option>
                <option value="Mobile">Mobile Development</option>
                <option value="IoT">IoT & Embedded</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Level *</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="L3">L3</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
              </select>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Technologies *</label>
            <Input
              name="technologies"
              placeholder="e.g., Python, TensorFlow, React, PostgreSQL"
              value={formData.technologies}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Separate multiple technologies with commas</p>
          </div>

          {/* Maximum Number of Students */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Maximum Number of Students *</label>
            <Input
              type="number"
              name="maxStudents"
              placeholder="e.g., 2"
              value={formData.maxStudents}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Define how many students can be assigned to this subject</p>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Estimated Difficulty</label>
            <div className="flex gap-4">
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={formData.difficulty === level}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-foreground">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">Submit Subject</Button>
            <Link href="/teacher/subjects" className="flex-1">
              <Button variant="outline" className="w-full">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
