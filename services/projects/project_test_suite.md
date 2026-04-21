1) Préparer les comptes et token
1.1 Utiliser les comptes du user_test_suite
- Coordinator token
- Student token
- Teacher token

> Les tests de création propriétaire nécessitent surtout Teacher + Student.

2) Créer des projets de test (avec ownership depuis token)
2.1 Création par Teacher
POST /api/projects
Header: X-User-Id: teacher-001
Header: X-User-Role: TEACHER
{
  "title": "AI-Powered Attendance System",
  "description": "Smart attendance management using face recognition.",
  "status": "PROPOSED",
  "progress": 0,
  "supervisorId": "fake-supervisor",
  "requiredSkills": ["Python", "OpenCV", "TensorFlow"]
}

> Attendu:
- `supervisorId` dans la réponse = `teacher-001` (pris depuis token)
- `subject` existe dans la réponse et doit être égal à `title`
- garder `projectIdTeacher`

2.2 Création par Student
POST /api/projects
Header: X-User-Id: student-001
Header: X-User-Role: STUDENT
{
  "title": "Blockchain Voting Platform",
  "description": "Secure voting platform using blockchain technology.",
  "status": "PROPOSED",
  "progress": 0,
  "studentIds": ["someone-else"],
  "requiredSkills": ["Solidity", "Blockchain", "Security"]
}

> Attendu:
- `studentIds` contient `student-001` (ajouté depuis token)
- garder `projectIdStudent`

3) Vérifier les endpoints de lecture
3.1 Liste
GET /api/projects

3.2 Par ID
GET /api/projects/{projectIdTeacher}

3.3 Par supervisor
GET /api/projects/supervisor/teacher-001

3.4 Par statut
GET /api/projects/status/PROPOSED

3.5 Candidats scheduling
GET /api/projects/scheduling-candidates

> Attendu:
- par défaut filtre `SUBMITTED` (si aucun candidat, liste vide possible)
- chaque item contient `projectId`, `title`, `status`, `supervisorId`, `studentIds`

4) Tester la machine d’états du projet
4.1 Tentative non autorisée
PATCH /api/projects/{projectIdTeacher}/status?status=APPROVED
Header: X-User-Role: STUDENT

> Attendu: 403 Forbidden.

4.2 Validation autorisée
PATCH /api/projects/{projectIdTeacher}/status?status=APPROVED
Header: X-User-Role: COORDINATOR

> Attendu: 200 OK.

4.3 Transition invalide
PATCH /api/projects/{projectIdStudent}/status?status=IN_PROGRESS
Header: X-User-Role: COORDINATOR

> Attendu: 400 Bad Request (transition non autorisée depuis PROPOSED).

4.4 Finalisation automatique
PATCH /api/projects/{projectIdTeacher}/status?status=COMPLETED
Header: X-User-Role: COORDINATOR

> Attendu:
- `status = COMPLETED`
- `progress = 100`

5) Tester la mise à jour du progress
5.1 Progress valide
PATCH /api/projects/{projectIdStudent}/progress?progress=65

> Attendu: `progress = 65`.

5.2 Progress invalide
PATCH /api/projects/{projectIdStudent}/progress?progress=120

> Attendu: 400 Bad Request.

6) Test matching de projets
6.1 Calcul du matching
POST /api/projects/matching
{
  "studentSkills": ["Python", "TensorFlow", "Machine Learning", "OpenCV"]
}

> Attendu:
- réponse triée par `matchScore` décroissant
- item contient `projectId`, `title`, `subject`, `requiredSkills`, `matchedSkills`, `matchScore`
- `matchScore` entre 0 et 100

7) Collaboration: messages et activities
7.1 Créer un message projet
POST /api/projects/{projectIdTeacher}/messages
{
  "authorId": "teacher-001",
  "authorName": "Dr. Sami Ahmed",
  "authorRole": "TEACHER",
  "content": "Please upload the final report before Friday."
}

> Attendu: 201 Created + message retourné.

7.2 Lire les messages
GET /api/projects/{projectIdTeacher}/messages?limit=20

7.3 Lire les activités
GET /api/projects/{projectIdTeacher}/activities?limit=20

> Attendu: une activité de type `message` est présente.

8) Validation headers identité (create project)
8.1 Role sans userId
POST /api/projects
Header: X-User-Role: TEACHER
{
  "title": "Header Validation 1",
  "status": "PROPOSED"
}

> Attendu: 400 Bad Request.

8.2 userId sans role
POST /api/projects
Header: X-User-Id: teacher-001
{
  "title": "Header Validation 2",
  "status": "PROPOSED"
}

> Attendu: 400 Bad Request.

8.3 Role non supporté
POST /api/projects
Header: X-User-Id: u-1
Header: X-User-Role: HACKER
{
  "title": "Header Validation 3",
  "status": "PROPOSED"
}

> Attendu: 400 Bad Request.

9) Cas d’erreurs rapides
9.1 UUID invalide
GET /api/projects/123

> Attendu: 400/404 selon mapping.

9.2 Projet introuvable
GET /api/projects/00000000-0000-0000-0000-000000000001

> Attendu: 404 Not Found.
