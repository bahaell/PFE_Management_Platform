1) Préparer les IDs nécessaires
1.1 Récupérer une défense existante
GET /api/defenses

> Garde ces valeurs pour les étapes suivantes:
- defenseId
- studentId
- projectId

1.2 Vérifier le format des IDs
- defenseId doit être un UUID String (36 caractères)
- studentId doit accepter un String alphanumérique
- projectId doit être un UUID String valide

2) Tester la lecture des défenses
2.1 Obtenir une défense par ID
GET /api/defenses/{defenseId}

2.2 Obtenir les défenses d’un étudiant
GET /api/defenses/student/{studentId}

> Vérifie que l’endpoint accepte un studentId de type String (non numérique).

3) Mettre à jour une défense

> Utilise un defenseId existant.
3.1 Update simple (avant résultat)
PUT /api/defenses/{defenseId}
{
  "studentId": "ST20001",
  "projectId": "11111111-2222-3333-4444-555555555555",
  "date": "2026-05-20T09:00:00",
  "room": "Salle B12",
  "juryMembers": "Dr. Sami Ahmed, Dr. Mariem Ben Ali",
  "status": "SCHEDULED"
}

4) Soumettre le résultat de soutenance
4.1 Soumission résultat jury
POST /api/defenses/{defenseId}/results
{
  "grade": 16.5,
  "observations": "Excellent work on the architecture."
}

4.2 Vérification après soumission
- La défense doit passer à l'état COMPLETED
- grade et observations doivent être persistés

5) Vérification finale
5.1 Vérifier la défense finale
GET /api/defenses/{defenseId}

5.2 Vérifier l'impact sur le projet lié
GET /api/projects/{projectId}

> Attendu côté projet après résultats:
- status = COMPLETED
- progress = 100.0

6) Cas d’erreurs rapides
6.1 ID invalide
GET /api/defenses/123

> Attendu: 404 ou erreur de validation (ID non UUID).

6.2 Service projet indisponible (si test d’intégration)
POST /api/defenses/{defenseId}/results
{
  "grade": 14.0,
  "observations": "Test with projects-service down."
}

> Si l’appel Feign échoue, vérifier que `projects-service` est bien démarré et enregistré.
