// lightweight id generator
function makeId(prefix = '') { return prefix + Math.random().toString(36).slice(2,9) }
import type { AdministrativeDocument } from '../models/administrative_document.model'

const documents: AdministrativeDocument[] = []

export async function getDocuments(filter?: Partial<AdministrativeDocument>): Promise<AdministrativeDocument[]> {
  if (!filter) return [...documents]
  return documents.filter((d) => {
    for (const k of Object.keys(filter)) {
      // @ts-ignore
      if ((d as any)[k] !== (filter as any)[k]) return false
    }
    return true
  })
}

export async function getDocument(id: string): Promise<AdministrativeDocument | null> {
  return documents.find((d) => d.id === id) ?? null
}

export async function createDocument(input: Partial<AdministrativeDocument>): Promise<AdministrativeDocument> {
  const doc: AdministrativeDocument = {
    id: input.id ?? makeId('doc-'),
    type: input.type ?? 'autre',
    studentId: input.studentId ?? 'unknown',
    teacherId: input.teacherId,
    projectId: input.projectId,
    generatedAt: input.generatedAt ?? new Date().toISOString(),
    fileUrl: input.fileUrl ?? '/mock-docs/sample.pdf',
    templateId: input.templateId ?? 'unknown',
    requestedBy: input.requestedBy ?? 'student',
    createdAt: new Date().toISOString(),
  }
  documents.unshift(doc)
  return doc
}

export async function deleteDocument(id: string): Promise<boolean> {
  const idx = documents.findIndex((d) => d.id === id)
  if (idx === -1) return false
  documents.splice(idx, 1)
  return true
}

export async function deliverDocument(documentId: string, recipients: string[]): Promise<AdministrativeDocument | null> {
  const doc = documents.find((d) => d.id === documentId) ?? null
  if (!doc) return null
  // In a mock system we simply mark the generatedAt again and return
  doc.generatedAt = new Date().toISOString()
  // A real system would push notifications / emails
  return doc
}

export default {
  getDocuments,
  getDocument,
  createDocument,
  deleteDocument,
  deliverDocument,
}
import { AcademicDocument } from "@/models/academic_document.model";

// Mock Data
const MOCK_STUDENTS = [
  { id: "STU001", name: "Ali Hassan" },
  { id: "STU002", name: "Sara Ahmed" },
  { id: "STU003", name: "Omar Khaled" },
  { id: "STU004", name: "Nour El Hoda" },
  { id: "STU005", name: "Youssef Ibrahim" },
];

const MOCK_TEACHERS = [
  { id: "TCH001", name: "Dr. Sami Ben Ali" },
  { id: "TCH002", name: "Prof. Layla Mansour" },
  { id: "TCH003", name: "Dr. Karim Zayed" },
];

const MOCK_PROJECTS = [
  { id: "PRJ001", title: "AI-Based Traffic Control" },
  { id: "PRJ002", title: "Blockchain Voting System" },
  { id: "PRJ003", title: "Smart Home Automation" },
  { id: "PRJ004", title: "E-Learning Platform" },
];

