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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$placeholder$2d$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/placeholder-engine.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
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
;
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
    const outDir = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].join(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd(), 'public', 'mock-docs');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {
        recursive: true
    });
    const filename = `generated-${templateId}-${Date.now()}.html`;
    const filePath = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].join(outDir, filename);
    fs.writeFileSync(filePath, `<!doctype html><meta charset="utf-8"><title>${tpl.name}</title><body>${html}</body>`);
    const fileUrl = `/mock-docs/${filename}`;
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
"[project]/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function() {
    "use strict";
    var e = {
        114: function(e) {
            function assertPath(e) {
                if (typeof e !== "string") {
                    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
                }
            }
            function normalizeStringPosix(e, r) {
                var t = "";
                var i = 0;
                var n = -1;
                var a = 0;
                var f;
                for(var l = 0; l <= e.length; ++l){
                    if (l < e.length) f = e.charCodeAt(l);
                    else if (f === 47) break;
                    else f = 47;
                    if (f === 47) {
                        if (n === l - 1 || a === 1) {} else if (n !== l - 1 && a === 2) {
                            if (t.length < 2 || i !== 2 || t.charCodeAt(t.length - 1) !== 46 || t.charCodeAt(t.length - 2) !== 46) {
                                if (t.length > 2) {
                                    var s = t.lastIndexOf("/");
                                    if (s !== t.length - 1) {
                                        if (s === -1) {
                                            t = "";
                                            i = 0;
                                        } else {
                                            t = t.slice(0, s);
                                            i = t.length - 1 - t.lastIndexOf("/");
                                        }
                                        n = l;
                                        a = 0;
                                        continue;
                                    }
                                } else if (t.length === 2 || t.length === 1) {
                                    t = "";
                                    i = 0;
                                    n = l;
                                    a = 0;
                                    continue;
                                }
                            }
                            if (r) {
                                if (t.length > 0) t += "/..";
                                else t = "..";
                                i = 2;
                            }
                        } else {
                            if (t.length > 0) t += "/" + e.slice(n + 1, l);
                            else t = e.slice(n + 1, l);
                            i = l - n - 1;
                        }
                        n = l;
                        a = 0;
                    } else if (f === 46 && a !== -1) {
                        ++a;
                    } else {
                        a = -1;
                    }
                }
                return t;
            }
            function _format(e, r) {
                var t = r.dir || r.root;
                var i = r.base || (r.name || "") + (r.ext || "");
                if (!t) {
                    return i;
                }
                if (t === r.root) {
                    return t + i;
                }
                return t + e + i;
            }
            var r = {
                resolve: function resolve() {
                    var e = "";
                    var r = false;
                    var t;
                    for(var i = arguments.length - 1; i >= -1 && !r; i--){
                        var n;
                        if (i >= 0) n = arguments[i];
                        else {
                            if (t === undefined) t = "";
                            n = t;
                        }
                        assertPath(n);
                        if (n.length === 0) {
                            continue;
                        }
                        e = n + "/" + e;
                        r = n.charCodeAt(0) === 47;
                    }
                    e = normalizeStringPosix(e, !r);
                    if (r) {
                        if (e.length > 0) return "/" + e;
                        else return "/";
                    } else if (e.length > 0) {
                        return e;
                    } else {
                        return ".";
                    }
                },
                normalize: function normalize(e) {
                    assertPath(e);
                    if (e.length === 0) return ".";
                    var r = e.charCodeAt(0) === 47;
                    var t = e.charCodeAt(e.length - 1) === 47;
                    e = normalizeStringPosix(e, !r);
                    if (e.length === 0 && !r) e = ".";
                    if (e.length > 0 && t) e += "/";
                    if (r) return "/" + e;
                    return e;
                },
                isAbsolute: function isAbsolute(e) {
                    assertPath(e);
                    return e.length > 0 && e.charCodeAt(0) === 47;
                },
                join: function join() {
                    if (arguments.length === 0) return ".";
                    var e;
                    for(var t = 0; t < arguments.length; ++t){
                        var i = arguments[t];
                        assertPath(i);
                        if (i.length > 0) {
                            if (e === undefined) e = i;
                            else e += "/" + i;
                        }
                    }
                    if (e === undefined) return ".";
                    return r.normalize(e);
                },
                relative: function relative(e, t) {
                    assertPath(e);
                    assertPath(t);
                    if (e === t) return "";
                    e = r.resolve(e);
                    t = r.resolve(t);
                    if (e === t) return "";
                    var i = 1;
                    for(; i < e.length; ++i){
                        if (e.charCodeAt(i) !== 47) break;
                    }
                    var n = e.length;
                    var a = n - i;
                    var f = 1;
                    for(; f < t.length; ++f){
                        if (t.charCodeAt(f) !== 47) break;
                    }
                    var l = t.length;
                    var s = l - f;
                    var o = a < s ? a : s;
                    var u = -1;
                    var h = 0;
                    for(; h <= o; ++h){
                        if (h === o) {
                            if (s > o) {
                                if (t.charCodeAt(f + h) === 47) {
                                    return t.slice(f + h + 1);
                                } else if (h === 0) {
                                    return t.slice(f + h);
                                }
                            } else if (a > o) {
                                if (e.charCodeAt(i + h) === 47) {
                                    u = h;
                                } else if (h === 0) {
                                    u = 0;
                                }
                            }
                            break;
                        }
                        var c = e.charCodeAt(i + h);
                        var v = t.charCodeAt(f + h);
                        if (c !== v) break;
                        else if (c === 47) u = h;
                    }
                    var g = "";
                    for(h = i + u + 1; h <= n; ++h){
                        if (h === n || e.charCodeAt(h) === 47) {
                            if (g.length === 0) g += "..";
                            else g += "/..";
                        }
                    }
                    if (g.length > 0) return g + t.slice(f + u);
                    else {
                        f += u;
                        if (t.charCodeAt(f) === 47) ++f;
                        return t.slice(f);
                    }
                },
                _makeLong: function _makeLong(e) {
                    return e;
                },
                dirname: function dirname(e) {
                    assertPath(e);
                    if (e.length === 0) return ".";
                    var r = e.charCodeAt(0);
                    var t = r === 47;
                    var i = -1;
                    var n = true;
                    for(var a = e.length - 1; a >= 1; --a){
                        r = e.charCodeAt(a);
                        if (r === 47) {
                            if (!n) {
                                i = a;
                                break;
                            }
                        } else {
                            n = false;
                        }
                    }
                    if (i === -1) return t ? "/" : ".";
                    if (t && i === 1) return "//";
                    return e.slice(0, i);
                },
                basename: function basename(e, r) {
                    if (r !== undefined && typeof r !== "string") throw new TypeError('"ext" argument must be a string');
                    assertPath(e);
                    var t = 0;
                    var i = -1;
                    var n = true;
                    var a;
                    if (r !== undefined && r.length > 0 && r.length <= e.length) {
                        if (r.length === e.length && r === e) return "";
                        var f = r.length - 1;
                        var l = -1;
                        for(a = e.length - 1; a >= 0; --a){
                            var s = e.charCodeAt(a);
                            if (s === 47) {
                                if (!n) {
                                    t = a + 1;
                                    break;
                                }
                            } else {
                                if (l === -1) {
                                    n = false;
                                    l = a + 1;
                                }
                                if (f >= 0) {
                                    if (s === r.charCodeAt(f)) {
                                        if (--f === -1) {
                                            i = a;
                                        }
                                    } else {
                                        f = -1;
                                        i = l;
                                    }
                                }
                            }
                        }
                        if (t === i) i = l;
                        else if (i === -1) i = e.length;
                        return e.slice(t, i);
                    } else {
                        for(a = e.length - 1; a >= 0; --a){
                            if (e.charCodeAt(a) === 47) {
                                if (!n) {
                                    t = a + 1;
                                    break;
                                }
                            } else if (i === -1) {
                                n = false;
                                i = a + 1;
                            }
                        }
                        if (i === -1) return "";
                        return e.slice(t, i);
                    }
                },
                extname: function extname(e) {
                    assertPath(e);
                    var r = -1;
                    var t = 0;
                    var i = -1;
                    var n = true;
                    var a = 0;
                    for(var f = e.length - 1; f >= 0; --f){
                        var l = e.charCodeAt(f);
                        if (l === 47) {
                            if (!n) {
                                t = f + 1;
                                break;
                            }
                            continue;
                        }
                        if (i === -1) {
                            n = false;
                            i = f + 1;
                        }
                        if (l === 46) {
                            if (r === -1) r = f;
                            else if (a !== 1) a = 1;
                        } else if (r !== -1) {
                            a = -1;
                        }
                    }
                    if (r === -1 || i === -1 || a === 0 || a === 1 && r === i - 1 && r === t + 1) {
                        return "";
                    }
                    return e.slice(r, i);
                },
                format: function format(e) {
                    if (e === null || typeof e !== "object") {
                        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
                    }
                    return _format("/", e);
                },
                parse: function parse(e) {
                    assertPath(e);
                    var r = {
                        root: "",
                        dir: "",
                        base: "",
                        ext: "",
                        name: ""
                    };
                    if (e.length === 0) return r;
                    var t = e.charCodeAt(0);
                    var i = t === 47;
                    var n;
                    if (i) {
                        r.root = "/";
                        n = 1;
                    } else {
                        n = 0;
                    }
                    var a = -1;
                    var f = 0;
                    var l = -1;
                    var s = true;
                    var o = e.length - 1;
                    var u = 0;
                    for(; o >= n; --o){
                        t = e.charCodeAt(o);
                        if (t === 47) {
                            if (!s) {
                                f = o + 1;
                                break;
                            }
                            continue;
                        }
                        if (l === -1) {
                            s = false;
                            l = o + 1;
                        }
                        if (t === 46) {
                            if (a === -1) a = o;
                            else if (u !== 1) u = 1;
                        } else if (a !== -1) {
                            u = -1;
                        }
                    }
                    if (a === -1 || l === -1 || u === 0 || u === 1 && a === l - 1 && a === f + 1) {
                        if (l !== -1) {
                            if (f === 0 && i) r.base = r.name = e.slice(1, l);
                            else r.base = r.name = e.slice(f, l);
                        }
                    } else {
                        if (f === 0 && i) {
                            r.name = e.slice(1, a);
                            r.base = e.slice(1, l);
                        } else {
                            r.name = e.slice(f, a);
                            r.base = e.slice(f, l);
                        }
                        r.ext = e.slice(a, l);
                    }
                    if (f > 0) r.dir = e.slice(0, f - 1);
                    else if (i) r.dir = "/";
                    return r;
                },
                sep: "/",
                delimiter: ":",
                win32: null,
                posix: null
            };
            r.posix = r;
            e.exports = r;
        }
    };
    var r = {};
    function __nccwpck_require__(t) {
        var i = r[t];
        if (i !== undefined) {
            return i.exports;
        }
        var n = r[t] = {
            exports: {}
        };
        var a = true;
        try {
            e[t](n, n.exports, __nccwpck_require__);
            a = false;
        } finally{
            if (a) delete r[t];
        }
        return n.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/node_modules/next/dist/compiled/path-browserify") + "/";
    var t = __nccwpck_require__(114);
    module.exports = t;
})();
}),
]);

//# sourceMappingURL=_ec089819._.js.map