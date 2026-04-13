export type ModalType = 'expand-tasks' | 'add-task' | 'edit-task' | 'chat'

export interface ModalConfig {
  id: string
  type: ModalType
  level: number
  props: Record<string, any>
}

export const MODAL_Z_INDEX = {
  BACKDROP: 900,
  LEVEL_1: 1000,
  LEVEL_2: 1100,
  LEVEL_3: 1200,
} as const

export function getZIndex(level: number): number {
  switch (level) {
    case 1:
      return MODAL_Z_INDEX.LEVEL_1
    case 2:
      return MODAL_Z_INDEX.LEVEL_2
    case 3:
      return MODAL_Z_INDEX.LEVEL_3
    default:
      return MODAL_Z_INDEX.LEVEL_1
  }
}
