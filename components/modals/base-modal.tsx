"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  isDangerous?: boolean
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  isDangerous = false,
}: BaseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto flex-1 min-h-0">{children}</div>
        <DialogFooter className="flex gap-2 justify-end flex-shrink-0">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button onClick={onConfirm} disabled={isLoading} variant={isDangerous ? "destructive" : "default"}>
              {isLoading ? "Processing..." : confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
