# 🚀 Projects Service - Advanced Test Suite

This document provides updated test cases for the Projects Microservice, focusing on the **Status State Machine** and **Role-Based Workflow** implemented in Phase 1.

---

## 1. Status State Machine & Lifecycle

### 1.1 Role-Based Validation (New)
*   **Endpoint:** `PATCH /api/projects/{id}/status`
*   [ ] **Unauthorized Approval:** 
    *   Set status to `APPROVED` with Header `X-User-Role: STUDENT`.
    *   Expect: `403 Forbidden` or `400 Bad Request` (depending on exception mapping).
*   [ ] **Authorized Approval:** 
    *   Set status to `APPROVED` with Header `X-User-Role: COORDINATOR`.
    *   Expect: `200 OK`.

### 1.2 State Transition Logic
*   [ ] **Invalid Jump:** 
    *   Project is `PROPOSED`. Attempt `PATCH` to `IN_PROGRESS`.
    *   Expect: Error (Cannot skip `APPROVED` and `ASSIGNED` states).
*   [ ] **Auto-Completion:**
    *   Trigger `PATCH` to `COMPLETED`.
    *   Expect: `progress` field is automatically set to `100.0` in the response.

---

## 2. Core Operational Tests

### 2.1 Project CRUD
*   [ ] **UUID Integrity:** Verify project IDs are returned as standard UUIDs.
*   [ ] **Supervisor Filtering:** `GET /api/projects/supervisor/{id}` returns correct associated projects.

### 2.2 Task & Collaboration
*   [ ] **Dependency Check:** Verify tasks cannot be created for non-existent Project UUIDs.
*   [ ] **Progress Rollup (Future):** (Idea) Verify that marking all tasks as DONE affects project progress.

---

## 3. Workflow API Reference

| Endpoint | Method | Body/Query | Role Required |
| :--- | :--- | :--- | :--- |
| `/api/projects/{id}/status` | PATCH | `status` (Enum) | `COORDINATOR` for APPROVAL |
| `/api/projects/{id}/progress`| PATCH | `progress` (Double) | `SUPERVISOR` / `COORDINATOR`|

---

## 4. Integration with Defense Service
*   [ ] **Defense Trigger:**
    *   Simulate a call from `defense-service` to `PATCH /api/projects/{id}/status?status=COMPLETED`.
    *   Verify the project is finalized correctly.

---

## 5. Troubleshooting
*   **Role Errors:** Ensure the `X-User-Role` header is being captured by the controller.
*   **State Errors:** Refer to `ProjectServiceImpl.java` for the allowed status flow.
