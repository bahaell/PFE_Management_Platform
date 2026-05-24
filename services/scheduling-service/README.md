# Scheduling Service

Ce service gere la planification des soutenances PFE.

## Microservices necessaires

Pour tester correctement les APIs de `scheduling-service`, demarrer au minimum :

1. `discovery-service` sur `8761`
2. `user-service` sur `8082`
3. `projects-service` sur `8081`
4. `resource-service` sur `8083`
5. `scheduling-service` sur `8084`

Services utiles selon le scenario :

- `gateway` sur `8080` si le frontend consomme les APIs via gateway.
- `notification-service` sur `8085` si tu veux recevoir les evenements RabbitMQ de creation, modification, report ou annulation de soutenance.
- `rabbitmq` sur `5672` pour publier les evenements de soutenance.
- PostgreSQL avec les bases `user_service_db`, `projects_db`, `resource_db` et `defense_db`.

`scheduling-service` depend directement de :

- `user-service` pour recuperer les enseignants et leurs disponibilites.
- `projects-service` pour recuperer les projets a planifier.
- `resource-service` pour recuperer les salles disponibles.

## Alimenter les donnees de test

Le script `scripts/seed-schedule-api.ps1` cree des donnees coherentes via les APIs :

- 3 enseignants avec disponibilites.
- 2 etudiants.
- 1 coordinateur.
- 3 salles avec disponibilites de salle.
- 2 projets au statut `IN_PROGRESS`.
- 1 periode academique active.
- 2 soutenances deja planifiees avec jury.

Executer les services requis, puis lancer :

```powershell
cd D:\PFE_Management_Platform\PFE_Management_Platform-main\services\scheduling-service
.\scripts\seed-schedule-api.ps1
```

Pour alimenter la base et lancer directement le solver Timefold :

```powershell
.\scripts\seed-schedule-api.ps1 -RunSolver
```

Le script est idempotent : si les users, rooms, projets ou soutenances existent deja, il les reutilise.

## Endpoints principaux

```http
GET  /api/schedule/periods
GET  /api/schedule/periods/active
POST /api/schedule/periods
PUT  /api/schedule/periods/{id}/activate

GET    /api/schedule/defenses
GET    /api/schedule/defenses/{id}
POST   /api/schedule/defenses
PUT    /api/schedule/defenses/{id}
DELETE /api/schedule/defenses/{id}

GET  /api/schedule/defenses/{id}/jury
POST /api/schedule/defenses/{id}/jury?teacherId={id}&role={role}

POST /api/schedule/solve
GET  /api/schedule/result/{jobId}
```

## Payload solver

Le script affiche un payload pret a envoyer a `POST /api/schedule/solve`.

Exemple de structure :

```json
[
  {
    "projectId": "project-uuid",
    "juryMemberIds": ["teacher-id-1", "teacher-id-2"],
    "preferredRoomId": 1,
    "durationMinutes": 60,
    "notBefore": "2026-05-25T08:00:00",
    "notAfter": "2026-06-07T18:00:00"
  }
]
```

La reponse de `POST /solve` retourne un `jobId`. Attendre environ 30 secondes, puis appeler :

```http
GET http://localhost:8084/api/schedule/result/{jobId}
```

## Ordre de demarrage local

```powershell
# Terminal 1
cd D:\PFE_Management_Platform\PFE_Management_Platform-main\services\discovery
.\mvnw.cmd spring-boot:run

# Terminal 2
cd D:\PFE_Management_Platform\PFE_Management_Platform-main\services\user-service
.\mvnw.cmd spring-boot:run

# Terminal 3
cd D:\PFE_Management_Platform\PFE_Management_Platform-main\services\projects
.\mvnw.cmd spring-boot:run

# Terminal 4
cd D:\PFE_Management_Platform\PFE_Management_Platform-main\services\resource-service
.\mvnw.cmd spring-boot:run

# Terminal 5
cd D:\PFE_Management_Platform\PFE_Management_Platform-main\services\scheduling-service
.\mvnw.cmd spring-boot:run
```
