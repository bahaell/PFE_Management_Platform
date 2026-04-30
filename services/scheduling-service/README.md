Voilà le guide step by step complet :

--- 

## Pré-requis — tout doit être UP

```
✅ docker compose up -d
✅ config-server     :8888
✅ discovery-service :8761
✅ user-service      :8082
✅ projects-service  :8083
✅ resource-service  :8086
✅ scheduling-service:8087
```

---

## Step 1 — Créer un Teacher dans user-service

```
POST http://localhost:8082/api/auth/register
```
```json
{
  "name": "Dr. Sami Ahmed",
  "email": "sami@uni.tn",
  "password": "password123",
  "role": "teacher"
}
```
**Sauvegarde le `id` retourné** → ex: `"abc-123"`

---

## Step 2 — Ajouter des disponibilités au Teacher

```
POST http://localhost:8082/api/users/me/availability
Authorization: Bearer {token_du_step1}
```
```json
{
  "start": "08:00",
  "end": "12:00",
  "isRecurrent": true,
  "onlyDuringPFE": true
}
```

Ajoute un 2ème créneau :
```json
{
  "start": "14:00",
  "end": "18:00",
  "isRecurrent": true,
  "onlyDuringPFE": true
}
```

**Vérifie :**
```
GET http://localhost:8082/api/users/{id}/availability
```

---

## Step 3 — Créer un 2ème Teacher (jury member)

```
POST http://localhost:8082/api/auth/register
```
```json
{
  "name": "Dr. Hatem Hassan",
  "email": "hatem@uni.tn",
  "password": "password123",
  "role": "teacher"
}
```
**Sauvegarde le `id`** → ex: `"def-456"`

Ajoute ses disponibilités :
```
POST http://localhost:8082/api/users/me/availability
Authorization: Bearer {token_dr_hatem}
```
```json
{
  "start": "08:00",
  "end": "18:00",
  "isRecurrent": true,
  "onlyDuringPFE": true
}
```

---

## Step 4 — Créer des Rooms dans resource-service

```
POST http://localhost:8086/api/rooms
```
```json
{
  "name": "Salle A101",
  "capacity": 30,
  "hasProjector": true,
  "hasWhiteboard": true,
  "building": "Bloc A",
  "available": true
}
```

2ème salle :
```json
{
  "name": "Salle B202",
  "capacity": 20,
  "hasProjector": false,
  "hasWhiteboard": true,
  "building": "Bloc B",
  "available": true
}
```

**Vérifie les IDs retournés** → ex: `roomId=1`, `roomId=2`

**Vérifie les salles disponibles :**
```
GET http://localhost:8086/api/rooms/available
```

---

## Step 5 — Créer des Pending Requests

```
POST http://localhost:8087/api/schedule/pending
```
```json
{
  "projectId": "proj-1",
  "projectName": "AI Traffic System",
  "studentName": "Ahmed Youssef",
  "assignedTeacherName": "Dr. Sami Ahmed",
  "dateRangeFrom": "2026-04-20",
  "dateRangeTo": "2026-04-30",
  "priority": "high"
}
```

2ème request :
```json
{
  "projectId": "proj-2",
  "projectName": "Blockchain Voting",
  "studentName": "Mariem Khaled",
  "assignedTeacherName": "Dr. Hatem Hassan",
  "dateRangeFrom": "2026-04-20",
  "dateRangeTo": "2026-04-30",
  "priority": "medium"
}
```

**Vérifie :**
```
GET http://localhost:8087/api/schedule/pending
```

---

## Step 6 — Lancer le Solver Timefold

> ⚠️ Utilise les vrais IDs des teachers créés en Step 1 et 3

```
POST http://localhost:8087/api/schedule/solve
```
```json
[
  {
    "projectId": 1,
    "juryMemberIds": [1, 2],
    "preferredRoomId": 1,
    "durationMinutes": 30,
    "notBefore": "2026-04-26T08:00:00",
    "notAfter": "2026-04-30T18:00:00"
  },
  {
    "projectId": 2,
    "juryMemberIds": [2, 3],
    "preferredRoomId": null,
    "durationMinutes": 30,
    "notBefore": "2026-04-26T08:00:00",
    "notAfter": "2026-04-30T18:00:00"
  }
]
```

**Réponse immédiate :**
```json
{ "jobId": 1745100000000 }
```

> 💡 Le solver tourne **en arrière-plan pendant 30 secondes** — ne fais pas le GET tout de suite

---

## Step 7 — Attendre 30 secondes puis récupérer le résultat

```
GET http://localhost:8087/api/schedule/result/1745100000000
```

**Résultat attendu :**
```json
{
  "sessions": [
    {
      "projectId": 1,
      "projectName": "AI Traffic System",
      "timeSlot": {
        "date": "2026-04-26",
        "startTime": "08:00",
        "endTime": "10:00"
      },
      "roomId": 1
    },
    {
      "projectId": 2,
      "projectName": "Blockchain Voting",
      "timeSlot": {
        "date": "2026-04-26",
        "startTime": "10:00",
        "endTime": "12:00"
      },
      "roomId": 2
    }
  ],
  "score": "0hard/0soft"   ← 0 violations = solution parfaite
}
```

---

## Step 8 — Sauvegarder le résultat comme ScheduledDefense

Après avoir le résultat du solver, crée les defenses officielles :

```
POST http://localhost:8087/api/schedule/defenses
```
```json
{
  "projectName": "AI Traffic System",
  "student": "Ahmed Youssef",
  "date": "2026-04-26",
  "time": "08:00",
  "room": "Salle A101",
  "juryMemberNames": ["Dr. Sami Ahmed", "Dr. Hatem Hassan"],
  "status": "scheduled"
}
```

---

## Step 9 — Vérifier les statistiques

```
GET http://localhost:8087/api/schedule/statistics
```

**Résultat attendu :**
```json
{
  "totalScheduledDefenses": 1,
  "pendingRequests": 2,
  "roomUtilization": {
    "Salle A101": 1
  },
  "teacherLoad": {
    "Dr. Sami Ahmed": 1,
    "Dr. Hatem Hassan": 1
  }
}
```

---

## Résumé du flow

```
Register Teachers (Step 1-3)
        ↓
Add Availabilities (Step 2)
        ↓
Create Rooms (Step 4)
        ↓
Create Pending Requests (Step 5)
        ↓
POST /solve → jobId (Step 6)
        ↓
Wait 30s
        ↓
GET /result/{jobId} (Step 7)
        ↓
POST /defenses (Step 8)
        ↓
GET /statistics (Step 9)
```

> ⚠️ **Si le solver retourne un score négatif** comme `-2hard/0soft` — ça veut dire qu'il y a des conflits non résolus (pas assez de salles ou de créneaux). Ajoute plus de salles dans resource-service et relance.