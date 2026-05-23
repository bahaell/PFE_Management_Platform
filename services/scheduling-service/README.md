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
  "email": "sami.ah262med@university.edu",
  "password": "Password123!",
  "phone": "+216 98 123 456",
  "gender": "Male",
  "birthdate": "1975-03-20",
  "avatar": "SA",
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
  "email": "ha78855tem@uni.tn",
  "password": "Password123!",
  "phone": "+216 98 765 432",
  "gender": "Male",
  "birthdate": "1980-06-15",
  "avatar": "HH",
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
  "name": "Salle B2602",
  "capacity": 20,
  "location": "Bloc B – 2ème étage",
  "building": "Bloc B",
  "floor": "2ème étage",
  "status": "available",
  "description": "Salle avec tableau blanc, sans projecteur."
}
```

2ème salle :
```json
{
  "name": "Salle B1602",
  "capacity": 20,
  "location": "Bloc A – 2ème étage",
  "building": "Bloc A",
  "floor": "2ème étage",
  "status": "available",
  "description": "Salle avec tableau blanc, sans projecteur."
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
    "projectId": "0771ba71-c2ba-4c8c-a578-b98c00d2c95b",
    "juryMemberIds": ["e0250803-0e56-4fa6-995e-5c7cf6678836", "71219b51-50c1-47f6-ad10-0ad57e704f99"],
    "preferredRoomId": 6,
    "durationMinutes": 30,
    "notBefore": "2026-04-26T08:00:00",
    "notAfter": "2026-04-30T18:00:00"
  },
  {
    "projectId": "eee",
    "juryMemberIds": ["e0250803-0e56-4fa6-995e-5c7cf6678836", "gh"],
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
    "timeSlots": [
        {
            "id": "53538802-d05d-417d-84db-f4afecb1e812",
            "date": "2026-05-23",
            "startTime": "08:00:00",
            "endTime": "10:00:00"
        },
        {
            "id": "fe9b51aa-091f-4774-832c-9f2d8399247f",
            "date": "2026-05-23",
            "startTime": "10:00:00",
            "endTime": "12:00:00"
        },
        {
            "id": "a4f7beed-f543-498e-910d-8e4f9cfbc270",
            "date": "2026-05-23",
            "startTime": "14:00:00",
            "endTime": "16:00:00"
        },
        {
            "id": "f79199d4-bd16-492d-bf70-61213a227aac",
            "date": "2026-05-23",
            "startTime": "16:00:00",
            "endTime": "18:00:00"
        },
        {
            "id": "8c4d9f9a-8ee4-42c5-a3d1-366589cdeaf7",
            "date": "2026-05-24",
            "startTime": "08:00:00",
            "endTime": "10:00:00"
        },
        {
            "id": "9f366d31-2dd8-4752-a744-edd53a96c2a0",
            "date": "2026-05-24",
            "startTime": "10:00:00",
            "endTime": "12:00:00"
        },
        {
            "id": "d09a66b3-eba5-463f-9fb1-ac22aee1f110",
            "date": "2026-05-24",
            "startTime": "14:00:00",
            "endTime": "16:00:00"
        },
        {
            "id": "0f703ed6-fa7f-4bd4-a8cf-584c182ef8cb",
            "date": "2026-05-24",
            "startTime": "16:00:00",
            "endTime": "18:00:00"
        },
        {
            "id": "3a48f6ce-9721-4349-916a-4cf7f3cf96f6",
            "date": "2026-05-25",
            "startTime": "08:00:00",
            "endTime": "10:00:00"
        },
        {
            "id": "2c5d2e79-1926-4050-8265-9f27068b5b25",
            "date": "2026-05-25",
            "startTime": "10:00:00",
            "endTime": "12:00:00"
        },
        {
            "id": "322136c7-a8ba-4fc0-9ecb-ecd7ec3e8e4f",
            "date": "2026-05-25",
            "startTime": "14:00:00",
            "endTime": "16:00:00"
        },
        {
            "id": "c0aa1ae2-326e-42a5-9b6b-269f4addb014",
            "date": "2026-05-25",
            "startTime": "16:00:00",
            "endTime": "18:00:00"
        },
        {
            "id": "fe222990-0aa3-4401-bcb9-f7666a8a8616",
            "date": "2026-05-26",
            "startTime": "08:00:00",
            "endTime": "10:00:00"
        },
        {
            "id": "d09ccdda-94b2-4729-8be2-23b07e5d6067",
            "date": "2026-05-26",
            "startTime": "10:00:00",
            "endTime": "12:00:00"
        },
        {
            "id": "16853738-93dd-4258-a283-3de578678567",
            "date": "2026-05-26",
            "startTime": "14:00:00",
            "endTime": "16:00:00"
        },
        {
            "id": "eeb9ee1f-9c32-4e4c-814f-59c51bac256d",
            "date": "2026-05-26",
            "startTime": "16:00:00",
            "endTime": "18:00:00"
        },
        {
            "id": "f30f4611-051f-436f-9be6-4f15a4c34474",
            "date": "2026-05-27",
            "startTime": "08:00:00",
            "endTime": "10:00:00"
        },
        {
            "id": "202d1e57-2b34-4300-be68-86b6f04a29ed",
            "date": "2026-05-27",
            "startTime": "10:00:00",
            "endTime": "12:00:00"
        },
        {
            "id": "a74927e9-1642-4118-a5ef-b7b6a44429c9",
            "date": "2026-05-27",
            "startTime": "14:00:00",
            "endTime": "16:00:00"
        },
        {
            "id": "d03bc372-40a0-4faa-8aeb-932e6ba2a973",
            "date": "2026-05-27",
            "startTime": "16:00:00",
            "endTime": "18:00:00"
        }
    ],
    "roomIds": [
        1,
        2,
        6
    ],
    "sessions": [
        {
            "projectId": "0771ba71-c2ba-4c8c-a578-b98c00d2c95b",
            "projectName": "Blockchain Voting Platform",
            "supervisorName": null,
            "juryMemberIds": [
                "e0250803-0e56-4fa6-995e-5c7cf6678836",
                "71219b51-50c1-47f6-ad10-0ad57e704f99"
            ],
            "juryMemberNames": [
                "Dr. Sami Ahmed",
                "Dr. Hatem Hassan"
            ],
            "juryAvailabilities": [
                "14:00_18:00",
                "08:00_18:00"
            ],
            "durationMinutes": 30,
            "preferredRoomId": 6,
            "timeSlot": {
                "id": "53538802-d05d-417d-84db-f4afecb1e812",
                "date": "2026-05-23",
                "startTime": "08:00:00",
                "endTime": "10:00:00"
            },
            "roomId": 6
        },
        {
            "projectId": "eee",
            "projectName": "Unknown",
            "supervisorName": null,
            "juryMemberIds": [
                "e0250803-0e56-4fa6-995e-5c7cf6678836",
                "gh"
            ],
            "juryMemberNames": [
                "Dr. Sami Ahmed"
            ],
            "juryAvailabilities": [
                "14:00_18:00"
            ],
            "durationMinutes": 30,
            "preferredRoomId": null,
            "timeSlot": {
                "id": "a4f7beed-f543-498e-910d-8e4f9cfbc270",
                "date": "2026-05-23",
                "startTime": "14:00:00",
                "endTime": "16:00:00"
            },
            "roomId": 1
        }
    ],
    "score": {
        "feasible": true,
        "hardScore": 0,
        "initScore": 0,
        "softScore": -1,
        "solutionInitialized": true,
        "zero": false
    }
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