let MOCK_DOCUMENTS: AcademicDocument[] = [
  {
    id: "DOC001",
    type: "convention",
    studentId: "STU001",
    projectId: "PRJ001",
    status: "requested",
  },
  {
    id: "DOC002",
    type: "encadrement",
    studentId: "STU002",
    teacherId: "TCH001",
    projectId: "PRJ002",
    status: "generated",
    generatedAt: "2023-10-15T10:00:00Z",
    fileUrl: "/mock-docs/encadrement_stu002.pdf",
  },
  {
    id: "DOC003",
    type: "demande_pfe",
    studentId: "STU003",
    status: "delivered",
    generatedAt: "2023-09-20T14:30:00Z",
    fileUrl: "/mock-docs/demande_stu003.pdf",
  },
  {
    id: "DOC004",
    type: "pv_soutenance",
    studentId: "STU004",
    projectId: "PRJ004",
    teacherId: "TCH002",
    status: "requested",
  },
  {
    id: "DOC005",
    type: "affectation_encadrant",
    studentId: "STU005",
    teacherId: "TCH003",
    status: "generated",
    generatedAt: "2023-11-01T09:00:00Z",
    fileUrl: "/mock-docs/affectation_stu005.pdf",
  },
  {
    id: "DOC006",
    type: "autre",
    studentId: "STU001",
    status: "delivered",
    generatedAt: "2023-12-10T16:00:00Z",
    fileUrl: "/mock-docs/autre_stu001.pdf",
  },
  {
    id: "DOC007",
    type: "convention",
    studentId: "STU002",
    projectId: "PRJ002",
    status: "requested",
  },
  {
    id: "DOC008",
    type: "encadrement",
    studentId: "STU003",
    teacherId: "TCH002",
    projectId: "PRJ003",
    status: "generated",
    generatedAt: "2023-10-20T11:00:00Z",
    fileUrl: "/mock-docs/encadrement_stu003.pdf",
  },
  {
    id: "DOC009",
    type: "demande_pfe",
    studentId: "STU004",
    status: "delivered",
    generatedAt: "2023-09-25T15:00:00Z",
    fileUrl: "/mock-docs/demande_stu004.pdf",
  },
  {
    id: "DOC010",
    type: "pv_soutenance",
    studentId: "STU005",
    projectId: "PRJ004", // Assuming PRJ004 for STU005 as well for mock variety or maybe undefined
    teacherId: "TCH003",
    status: "requested",
  },
  {
    id: "DOC011",
    type: "affectation_encadrant",
    studentId: "STU001",
    teacherId: "TCH001",
    status: "generated",
    generatedAt: "2023-11-05T10:30:00Z",
    fileUrl: "/mock-docs/affectation_stu001.pdf",
  },
  {
    id: "DOC012",
    type: "autre",
    studentId: "STU002",
    status: "delivered",
    generatedAt: "2023-12-15T13:00:00Z",
    fileUrl: "/mock-docs/autre_stu002.pdf",
  },
];

export const AcademicDocumentsService = {
  getAllDocuments: async (): Promise<AcademicDocument[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_DOCUMENTS]), 500);
    });
  },

  getDocumentsForStudent: async (studentId: string): Promise<AcademicDocument[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DOCUMENTS.filter((doc) => doc.studentId === studentId));
      }, 500);
    });
  },

  getDocumentsForTeacher: async (teacherId: string): Promise<AcademicDocument[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DOCUMENTS.filter((doc) => doc.teacherId === teacherId));
      }, 500);
    });
  },

  requestDocument: async (
    type: AcademicDocument["type"],
    studentId: string
  ): Promise<AcademicDocument> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDoc: AcademicDocument = {
          id: `DOC${Date.now()}`,
          type,
          studentId,
          status: "requested",
        };
        MOCK_DOCUMENTS.push(newDoc);
        resolve(newDoc);
      }, 500);
    });
  },

  generateDocument: async (
    docId: string,
    payload: { teacherId?: string; projectId?: string }
  ): Promise<AcademicDocument> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const docIndex = MOCK_DOCUMENTS.findIndex((d) => d.id === docId);
        if (docIndex === -1) {
          reject(new Error("Document not found"));
          return;
        }

        const updatedDoc = {
          ...MOCK_DOCUMENTS[docIndex],
          ...payload,
          status: "generated" as const,
          generatedAt: new Date().toISOString(),
          fileUrl: `/mock-docs/generated_${docId}.pdf`,
        };

        MOCK_DOCUMENTS[docIndex] = updatedDoc;
        resolve(updatedDoc);
      }, 1000);
    });
  },

  updateDocument: async (
    docId: string,
    updates: Partial<AcademicDocument>
  ): Promise<AcademicDocument> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const docIndex = MOCK_DOCUMENTS.findIndex((d) => d.id === docId);
        if (docIndex === -1) {
          reject(new Error("Document not found"));
          return;
        }

        const updatedDoc = { ...MOCK_DOCUMENTS[docIndex], ...updates };
        MOCK_DOCUMENTS[docIndex] = updatedDoc;
        resolve(updatedDoc);
      }, 500);
    });
  },

  deleteDocument: async (docId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        MOCK_DOCUMENTS = MOCK_DOCUMENTS.filter((d) => d.id !== docId);
        resolve();
      }, 500);
    });
  },

  generatePDF: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    templateId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    studentData: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    teacherData: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    projectData: any
  ): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`/mock-docs/generated_pdf_${Date.now()}.pdf`);
      }, 1500);
    });
  },

  // Helper methods to get mock data for UI
  getMockStudents: () => MOCK_STUDENTS,
  getMockTeachers: () => MOCK_TEACHERS,
  getMockProjects: () => MOCK_PROJECTS,
};
