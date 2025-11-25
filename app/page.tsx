"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, Shield, Calendar } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const roles = [
    {
      title: "Student",
      description: "Access student dashboard, projects, and defenses",
      icon: GraduationCap,
      path: "/student",
      color: "bg-blue-500"
    },
    {
      title: "Teacher",
      description: "Manage students, projects, and jury assignments",
      icon: Users,
      path: "/teacher",
      color: "bg-green-500"
    },
    {
      title: "Coordinator",
      description: "Schedule defenses, manage rooms, and oversee operations",
      icon: Shield,
      path: "/coordinator",
      color: "bg-purple-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">PFE Management Platform</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Select a role to preview the application
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Card 
              key={role.path}
              className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary"
              onClick={() => router.push(role.path)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${role.color} flex items-center justify-center mb-3`}>
                  <role.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/auth/login")}
          >
            Go to Login Page
          </Button>
        </div>
      </div>
    </div>
  )
}
