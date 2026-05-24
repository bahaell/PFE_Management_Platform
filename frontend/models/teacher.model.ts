export interface Teacher {
  [key: string]: any
  id: any
  name: string
  email?: string
  phone?: string
  gender?: string
  birthdate?: string
  avatar?: string | null
  role?: 'teacher' | string
  grade: string
  speciality: string
  department?: string
  bio?: string
  researchInterests?: string
  yearsOfExperience?: number
  yearsOfService?: number
  skills: any[]
  currentLoad?: number
  title?: string
}
