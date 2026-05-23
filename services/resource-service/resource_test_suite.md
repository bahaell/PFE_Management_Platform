1) Préparer les données de base
1.1 Vérifier que le service est démarré
GET /api/rooms

> Si la liste est vide, créer au moins 2 salles avec les étapes ci-dessous.

2) Créer des salles (Room)
2.1 Créer Room 1 (available)
POST /api/rooms
{
  "name": "Salle B12",
  "capacity": 40,
  "location": "Bloc B – 1er étage",
  "building": "Bloc B",
  "floor": "1er étage",
  "status": "available",
  "description": "Large room for PFE defenses."
}

2.2 Créer Room 2 (maintenance)
POST /api/rooms
{
  "name": "Salle C21",
  "capacity": 50,
  "location": "Bloc C – 2ème étage",
  "building": "Bloc C",
  "floor": "2ème étage",
  "status": "maintenance",
  "description": "Room under maintenance."
}

> Garde `roomId1` et `roomId2`.

3) Vérifier lecture rooms
3.1 Liste complète
GET /api/rooms

3.2 Room par ID
GET /api/rooms/{roomId1}

3.3 Rooms available
GET /api/rooms/available

> Attendu:
- La room avec `status=available` apparaît dans `/available`
- La room `maintenance` n’apparaît pas dans `/available`
- La réponse room contient: `equipment`, `bookings`, `maintenanceSchedule`

4) Mettre à jour et supprimer room
4.1 Update room
PUT /api/rooms/{roomId1}
{
  "name": "Salle B12 - Updated",
  "capacity": 45,
  "location": "Bloc B – 1er étage",
  "building": "Bloc B",
  "floor": "1er étage",
  "status": "occupied",
  "description": "Updated room description."
}

4.2 Vérifier update
GET /api/rooms/{roomId1}

> Attendu: `status=occupied`, `capacity=45`.

4.3 Supprimer room de test
DELETE /api/rooms/{roomId2}

5) Ajouter équipements (EquipmentItem par type)
5.1 Ajouter projector
POST /api/equipment
{
  "type": "projector",
  "present": true,
  "status": "ok",
  "roomId": {roomId1}
}

5.2 Ajouter wifi avec code
POST /api/equipment
{
  "type": "wifi",
  "present": true,
  "status": "ok",
  "code": "ENSIB12@2026",
  "roomId": {roomId1}
}

5.3 Ajouter smartBoard en manque
POST /api/equipment
{
  "type": "smartBoard",
  "present": false,
  "status": "missing",
  "roomId": {roomId1}
}

> Garde `equipmentIdProjector` pour test update/delete.

6) Vérifier lecture équipements
6.1 Tous les équipements
GET /api/equipment

6.2 Par room
GET /api/equipment/room/{roomId1}

6.3 Par type
GET /api/equipment/type/projector

6.4 Par ID
GET /api/equipment/{equipmentIdProjector}

> Attendu:
- Format: `type`, `present`, `status`, `code`, `roomId`, `roomName`
- `name` et `available` ne doivent plus être nécessaires

7) Update et delete équipement
7.1 Update projector
PUT /api/equipment/{equipmentIdProjector}
{
  "type": "projector",
  "present": true,
  "status": "maintenance",
  "roomId": {roomId1}
}

7.2 Vérifier update
GET /api/equipment/{equipmentIdProjector}

> Attendu: `status=maintenance`.

7.3 Delete équipement
DELETE /api/equipment/{equipmentIdProjector}

8) Tester disponibilité room (availability slots)
8.1 Lire disponibilité initiale
GET /api/rooms/{roomId1}/availability

> Attendu format:
{
  "roomId": "{roomId1 as string}",
  "availability": []
}

8.2 Ajouter slot normal
POST /api/rooms/{roomId1}/availability
{
  "start": "09:00",
  "end": "12:00",
  "maintenance": false
}

8.3 Ajouter slot maintenance
POST /api/rooms/{roomId1}/availability
{
  "start": "14:00",
  "end": "17:00",
  "maintenance": true,
  "reason": "Cleaning"
}

> Garde `slotId1` et `slotId2`.

8.4 Vérifier no-overlap (cas invalide)
GET /api/rooms/{roomId1}/availability/validate-overlap?start=10:00&end=11:00

> Attendu: `{ "valid": false }`

8.5 Vérifier no-overlap (cas valide)
GET /api/rooms/{roomId1}/availability/validate-overlap?start=12:00&end=13:00

> Attendu: `{ "valid": true }`

8.6 Update slot
PATCH /api/rooms/{roomId1}/availability/{slotId1}
{
  "start": "08:30",
  "end": "11:30",
  "maintenance": false
}

8.7 Delete slot
DELETE /api/rooms/{roomId1}/availability/{slotId2}

9) Vérification du mapping Room frontend-like
9.1 Lire room finale
GET /api/rooms/{roomId1}

> Vérifier que la structure suit le modèle frontend:
- `status`: available|occupied|maintenance|unavailable
- `equipment`: contient les 10 clés (projector, smartBoard, speakers, microphone, hdmiSystem, recordingCamera, airConditioning, ethernet, wifi, screen)
- `bookings`: tableau
- `maintenanceSchedule`: tableau (peut être vide)

10) Cas d’erreurs rapides
10.1 Room introuvable
GET /api/rooms/999999

> Attendu: 404.

10.2 Equipment introuvable
GET /api/equipment/999999

> Attendu: 404.

10.3 Availability slot introuvable
PATCH /api/rooms/{roomId1}/availability/999999
{
  "start": "10:00"
}

> Attendu: 404.
