module.exports = [
"[project]/components/page-header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageHeader",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function PageHeader({ title, description, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl sm:text-3xl font-bold text-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/page-header.tsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm sm:text-base text-muted-foreground mt-1",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/components/page-header.tsx",
                        lineNumber: 12,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/page-header.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0",
                children: action
            }, void 0, false, {
                fileName: "[project]/components/page-header.tsx",
                lineNumber: 14,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/page-header.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/services/service_collaboration.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActivityService",
    ()=>ActivityService,
    "CollaborationService",
    ()=>CollaborationService
]);
let projectMockData = {
    project: {
        id: 1,
        title: 'AI in Healthcare',
        subject: 'Artificial Intelligence Applications',
        description: 'Building an intelligent system for early disease detection using machine learning',
        startDate: '2024-01-15',
        deadline: '2024-06-30',
        progress: 65,
        status: 'In Progress'
    },
    teacher: {
        id: 1,
        name: 'Dr. Ahmed Hassan',
        avatar: 'AH',
        role: 'Supervisor',
        email: 'ahmed.hassan@university.edu',
        online: true
    },
    student: {
        id: 2,
        name: 'Ahmed Mohamed',
        avatar: 'AM',
        role: 'Student',
        email: 'ahmed.mohamed@student.edu',
        online: true
    },
    jury: [],
    defense: {
        date: '2024-06-25',
        time: '10:00',
        room: 'Room A - Amphitheater',
        duration: '45 min'
    },
    messages: [
        {
            id: 1,
            author: 'Dr. Ahmed Hassan',
            avatar: 'AH',
            content: 'Great progress on the data preprocessing module. The accuracy improvements look promising.',
            timestamp: '10:30 AM',
            createdAt: new Date(Date.now() - 2 * 3600000)
        },
        {
            id: 2,
            author: 'Ahmed Mohamed',
            avatar: 'AM',
            content: 'Thanks! I implemented the optimization techniques we discussed last meeting. Should I proceed with the model training?',
            timestamp: '10:35 AM',
            createdAt: new Date(Date.now() - 2 * 3600000)
        }
    ],
    tasks: [
        {
            id: 1,
            title: 'Data preprocessing',
            description: 'Clean and normalize dataset',
            priority: 'high',
            assignee: 'Ahmed Mohamed',
            dueDate: '2024-02-08',
            status: 'inProgress',
            completed: false
        },
        {
            id: 2,
            title: 'ML algorithm implementation',
            description: 'Build the core prediction model',
            priority: 'high',
            assignee: 'Ahmed Mohamed',
            dueDate: '2024-02-15',
            status: 'todo',
            completed: false
        }
    ],
    documents: [
        {
            id: 1,
            name: 'Project Proposal v3',
            version: 3,
            uploadedBy: 'Ahmed Mohamed',
            uploadedAt: '3 hours ago',
            size: '1.2 MB',
            type: 'PDF'
        },
        {
            id: 2,
            name: 'Project Proposal v2',
            version: 2,
            uploadedBy: 'Ahmed Mohamed',
            uploadedAt: '2 days ago',
            size: '1.1 MB',
            type: 'PDF'
        }
    ],
    comments: [
        {
            id: 1,
            author: 'Dr. Ahmed Hassan',
            avatar: 'AH',
            content: 'The methodology section needs more clarity on data collection. Can you add more details about the sample size and collection period?',
            timestamp: '2024-02-05',
            replies: [
                {
                    id: 2,
                    author: 'Ahmed Mohamed',
                    avatar: 'AM',
                    content: 'Great point. I will expand the methodology section with comprehensive details on data collection methods and timelines.',
                    timestamp: '2024-02-05',
                    replies: []
                }
            ]
        }
    ],
    activities: [
        {
            id: 1,
            type: 'message',
            author: 'Dr. Ahmed Hassan',
            action: 'Added feedback on methodology section',
            timestamp: '2 hours ago',
            icon: 'MessageSquare'
        },
        {
            id: 2,
            type: 'upload',
            author: 'Ahmed Mohamed',
            action: 'Uploaded new version of Project Proposal',
            timestamp: '3 hours ago',
            icon: 'FileUp'
        }
    ]
};
const CollaborationService = {
    async getProject () {
        return Promise.resolve(projectMockData);
    },
    async updateProject (updates) {
        Object.assign(projectMockData.project, updates);
        return Promise.resolve(projectMockData.project);
    },
    async createMessage (message) {
        const newMessage = {
            ...message,
            id: Math.max(...projectMockData.messages.map((m)=>m.id), 0) + 1
        };
        projectMockData.messages.push(newMessage);
        return Promise.resolve(newMessage);
    },
    async getMessageById (id) {
        return Promise.resolve(projectMockData.messages.find((m)=>m.id === id) || null);
    },
    async getMessages () {
        return Promise.resolve(projectMockData.messages);
    },
    async updateMessage (id, updates) {
        const message = projectMockData.messages.find((m)=>m.id === id);
        if (!message) return Promise.resolve(null);
        Object.assign(message, updates, {
            id
        });
        return Promise.resolve(message);
    },
    async deleteMessage (id) {
        const initialLength = projectMockData.messages.length;
        projectMockData.messages = projectMockData.messages.filter((m)=>m.id !== id);
        return Promise.resolve(projectMockData.messages.length < initialLength);
    },
    async createTask (task) {
        const newTask = {
            ...task,
            id: Math.max(...projectMockData.tasks.map((t)=>t.id), 0) + 1
        };
        projectMockData.tasks.push(newTask);
        return Promise.resolve(newTask);
    },
    async getTaskById (id) {
        return Promise.resolve(projectMockData.tasks.find((t)=>t.id === id) || null);
    },
    async getTasks () {
        return Promise.resolve(projectMockData.tasks);
    },
    async updateTask (taskId, updates) {
        const task = projectMockData.tasks.find((t)=>t.id === taskId);
        if (!task) return Promise.resolve(null);
        Object.assign(task, updates, {
            id: taskId
        });
        return Promise.resolve(task);
    },
    async deleteTask (taskId) {
        const initialLength = projectMockData.tasks.length;
        projectMockData.tasks = projectMockData.tasks.filter((t)=>t.id !== taskId);
        return Promise.resolve(projectMockData.tasks.length < initialLength);
    },
    async createDocument (doc) {
        const newDoc = {
            ...doc,
            id: Math.max(...projectMockData.documents.map((d)=>d.id), 0) + 1
        };
        projectMockData.documents.push(newDoc);
        return Promise.resolve(newDoc);
    },
    async getDocumentById (id) {
        return Promise.resolve(projectMockData.documents.find((d)=>d.id === id) || null);
    },
    async getDocuments () {
        return Promise.resolve(projectMockData.documents);
    },
    async updateDocument (id, updates) {
        const doc = projectMockData.documents.find((d)=>d.id === id);
        if (!doc) return Promise.resolve(null);
        Object.assign(doc, updates, {
            id
        });
        return Promise.resolve(doc);
    },
    async deleteDocument (id) {
        const initialLength = projectMockData.documents.length;
        projectMockData.documents = projectMockData.documents.filter((d)=>d.id !== id);
        return Promise.resolve(projectMockData.documents.length < initialLength);
    },
    async createComment (comment) {
        const newComment = {
            ...comment,
            id: Math.max(...projectMockData.comments.map((c)=>c.id), 0) + 1,
            replies: []
        };
        projectMockData.comments.push(newComment);
        return Promise.resolve(newComment);
    },
    async getCommentById (id) {
        const findComment = (comments)=>{
            for (const comment of comments){
                if (comment.id === id) return comment;
                const found = findComment(comment.replies);
                if (found) return found;
            }
            return null;
        };
        return Promise.resolve(findComment(projectMockData.comments));
    },
    async getComments () {
        return Promise.resolve(projectMockData.comments);
    },
    async updateComment (id, updates) {
        const findAndUpdate = (comments)=>{
            for (const comment of comments){
                if (comment.id === id) {
                    Object.assign(comment, updates, {
                        id
                    });
                    return comment;
                }
                const result = findAndUpdate(comment.replies);
                if (result) return result;
            }
            return null;
        };
        return Promise.resolve(findAndUpdate(projectMockData.comments));
    },
    async addReply (parentId, reply) {
        const findAndAddReply = (comments)=>{
            for (const comment of comments){
                if (comment.id === parentId) {
                    const newReply = {
                        ...reply,
                        id: Math.max(...projectMockData.comments.map((c)=>c.id), 0) + 1,
                        replies: []
                    };
                    comment.replies.push(newReply);
                    return newReply;
                }
                const result = findAndAddReply(comment.replies);
                if (result) return result;
            }
            return null;
        };
        return Promise.resolve(findAndAddReply(projectMockData.comments));
    },
    async deleteComment (id) {
        const deleteCommentRecursive = (comments)=>{
            for(let i = 0; i < comments.length; i++){
                if (comments[i].id === id) {
                    comments.splice(i, 1);
                    return true;
                }
                if (deleteCommentRecursive(comments[i].replies)) {
                    return true;
                }
            }
            return false;
        };
        return Promise.resolve(deleteCommentRecursive(projectMockData.comments));
    }
};
const ActivityService = {
    async createActivity (activity) {
        const newActivity = {
            ...activity,
            id: Math.max(...projectMockData.activities.map((a)=>a.id), 0) + 1
        };
        projectMockData.activities.push(newActivity);
        return Promise.resolve(newActivity);
    },
    async getActivityById (id) {
        return Promise.resolve(projectMockData.activities.find((a)=>a.id === id) || null);
    },
    async getAllActivities () {
        return Promise.resolve(projectMockData.activities);
    },
    async updateActivity (id, updates) {
        const activity = projectMockData.activities.find((a)=>a.id === id);
        if (!activity) return Promise.resolve(null);
        Object.assign(activity, updates, {
            id
        });
        return Promise.resolve(activity);
    },
    async deleteActivity (id) {
        const initialLength = projectMockData.activities.length;
        projectMockData.activities = projectMockData.activities.filter((a)=>a.id !== id);
        return Promise.resolve(projectMockData.activities.length < initialLength);
    }
};
}),
"[project]/app/student/notifications/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotificationsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-ssr] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_collaboration$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/service_collaboration.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function NotificationsPage() {
    const { data: activities = [], isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'notifications'
        ],
        queryFn: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$service_collaboration$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ActivityService"].getAllActivities()
    });
    const [filterCategory, setFilterCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [deletedIds, setDeletedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const handleDelete = (id)=>{
        setDeletedIds([
            ...deletedIds,
            id
        ]);
    };
    const filteredNotifications = activities.filter((n)=>!deletedIds.includes(n.id)).filter((n)=>filterCategory === 'all' ? true : n.category === filterCategory);
    const getCategoryColor = (category)=>{
        switch(category){
            case 'project':
                return 'text-blue-600 dark:text-blue-400';
            case 'deadline':
                return 'text-red-600 dark:text-red-400';
            case 'system':
                return 'text-purple-600 dark:text-purple-400';
            default:
                return 'text-gray-600';
        }
    };
    const getCategoryLabel = (category)=>{
        switch(category){
            case 'project':
                return 'Project';
            case 'deadline':
                return 'Deadline';
            case 'system':
                return 'System';
            default:
                return 'Other';
        }
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                    title: "Notifications",
                    description: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/app/student/notifications/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "Loading notifications..."
                    }, void 0, false, {
                        fileName: "[project]/app/student/notifications/page.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/student/notifications/page.tsx",
                    lineNumber: 67,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/student/notifications/page.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "Notifications",
                description: "Stay updated with your project notifications"
            }, void 0, false, {
                fileName: "[project]/app/student/notifications/page.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 mb-6 flex-wrap",
                children: [
                    'all',
                    'project',
                    'deadline',
                    'system'
                ].map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: filterCategory === category ? 'default' : 'outline',
                        size: "sm",
                        onClick: ()=>setFilterCategory(category),
                        className: "capitalize",
                        children: category === 'all' ? 'All' : getCategoryLabel(category)
                    }, category, false, {
                        fileName: "[project]/app/student/notifications/page.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/student/notifications/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    filteredNotifications.map((notif)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `bg-card rounded-lg border transition-all p-4 flex gap-4 hover:border-primary/50 cursor-pointer ${notif.read ? 'border-border' : 'border-primary/30 bg-primary/5'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex-shrink-0 mt-0.5 ${getCategoryColor(notif.category)}`,
                                    children: notif.icon
                                }, void 0, false, {
                                    fileName: "[project]/app/student/notifications/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: `font-semibold ${notif.read ? 'text-muted-foreground' : 'text-foreground'}`,
                                                        children: notif.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/student/notifications/page.tsx",
                                                        lineNumber: 109,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-muted-foreground mt-1",
                                                        children: notif.message
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/student/notifications/page.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 mt-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted-foreground",
                                                                children: notif.time
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/student/notifications/page.tsx",
                                                                lineNumber: 114,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-xs font-medium px-2 py-0.5 rounded-full bg-secondary ${getCategoryColor(notif.category)}`,
                                                                children: getCategoryLabel(notif.category)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/student/notifications/page.tsx",
                                                                lineNumber: 115,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/student/notifications/page.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/student/notifications/page.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this),
                                            !notif.read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/student/notifications/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/student/notifications/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/student/notifications/page.tsx",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    size: "sm",
                                    variant: "ghost",
                                    className: "opacity-0 hover:opacity-100 transition-opacity",
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        handleDelete(notif.id);
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/app/student/notifications/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/student/notifications/page.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, notif.id, true, {
                            fileName: "[project]/app/student/notifications/page.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)),
                    filteredNotifications.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12 bg-card rounded-lg border border-border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                className: "w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/app/student/notifications/page.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "No notifications in this category"
                            }, void 0, false, {
                                fileName: "[project]/app/student/notifications/page.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/student/notifications/page.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/student/notifications/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/student/notifications/page.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_f9505ce1._.js.map