'use client'

import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/providers/auth-provider'
import { PageHeader } from '@/components/page-header'
import { DashboardCard } from '@/components/dashboard-card'
import { Button } from '@/components/ui/button'
import { BookOpen, FileText, Clock, AlertCircle, ArrowRight, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import { RecommendedSubjectsPanel } from '@/components/recommendations/recommended-subjects-panel'
import { RecommendedTeachersPanel } from '@/components/recommendations/recommended-teachers-panel'
import { motion } from 'framer-motion'
import { projectMockData } from '@/lib/collaboration-mock-data'
import { ProjectsService } from '@/services/service_projects'

export default function StudentDashboard() {
  const { user } = useAuth()
  
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectsService.getAllProjects(),
  })

  const studentName = user?.name || 'Student'
  const studentRole = user?.role ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}` : 'Student'

  const recentNotifications = [
    { id: 1, title: 'Feedback from advisor', description: 'Your report has been reviewed', timestamp: '2 hours ago', icon: '📝' },
    { id: 2, title: 'New resource available', description: 'Check the updated guidelines', timestamp: '4 hours ago', icon: '📚' },
    { id: 3, title: 'Deadline reminder', description: 'Report submission in 15 days', timestamp: '1 day ago', icon: '⏰' },
    { id: 4, title: 'Project approved', description: 'Your project has been validated', timestamp: '2 days ago', icon: '✅' },
  ]

  const progressPhases = [
    { name: 'Phase 1: Planning', status: 'Completed', percentage: 100, color: 'bg-green-500' },
    { name: 'Phase 2: Development', status: 'In Progress (65%)', percentage: 65, color: 'bg-blue-500' },
    { name: 'Phase 3: Testing', status: 'Pending', percentage: 0, color: 'bg-gray-300' },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Loading..." />
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 sm:space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Welcome, {studentName} ({studentRole})</h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Overview of your PFE activities</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <DashboardCard
          title="Project Status"
          value="In Progress"
          description="Phase 2: Development"
          icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />}
          delay={0}
        />
        <DashboardCard
          title="Next Deadline"
          value="15 Days"
          description="Report submission"
          icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6" />}
          delay={0.1}
        />
        <DashboardCard
          title="Pending Documents"
          value="3/5"
          description="Awaiting submission"
          icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />}
          delay={0.2}
        />
        <DashboardCard
          title="Project Status"
          value="No project"
          description="Browse subjects"
          icon={<AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="lg:col-span-2 bg-card rounded-lg border border-border p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">Project Progress</h3>
            <Link href="/student/project">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="gap-1 w-full sm:w-auto">
                  View Details <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </Link>
          </div>
          <div className="space-y-4">
            {progressPhases.map((phase, index) => (
              <motion.div
                key={phase.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-xs sm:text-sm font-medium text-foreground">{phase.name}</span>
                  <span className={`text-xs sm:text-sm font-medium ${
                    phase.percentage === 100 ? 'text-green-600' :
                    phase.percentage > 0 ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5 sm:h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${phase.percentage}%` }}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                    className={`${phase.color} h-2.5 sm:h-3 rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-card rounded-lg border border-border p-4 sm:p-6"
        >
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Recent Notifications</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentNotifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.02)" }}
                className="p-3 bg-secondary rounded-lg text-sm transition-colors cursor-pointer border border-border/50"
              >
                <div className="flex items-start gap-2">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.7 + index * 0.1 }}
                    className="text-base sm:text-lg"
                  >
                    {notif.icon}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-xs line-clamp-1">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{notif.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.timestamp}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Link href="/student/notifications">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="w-full mt-4" size="sm">
                View All Notifications
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {projectMockData.defense && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/30 p-4 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Soutenance Programmée</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Détails de votre présentation finale</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-background/50 rounded-lg p-3 sm:p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase">Date</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{formatDate(projectMockData.defense.date)}</p>
            </div>

            <div className="bg-background/50 rounded-lg p-3 sm:p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase">Heure</p>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {projectMockData.defense.time}
                {projectMockData.defense.duration && ` (${projectMockData.defense.duration})`}
              </p>
            </div>

            <div className="bg-background/50 rounded-lg p-3 sm:p-4 border border-border">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <p className="text-xs font-medium text-muted-foreground uppercase">Salle</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{projectMockData.defense.room}</p>
            </div>
          </div>

          <Link href="/student/project">
            <Button className="w-full mt-4" variant="outline">
              Voir les détails du projet
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="space-y-4 sm:space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <RecommendedSubjectsPanel />
          <RecommendedTeachersPanel />
        </div>
      </motion.div>
    </motion.div>
  )
}
