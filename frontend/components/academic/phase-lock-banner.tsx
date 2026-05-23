'use client'

import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface PhaseLockBannerProps {
  phase: string
  requiredPhase: string
}

const PHASE_LABELS: Record<string, string> = {
  before: 'Avant sélection superviseur',
  after_supervisor: 'Après sélection superviseur',
  after_approval: 'Après approbation du projet',
  after_defense: 'Après soutenance',
}

export function PhaseLockBanner({ phase, requiredPhase }: PhaseLockBannerProps) {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Ce document n'est accessible que {PHASE_LABELS[requiredPhase]}. Vous êtes actuellement à la phase: {PHASE_LABELS[phase]}
      </AlertDescription>
    </Alert>
  )
}
