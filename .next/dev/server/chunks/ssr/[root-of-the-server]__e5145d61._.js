module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/teacher/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/teacher/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/services/service_academic_documents.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lightweight id generator
__turbopack_context__.s([
    "AcademicDocumentsService",
    ()=>AcademicDocumentsService,
    "createDocument",
    ()=>createDocument,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteDocument",
    ()=>deleteDocument,
    "deliverDocument",
    ()=>deliverDocument,
    "getDocument",
    ()=>getDocument,
    "getDocuments",
    ()=>getDocuments
]);
function makeId(prefix = '') {
    return prefix + Math.random().toString(36).slice(2, 9);
}
const documents = [];
async function getDocuments(filter) {
    if (!filter) return [
        ...documents
    ];
    return documents.filter((d)=>{
        for (const k of Object.keys(filter)){
            // @ts-ignore
            if (d[k] !== filter[k]) return false;
        }
        return true;
    });
}
async function getDocument(id) {
    return documents.find((d)=>d.id === id) ?? null;
}
async function createDocument(input) {
    const doc = {
        id: input.id ?? makeId('doc-'),
        type: input.type ?? 'autre',
        studentId: input.studentId ?? 'unknown',
        teacherId: input.teacherId,
        projectId: input.projectId,
        generatedAt: input.generatedAt ?? new Date().toISOString(),
        fileUrl: input.fileUrl ?? '/mock-docs/sample.pdf',
        templateId: input.templateId ?? 'unknown',
        requestedBy: input.requestedBy ?? 'student',
        createdAt: new Date().toISOString()
    };
    documents.unshift(doc);
    return doc;
}
async function deleteDocument(id) {
    const idx = documents.findIndex((d)=>d.id === id);
    if (idx === -1) return false;
    documents.splice(idx, 1);
    return true;
}
async function deliverDocument(documentId, recipients) {
    const doc = documents.find((d)=>d.id === documentId) ?? null;
    if (!doc) return null;
    // In a mock system we simply mark the generatedAt again and return
    doc.generatedAt = new Date().toISOString();
    // A real system would push notifications / emails
    return doc;
}
const __TURBOPACK__default__export__ = {
    getDocuments,
    getDocument,
    createDocument,
    deleteDocument,
    deliverDocument
};
// Mock Data
const MOCK_STUDENTS = [
    {
        id: "STU001",
        name: "Ali Hassan"
    },
    {
        id: "STU002",
        name: "Sara Ahmed"
    },
    {
        id: "STU003",
        name: "Omar Khaled"
    },
    {
        id: "STU004",
        name: "Nour El Hoda"
    },
    {
        id: "STU005",
        name: "Youssef Ibrahim"
    }
];
const MOCK_TEACHERS = [
    {
        id: "TCH001",
        name: "Dr. Sami Ben Ali"
    },
    {
        id: "TCH002",
        name: "Prof. Layla Mansour"
    },
    {
        id: "TCH003",
        name: "Dr. Karim Zayed"
    }
];
const MOCK_PROJECTS = [
    {
        id: "PRJ001",
        title: "AI-Based Traffic Control"
    },
    {
        id: "PRJ002",
        title: "Blockchain Voting System"
    },
    {
        id: "PRJ003",
        title: "Smart Home Automation"
    },
    {
        id: "PRJ004",
        title: "E-Learning Platform"
    }
];
let MOCK_DOCUMENTS = [
    {
        id: "DOC001",
        type: "convention",
        studentId: "STU001",
        projectId: "PRJ001",
        status: "requested"
    },
    {
        id: "DOC002",
        type: "encadrement",
        studentId: "STU002",
        teacherId: "TCH001",
        projectId: "PRJ002",
        status: "generated",
        generatedAt: "2023-10-15T10:00:00Z",
        fileUrl: "/mock-docs/encadrement_stu002.pdf"
    },
    {
        id: "DOC003",
        type: "demande_pfe",
        studentId: "STU003",
        status: "delivered",
        generatedAt: "2023-09-20T14:30:00Z",
        fileUrl: "/mock-docs/demande_stu003.pdf"
    },
    {
        id: "DOC004",
        type: "pv_soutenance",
        studentId: "STU004",
        projectId: "PRJ004",
        teacherId: "TCH002",
        status: "requested"
    },
    {
        id: "DOC005",
        type: "affectation_encadrant",
        studentId: "STU005",
        teacherId: "TCH003",
        status: "generated",
        generatedAt: "2023-11-01T09:00:00Z",
        fileUrl: "/mock-docs/affectation_stu005.pdf"
    },
    {
        id: "DOC006",
        type: "autre",
        studentId: "STU001",
        status: "delivered",
        generatedAt: "2023-12-10T16:00:00Z",
        fileUrl: "/mock-docs/autre_stu001.pdf"
    },
    {
        id: "DOC007",
        type: "convention",
        studentId: "STU002",
        projectId: "PRJ002",
        status: "requested"
    },
    {
        id: "DOC008",
        type: "encadrement",
        studentId: "STU003",
        teacherId: "TCH002",
        projectId: "PRJ003",
        status: "generated",
        generatedAt: "2023-10-20T11:00:00Z",
        fileUrl: "/mock-docs/encadrement_stu003.pdf"
    },
    {
        id: "DOC009",
        type: "demande_pfe",
        studentId: "STU004",
        status: "delivered",
        generatedAt: "2023-09-25T15:00:00Z",
        fileUrl: "/mock-docs/demande_stu004.pdf"
    },
    {
        id: "DOC010",
        type: "pv_soutenance",
        studentId: "STU005",
        projectId: "PRJ004",
        teacherId: "TCH003",
        status: "requested"
    },
    {
        id: "DOC011",
        type: "affectation_encadrant",
        studentId: "STU001",
        teacherId: "TCH001",
        status: "generated",
        generatedAt: "2023-11-05T10:30:00Z",
        fileUrl: "/mock-docs/affectation_stu001.pdf"
    },
    {
        id: "DOC012",
        type: "autre",
        studentId: "STU002",
        status: "delivered",
        generatedAt: "2023-12-15T13:00:00Z",
        fileUrl: "/mock-docs/autre_stu002.pdf"
    }
];
const AcademicDocumentsService = {
    getAllDocuments: async ()=>{
        return new Promise((resolve)=>{
            setTimeout(()=>resolve([
                    ...MOCK_DOCUMENTS
                ]), 500);
        });
    },
    getDocumentsForStudent: async (studentId)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(MOCK_DOCUMENTS.filter((doc)=>doc.studentId === studentId));
            }, 500);
        });
    },
    getDocumentsForTeacher: async (teacherId)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(MOCK_DOCUMENTS.filter((doc)=>doc.teacherId === teacherId));
            }, 500);
        });
    },
    requestDocument: async (type, studentId)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                const newDoc = {
                    id: `DOC${Date.now()}`,
                    type,
                    studentId,
                    status: "requested"
                };
                MOCK_DOCUMENTS.push(newDoc);
                resolve(newDoc);
            }, 500);
        });
    },
    generateDocument: async (docId, payload)=>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                const docIndex = MOCK_DOCUMENTS.findIndex((d)=>d.id === docId);
                if (docIndex === -1) {
                    reject(new Error("Document not found"));
                    return;
                }
                const updatedDoc = {
                    ...MOCK_DOCUMENTS[docIndex],
                    ...payload,
                    status: "generated",
                    generatedAt: new Date().toISOString(),
                    fileUrl: `/mock-docs/generated_${docId}.pdf`
                };
                MOCK_DOCUMENTS[docIndex] = updatedDoc;
                resolve(updatedDoc);
            }, 1000);
        });
    },
    updateDocument: async (docId, updates)=>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                const docIndex = MOCK_DOCUMENTS.findIndex((d)=>d.id === docId);
                if (docIndex === -1) {
                    reject(new Error("Document not found"));
                    return;
                }
                const updatedDoc = {
                    ...MOCK_DOCUMENTS[docIndex],
                    ...updates
                };
                MOCK_DOCUMENTS[docIndex] = updatedDoc;
                resolve(updatedDoc);
            }, 500);
        });
    },
    deleteDocument: async (docId)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                MOCK_DOCUMENTS = MOCK_DOCUMENTS.filter((d)=>d.id !== docId);
                resolve();
            }, 500);
        });
    },
    generatePDF: async (// eslint-disable-next-line @typescript-eslint/no-unused-vars
    templateId, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    studentData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    teacherData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    projectData)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(`/mock-docs/generated_pdf_${Date.now()}.pdf`);
            }, 1500);
        });
    },
    // Helper methods to get mock data for UI
    getMockStudents: ()=>MOCK_STUDENTS,
    getMockTeachers: ()=>MOCK_TEACHERS,
    getMockProjects: ()=>MOCK_PROJECTS
};
}),
"[project]/components/academic-documents/DocumentTable.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DocumentTable",
    ()=>DocumentTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DocumentTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DocumentTable() from the server but DocumentTable is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/academic-documents/DocumentTable.tsx <module evaluation>", "DocumentTable");
}),
"[project]/components/academic-documents/DocumentTable.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DocumentTable",
    ()=>DocumentTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DocumentTable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DocumentTable() from the server but DocumentTable is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/academic-documents/DocumentTable.tsx", "DocumentTable");
}),
"[project]/components/academic-documents/DocumentTable.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/academic-documents/DocumentTable.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/academic-documents/DocumentTable.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/academic-documents/DocumentFilters.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DocumentFilters",
    ()=>DocumentFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DocumentFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DocumentFilters() from the server but DocumentFilters is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/academic-documents/DocumentFilters.tsx <module evaluation>", "DocumentFilters");
}),
"[project]/components/academic-documents/DocumentFilters.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DocumentFilters",
    ()=>DocumentFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DocumentFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DocumentFilters() from the server but DocumentFilters is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/academic-documents/DocumentFilters.tsx", "DocumentFilters");
}),
"[project]/components/academic-documents/DocumentFilters.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/academic-documents/DocumentFilters.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/academic-documents/DocumentFilters.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/academic-documents/DocumentPreviewModal.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DocumentPreviewModal",
    ()=>DocumentPreviewModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DocumentPreviewModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DocumentPreviewModal() from the server but DocumentPreviewModal is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/academic-documents/DocumentPreviewModal.tsx <module evaluation>", "DocumentPreviewModal");
}),
"[project]/components/academic-documents/DocumentPreviewModal.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "DocumentPreviewModal",
    ()=>DocumentPreviewModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const DocumentPreviewModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call DocumentPreviewModal() from the server but DocumentPreviewModal is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/academic-documents/DocumentPreviewModal.tsx", "DocumentPreviewModal");
}),
"[project]/components/academic-documents/DocumentPreviewModal.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentPreviewModal$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/academic-documents/DocumentPreviewModal.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentPreviewModal$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/academic-documents/DocumentPreviewModal.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentPreviewModal$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/ui/use-toast.ts [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const reducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call reducer() from the server but reducer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/ui/use-toast.ts <module evaluation>", "reducer");
const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call toast() from the server but toast is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/ui/use-toast.ts <module evaluation>", "toast");
const useToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useToast() from the server but useToast is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/ui/use-toast.ts <module evaluation>", "useToast");
}),
"[project]/components/ui/use-toast.ts [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const reducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call reducer() from the server but reducer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/ui/use-toast.ts", "reducer");
const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call toast() from the server but toast is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/ui/use-toast.ts", "toast");
const useToast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call useToast() from the server but useToast is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/ui/use-toast.ts", "useToast");
}),
"[project]/components/ui/use-toast.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/ui/use-toast.ts [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/ui/use-toast.ts [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/teacher/students/[id]/documents/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeacherStudentDocumentsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../../components/academic/DocumentTable'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_academic_documents$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/service_academic_documents.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/academic-documents/DocumentTable.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/academic-documents/DocumentFilters.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentPreviewModal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/academic-documents/DocumentPreviewModal.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/use-toast.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
function TeacherStudentDocumentsPage({ params }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-4",
                children: "Student Documents"
            }, void 0, false, {
                fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentTable"], {
                studentId: params.id
            }, void 0, false, {
                fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
"use client";
;
;
;
;
;
;
;
function TeacherStudentDocumentsPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useParams"])();
    const studentId = params.id;
    const [documents, setDocuments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredDocuments, setFilteredDocuments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("");
    const [typeFilter, setTypeFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("all");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])("all");
    const [isPreviewOpen, setIsPreviewOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedDocument, setSelectedDocument] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useToast"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (studentId) {
            loadDocuments();
        }
    }, [
        studentId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        filterDocuments();
    }, [
        documents,
        searchQuery,
        typeFilter,
        statusFilter
    ]);
    const loadDocuments = async ()=>{
        setLoading(true);
        try {
            const docs = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_academic_documents$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AcademicDocumentsService"].getDocumentsForStudent(studentId);
            setDocuments(docs);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load documents.",
                variant: "destructive"
            });
        } finally{
            setLoading(false);
        }
    };
    const filterDocuments = ()=>{
        let filtered = [
            ...documents
        ];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((doc)=>doc.type.toLowerCase().includes(query));
        }
        if (typeFilter !== "all") {
            filtered = filtered.filter((doc)=>doc.type === typeFilter);
        }
        if (statusFilter !== "all") {
            filtered = filtered.filter((doc)=>doc.status === statusFilter);
        }
        setFilteredDocuments(filtered);
    };
    const handlePreview = (doc)=>{
        setSelectedDocument(doc);
        setIsPreviewOpen(true);
    };
    const handleDownload = (doc)=>{
        if (doc.fileUrl) {
            window.open(doc.fileUrl, "_blank");
        } else {
            toast({
                title: "Error",
                description: "File not available.",
                variant: "destructive"
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto py-8 space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold tracking-tight",
                            children: "Student Documents"
                        }, void 0, false, {
                            fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground",
                            children: [
                                "View official documents for student ID: ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono",
                                    children: studentId
                                }, void 0, false, {
                                    fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 53
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentFilters$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentFilters"], {
                onSearchChange: setSearchQuery,
                onTypeChange: setTypeFilter,
                onStatusChange: setStatusFilter,
                showStudentFilter: false
            }, void 0, false, {
                fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-8",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentTable"], {
                documents: filteredDocuments,
                role: "teacher",
                onPreview: handlePreview,
                onDownload: handleDownload
            }, void 0, false, {
                fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$academic$2d$documents$2f$DocumentPreviewModal$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DocumentPreviewModal"], {
                open: isPreviewOpen,
                onOpenChange: setIsPreviewOpen,
                document: selectedDocument
            }, void 0, false, {
                fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/teacher/students/[id]/documents/page.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/teacher/students/[id]/documents/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/teacher/students/[id]/documents/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e5145d61._.js.map