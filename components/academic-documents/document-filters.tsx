"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { AcademicDocumentType } from "@/models/academic-document.model"

interface DocumentFiltersProps {
  onSearchChange?: (query: string) => void
  onTypeFilterChange?: (types: AcademicDocumentType[]) => void
  onStatusFilterChange?: (statuses: string[]) => void
}

const DOCUMENT_TYPES: AcademicDocumentType[] = [
  "convention",
  "encadrement",
  "demande_pfe",
  "pv_soutenance",
  "affectation",
  "autre",
]

const DOCUMENT_STATUSES = ["ready", "pending", "generated"]

export function DocumentFilters({ onSearchChange, onTypeFilterChange, onStatusFilterChange }: DocumentFiltersProps) {
  const [selectedTypes, setSelectedTypes] = useState<AcademicDocumentType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange?.(value)
  }

  const handleTypeChange = (type: AcademicDocumentType, checked: boolean) => {
    const updated = checked ? [...selectedTypes, type] : selectedTypes.filter((t) => t !== type)
    setSelectedTypes(updated)
    onTypeFilterChange?.(updated)
  }

  const handleStatusChange = (status: string, checked: boolean) => {
    const updated = checked ? [...selectedStatuses, status] : selectedStatuses.filter((s) => s !== status)
    setSelectedStatuses(updated)
    onStatusFilterChange?.(updated)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedTypes([])
    setSelectedStatuses([])
    onSearchChange?.("")
    onTypeFilterChange?.([])
    onStatusFilterChange?.([])
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search" className="text-sm font-medium">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="h-9"
        />
      </div>

      {/* Document Types */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Document Type</h4>
        <div className="space-y-2">
          {DOCUMENT_TYPES.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={`type-${type}`} className="text-sm font-normal capitalize cursor-pointer">
                {type.replace("_", " ")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Status</h4>
        <div className="space-y-2">
          {DOCUMENT_STATUSES.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={`status-${status}`}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
              />
              <Label htmlFor={`status-${status}`} className="text-sm font-normal capitalize cursor-pointer">
                {status}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {(searchQuery || selectedTypes.length > 0 || selectedStatuses.length > 0) && (
        <Button variant="outline" size="sm" onClick={handleReset} className="w-full bg-transparent">
          Reset Filters
        </Button>
      )}
    </div>
  )
}
