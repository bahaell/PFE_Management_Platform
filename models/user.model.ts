export type UserRole = 'student' | 'teacher' | 'coordinator'

export interface BaseUser {
  id: string
  name: string
  email: string
  phone: string
  gender: string
  birthdate: string
  avatar: string | null
  role: UserRole
}
