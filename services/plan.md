# 🗺️ PFE Management Platform - Execution Plan (Updated)

This roadmap is aligned with the current backend state and frontend service expectations.

---

## Phase 1 (NOW): Scheduling Contract Stabilization
**Objective:** Make `scheduling-service` work end-to-end with existing backend contracts.

### 🧠 Scheduling Service (Top Priority)
* **Responsibility:** Generate valid defense planning using Timefold and real microservice data.
* **Must Fix First:**
  1. **Contracts with Projects Service**
     * Use `UUID/String` IDs (remove `Long` assumptions).
     * Use `title` (or agreed alias) consistently.
     * Consume correct project endpoints (`/api/projects/status/{status}` or `/api/projects/scheduling-candidates`).
  2. **Request/Response DTO Alignment**
     * Update solver request IDs (`projectId`, `juryMemberIds`) to match system-wide ID strategy.
     * Return a frontend-ready schedule result schema.
  3. **Operational Flow**
     * Validate: fetch candidates -> solve -> get result.
     * Add clear error handling for unavailable rooms/projects and solver failures.

### 🏢 Resource Service
* **Responsibility:** Room/equipment availability source for scheduling.
* **Current Status:** Mostly aligned.
* **Next Actions:** Add/verify availability windows and conflict checks for scheduling inputs.

---

## Phase 2: Defense Scheduling Integration
**Objective:** Connect generated schedules to real defense records.

### 🛡️ Defense Service
* **Responsibility:** Source of truth for defense entities and outcomes.
* **Required Additions:**
  * Endpoint to apply approved schedule (e.g. update date/time/room/jury from scheduling output).
  * Preserve existing result finalization flow (`COMPLETED` + project update).
* **Optional Enhancements (after apply endpoint):**
  * Jury assignment APIs
  * Timeline/progress APIs
  * Attachment management APIs

---

## Phase 3: Frontend Integration (After Backend Stabilization)
**Objective:** Replace mock services safely without contract churn.

* Wire frontend scheduler-related services to real APIs only after Phases 1-2 pass.
* Keep temporary compatibility fields (`subject` alias from project title) until UI migration is complete.
* Normalize enum/display mappings in frontend service layer.

---

## Phase 4: Projects Service Final Consistency Pass
**Objective:** Finish cross-domain consistency after scheduling is stable.

* Keep token-based ownership enforcement (`X-User-Id`, `X-User-Role`) strict.
* Keep project matching endpoint on explicit `requiredSkills`.
* Align remaining user-linked IDs in tasks/comments/documents to string-based IDs if still UUID-bound.
* Expand collaboration APIs as needed (messages/activities already added).

---

## Phase 5: Administrative Documents & Production Readiness
**Objective:** Institutional readiness and operational quality.

### 📄 Academic Document Service
* PDF generation (Thymeleaf + iText/OpenHTMLToPDF)
* Request/validation lifecycle
* Integrations with projects/defense

### 🔐 Cross-Cutting
* Gateway auth hardening (OAuth2/JWT propagation headers)
* Object storage (MinIO/S3) for documents
* Monitoring/observability and analytics dashboards

---

> [!TIP]
> **Current Priority Order:**  
> 1) Scheduling-Service contract fixes  
> 2) Defense apply-schedule endpoint  
> 3) Frontend integration  
> 4) Remaining consistency hardening