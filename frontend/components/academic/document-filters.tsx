'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Search } from 'lucide-react'
import { AcademicDocumentsService } from '@/services/service_academic_documents'
import { AcademicDocumentType } from '@/models/academic-document.model'

interface DocumentFiltersProps {
    onSearchChange: (query: string) => void
    onTypeFilterChange: (types: AcademicDocumentType[]) => void
    onStatusFilterChange: (statuses: string[]) => void
}

export function DocumentFilters({
    onSearchChange,
    onTypeFilterChange,
    onStatusFilterChange,
}: DocumentFiltersProps) {
    const [selectedTypes, setSelectedTypes] = useState<AcademicDocumentType[]>([])
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

    const handleTypeChange = (type: AcademicDocumentType, checked: boolean) => {
        const newTypes = checked
            ? [...selectedTypes, type]
            : selectedTypes.filter((t) => t !== type)

        setSelectedTypes(newTypes)
        onTypeFilterChange(newTypes)
    }

    const handleStatusChange = (status: string, checked: boolean) => {
        const newStatuses = checked
            ? [...selectedStatuses, status]
            : selectedStatuses.filter((s) => s !== status)

        setSelectedStatuses(newStatuses)
        onStatusFilterChange(newStatuses)
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search documents..."
                        className="pl-8"
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Document Type</Label>
                <div className="space-y-2">
                    {['convention', 'encadrement', 'demande_pfe', 'pv_soutenance', 'affectation', 'autre'].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                                id={`type-${type}`}
                                checked={selectedTypes.includes(type as AcademicDocumentType)}
                                onCheckedChange={(checked) => handleTypeChange(type as AcademicDocumentType, checked as boolean)}
                            />
                            <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                                {AcademicDocumentsService.getDocumentTypeLabel(type as AcademicDocumentType)}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label>Status</Label>
                <div className="space-y-2">
                    {['ready', 'pending', 'generated'].map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                                id={`status-${status}`}
                                checked={selectedStatuses.includes(status)}
                                onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                            />
                            <Label htmlFor={`status-${status}`} className="text-sm font-normal capitalize">
                                {status}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
