"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye } from "lucide-react"
import type { AdministrativeDocument } from "@/models/academic-document.model"

interface DocumentTableProps {
  documents: AdministrativeDocument[]
  isLoading?: boolean
  onPreview?: (document: AdministrativeDocument) => void
  onDownload?: (document: AdministrativeDocument) => void
}

const statusColors: Record<string, string> = {
  ready: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  generated: "bg-blue-100 text-blue-800",
}

export function DocumentTable({ documents, isLoading, onPreview, onDownload }: DocumentTableProps) {
  const [sortBy, setSortBy] = useState<"name" | "date" | "status">("date")

  const sortedDocuments = [...documents].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.type.localeCompare(b.type)
      case "date":
        return new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
      case "status":
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading documents...</p>
      </div>
    )
  }

  if (documents.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">No documents found</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => setSortBy("name")}>
              Document Type {sortBy === "name" && "↓"}
            </TableHead>
            <TableHead>Student</TableHead>
            <TableHead className="cursor-pointer" onClick={() => setSortBy("date")}>
              Generated {sortBy === "date" && "↓"}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => setSortBy("status")}>
              Status {sortBy === "status" && "↓"}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDocuments.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium capitalize">{doc.type.replace("_", " ")}</TableCell>
              <TableCell>{doc.studentName}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(doc.generatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  className={`capitalize ${statusColors[doc.status] || "bg-gray-100 text-gray-800"}`}
                  variant="outline"
                >
                  {doc.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => onPreview?.(doc)} title="Preview">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => onDownload?.(doc)} title="Download">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
