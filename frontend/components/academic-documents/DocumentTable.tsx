"use client";

import { AcademicDocument } from "@/models/academic_document.model";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { format } from "date-fns";
import { DocumentRowActions } from "./DocumentRowActions";

interface DocumentTableProps {
    documents: AcademicDocument[];
    role: "coordinator" | "teacher" | "student";
    onPreview?: (doc: AcademicDocument) => void;
    onDownload?: (doc: AcademicDocument) => void;
    onGenerate?: (doc: AcademicDocument) => void;
    onEdit?: (doc: AcademicDocument) => void;
    onDelete?: (doc: AcademicDocument) => void;
}

export function DocumentTable({
    documents,
    role,
    onPreview,
    onDownload,
    onGenerate,
    onEdit,
    onDelete,
}: DocumentTableProps) {
    const getStatusColor = (status: AcademicDocument["status"]) => {
        switch (status) {
            case "requested":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
            case "generated":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
            case "delivered":
                return "bg-green-100 text-green-800 hover:bg-green-100/80";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getTypeLabel = (type: AcademicDocument["type"]) => {
        return type.replace(/_/g, " ").toUpperCase();
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Student ID</TableHead>
                        {role !== "student" && <TableHead>Teacher ID</TableHead>}
                        <TableHead>Status</TableHead>
                        <TableHead>Generated At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                No documents found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        documents.map((doc) => (
                            <TableRow key={doc.id} className="hover:bg-muted/50 transition-colors">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{getTypeLabel(doc.type)}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{doc.studentId}</TableCell>
                                {role !== "student" && <TableCell>{doc.teacherId || "-"}</TableCell>}
                                <TableCell>
                                    <Badge className={getStatusColor(doc.status)} variant="secondary">
                                        {doc.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {doc.generatedAt ? format(new Date(doc.generatedAt), "PPP") : "-"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DocumentRowActions
                                        doc={doc}
                                        role={role}
                                        onPreview={onPreview}
                                        onDownload={onDownload}
                                        onGenerate={onGenerate}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
