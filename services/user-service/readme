1) Créer les comptes (register)
1.1 Admin
POST http://localhost:8080/api/auth/register
{
  "name": "Admin Principal",
  "email": "admin@pfe-platform.com",
  "password": "Admin1234!",
  "phone": "+216600000001",
  "gender": "Female",
  "birthdate": "1990-01-01",
  "avatar": null,
  "role": "coordinator"
}
1.2 Student 1
POST /api/auth/register
{
  "name": "Ahmed Youssef",
  "email": "ahmed.youssef@student.edu",
  "password": "Password123!",
  "phone": "+216 20 123 456",
  "gender": "Male",
  "birthdate": "2002-03-15",
  "avatar": "AY",
  "role": "student"
}
1.3 Student 2
POST /api/auth/register
{
  "name": "Mariem Khaled",
  "email": "mariem.khaled@student.edu",
  "password": "Password123!",
  "phone": "+216 21 234 567",
  "gender": "Female",
  "birthdate": "2002-07-22",
  "avatar": "MK",
  "role": "student"
}
1.4 Teacher 1
POST /api/auth/register
{
  "name": "Dr. Sami Ahmed",
  "email": "sami.ahmed@university.edu",
  "password": "Password123!",
  "phone": "+216 98 123 456",
  "gender": "Male",
  "birthdate": "1975-03-20",
  "avatar": "SA",
  "role": "teacher"
}
1.5 Teacher 2
POST /api/auth/register
{
  "name": "Dr. Mariem Ben Ali",
  "email": "mariem.benali@university.edu",
  "password": "Password123!",
  "phone": "+216 97 234 567",
  "gender": "Female",
  "birthdate": "1985-06-10",
  "avatar": "MB",
  "role": "teacher"
}
1.6 Coordinator mock
POST /api/auth/register
{
  "name": "Mme Mariem K.",
  "email": "mariem.k@university.tn",
  "password": "Password123!",
  "phone": "+216 71 123 456",
  "gender": "Female",
  "birthdate": "1980-11-10",
  "avatar": null,
  "role": "coordinator"
}
2) Login de chaque user (pour obtenir son token)
POST /api/auth/login
{
  "email": "ahmed.youssef@student.edu",
  "password": "Password123!"
}
Fais pareil pour chaque email/password ci-dessus.


3) Mettre à jour le profil par rôle

> Utilise le token de l’utilisateur concerné.
3.1 Student 1 profile
PUT /api/users/me/profile
{
  "level": "M2",
  "department": "Software Engineering",
  "studentId": "ST20001",
  "academicYear": "2024-2025",
  "interests": "AI, Machine Learning, Computer Vision"
}
3.2 Student 2 profile
PUT /api/users/me/profile
{
  "level": "M2",
  "department": "Software Engineering",
  "studentId": "ST20002",
  "academicYear": "2024-2025",
  "interests": "Blockchain, Web3, Security"
}
3.3 Teacher 1 profile
PUT /api/users/me/profile
{
  "grade": "Professor",
  "speciality": "Artificial Intelligence",
  "department": "Computer Science",
  "bio": "Passionate about AI research and teaching.",
  "researchInterests": "Deep Learning, NLP, Computer Vision",
  "yearsOfExperience": 20
}
3.4 Teacher 2 profile
PUT /api/users/me/profile
{
  "grade": "Associate Professor",
  "speciality": "Software Engineering",
  "department": "Computer Science",
  "bio": "Expert in software architecture and web development.",
  "researchInterests": "DevOps, Microservices, Cloud Computing",
  "yearsOfExperience": 12
}
3.5 Coordinator profile
PUT /api/users/me/profile
{
  "department": "Computer Science",
  "office": "B12",
  "responsibilities": "Oversee all PFE projects, schedule defenses, manage resources",
  "yearsOfService": 5
}
4) Ajouter les skills (par user)
> Utilise le token du user + POST /api/users/me/skills
Student 1
{ "name": "Python", "category": "Language", "relevance": 90 }
{ "name": "TensorFlow", "category": "ML Framework", "relevance": 85 }
{ "name": "OpenCV", "category": "Computer Vision", "relevance": 80 }
Student 2
{ "name": "Solidity", "category": "Language", "relevance": 85 }
{ "name": "Blockchain", "category": "Crypto", "relevance": 88 }
{ "name": "Web3.js", "category": "Framework", "relevance": 80 } 
Teacher 1
{ "name": "Python", "category": "Language", "relevance": 95 }
{ "name": "TensorFlow", "category": "ML Framework", "relevance": 90 }
Teacher 2
{ "name": "JavaScript", "category": "Language", "relevance": 90 }
{ "name": "Node.js", "category": "Backend", "relevance": 88 }
Coordinator
{ "name": "Administration", "category": "Management", "relevance": 95 }
{ "name": "Planning", "category": "Management", "relevance": 90 }
{ "name": "Communication", "category": "Soft Skills", "relevance": 90 }
{ "name": "Git", "category": "Version Control", "relevance": 90 }
{ "name": "REST API", "category": "API", "relevance": 90 }
{ "name": "GraphQL", "category": "API", "relevance": 90 }
{ "name": "MongoDB", "category": "Database", "relevance": 90 }
{ "name": "PostgreSQL", "category": "Database", "relevance": 90 }
{ "name": "Redis", "category": "Database", "relevance": 90 }
5) Vérification finale
GET /api/users/me/profile (avec chaque token)
GET /api/users/me/skills
GET /api/users/students?level=M2&department=Software%20Engineering&academicYear=2024-2025 (token admin)
GET /api/users/teachers?minYears=10&department=Computer%20Science (token admin)