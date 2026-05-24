import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProjectsService } from '@/services/service_projects'
import { RoomsService, type RoomAvailabilitySlot, type RoomWithEquipment } from '@/services/service_rooms'
import { SchedulerService, type CreateDefensePayload, type JuryRole } from '@/services/service_scheduler'
import { NotificationService } from '@/services/service_notifications'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectsService.getAllProjects(),
  })
}

export function useProject(projectId?: string | number) {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => ProjectsService.getProjectById(projectId!),
    enabled: projectId !== undefined && projectId !== null && String(projectId).length > 0,
  })
}

export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => RoomsService.getAllRooms(),
  })
}

export function useRoom(roomId?: number) {
  return useQuery({
    queryKey: ['rooms', roomId],
    queryFn: () => RoomsService.getRoomById(roomId!),
    enabled: Number.isFinite(roomId),
  })
}

export function useRoomMutations() {
  const queryClient = useQueryClient()

  const invalidateRooms = () => queryClient.invalidateQueries({ queryKey: ['rooms'] })

  return {
    createRoom: useMutation({
      mutationFn: (room: RoomWithEquipment) => RoomsService.createRoom(room),
      onSuccess: invalidateRooms,
    }),
    updateRoom: useMutation({
      mutationFn: ({ id, room }: { id: number; room: Partial<RoomWithEquipment> }) => RoomsService.updateRoom(id, room),
      onSuccess: invalidateRooms,
    }),
    deleteRoom: useMutation({
      mutationFn: (id: number) => RoomsService.deleteRoom(id),
      onSuccess: invalidateRooms,
    }),
    addAvailability: useMutation({
      mutationFn: ({ roomId, slot }: { roomId: number; slot: RoomAvailabilitySlot }) => RoomsService.addAvailabilitySlot(roomId, slot),
      onSuccess: invalidateRooms,
    }),
  }
}

export function useScheduledDefenses() {
  return useQuery({
    queryKey: ['schedule', 'defenses'],
    queryFn: () => SchedulerService.getAllScheduledDefenses(),
  })
}

export function usePendingDefenseRequests() {
  return useQuery({
    queryKey: ['schedule', 'pending-requests'],
    queryFn: () => SchedulerService.getAllPendingRequests(),
  })
}

export function useDefenseTimeline(options?: { userRole?: 'student' | 'teacher' | 'coordinator'; userId?: string }) {
  return useQuery({
    queryKey: ['schedule', 'timeline', options?.userRole, options?.userId],
    queryFn: () => SchedulerService.getTimelineEvents(options),
  })
}

export function useSchedulingMutations() {
  const queryClient = useQueryClient()
  const invalidateSchedule = () => queryClient.invalidateQueries({ queryKey: ['schedule'] })

  return {
    createDefense: useMutation({
      mutationFn: (payload: CreateDefensePayload) => SchedulerService.createDefense(payload),
      onSuccess: invalidateSchedule,
    }),
    deleteDefense: useMutation({
      mutationFn: (id: number) => SchedulerService.deleteScheduledDefense(id),
      onSuccess: invalidateSchedule,
    }),
    addJuryMember: useMutation({
      mutationFn: ({ defenseId, teacherId, role, forceOverride }: { defenseId: number; teacherId: string; role: JuryRole; forceOverride?: boolean }) =>
        SchedulerService.addJuryMember(defenseId, teacherId, role, forceOverride),
      onSuccess: invalidateSchedule,
    }),
  }
}

export function useNotifications(userId?: string) {
  return useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => NotificationService.getNotifications(userId!),
    enabled: Boolean(userId),
  })
}

export function useNotificationMutations(userId?: string) {
  const queryClient = useQueryClient()
  const invalidateNotifications = () => queryClient.invalidateQueries({ queryKey: ['notifications', userId] })

  return {
    markAsRead: useMutation({
      mutationFn: (notificationId: string) => NotificationService.markAsRead(notificationId),
      onSuccess: invalidateNotifications,
    }),
    registerDeviceToken: useMutation({
      mutationFn: (token: string) => NotificationService.registerDeviceToken(userId!, token),
      onSuccess: invalidateNotifications,
    }),
  }
}
