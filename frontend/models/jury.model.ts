import type { Teacher } from './teacher.model'

export type JuryRole = 'president' | 'rapporteur' | 'encadrant' | 'examiner'

export interface JuryMember {
  [key: string]: any
  id?: string | number
  teacher?: Teacher
  role: JuryRole | string
  name?: string
  avatar?: string
  online?: boolean
}
