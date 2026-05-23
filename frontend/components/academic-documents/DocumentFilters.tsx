"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface DocumentFiltersProps {
    onSearchChange: (value: string) => void;
    onTypeChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    showStudentFilter?: boolean; // Only for coordinator
}

export function DocumentFilters({
    onSearchChange,
    onTypeChange,
    onStatusChange,
    showStudentFilter = false,
}: DocumentFiltersProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={showStudentFilter ? "Search by student name..." : "Search documents..."}
                    className="pl-8"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="flex gap-2">
                <Select onValueChange={onTypeChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="convention">Convention</SelectItem>
                        <SelectItem value="encadrement">Encadrement</SelectItem>
                        <SelectItem value="demande_pfe">Demande PFE</SelectItem>
                        <SelectItem value="pv_soutenance">PV Soutenance</SelectItem>
                        <SelectItem value="affectation_encadrant">Affectation</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={onStatusChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="requested">Requested</SelectItem>
                        <SelectItem value="generated">Generated</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
