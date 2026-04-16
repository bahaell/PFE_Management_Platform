# 🎓 PFE Management Platform

A robust microservices-based platform designed for managing Graduation Projects (PFE). Built with **Java 17**, **Spring Boot 4.0.5**, and **Spring Cloud 2025.1.1**, leveraging a highly scalable and distributed architecture.

---

## 🏛️ Ecosystem Overview

The platform consists of several specialized microservices, each handling a distinct domain of the PFE lifecycle:

| Service | Port | Database | Responsibility |
| :--- | :--- | :--- | :--- |
| **Gateway** | `8080` | - | Unified entry point and routing. |
| **User Service**| `8082` | PostgreSQL | Identity, Auth & Skills management. |
| **Projects** | `8083` | PostgreSQL | **Workflow Engine**: Tasks, Status & Progress. |
| **Defense** | `8084` | PostgreSQL | **Results Engine**: Jury management & Grading. |
| **Notification**| `8085` | MongoDB | Real-time alerts and comms. |

---

## 🏗️ Architecture Stack

- **Centralized Config**: All services fetch settings from the `config-server`.
- **Service Discovery**: Self-registration with `discovery-service` (Eureka).
- **Communication**: Inter-service calls via **OpenFeign** with status synchronization.
- **Tracing**: Distributed tracing via **Micrometer** reported to **Zipkin**.
- **State Machine**: Hardened project lifecycle logic (`PROPOSED` $\rightarrow$ `APPROVED` $\rightarrow$ `COMPLETED`).

---

## 🐳 Getting Started (Infrastructure)

The platform relies on a Dockerized infrastructure for data and monitoring.

### 1. Start Docker Containers
```bash
docker compose up -d
```
Starts: **PostgreSQL (5433)**, **MongoDB (27017)**, **pgAdmin (5050)**, **Zipkin (9411)**, and **MailDev (1080)**.

### 2. Database Initialization
Manual database creation is required in **pgAdmin**:
- `user_db`
- `projects_db`
- `defense_db` (New)

---

## 🚀 Execution Order

To ensure correct connectivity, always start services in this sequence:
1.  **`config-server`** (Wait for "Started" log)
2.  **`discovery-service`**
3.  **`gateway`**
4.  **Business Services** (`user-service`, `projects`, `defense`, etc.)

---

## 📖 Essential Documentation

The platform includes detailed guides for development and testing:

*   **[Microservice Roadmap](./services/plan.md)**: The detailed plan for future services (Resource, Scheduling, Documents).
*   **[Projects Test Suite](./services/projects/project_test_suite.md)**: How to verify the Project lifecycle and Role-based actions.
*   **[Defense Test Suite](./services/defense/defense_test_suite.md)**: How to verify Jury results and Grading workflows.

---

## 🛠️ Development Standards

Every new service added to the platform **must** include:
- `spring-boot-starter-actuator` for health checks.
- `micrometer-tracing` + `zipkin` for observability.
- `spring-cloud-starter-config` for centralized properties.
- `spring-cloud-starter-netflix-eureka-client` for service discovery.

---

> [!NOTE]
> **Inter-service Logic:** When a Defense is marked as `COMPLETED` in the Defense service, it automatically triggers a status update in the Projects service to mark the PFE as finalized.
