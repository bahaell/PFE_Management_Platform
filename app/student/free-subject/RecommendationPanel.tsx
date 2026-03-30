"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { TeacherRecommendation } from "@/models/recommendation.model"
import { motion } from "framer-motion"

interface RecommendationPanelProps {
  recommendations: TeacherRecommendation[]
  onSelectTeacher: (teacherId: string, teacherName: string) => void
  isLoading?: boolean
}

export function RecommendationPanel({ recommendations, onSelectTeacher, isLoading = false }: RecommendationPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>AI Recommended Supervisors</CardTitle>
          <CardDescription>Based on your subject and company description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Generating recommendations...</div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No recommendations available</div>
          ) : (
            recommendations.map((rec, index) => (
              <motion.div
                key={rec.teacherId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{rec.teacherName}</h3>
                    <p className="text-xs text-muted-foreground">Teacher ID: {rec.teacherId}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{rec.score}</div>
                    <p className="text-xs text-muted-foreground">Match Score</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Skills Match:</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.skillsMatched.length > 0 ? (
                      rec.skillsMatched.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">No direct skill match</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Reasoning:</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    {rec.reasoning.map((reason, idx) => (
                      <li key={idx}>• {reason}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted/50 rounded p-2">
                  <p className="text-xs">
                    <span className="font-semibold">Workload:</span> {rec.load}/{rec.maxCapacity} students
                  </p>
                </div>

                <Button onClick={() => onSelectTeacher(rec.teacherId, rec.teacherName)} className="w-full" size="sm">
                  Select {rec.teacherName}
                </Button>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
