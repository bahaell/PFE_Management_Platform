(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/services/service_document_requests.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lightweight id generator
__turbopack_context__.s([
    "approveRequest",
    ()=>approveRequest,
    "createRequest",
    ()=>createRequest,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getRequests",
    ()=>getRequests,
    "rejectRequest",
    ()=>rejectRequest
]);
function makeId(prefix = '') {
    return prefix + Math.random().toString(36).slice(2, 9);
}
const requests = [
    {
        id: 'req-1',
        studentId: 'student-1',
        type: 'convention',
        status: 'pending',
        createdAt: new Date().toISOString()
    }
];
async function getRequests(filter) {
    if (!filter) return [
        ...requests
    ];
    // simple filter implementation
    return requests.filter((r)=>{
        for (const k of Object.keys(filter)){
            // @ts-ignore
            if (r[k] !== filter[k]) return false;
        }
        return true;
    });
}
async function createRequest(input) {
    const r = {
        id: input.id ?? makeId('req-'),
        studentId: input.studentId ?? 'unknown',
        type: input.type ?? 'autre',
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    requests.unshift(r);
    return r;
}
async function approveRequest(id, approverId) {
    const idx = requests.findIndex((r)=>r.id === id);
    if (idx === -1) return null;
    requests[idx].status = 'approved';
    requests[idx].processedAt = new Date().toISOString();
    requests[idx].processedBy = approverId;
    return requests[idx];
}
async function rejectRequest(id, approverId, reason) {
    const idx = requests.findIndex((r)=>r.id === id);
    if (idx === -1) return null;
    requests[idx].status = 'rejected';
    requests[idx].processedAt = new Date().toISOString();
    requests[idx].processedBy = approverId;
    requests[idx].reason = reason;
    return requests[idx];
}
const __TURBOPACK__default__export__ = {
    getRequests,
    createRequest,
    approveRequest,
    rejectRequest
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/placeholder-engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Simple placeholder engine
// Replaces tokens like {{student.name}} by reading values from context
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "renderTemplate",
    ()=>renderTemplate
]);
function getByPath(obj, path) {
    if (!obj) return undefined;
    const parts = path.split('.');
    let cur = obj;
    for (const p of parts){
        if (cur == null) return undefined;
        cur = cur[p];
    }
    return cur;
}
function renderTemplate(content, context, opts) {
    const missing = opts?.missingPlaceholder ?? '';
    if (!content) return '';
    // Replace placeholders of form {{ path.to.value }}
    return content.replace(/\{\{\s*([a-zA-Z0-9_.$]+)\s*\}\}/g, (_, path)=>{
        try {
            const value = getByPath(context, path);
            if (value === undefined || value === null) return missing;
            if (Array.isArray(value)) return value.join(', ');
            if (value instanceof Date) return value.toLocaleString();
            return String(value);
        } catch (e) {
            return missing;
        }
    });
}
const __TURBOPACK__default__export__ = renderTemplate;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/service_templates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lightweight id generator to avoid adding uuid as a dependency
__turbopack_context__.s([
    "createTemplate",
    ()=>createTemplate,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteTemplate",
    ()=>deleteTemplate,
    "generateDocumentFromTemplate",
    ()=>generateDocumentFromTemplate,
    "getTemplate",
    ()=>getTemplate,
    "getTemplates",
    ()=>getTemplates,
    "updateTemplate",
    ()=>updateTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$placeholder$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/placeholder-engine.ts [app-client] (ecmascript)");
// For mock generation in the browser environment we return a static sample HTML file
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_academic_documents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/service_academic_documents.ts [app-client] (ecmascript)");
function makeId(prefix = '') {
    return prefix + Math.random().toString(36).slice(2, 9);
}
;
// In-memory mock templates store
const templates = [
    {
        id: 'tpl-convention-1',
        name: 'Convention de stage (exemple)',
        type: 'convention',
        description: 'Template de convention de stage - exemple',
        fields: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'system',
        version: 1
    }
];
async function getTemplates() {
    // return shallow copy
    return [
        ...templates
    ];
}
async function getTemplate(id) {
    return templates.find((t)=>t.id === id) ?? null;
}
async function createTemplate(input) {
    const t = {
        id: input.id ?? makeId('tpl-'),
        name: input.name ?? 'Untitled template',
        type: input.type ?? 'autre',
        description: input.description ?? '',
        fields: input.fields ?? [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: input.createdBy ?? 'coordinator',
        version: input.version ?? 1
    };
    templates.unshift(t);
    return t;
}
async function updateTemplate(id, updates) {
    const idx = templates.findIndex((t)=>t.id === id);
    if (idx === -1) return null;
    const existing = templates[idx];
    const updated = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
        version: (existing.version || 1) + 1
    };
    templates[idx] = updated;
    return updated;
}
async function deleteTemplate(id) {
    const idx = templates.findIndex((t)=>t.id === id);
    if (idx === -1) return false;
    templates.splice(idx, 1);
    return true;
}
;
async function generateDocumentFromTemplate(templateId, context) {
    const tpl = templates.find((t)=>t.id === templateId);
    if (!tpl) return null;
    // Build a simple HTML output using available fields or fallback content
    const rawContent = tpl.content ?? `
    <h1>${tpl.name}</h1>
    <p>Document généré pour: {{student.name}}</p>
    <p>Projet: {{project.title}}</p>
  `;
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$placeholder$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(rawContent, context, {
        missingPlaceholder: ''
    });
    // NOTE: writing files using `fs` is not available in the browser/client bundle.
    // For this mock implementation we return a static sample HTML which lives in `public/mock-docs/sample.html`.
    // In production replace this with a server-side PDF generator (Puppeteer) that persists the generated PDF and returns its URL.
    const filename = 'sample.html';
    const fileUrl = `/mock-docs/${filename}?t=${Date.now()}`;
    // create an AdministrativeDocument record in the mock documents service
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_academic_documents$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDocument"])({
            type: tpl.type,
            studentId: context?.student?.id ?? context?.studentId ?? 'unknown',
            teacherId: context?.teacher?.id,
            projectId: context?.project?.id,
            generatedAt: new Date().toISOString(),
            fileUrl,
            templateId: tpl.id,
            requestedBy: context?.requestedBy ?? 'system'
        });
    } catch (e) {
    // ignore in mock
    }
    return {
        fileUrl,
        generatedAt: new Date().toISOString()
    };
}
const __TURBOPACK__default__export__ = {
    getTemplates,
    getTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    generateDocumentFromTemplate
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/academic/RequestTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RequestTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_document_requests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/service_document_requests.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/service_templates.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function RequestTable() {
    _s();
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RequestTable.useEffect": ()=>{
            refresh();
        }
    }["RequestTable.useEffect"], []);
    async function refresh() {
        const rs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_document_requests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRequests"])();
        setRequests(rs);
    }
    async function handleApprove(r) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_document_requests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["approveRequest"])(r.id, 'coordinator-1');
        // Auto-generate using a simple context mock
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateDocumentFromTemplate"])(r.type === 'convention' ? 'tpl-convention-1' : 'tpl-convention-1', {
            student: {
                id: r.studentId,
                name: r.studentId
            },
            project: {
                id: r.studentId,
                title: 'Sample project'
            },
            requestedBy: 'student'
        });
        refresh();
    }
    async function handleReject(r) {
        const reason = prompt('Reason for rejection') ?? undefined;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_document_requests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rejectRequest"])(r.id, 'coordinator-1', reason);
        refresh();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 rounded shadow",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "text-left text-xs text-gray-500",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                children: "Student"
                            }, void 0, false, {
                                fileName: "[project]/components/academic/RequestTable.tsx",
                                lineNumber: 38,
                                columnNumber: 59
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                children: "Type"
                            }, void 0, false, {
                                fileName: "[project]/components/academic/RequestTable.tsx",
                                lineNumber: 38,
                                columnNumber: 75
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                children: "Created"
                            }, void 0, false, {
                                fileName: "[project]/components/academic/RequestTable.tsx",
                                lineNumber: 38,
                                columnNumber: 88
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                children: "Status"
                            }, void 0, false, {
                                fileName: "[project]/components/academic/RequestTable.tsx",
                                lineNumber: 38,
                                columnNumber: 104
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {}, void 0, false, {
                                fileName: "[project]/components/academic/RequestTable.tsx",
                                lineNumber: 38,
                                columnNumber: 119
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/academic/RequestTable.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/academic/RequestTable.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: requests.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-t",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "py-2",
                                    children: r.studentId
                                }, void 0, false, {
                                    fileName: "[project]/components/academic/RequestTable.tsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    children: r.type
                                }, void 0, false, {
                                    fileName: "[project]/components/academic/RequestTable.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    children: new Date(r.createdAt).toLocaleString()
                                }, void 0, false, {
                                    fileName: "[project]/components/academic/RequestTable.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    children: r.status
                                }, void 0, false, {
                                    fileName: "[project]/components/academic/RequestTable.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    children: r.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleApprove(r),
                                                className: "text-green-600",
                                                children: "Approve"
                                            }, void 0, false, {
                                                fileName: "[project]/components/academic/RequestTable.tsx",
                                                lineNumber: 50,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleReject(r),
                                                className: "text-red-600",
                                                children: "Reject"
                                            }, void 0, false, {
                                                fileName: "[project]/components/academic/RequestTable.tsx",
                                                lineNumber: 51,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/academic/RequestTable.tsx",
                                        lineNumber: 49,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/academic/RequestTable.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, r.id, true, {
                            fileName: "[project]/components/academic/RequestTable.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/academic/RequestTable.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/academic/RequestTable.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/academic/RequestTable.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(RequestTable, "MIcAFnHRaJFubpcUtYXSDqOxSqY=");
_c = RequestTable;
var _c;
__turbopack_context__.k.register(_c, "RequestTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_d907d5f3._.js.map