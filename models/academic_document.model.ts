export interface AcademicDocument {
    id: string;
    type:
    | "convention"
    | "encadrement"
    | "demande_pfe"
    | "pv_soutenance"
    | "affectation_encadrant"
    | "autre";
    studentId: string;
    teacherId?: string;
    projectId?: string;
    status: "requested" | "generated" | "delivered";
    generatedAt?: string;
    fileUrl?: string;
}
