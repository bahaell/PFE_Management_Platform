import { SchedulerService, type BackendDefenseJury, type JuryRole } from './service_scheduler'
import type { JuryMember } from '@/models/jury.model'
import { TeachersService } from '@/services/service_teachers'

export type { BackendDefenseJury, JuryRole }

export const JuryService = {
  async addJuryMember(
    defenseId: number,
    teacherId: string,
    role: JuryRole,
    forceOverride = false
  ): Promise<JuryMember> {
    const backendJury = await SchedulerService.addJuryMember(defenseId, teacherId, role, forceOverride)
    return SchedulerService.mapJuryMember(backendJury)
  },

  async getJuryByDefense(defenseId: number): Promise<JuryMember[]> {
    const backendJury = await SchedulerService.getDefenseJury(defenseId)
    return backendJury.map(SchedulerService.mapJuryMember)
  },

  async getJuryMemberById(id: string): Promise<JuryMember | null> {
    const teacher = await TeachersService.getTeacherById(id)
    return teacher ? { id, teacher, role: 'rapporteur' } : null
  },
  async getAllJuryMembers(): Promise<JuryMember[]> {
    const teachers = await TeachersService.getAllTeachers()
    return teachers.map((teacher) => ({ id: teacher.id, teacher, role: 'rapporteur' }))
  },
  async updateJuryMember(
    defenseId: number,
    juryId: number,
    teacherId: string,
    role: JuryRole,
    forceOverride = false
  ): Promise<JuryMember> {
    const backendJury = await SchedulerService.updateJuryMember(defenseId, juryId, teacherId, role, forceOverride)
    return SchedulerService.mapJuryMember(backendJury)
  },
  async deleteJuryMember(defenseId: number, juryId: number): Promise<boolean> {
    return SchedulerService.deleteJuryMember(defenseId, juryId)
  },
  async getJuryByRole(role: string): Promise<JuryMember[]> {
    const members = await this.getAllJuryMembers()
    return members.map((member) => ({ ...member, role: role as JuryMember['role'] }))
  },
  async searchJury(query: string): Promise<JuryMember[]> {
    const teachers = await TeachersService.getAllTeachers({ q: query })
    return teachers.map((teacher) => ({ id: teacher.id, teacher, role: 'rapporteur' }))
  },
  async getJuryBySpeciality(speciality: string): Promise<JuryMember[]> {
    const teachers = await TeachersService.getAllTeachers({ speciality })
    return teachers.map((teacher) => ({ id: teacher.id, teacher, role: 'rapporteur' }))
  },
  async getJuryByDepartment(department: string): Promise<JuryMember[]> {
    const teachers = await TeachersService.getAllTeachers({ department })
    return teachers.map((teacher) => ({ id: teacher.id, teacher, role: 'rapporteur' }))
  },
}

export default JuryService
