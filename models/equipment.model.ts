export type EquipmentStatus = 'ok' | 'maintenance' | 'missing'

export interface EquipmentItem {
  present: boolean
  status: EquipmentStatus
  code?: string // optional, used for wifi codes in mocks
}

export interface Equipment {
  projector: EquipmentItem
  smartBoard: EquipmentItem
  speakers: EquipmentItem
  microphone: EquipmentItem
  hdmiSystem: EquipmentItem
  recordingCamera: EquipmentItem
  airConditioning: EquipmentItem
  ethernet: EquipmentItem
  wifi: EquipmentItem
  screen: EquipmentItem
}
