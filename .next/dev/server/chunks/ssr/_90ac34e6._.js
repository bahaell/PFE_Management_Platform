module.exports = [
"[project]/lib/placeholder-engine.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/services/service_templates.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$placeholder$2d$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/placeholder-engine.ts [app-ssr] (ecmascript)");
// For mock generation in the browser environment we return a static sample HTML file
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_academic_documents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/service_academic_documents.ts [app-ssr] (ecmascript)");
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
    const html = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$placeholder$2d$engine$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(rawContent, context, {
        missingPlaceholder: ''
    });
    // NOTE: writing files using `fs` is not available in the browser/client bundle.
    // For this mock implementation we return a static sample HTML which lives in `public/mock-docs/sample.html`.
    // In production replace this with a server-side PDF generator (Puppeteer) that persists the generated PDF and returns its URL.
    const filename = 'sample.html';
    const fileUrl = `/mock-docs/${filename}?t=${Date.now()}`;
    // create an AdministrativeDocument record in the mock documents service
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_academic_documents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDocument"])({
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
}),
"[project]/components/academic/TemplateEditor.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TemplateEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_templates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/service_templates.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function TemplateEditor({ id }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [template, setTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!id) return;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_templates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTemplate"])(id).then((t)=>setTemplate(t ?? {}));
    }, [
        id
    ]);
    async function handleSave() {
        if (id) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_templates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["updateTemplate"])(id, template);
        } else {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_templates$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createTemplate"])(template);
        }
        router.push('/coordinator/templates');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white p-4 rounded shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium",
                        children: "Name"
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateEditor.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: template.name ?? '',
                        onChange: (e)=>setTemplate({
                                ...template,
                                name: e.target.value
                            }),
                        className: "w-full border px-2 py-1 rounded"
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateEditor.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/academic/TemplateEditor.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium",
                        children: "Type"
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateEditor.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: template.type ?? '',
                        onChange: (e)=>setTemplate({
                                ...template,
                                type: e.target.value
                            }),
                        className: "w-full border px-2 py-1 rounded"
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateEditor.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/academic/TemplateEditor.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm font-medium",
                        children: [
                            "Content (use placeholders like ",
                            '{{student.name}}',
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/academic/TemplateEditor.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: template.content ?? '',
                        onChange: (e)=>setTemplate({
                                ...template,
                                content: e.target.value
                            }),
                        className: "w-full border px-2 py-1 rounded h-40"
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateEditor.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/academic/TemplateEditor.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        className: "bg-blue-600 text-white px-3 py-1 rounded",
                        children: "Save"
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateEditor.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        className: "px-3 py-1 border rounded",
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/components/academic/TemplateEditor.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/academic/TemplateEditor.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/academic/TemplateEditor.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_90ac34e6._.js.map