"use client";

import { AcademicDocument } from "@/models/academic_document.model";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, FileText, Download, Eye, Trash, Edit } from "lucide-react";

interface DocumentRowActionsProps {
    doc: AcademicDocument;
    role: "coordinator" | "teacher" | "student";
    onPreview?: (doc: AcademicDocument) => void;
    onDownload?: (doc: AcademicDocument) => void;
    onGenerate?: (doc: AcademicDocument) => void;
    onEdit?: (doc: AcademicDocument) => void;
    onDelete?: (doc: AcademicDocument) => void;
}

export function DocumentRowActions({
    doc,
    role,
    onPreview,
    onDownload,
    onGenerate,
    onEdit,
    onDelete,
}: DocumentRowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {(doc.status === "generated" || doc.status === "delivered") && (
                    <>
                        <DropdownMenuItem onClick={() => onPreview?.(doc)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDownload?.(doc)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </DropdownMenuItem>
                    </>
                )}
                {role === "coordinator" && (
                    <>
                        {doc.status === "requested" && (
                            <DropdownMenuItem onClick={() => onGenerate?.(doc)}>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => onEdit?.(doc)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Metadata
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete?.(doc)}
                            className="text-red-600 focus:text-red-600"
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
