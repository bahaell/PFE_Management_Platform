(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/scheduler-mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mock data for the Intelligent Auto-Scheduler with Complete Jury Management
__turbopack_context__.s([
    "MOCK_PENDING_REQUESTS",
    ()=>MOCK_PENDING_REQUESTS,
    "MOCK_PROJECTS",
    ()=>MOCK_PROJECTS,
    "MOCK_ROOMS",
    ()=>MOCK_ROOMS,
    "MOCK_SCHEDULED_DEFENSES",
    ()=>MOCK_SCHEDULED_DEFENSES,
    "MOCK_STATISTICS",
    ()=>MOCK_STATISTICS,
    "MOCK_TEACHERS",
    ()=>MOCK_TEACHERS,
    "generateRecommendedSlots",
    ()=>generateRecommendedSlots,
    "getJuryRoleBadgeColor",
    ()=>getJuryRoleBadgeColor,
    "getJuryRoleLabel",
    ()=>getJuryRoleLabel
]);
const MOCK_ROOMS = [
    {
        id: 'room-a',
        name: 'Room A - Amphitheater',
        capacity: 50,
        availability: [
            {
                start: '09:00',
                end: '12:00'
            },
            {
                start: '14:00',
                end: '17:00'
            }
        ],
        color: 'bg-blue-100 border-blue-300 text-blue-900'
    },
    {
        id: 'room-b',
        name: 'Room B - Conference Hall',
        capacity: 40,
        availability: [
            {
                start: '10:00',
                end: '13:00'
            },
            {
                start: '15:00',
                end: '18:00'
            }
        ],
        color: 'bg-purple-100 border-purple-300 text-purple-900'
    },
    {
        id: 'room-c',
        name: 'Room C - Seminar Room',
        capacity: 30,
        availability: [
            {
                start: '08:00',
                end: '12:00'
            },
            {
                start: '13:00',
                end: '17:00'
            }
        ],
        color: 'bg-green-100 border-green-300 text-green-900'
    }
];
const MOCK_TEACHERS = [
    {
        id: 'dr-sami',
        name: 'Dr. Sami Ahmed',
        title: 'Professor',
        grade: 'Professor',
        speciality: 'Artificial Intelligence',
        skills: [
            'Machine Learning',
            'Deep Learning',
            'Computer Vision',
            'NLP'
        ],
        availableSlots: [
            {
                start: '09:00',
                end: '12:00'
            },
            {
                start: '14:00',
                end: '16:00'
            }
        ],
        currentLoad: 3,
        email: 'sami.ahmed@university.edu',
        department: 'CS',
        bio: '',
        researchInterests: '',
        yearsOfExperience: 10,
        phone: '12345678',
        gender: 'male',
        birthdate: '1980-01-01',
        avatar: '',
        role: 'teacher'
    },
    {
        id: 'dr-hatem',
        name: 'Dr. Hatem Hassan',
        title: 'Associate Professor',
        grade: 'Associate Professor',
        speciality: 'Data Science',
        skills: [
            'Data Mining',
            'Big Data',
            'Machine Learning',
            'Statistics'
        ],
        availableSlots: [
            {
                start: '10:00',
                end: '13:00'
            },
            {
                start: '15:00',
                end: '17:00'
            }
        ],
        currentLoad: 2,
        email: 'hatem.hassan@university.edu',
        department: 'CS',
        bio: '',
        researchInterests: '',
        yearsOfExperience: 8,
        phone: '12345678',
        gender: 'male',
        birthdate: '1982-01-01',
        avatar: '',
        role: 'teacher'
    },
    {
        id: 'dr-mariem',
        name: 'Dr. Mariem Ben Ali',
        title: 'Maitre Assistant',
        grade: 'Maitre Assistant',
        speciality: 'Software Engineering',
        skills: [
            'Web Development',
            'Mobile Apps',
            'Software Architecture',
            'DevOps'
        ],
        availableSlots: [
            {
                start: '08:00',
                end: '11:00'
            },
            {
                start: '14:00',
                end: '18:00'
            }
        ],
        currentLoad: 4,
        email: 'mariem.benali@university.edu',
        department: 'SE',
        bio: '',
        researchInterests: '',
        yearsOfExperience: 5,
        phone: '12345678',
        gender: 'female',
        birthdate: '1985-01-01',
        avatar: '',
        role: 'teacher'
    },
    {
        id: 'prof-ali',
        name: 'Prof. Ali Mohamed',
        title: 'Dean',
        grade: 'Dean',
        speciality: 'Computer Networks',
        skills: [
            'Network Security',
            'IoT',
            'Cloud Computing',
            'Distributed Systems'
        ],
        availableSlots: [
            {
                start: '09:00',
                end: '10:30'
            },
            {
                start: '14:00',
                end: '15:30'
            }
        ],
        currentLoad: 1,
        email: 'ali.mohamed@university.edu',
        department: 'Networks',
        bio: '',
        researchInterests: '',
        yearsOfExperience: 20,
        phone: '12345678',
        gender: 'male',
        birthdate: '1970-01-01',
        avatar: '',
        role: 'teacher'
    },
    {
        id: 'dr-ahmed',
        name: 'Dr. Ahmed Mansour',
        title: 'Assistant Professor',
        grade: 'Assistant',
        speciality: 'Cybersecurity',
        skills: [
            'Network Security',
            'Cryptography',
            'Ethical Hacking',
            'Blockchain'
        ],
        availableSlots: [
            {
                start: '09:00',
                end: '12:00'
            },
            {
                start: '13:00',
                end: '16:00'
            }
        ],
        currentLoad: 2,
        email: 'ahmed.mansour@university.edu',
        department: 'Security',
        bio: '',
        researchInterests: '',
        yearsOfExperience: 3,
        phone: '12345678',
        gender: 'male',
        birthdate: '1990-01-01',
        avatar: '',
        role: 'teacher'
    },
    {
        id: 'dr-fatima',
        name: 'Dr. Fatima Zahra',
        title: 'Associate Professor',
        grade: 'Associate Professor',
        speciality: 'Human-Computer Interaction',
        skills: [
            'UX Design',
            'UI Development',
            'Usability Testing',
            'Accessibility'
        ],
        availableSlots: [
            {
                start: '10:00',
                end: '13:00'
            },
            {
                start: '15:00',
                end: '17:00'
            }
        ],
        currentLoad: 3,
        email: 'fatima.zahra@university.edu',
        department: 'HCI',
        bio: '',
        researchInterests: '',
        yearsOfExperience: 7,
        phone: '12345678',
        gender: 'female',
        birthdate: '1983-01-01',
        avatar: '',
        role: 'teacher'
    }
];
const MOCK_PROJECTS = [
    {
        id: 'proj-1',
        studentName: 'Ahmed Youssef',
        subject: 'AI Traffic System Optimization',
        assignedTeacher: MOCK_TEACHERS[0],
        skills: [
            'Machine Learning',
            'Computer Vision',
            'Deep Learning'
        ],
        status: 'pending'
    },
    {
        id: 'proj-2',
        studentName: 'Mariem Khaled',
        subject: 'Blockchain Voting Platform',
        assignedTeacher: MOCK_TEACHERS[4],
        skills: [
            'Blockchain',
            'Cryptography',
            'Web Development'
        ],
        status: 'pending'
    },
    {
        id: 'proj-3',
        studentName: 'Omar Hassan',
        subject: 'IoT Healthcare Monitoring',
        assignedTeacher: MOCK_TEACHERS[3],
        skills: [
            'IoT',
            'Cloud Computing',
            'Mobile Apps'
        ],
        status: 'pending'
    },
    {
        id: 'proj-4',
        studentName: 'Noor Mohamed',
        subject: 'E-Commerce Platform with AI Recommendations',
        assignedTeacher: MOCK_TEACHERS[2],
        skills: [
            'Web Development',
            'Machine Learning',
            'Software Architecture'
        ],
        status: 'pending'
    }
];
const generateRecommendedSlots = (project)=>{
    if (!project) {
        return [];
    }
    const encadrant = project.assignedTeacher;
    // Find best président (highest grade, available, not encadrant)
    const presidentCandidates = MOCK_TEACHERS.filter((t)=>t.id !== encadrant.id && (t.grade === 'Professor' || t.grade === 'Associate Professor' || t.grade === 'Dean')).sort((a, b)=>{
        const gradeOrder = {
            'Dean': 4,
            'Professor': 3,
            'Associate Professor': 2,
            'Maitre Assistant': 1,
            'Assistant': 0
        };
        return (gradeOrder[b.grade] || 0) - (gradeOrder[a.grade] || 0);
    });
    // Find best rapporteur (skill match, available, not encadrant, not président)
    const findBestRapporteur = (president)=>{
        return MOCK_TEACHERS.filter((t)=>t.id !== encadrant.id && t.id !== president.id).sort((a, b)=>{
            const aSkills = a.skills;
            const bSkills = b.skills;
            const aSkillMatch = aSkills.filter((s)=>project.skills.includes(s)).length;
            const bSkillMatch = bSkills.filter((s)=>project.skills.includes(s)).length;
            if (bSkillMatch !== aSkillMatch) return bSkillMatch - aSkillMatch;
            return (a.currentLoad || 0) - (b.currentLoad || 0);
        })[0];
    };
    const slot1President = presidentCandidates[0];
    const slot1Rapporteur = findBestRapporteur(slot1President);
    const slot2President = presidentCandidates[1] || presidentCandidates[0];
    const slot2Rapporteur = findBestRapporteur(slot2President);
    const slot3President = presidentCandidates[2] || presidentCandidates[0];
    const slot3Rapporteur = findBestRapporteur(slot3President);
    return [
        {
            id: 1,
            time: '14:00 – 14:45',
            startTime: '14:00',
            endTime: '14:45',
            room: MOCK_ROOMS[0],
            jury: [
                {
                    teacher: slot1President,
                    role: 'president'
                },
                {
                    teacher: slot1Rapporteur,
                    role: 'rapporteur'
                },
                {
                    teacher: encadrant,
                    role: 'encadrant'
                }
            ],
            confidence: 95,
            conflicts: [],
            isRecommended: true,
            aiReasoning: [
                `High expertise in ${project.skills[0]}`,
                'All teachers available',
                'Balanced load distribution',
                'No scheduling conflicts',
                'Optimal room capacity match'
            ]
        },
        {
            id: 2,
            time: '15:00 – 15:45',
            startTime: '15:00',
            endTime: '15:45',
            room: MOCK_ROOMS[1],
            jury: [
                {
                    teacher: slot2President,
                    role: 'president'
                },
                {
                    teacher: slot2Rapporteur,
                    role: 'rapporteur'
                },
                {
                    teacher: encadrant,
                    role: 'encadrant'
                }
            ],
            confidence: 87,
            conflicts: [],
            isRecommended: false,
            aiReasoning: [
                'Good skill alignment',
                'Slightly higher load for some members',
                'Alternative room available'
            ]
        },
        {
            id: 3,
            time: '10:00 – 10:45',
            startTime: '10:00',
            endTime: '10:45',
            room: MOCK_ROOMS[2],
            jury: [
                {
                    teacher: slot3President,
                    role: 'president'
                },
                {
                    teacher: slot3Rapporteur,
                    role: 'rapporteur'
                },
                {
                    teacher: encadrant,
                    role: 'encadrant'
                }
            ],
            confidence: 78,
            conflicts: [],
            isRecommended: false,
            aiReasoning: [
                'Early time slot',
                'Adequate expertise coverage',
                'Some members at higher load'
            ]
        }
    ];
};
const MOCK_SCHEDULED_DEFENSES = [
    {
        id: 1,
        projectName: 'AI in Healthcare - Group 1',
        student: 'Ali Hassan, Noor Mohamed',
        date: '2024-02-20',
        time: '10:00',
        room: 'Room 101',
        jury: [
            {
                teacher: MOCK_TEACHERS[0],
                role: 'president'
            },
            {
                teacher: MOCK_TEACHERS[1],
                role: 'rapporteur'
            },
            {
                teacher: MOCK_TEACHERS[2],
                role: 'encadrant'
            }
        ],
        status: 'scheduled'
    },
    {
        id: 2,
        projectName: 'Web3 E-Commerce - Group 2',
        student: 'Layla Ahmed',
        date: '2024-02-21',
        time: '14:00',
        room: 'Room 102',
        jury: [
            {
                teacher: MOCK_TEACHERS[3],
                role: 'president'
            },
            {
                teacher: MOCK_TEACHERS[4],
                role: 'rapporteur'
            },
            {
                teacher: MOCK_TEACHERS[5],
                role: 'encadrant'
            }
        ],
        status: 'scheduled'
    }
];
const MOCK_PENDING_REQUESTS = [
    {
        id: 1,
        project: MOCK_PROJECTS[0],
        requestedDateRange: {
            from: '2024-03-01',
            to: '2024-03-15'
        },
        priority: 'high'
    },
    {
        id: 2,
        project: MOCK_PROJECTS[1],
        requestedDateRange: {
            from: '2024-03-05',
            to: '2024-03-20'
        },
        priority: 'medium'
    },
    {
        id: 3,
        project: MOCK_PROJECTS[2],
        requestedDateRange: {
            from: '2024-03-10',
            to: '2024-03-25'
        },
        priority: 'low'
    }
];
const MOCK_STATISTICS = {
    totalScheduledDefenses: MOCK_SCHEDULED_DEFENSES.length,
    pendingRequests: MOCK_PENDING_REQUESTS.length,
    roomUtilization: {
        'Room A': 65,
        'Room B': 48,
        'Room C': 72
    },
    teacherLoad: MOCK_TEACHERS.reduce((acc, teacher)=>{
        acc[teacher.name] = teacher.currentLoad || 0;
        return acc;
    }, {})
};
const getJuryRoleBadgeColor = (role)=>{
    switch(role){
        case 'president':
            return 'bg-blue-100 text-blue-900 border-blue-300';
        case 'rapporteur':
            return 'bg-purple-100 text-purple-900 border-purple-300';
        case 'encadrant':
            return 'bg-green-100 text-green-900 border-green-300';
    }
};
const getJuryRoleLabel = (role)=>{
    switch(role){
        case 'president':
            return 'Président';
        case 'rapporteur':
            return 'Rapporteur';
        case 'encadrant':
            return 'Encadrant';
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/timeline/defense-timeline-item.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefenseTimelineItem",
    ()=>DefenseTimelineItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/scheduler-mock-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function DefenseTimelineItem({ event, showTeacherRole = false }) {
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const getStatusConfig = (status)=>{
        switch(status){
            case 'scheduled':
                return {
                    color: 'bg-blue-500',
                    label: 'Scheduled',
                    badgeClass: 'bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100'
                };
            case 'completed':
                return {
                    color: 'bg-green-500',
                    label: 'Completed',
                    badgeClass: 'bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-100'
                };
            case 'cancelled':
                return {
                    color: 'bg-red-500',
                    label: 'Cancelled',
                    badgeClass: 'bg-red-100 text-red-900 dark:bg-red-900/20 dark:text-red-100'
                };
            default:
                return {
                    color: 'bg-gray-500',
                    label: status,
                    badgeClass: 'bg-gray-100 text-gray-900 dark:bg-gray-900/20 dark:text-gray-100'
                };
        }
    };
    const statusConfig = getStatusConfig(event.status);
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3 sm:gap-4 group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${statusConfig.color} ring-2 sm:ring-4 ring-background`
                    }, void 0, false, {
                        fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px sm:w-0.5 h-full bg-border mt-2"
                    }, void 0, false, {
                        fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 pb-6 sm:pb-8 min-w-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "p-3 sm:p-4 hover:shadow-md transition-all duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-2 mb-3 sm:mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                className: `${statusConfig.badgeClass} text-xs`,
                                                children: statusConfig.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                lineNumber: 59,
                                                columnNumber: 17
                                            }, this),
                                            showTeacherRole && event.teacherRole && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                className: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJuryRoleBadgeColor"])(event.teacherRole)} border text-xs`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJuryRoleLabel"])(event.teacherRole)
                                            }, void 0, false, {
                                                fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                lineNumber: 63,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-1.5 sm:mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary shrink-0",
                                                children: event.student.avatar
                                            }, void 0, false, {
                                                fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                lineNumber: 69,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm sm:text-base font-semibold text-foreground truncate",
                                                children: event.student.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                lineNumber: 72,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                        lineNumber: 68,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs sm:text-sm font-medium text-foreground mb-2 line-clamp-2",
                                        children: event.subject.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1 sm:gap-1.5",
                                        children: event.subject.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                variant: "secondary",
                                                className: "text-xs",
                                                children: tag
                                            }, tag, false, {
                                                fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-xs sm:text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-foreground truncate",
                                            children: formatDate(event.date)
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-xs sm:text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-foreground",
                                            children: event.time
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 93,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-xs sm:text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-foreground",
                                            children: event.room
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                    className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs sm:text-sm text-muted-foreground",
                                    children: "Jury:"
                                }, void 0, false, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex -space-x-1.5 sm:-space-x-2",
                                    children: event.jury.slice(0, 3).map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary border-2 border-background",
                                            title: member.teacher.name,
                                            children: member.teacher.name.split(' ').map((n)=>n[0]).join('')
                                        }, member.teacher.id, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 107,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            size: "sm",
                            onClick: ()=>setExpanded(!expanded),
                            className: "w-full h-9 text-xs sm:text-sm",
                            children: expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this),
                                    "Hide Details"
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                        lineNumber: 132,
                                        columnNumber: 17
                                    }, this),
                                    "Show Details"
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 sm:mt-4 space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-border animate-in slide-in-from-top-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs sm:text-sm font-semibold text-foreground mb-1.5 sm:mb-2",
                                            children: "Subject Description"
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
                                            children: event.subject.description
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3",
                                            children: "Jury Composition"
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: event.jury.map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 min-w-0 flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative shrink-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary",
                                                                            children: member.teacher.name.split(' ').map((n)=>n[0]).join('')
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                                            lineNumber: 160,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                                            className: "w-2 h-2 sm:w-2.5 sm:h-2.5 absolute -bottom-0.5 -right-0.5 text-green-500 fill-green-500"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                                            lineNumber: 163,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                                    lineNumber: 159,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "min-w-0 flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs sm:text-sm font-medium text-foreground truncate",
                                                                            children: member.teacher.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                                            lineNumber: 166,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-xs text-muted-foreground truncate",
                                                                            children: member.teacher.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                                            lineNumber: 167,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                                    lineNumber: 165,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 158,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            className: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJuryRoleBadgeColor"])(member.role)} border text-xs shrink-0`,
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getJuryRoleLabel"])(member.role)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, member.teacher.id, true, {
                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 152,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3",
                                            children: "Event Timeline"
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 180,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5 sm:space-y-2",
                                            children: Object.entries(event.timeline).map(([key, time])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-xs sm:text-sm gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground capitalize truncate",
                                                            children: key.replace(/([A-Z])/g, ' $1')
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-foreground font-medium shrink-0",
                                                            children: time
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 185,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, key, true, {
                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this),
                                event.attachments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3",
                                            children: "Attachments"
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 194,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5 sm:space-y-2",
                                            children: event.attachments.map((attachment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 min-w-0 flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                    className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                                    lineNumber: 202,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs sm:text-sm text-foreground truncate",
                                                                    children: attachment.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                                    lineNumber: 203,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            size: "sm",
                                                            variant: "ghost",
                                                            className: "shrink-0 h-8 w-8 p-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                className: "w-3.5 h-3.5 sm:w-4 sm:h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                                lineNumber: 206,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 205,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, attachment.id, true, {
                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 195,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 193,
                                    columnNumber: 17
                                }, this),
                                event.progress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3",
                                            children: "Student Progress"
                                        }, void 0, false, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 217,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5 sm:space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-xs sm:text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground",
                                                            children: "Thesis Submitted"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 220,
                                                            columnNumber: 23
                                                        }, this),
                                                        event.progress.thesisSubmitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "w-4 h-4 text-green-500 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            className: "w-4 h-4 text-red-500 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-xs sm:text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground",
                                                            children: "Slides Uploaded"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 228,
                                                            columnNumber: 23
                                                        }, this),
                                                        event.progress.slidesUploaded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "w-4 h-4 text-green-500 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 230,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            className: "w-4 h-4 text-red-500 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-xs sm:text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground",
                                                            children: "Documents Complete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 23
                                                        }, this),
                                                        event.progress.documentsComplete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "w-4 h-4 text-green-500 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 25
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            className: "w-4 h-4 text-red-500 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                            lineNumber: 240,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                            lineNumber: 218,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                                    lineNumber: 216,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/timeline/defense-timeline-item.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/timeline/defense-timeline-item.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(DefenseTimelineItem, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c = DefenseTimelineItem;
var _c;
__turbopack_context__.k.register(_c, "DefenseTimelineItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/timeline/defense-timeline.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefenseTimeline",
    ()=>DefenseTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$timeline$2f$defense$2d$timeline$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/timeline/defense-timeline-item.tsx [app-client] (ecmascript)");
'use client';
;
;
function DefenseTimeline({ events, showTeacherRole = false }) {
    if (events.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center py-12 text-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-muted-foreground",
                children: "No defense events found"
            }, void 0, false, {
                fileName: "[project]/components/timeline/defense-timeline.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/timeline/defense-timeline.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-0",
        children: events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$timeline$2f$defense$2d$timeline$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefenseTimelineItem"], {
                event: event,
                showTeacherRole: showTeacherRole
            }, event.id, false, {
                fileName: "[project]/components/timeline/defense-timeline.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/timeline/defense-timeline.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = DefenseTimeline;
var _c;
__turbopack_context__.k.register(_c, "DefenseTimeline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/defense-timeline-mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_DEFENSE_TIMELINE",
    ()=>MOCK_DEFENSE_TIMELINE
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/scheduler-mock-data.ts [app-client] (ecmascript)");
;
const MOCK_DEFENSE_TIMELINE = [
    {
        id: 'def-1',
        date: '2025-06-25',
        time: '10:30',
        room: 'Salle B12',
        status: 'scheduled',
        student: {
            name: 'Ahmed Yassine',
            avatar: 'AY',
            email: 'ahmed.yassine@student.edu'
        },
        subject: {
            title: 'AI Traffic System Optimization',
            description: 'Real-time traffic prediction and optimization using machine learning and computer vision.',
            tags: [
                'AI',
                'TensorFlow',
                'Computer Vision',
                'Python'
            ]
        },
        jury: [
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][3],
                role: 'president'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][0],
                role: 'rapporteur'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][1],
                role: 'encadrant'
            }
        ],
        teacherRole: 'rapporteur',
        attachments: [
            {
                id: 'att-1',
                name: 'Convocation Jury.pdf',
                type: 'pdf',
                url: '/docs/convocation.pdf'
            },
            {
                id: 'att-2',
                name: 'Rapport PFE.pdf',
                type: 'pdf',
                url: '/docs/rapport.pdf'
            },
            {
                id: 'att-3',
                name: "Fiche d'encadrement.pdf",
                type: 'pdf',
                url: '/docs/fiche.pdf'
            }
        ],
        timeline: {
            arrival: '10:15',
            setup: '10:30',
            presentation: '10:35',
            qa: '10:55',
            deliberation: '11:10',
            result: '11:20'
        },
        progress: {
            thesisSubmitted: true,
            slidesUploaded: true,
            documentsComplete: true
        }
    },
    {
        id: 'def-2',
        date: '2025-06-28',
        time: '14:00',
        room: 'Salle A05',
        status: 'scheduled',
        student: {
            name: 'Mariem Khaled',
            avatar: 'MK',
            email: 'mariem.khaled@student.edu'
        },
        subject: {
            title: 'Blockchain Voting Platform',
            description: 'Decentralized voting system with end-to-end encryption and anonymity guarantees.',
            tags: [
                'Blockchain',
                'Solidity',
                'Web3',
                'Security'
            ]
        },
        jury: [
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][0],
                role: 'president'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][4],
                role: 'rapporteur'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][2],
                role: 'encadrant'
            }
        ],
        teacherRole: 'president',
        attachments: [
            {
                id: 'att-4',
                name: 'Convocation Jury.pdf',
                type: 'pdf',
                url: '/docs/convocation2.pdf'
            },
            {
                id: 'att-5',
                name: 'Rapport PFE.pdf',
                type: 'pdf',
                url: '/docs/rapport2.pdf'
            }
        ],
        timeline: {
            arrival: '13:45',
            setup: '14:00',
            presentation: '14:05',
            qa: '14:25',
            deliberation: '14:40',
            result: '14:50'
        },
        progress: {
            thesisSubmitted: true,
            slidesUploaded: false,
            documentsComplete: true
        }
    },
    {
        id: 'def-3',
        date: '2025-06-20',
        time: '09:00',
        room: 'Salle C22',
        status: 'completed',
        student: {
            name: 'Omar Hassan',
            avatar: 'OH',
            email: 'omar.hassan@student.edu'
        },
        subject: {
            title: 'IoT Healthcare Monitoring',
            description: 'Real-time patient monitoring system using IoT sensors and cloud infrastructure.',
            tags: [
                'IoT',
                'AWS',
                'React Native',
                'Cloud'
            ]
        },
        jury: [
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][1],
                role: 'president'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][3],
                role: 'rapporteur'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][0],
                role: 'encadrant'
            }
        ],
        teacherRole: 'encadrant',
        attachments: [
            {
                id: 'att-6',
                name: 'Convocation Jury.pdf',
                type: 'pdf',
                url: '/docs/convocation3.pdf'
            },
            {
                id: 'att-7',
                name: 'Rapport PFE.pdf',
                type: 'pdf',
                url: '/docs/rapport3.pdf'
            },
            {
                id: 'att-8',
                name: 'Résultat Soutenance.pdf',
                type: 'pdf',
                url: '/docs/result.pdf'
            }
        ],
        timeline: {
            arrival: '08:45',
            setup: '09:00',
            presentation: '09:05',
            qa: '09:25',
            deliberation: '09:40',
            result: '09:50'
        },
        progress: {
            thesisSubmitted: true,
            slidesUploaded: true,
            documentsComplete: true
        }
    },
    {
        id: 'def-4',
        date: '2025-07-02',
        time: '11:00',
        room: 'Salle B15',
        status: 'scheduled',
        student: {
            name: 'Noor Mohamed',
            avatar: 'NM',
            email: 'noor.mohamed@student.edu'
        },
        subject: {
            title: 'E-Commerce Platform with AI Recommendations',
            description: 'Full-stack e-commerce platform with ML-powered recommendation engine.',
            tags: [
                'E-Commerce',
                'ML',
                'React',
                'Node.js'
            ]
        },
        jury: [
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][2],
                role: 'president'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][5],
                role: 'rapporteur'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][0],
                role: 'encadrant'
            }
        ],
        teacherRole: null,
        attachments: [
            {
                id: 'att-9',
                name: 'Convocation Jury.pdf',
                type: 'pdf',
                url: '/docs/convocation4.pdf'
            }
        ],
        timeline: {
            arrival: '10:45',
            setup: '11:00',
            presentation: '11:05',
            qa: '11:25',
            deliberation: '11:40',
            result: '11:50'
        },
        progress: {
            thesisSubmitted: false,
            slidesUploaded: false,
            documentsComplete: false
        }
    },
    {
        id: 'def-5',
        date: '2025-06-15',
        time: '15:30',
        room: 'Salle A10',
        status: 'cancelled',
        student: {
            name: 'Sara Ali',
            avatar: 'SA',
            email: 'sara.ali@student.edu'
        },
        subject: {
            title: 'Mobile Health Tracker',
            description: 'Cross-platform mobile app for tracking health metrics and fitness goals.',
            tags: [
                'Mobile',
                'Flutter',
                'Health',
                'Firebase'
            ]
        },
        jury: [
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][4],
                role: 'president'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][2],
                role: 'rapporteur'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][5],
                role: 'encadrant'
            }
        ],
        teacherRole: 'rapporteur',
        attachments: [],
        timeline: {
            arrival: '15:15',
            setup: '15:30',
            presentation: '15:35',
            qa: '15:55',
            deliberation: '16:10',
            result: '16:20'
        },
        progress: {
            thesisSubmitted: false,
            slidesUploaded: false,
            documentsComplete: false
        }
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/coordinator/defenses/timeline/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CoordinatorDefenseTimelinePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$timeline$2f$defense$2d$timeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/timeline/defense-timeline.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$defense$2d$timeline$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/defense-timeline-mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/scheduler-mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/filter.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function CoordinatorDefenseTimelinePage() {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [roomFilter, setRoomFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [roleFilter, setRoleFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const filteredEvents = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$defense$2d$timeline$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_DEFENSE_TIMELINE"].filter((event)=>{
        const matchesSearch = searchQuery === '' || event.subject.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.student.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
        const matchesRoom = roomFilter === 'all' || event.room.includes(roomFilter);
        const matchesRole = roleFilter === 'all' || event.jury.some((j)=>j.role === roleFilter);
        return matchesSearch && matchesStatus && matchesRoom && matchesRole;
    });
    const stats = {
        total: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$defense$2d$timeline$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_DEFENSE_TIMELINE"].length,
        scheduled: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$defense$2d$timeline$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_DEFENSE_TIMELINE"].filter((e)=>e.status === 'scheduled').length,
        completed: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$defense$2d$timeline$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_DEFENSE_TIMELINE"].filter((e)=>e.status === 'completed').length,
        cancelled: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$defense$2d$timeline$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_DEFENSE_TIMELINE"].filter((e)=>e.status === 'cancelled').length
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-screen bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 border-b border-border bg-card shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl sm:text-3xl font-bold tracking-tight text-foreground",
                                            children: "Defense Timeline"
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2",
                                            children: "Complete history of scheduled and completed defenses"
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "w-full sm:w-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            className: "w-4 h-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 51,
                                            columnNumber: 15
                                        }, this),
                                        "Export"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 sm:p-4 rounded-lg bg-muted/50 border border-border",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-muted-foreground",
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl sm:text-2xl font-bold text-foreground mt-1",
                                            children: stats.total
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 59,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 sm:p-4 rounded-lg bg-blue-500/10 border border-blue-500/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-blue-600 dark:text-blue-400",
                                            children: "Scheduled"
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1",
                                            children: stats.scheduled
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 63,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 sm:p-4 rounded-lg bg-green-500/10 border border-green-500/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-green-600 dark:text-green-400",
                                            children: "Completed"
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mt-1",
                                            children: stats.completed
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/20",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-red-600 dark:text-red-400",
                                            children: "Cancelled"
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 mt-1",
                                            children: stats.cancelled
                                        }, void 0, false, {
                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 border-b border-border bg-card/50 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        placeholder: "Search by student or subject...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "pl-9 h-10"
                                    }, void 0, false, {
                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: statusFilter,
                                        onValueChange: setStatusFilter,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "h-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                                        className: "w-4 h-4 mr-2 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "all",
                                                        children: "All Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "scheduled",
                                                        children: "Scheduled"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "completed",
                                                        children: "Completed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "cancelled",
                                                        children: "Cancelled"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: roomFilter,
                                        onValueChange: setRoomFilter,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "h-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                                        className: "w-4 h-4 mr-2 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 106,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Room"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 107,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                lineNumber: 105,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "all",
                                                        children: "All Rooms"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 19
                                                    }, this),
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MOCK_ROOMS"].map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: room.name.split(' ')[1],
                                                            children: room.name
                                                        }, room.id, false, {
                                                            fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                            lineNumber: 112,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                lineNumber: 109,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: roleFilter,
                                        onValueChange: setRoleFilter,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "h-10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                                        className: "w-4 h-4 mr-2 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                        placeholder: "Jury Role"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 122,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "all",
                                                        children: "All Roles"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "president",
                                                        children: "Président"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "rapporteur",
                                                        children: "Rapporteur"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: "encadrant",
                                                        children: "Encadrant"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$timeline$2f$defense$2d$timeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefenseTimeline"], {
                        events: filteredEvents
                    }, void 0, false, {
                        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/coordinator/defenses/timeline/page.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(CoordinatorDefenseTimelinePage, "sZoDs7hQw4U30o3nBvwZ4ptRIoE=");
_c = CoordinatorDefenseTimelinePage;
var _c;
__turbopack_context__.k.register(_c, "CoordinatorDefenseTimelinePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_9e842a11._.js.map