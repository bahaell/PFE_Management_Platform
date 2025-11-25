import type { Teacher } from './teacher.model'

export type JuryRole = 'president' | 'rapporteur' | 'encadrant'

export interface JuryMember {
  teacher: Teacher
  role: JuryRole
}
