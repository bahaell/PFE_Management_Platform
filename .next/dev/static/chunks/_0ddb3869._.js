(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/components/academic/TemplateTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TemplateTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/service_templates.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function TemplateTable() {
    _s();
    const [templates, setTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TemplateTable.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTemplates"])().then(setTemplates);
        }
    }["TemplateTable.useEffect"], []);
    async function handleDelete(id) {
        if (!confirm('Delete this template?')) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteTemplate"])(id);
        setTemplates((t)=>t.filter((x)=>x.id !== id));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-md shadow-sm p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-lg font-medium",
                        children: "Templates"
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateTable.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/coordinator/templates/new",
                        className: "rounded bg-blue-600 text-white px-3 py-1",
                        children: "New template"
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateTable.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/academic/TemplateTable.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "text-left text-xs text-gray-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/components/academic/TemplateTable.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Type"
                                }, void 0, false, {
                                    fileName: "[project]/components/academic/TemplateTable.tsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Updated"
                                }, void 0, false, {
                                    fileName: "[project]/components/academic/TemplateTable.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {}, void 0, false, {
                                    fileName: "[project]/components/academic/TemplateTable.tsx",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/academic/TemplateTable.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateTable.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: templates.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-t",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "py-2",
                                        children: t.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/academic/TemplateTable.tsx",
                                        lineNumber: 39,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: t.type
                                    }, void 0, false, {
                                        fileName: "[project]/components/academic/TemplateTable.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: new Date(t.updatedAt).toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/components/academic/TemplateTable.tsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/coordinator/templates/${t.id}`,
                                                    className: "text-blue-600",
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/academic/TemplateTable.tsx",
                                                    lineNumber: 44,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    title: "Delete",
                                                    onClick: ()=>handleDelete(t.id),
                                                    className: "text-red-600 flex items-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash$3e$__["Trash"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/academic/TemplateTable.tsx",
                                                        lineNumber: 45,
                                                        columnNumber: 120
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/academic/TemplateTable.tsx",
                                                    lineNumber: 45,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/academic/TemplateTable.tsx",
                                            lineNumber: 43,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/academic/TemplateTable.tsx",
                                        lineNumber: 42,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, t.id, true, {
                                fileName: "[project]/components/academic/TemplateTable.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateTable.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/academic/TemplateTable.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/academic/TemplateTable.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(TemplateTable, "xczZp0Cblt4PmqBqUNwM93YImqE=");
_c = TemplateTable;
var _c;
__turbopack_context__.k.register(_c, "TemplateTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Trash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Trash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Trash", [
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
            key: "4alrt4"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
            key: "v07s0e"
        }
    ]
]);
;
 //# sourceMappingURL=trash.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript) <export default as Trash>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trash",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_0ddb3869._.js.map