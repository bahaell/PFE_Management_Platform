# 🗺️ PFE Management Platform - Microservices Roadmap

This plan outlines the remaining services required to achieve full functional parity with the frontend models and provide a premium user experience.

---

## Phase 2: Administrative Excellence (Document Service)
**Objective:** Replace manual paperwork with automated PDF generation.

### 📄 Academic Document Service
*   **Responsibility:** Lifecycle of internship conventions, defense authorizations, and PVs.
*   **Key Features:**
    *   **PDF Generation:** Use **Thymeleaf + iText/OpenHTMLToPDF** to generate professional documents from templates.
    *   **Digital Trail:** Track when a student requests a document and when it's "Signed/Validated."
    *   **Integration:** Pulls project data from `projects-service` and jury results from `defense-service`.

---

## Phase 3: The Logistics Layer (Resource & Scheduling)
**Objective:** Automate the complex "Defense Week" organization.

### 🏢 Resource Service (Inventory)
*   **Responsibility:** Manage the physical inventory.
*   **Models:** `Room`, `Equipment`.
*   **Actions:** Track room capacities, projector availability, and technical specs.

### 🧠 Scheduling Service (The "Brain")
*   **Responsibility:** Solve the Constraint Satisfaction Problem (CSP) of scheduling.
*   **Action:** Suggest optimal slots by crossing:
    1.  **Teacher Availability** (via User Service / Calendar).
    2.  **Room Availability** (via Resource Service).
    3.  **Project Readiness** (via Projects Service).
*   **Tech Recommendation:** Use **Timefold (OptaPlanner)** for automated scheduling.

---

## Phase 4: Engagement & Feedback

### 💬 Collaboration Service (Real-time)
*   **Objective:** Move beyond static comments.
*   **Features:**
    *   **Live Chat:** Socket.io or Spring WebFlux (WebSockets) for real-time mentor-student talk.
    *   **Annotations:** Ability to pin comments to specific file versions.

### 📊 Subject Service (Marketplace)
*   **Objective:** Marketplace for "Free Subjects" proposed by companies or teachers.
*   **Features:**
    *   **Bidding System:** Students can apply for subjects.
    *   **Validation:** Coordinators approve subjects before they enter the `projects-service`.

---

## Phase 5: Production Readiness (Cross-Cutting)
*   **Security:** Implement Centralized Auth (Keycloak or Spring Security OAuth2) at the **Gateway** level.
*   **Analytics:** A dashboard service to track "Global Progress" (e.g., % of students who found a PFE).
*   **File Storage:** Integrate **MinIO** or **AWS S3** for persistent document storage (replacing local mock URLs).

---

> [!TIP]
> **Suggested Priority:** Phase 2 (Academic Documents) is the most immediate pain point for university administration. We should start there.
