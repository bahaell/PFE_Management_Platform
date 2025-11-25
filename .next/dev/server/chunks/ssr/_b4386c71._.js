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
"[project]/lib/scheduler-mock-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/teacher-defense-mock-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOCK_TEACHER_DEFENSES",
    ()=>MOCK_TEACHER_DEFENSES
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/scheduler-mock-data.ts [app-ssr] (ecmascript)");
;
const MOCK_TEACHER_DEFENSES = [
    {
        id: '1',
        student: {
            name: 'Ahmed Yassine',
            avatar: 'AY',
            email: 'ahmed.yassine@student.edu'
        },
        subject: {
            title: 'AI Traffic System Optimization',
            description: 'Real-time traffic prediction and optimization using machine learning and computer vision. The system analyzes live camera feeds to detect congestion patterns and provides intelligent routing suggestions.',
            technologies: [
                'Python',
                'TensorFlow',
                'OpenCV',
                'React',
                'FastAPI'
            ]
        },
        defense: {
            date: '2025-06-25',
            time: '10:30',
            room: 'Salle B12',
            duration: '45 min',
            status: 'scheduled'
        },
        jury: [
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][3],
                role: 'president'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][0],
                role: 'rapporteur'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][1],
                role: 'encadrant'
            }
        ],
        teacherRole: 'rapporteur',
        attachments: [
            {
                id: 'att1',
                name: 'Convocation Jury.pdf',
                url: '/attachments/convocation.pdf',
                type: 'pdf'
            },
            {
                id: 'att2',
                name: "Fiche d'encadrement.pdf",
                url: '/attachments/fiche.pdf',
                type: 'pdf'
            },
            {
                id: 'att3',
                name: 'Guide soutenance.pdf',
                url: '/attachments/guide.pdf',
                type: 'pdf'
            }
        ],
        comments: [
            {
                id: 'c1',
                author: 'Prof. Ali Mohamed',
                content: 'Please review the technical report before the defense.',
                timestamp: '2025-06-15T14:30:00'
            },
            {
                id: 'c2',
                author: 'Dr. Sami Ahmed',
                content: 'Student presentation slides look comprehensive.',
                timestamp: '2025-06-20T09:15:00'
            }
        ]
    },
    {
        id: '2',
        student: {
            name: 'Mariem Khaled',
            avatar: 'MK',
            email: 'mariem.khaled@student.edu'
        },
        subject: {
            title: 'Blockchain Voting Platform',
            description: 'Decentralized voting system with end-to-end encryption and anonymity guarantees.',
            technologies: [
                'Solidity',
                'Ethereum',
                'React',
                'Node.js',
                'IPFS'
            ]
        },
        defense: {
            date: '2025-06-28',
            time: '14:00',
            room: 'Salle A05',
            duration: '45 min',
            status: 'scheduled'
        },
        jury: [
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][0],
                role: 'president'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][4],
                role: 'rapporteur'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][2],
                role: 'encadrant'
            }
        ],
        teacherRole: 'president',
        attachments: [
            {
                id: 'att4',
                name: 'Convocation Jury.pdf',
                url: '/attachments/convocation.pdf',
                type: 'pdf'
            }
        ]
    },
    {
        id: '3',
        student: {
            name: 'Omar Hassan',
            avatar: 'OH',
            email: 'omar.hassan@student.edu'
        },
        subject: {
            title: 'IoT Healthcare Monitoring',
            description: 'Real-time patient monitoring system using IoT sensors and cloud infrastructure.',
            technologies: [
                'IoT',
                'AWS',
                'Node.js',
                'React Native',
                'MQTT'
            ]
        },
        defense: {
            date: '2025-06-20',
            time: '09:00',
            room: 'Salle C22',
            duration: '45 min',
            status: 'completed'
        },
        jury: [
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][1],
                role: 'president'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][3],
                role: 'rapporteur'
            },
            {
                teacher: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHERS"][0],
                role: 'encadrant'
            }
        ],
        teacherRole: 'encadrant'
    }
];
}),
"[project]/app/teacher/defenses/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeacherDefensesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/page-header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$teacher$2d$defense$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/teacher-defense-mock-data.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/scheduler-mock-data.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
function TeacherDefensesPage() {
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const filteredDefenses = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$teacher$2d$defense$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOCK_TEACHER_DEFENSES"].filter((defense)=>defense.student.name.toLowerCase().includes(searchTerm.toLowerCase()) || defense.subject.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };
    const getStatusBadge = (status)=>{
        const colors = {
            scheduled: 'bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100',
            completed: 'bg-green-100 text-green-900 dark:bg-green-900/20 dark:text-green-100',
            'in-progress': 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100'
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
            className: colors[status],
            children: status
        }, void 0, false, {
            fileName: "[project]/app/teacher/defenses/page.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$page$2d$header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: "My Defenses",
                description: "View all defenses where you are assigned as jury member"
            }, void 0, false, {
                fileName: "[project]/app/teacher/defenses/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/app/teacher/defenses/page.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                        placeholder: "Search by student name or subject...",
                        value: searchTerm,
                        onChange: (e)=>setSearchTerm(e.target.value),
                        className: "pl-10"
                    }, void 0, false, {
                        fileName: "[project]/app/teacher/defenses/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/teacher/defenses/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: filteredDefenses.map((defense)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "hover:shadow-md transition-shadow",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "p-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary",
                                                    children: defense.student.avatar
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-foreground",
                                                            children: defense.student.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                                            lineNumber: 74,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-muted-foreground",
                                                            children: defense.student.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                                            lineNumber: 75,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                            lineNumber: 69,
                                            columnNumber: 17
                                        }, this),
                                        getStatusBadge(defense.defense.status)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                    lineNumber: 68,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-sm font-medium text-foreground mb-2",
                                            children: defense.subject.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-1",
                                            children: defense.subject.technologies.slice(0, 4).map((tech)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "secondary",
                                                    className: "text-xs",
                                                    children: tech
                                                }, tech, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 86,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                            lineNumber: 84,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-sm text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: formatDate(defense.defense.date)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-sm text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: defense.defense.time
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-sm text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: defense.defense.room
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between pt-4 border-t",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "My Role:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                    className: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getJuryRoleBadgeColor"])(defense.teacherRole)} border text-xs`,
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$scheduler$2d$mock$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getJuryRoleLabel"])(defense.teacherRole)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                    className: "w-4 h-4 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center -space-x-2",
                                                    children: defense.jury.slice(0, 3).map((member)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary border-2 border-background",
                                                            title: member.teacher.name,
                                                            children: member.teacher.name.split(' ').map((n)=>n[0]).join('')
                                                        }, member.teacher.id, false, {
                                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/teacher/defenses/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/teacher/defenses/${defense.id}`,
                                    className: "block mt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        variant: "outline",
                                        className: "w-full flex items-center justify-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/app/teacher/defenses/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 19
                                            }, this),
                                            "View Details"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/teacher/defenses/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/teacher/defenses/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/teacher/defenses/page.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this)
                    }, defense.id, false, {
                        fileName: "[project]/app/teacher/defenses/page.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/teacher/defenses/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            filteredDefenses.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground",
                    children: "No defenses found matching your search."
                }, void 0, false, {
                    fileName: "[project]/app/teacher/defenses/page.tsx",
                    lineNumber: 148,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/teacher/defenses/page.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/teacher/defenses/page.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Eye
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const Eye = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("Eye", [
    [
        "path",
        {
            d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
            key: "1nclc0"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "3",
            key: "1v7zrd"
        }
    ]
]);
;
 //# sourceMappingURL=eye.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Eye",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>MapPin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const MapPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("MapPin", [
    [
        "path",
        {
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }
    ]
]);
;
 //# sourceMappingURL=map-pin.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_b4386c71._.js.map