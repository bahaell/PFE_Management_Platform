"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AcademicDocument } from "@/models/academic_document.model";
import { Loader2 } from "lucide-react";

interface DocumentGeneratorModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onGenerate: (data: {
        type: AcademicDocument["type"];
        studentId: string;
        teacherId?: string;
        projectId?: string;
    }) => Promise<void>;
    students: { id: string; name: string }[];
    teachers: { id: string; name: string }[];
    projects: { id: string; title: string }[];
    initialData?: Partial<AcademicDocument>;
}

export function DocumentGeneratorModal({
    open,
    onOpenChange,
    onGenerate,
    students,
    teachers,
    projects,
    initialData,
}: DocumentGeneratorModalProps) {
    const [type, setType] = useState<AcademicDocument["type"]>("convention");
    const [studentId, setStudentId] = useState<string>("");
    const [teacherId, setTeacherId] = useState<string>("");
    const [projectId, setProjectId] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            if (initialData) {
                setType(initialData.type || "convention");
                setStudentId(initialData.studentId || "");
                setTeacherId(initialData.teacherId || "");
                setProjectId(initialData.projectId || "");
            } else {
                // Reset form
                setType("convention");
                setStudentId("");
                setTeacherId("");
                setProjectId("");
            }
        }
    }, [open, initialData]);

    const handleGenerate = async () => {
        if (!studentId) return;

        setLoading(true);
        try {
            await onGenerate({
                type,
                studentId,
                teacherId: teacherId || undefined,
                projectId: projectId || undefined,
            });
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to generate document", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Generate Document</DialogTitle>
                    <DialogDescription>
                        Create a new official academic document.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="type">Document Type</Label>
                        <Select
                            value={type}
                            onValueChange={(val) => setType(val as AcademicDocument["type"])}
                        >
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="convention">Convention de Stage</SelectItem>
                                <SelectItem value="encadrement">Fiche d'Encadrement</SelectItem>
                                <SelectItem value="demande_pfe">Demande de PFE</SelectItem>
                                <SelectItem value="pv_soutenance">PV de Soutenance</SelectItem>
                                <SelectItem value="affectation_encadrant">
                                    Affectation Encadrant
                                </SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="student">Student</Label>
                        <Select value={studentId} onValueChange={setStudentId}>
                            <SelectTrigger id="student">
                                <SelectValue placeholder="Select student" />
                            </SelectTrigger>
                            <SelectContent>
                                {students.map((s) => (
                                    <SelectItem key={s.id} value={s.id}>
                                        {s.name} ({s.id})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="teacher">Teacher (Optional)</Label>
                        <Select value={teacherId} onValueChange={setTeacherId}>
                            <SelectTrigger id="teacher">
                                <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {teachers.map((t) => (
                                    <SelectItem key={t.id} value={t.id}>
                                        {t.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="project">Project (Optional)</Label>
                        <Select value={projectId} onValueChange={setProjectId}>
                            <SelectTrigger id="project">
                                <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {projects.map((p) => (
                                    <SelectItem key={p.id} value={p.id}>
                                        {p.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleGenerate} disabled={loading || !studentId}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Generate PDF
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
