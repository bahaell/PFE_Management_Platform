'use client'

import { create } from 'zustand'
import { ModalConfig } from '@/lib/modal-system/modal-manager'

interface ModalStore {
  stack: ModalConfig[]
  open: (config: ModalConfig) => void
  close: (id: string) => void
  closeAll: () => void
  getTopModal: () => ModalConfig | null
}

export const useModalManager = create<ModalStore>((set, get) => ({
  stack: [],
  
  open: (config: ModalConfig) => {
    set((state) => {
      // Remove existing modal with same id if present
      const filtered = state.stack.filter((m) => m.id !== config.id)
      return { stack: [...filtered, config] }
    })
  },
  
  close: (id: string) => {
    set((state) => ({
      stack: state.stack.filter((m) => m.id !== id)
    }))
  },
  
  closeAll: () => {
    set({ stack: [] })
  },
  
  getTopModal: () => {
    const { stack } = get()
    if (stack.length === 0) return null
    return stack[stack.length - 1]
  },
}))
