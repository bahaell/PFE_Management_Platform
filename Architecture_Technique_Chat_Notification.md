# Architecture Technique : Système de Chat Temps Réel & Notifications Push

Ce document présente l'architecture technique mise en place pour la fonctionnalité de communication (Chat) et le système de notifications de la plateforme PFE. L'architecture est de type **Microservices Orientée Événements (Event-Driven Architecture)**.

---

## 1. Vue d'Ensemble de l'Architecture

Le système a été conçu pour garantir une expérience utilisateur **temps réel** fluide, tout en assurant une **scalabilité** et un **découplage fort** entre les services backend. 

### Technologies utilisées :
- **Frontend** : Next.js, React, TailwindCSS, Firebase Client SDK.
- **Backend** : Spring Boot (Java), architecture Microservices.
- **Message Broker** : RabbitMQ.
- **Bases de données** : PostgreSQL (Relationnel), Firebase Firestore (NoSQL Temps réel).
- **Push Notifications** : Firebase Cloud Messaging (FCM) via Service Worker.

---

## 2. Description des Composants Clés

### A. Firebase Firestore (Base de données Temps Réel)
Firestore est utilisé comme le moteur principal du chat. Au lieu de faire transiter chaque frappe de clavier ou message par une API REST Spring Boot classique (qui nécessiterait des WebSockets lourds à gérer), le **Frontend communique directement avec Firestore**. 
- **Avantage** : Synchronisation temps réel native, mode hors-ligne géré automatiquement, et latence minimale pour les utilisateurs.

### B. Chat Service (Microservice Spring Boot)
Le `chat-service` n'est pas responsable de l'acheminement direct des messages de chat, mais agit comme un **Orchestrateur et Observateur** :
- Il gère la création des "Rooms" (salons) et associe les participants dans **PostgreSQL** (`pfe_chat_db`).
- Il utilise le **Firebase Admin SDK** pour écouter (via des listeners) les nouveaux messages insérés dans Firestore.
- Dès qu'un message est détecté, il le transforme en événement asynchrone (`NewMessageEvent`) et le publie dans **RabbitMQ**.

### C. RabbitMQ (Message Broker)
Il joue le rôle de tampon et de découpleur asynchrone (Pub/Sub).
- L'exchange `chat.exchange` reçoit l'événement.
- La queue `chat.notification.queue` stocke le message jusqu'à ce que le service de notifications soit prêt à le consommer.
- **Avantage** : Tolérance aux pannes. Si le service de notification tombe en panne, aucun événement de message n'est perdu. Ils s'accumulent dans RabbitMQ et seront traités au redémarrage.

### D. Notification Service (Microservice Spring Boot)
Ce microservice est totalement indépendant du Chat. Son rôle est de :
- Consommer les événements depuis RabbitMQ via un `@RabbitListener`.
- Identifier les utilisateurs à notifier (en demandant au `chat-service` la liste des participants de la room).
- Sauvegarder la notification de manière persistante dans sa propre base **PostgreSQL** (`notification_db`) avec un statut `isRead = false`.
- Déclencher l'envoi d'une **Push Notification** via l'API Firebase Cloud Messaging (FCM).

### E. Frontend & Firebase Cloud Messaging (FCM)
Le navigateur gère les notifications sur deux niveaux :
- **Foreground (Application ouverte)** : Interception par le `firebase-provider.tsx` qui demande à `@tanstack/react-query` de rafraîchir silencieusement la cloche des notifications sans interrompre l'utilisateur.
- **Background (Application fermée/réduite)** : Interception par le **Service Worker** (`firebase-messaging-sw.js`). L'OS (Windows/Mac/Android) prend le relais et affiche une notification native du système d'exploitation.

---

## 3. Le Flux d'Exécution : Cycle de Vie d'un Message

Voici le parcours exact, étape par étape, d'un message envoyé sur la plateforme :

1. **Envoi (Client A)** : L'utilisateur tape un message. Le Frontend écrit ce document directement dans la collection `chatRooms/{id}/messages` sur Firestore.
2. **Réception Temps Réel (Client B)** : L'autre utilisateur, connecté sur la même Room Firestore, voit le message apparaître instantanément sur son écran.
3. **Capture Backend (Chat Service)** : Le `chat-service` (Spring Boot), qui écoute silencieusement Firestore, capte cet événement `ADDED`.
4. **Publication (RabbitMQ)** : Le `chat-service` formate un événement contenant le texte, l'expéditeur et la Room, puis le poste sur RabbitMQ.
5. **Consommation (Notification Service)** : Le `notification-service` dépile l'événement depuis RabbitMQ. Il contacte l'API REST du `chat-service` pour obtenir la liste des participants.
6. **Sauvegarde (PostgreSQL)** : Il crée une entrée dans la table `notifications` pour tous les participants (sauf l'expéditeur).
7. **Push FCM** : Il envoie un ordre de Push Notification aux serveurs de Firebase.
8. **Affichage Notification** : Firebase réveille le navigateur de l'utilisateur (via le Service Worker) et affiche la notification visuelle sur le bureau.

---

## 4. Choix Techniques et Justifications (Arguments pour la Soutenance)

- **Pourquoi ne pas utiliser PostgreSQL pour les messages de Chat ?** 
  *Le chat nécessite du temps réel. Si nous utilisions PostgreSQL, il faudrait mettre en place un serveur WebSocket côté Spring Boot, gérer les connexions concurrentes, les déconnexions, et la présence. Firebase Firestore gère cela nativement avec une scalabilité mondiale.*

- **Pourquoi RabbitMQ et pas un simple appel HTTP REST entre le chat et la notification ?**
  *Pour éviter le couplage fort. Si le `notification-service` crashe ou est surchargé, un appel HTTP échouerait et l'utilisateur ne serait jamais notifié. Avec RabbitMQ, la notification reste en attente (mise en file) et sera envoyée dès que le service redémarre. De plus, cela libère les ressources du `chat-service` immédiatement.*

- **Pourquoi utiliser PostgreSQL pour les notifications ?**
  *Contrairement au chat, les notifications nécessitent des requêtes complexes, comme le filtrage, les jointures avec les utilisateurs, et la gestion précise d'états asynchrones (`lu`, `non lu`, `archivé`). Le modèle relationnel de PostgreSQL est parfaitement adapté à ces besoins structurés.*

- **Pourquoi convertir les IDs utilisateurs (Mock `std001` vs Long `1`) ?**
  *C'est un pont entre le monde NoSQL/Frontend (qui utilise souvent des UUID ou strings) et le modèle relationnel strict de PostgreSQL backend qui optimise les clés primaires avec des entiers longs (`BIGINT`).*
