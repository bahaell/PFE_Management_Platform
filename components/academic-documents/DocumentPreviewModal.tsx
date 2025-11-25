"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, X } from "lucide-react";
import { AcademicDocument } from "@/models/academic_document.model";

interface DocumentPreviewModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document: AcademicDocument | null;
}

export function DocumentPreviewModal({
    open,
    onOpenChange,
    document,
}: DocumentPreviewModalProps) {
    if (!document) return null;

    const handlePrint = () => {
        const iframe = window.document.getElementById("pdf-preview") as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.print();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
                    <DialogTitle>{document.type.replace(/_/g, " ").toUpperCase()}</DialogTitle>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handlePrint}>
                            <Printer className="h-4 w-4 mr-2" />
                            Print
                        </Button>
                        {document.fileUrl && (
                            <Button variant="outline" size="sm" asChild>
                                <a href={document.fileUrl} download target="_blank" rel="noreferrer">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </a>
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onOpenChange(false)}
                            className="ml-2"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>
                <div className="flex-1 bg-slate-100 p-4 overflow-hidden">
                    {document.fileUrl ? (
                        <iframe
                            id="pdf-preview"
                            src={document.fileUrl}
                            className="w-full h-full rounded-md border shadow-sm bg-white"
                            title="PDF Preview"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            No file available for preview.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
