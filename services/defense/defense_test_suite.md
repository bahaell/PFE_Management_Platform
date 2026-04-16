# 🛡️ Defense Service - Advanced Test Suite

This document outlines the test cases for the Defense Microservice, incorporating the **Phase 1: Workflow Hardening** updates (ID migration to String/UUID and Defense Result integration).

---

## 1. Unit & Functional Tests

### 1.1 ID Consistency & Model
*   [ ] **String ID Generation:** Verify that creating a defense results in a 36-character UUID string ID.
*   [ ] **Cross-Service Linking:** 
    *   Verify `studentId` accepts alphanumeric strings (from User Service).
    *   Verify `projectId` accepts standard UUIDs (from Projects Service).

### 1.2 Defense Result Integration (New)
*   **Endpoint:** `POST /api/defenses/{id}/results`
*   [ ] **Successful Submission:** 
    *   Input: `grade=16.5`, `observations="Excellent work on the architecture."`
    *   Expect: Status changes to `COMPLETED`.
    *   Expect: `grade` and `observations` are persisted in the database.
*   [ ] **Project Completion Trigger:** 
    *   When results are submitted, verify (via mock or logs) that a Feign call is sent to `projects-service` to update the project status to `COMPLETED`.

### 1.3 Controller Endpoints
*   [ ] `GET /api/defenses/student/{studentId}`: Verify it correctly handles String-based student IDs.
*   [ ] `PUT /api/defenses/{id}`: Verify it handles String IDs for path variable and body consistency.

---

## 2. Integration & Workflow Tests

### 2.1 The "Finalization" Workflow
1.  **Prep:** Have an existing Project in `IN_PROGRESS` or `SUBMITTED` status.
2.  **Action:** Submit results for the linked Defense via `POST /api/defenses/{id}/results`.
3.  **Validation:** 
    *   Call `GET /api/projects/{projectId}`.
    *   Verify status is now `COMPLETED` and progress is `100.0`.

### 2.2 Security & Role Simulation
*   [ ] **Header Propagation:** Verify that the `X-User-Role` is correctly handled if passed through the gateway to restricted endpoints.

---

## 3. API Reference for Testing

| Endpoint | Method | Params | Description |
| :--- | :--- | :--- | :--- |
| `/api/defenses` | GET | - | Fetch all defenses. |
| `/api/defenses/{id}` | GET | `id` (String) | Fetch by UUID. |
| `/api/defenses/student/{sid}`| GET | `sid` (String) | Fetch by Student String ID. |
| `/api/defenses/{id}/results` | POST | `grade`, `observations`| Submit jury results (Triggers Project Completion). |

---

## 4. Test Troubleshooting
*   **404 Not Found:** Ensure the ID passed is a 36-character UUID string, not a numeric Long.
*   **Feign Errors:** If project completion fails, ensure `projects-service` is up and registered in Eureka.
